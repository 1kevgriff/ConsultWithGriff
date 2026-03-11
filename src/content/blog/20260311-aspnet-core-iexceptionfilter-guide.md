---
title: "Stop Writing Try/Catch in Every Controller Action"
date: 2026-03-11T00:00:00Z
permalink: aspnet-core-iexceptionfilter-guide
description: "ASP.NET Core gives you three ways to handle exceptions — middleware, IExceptionHandler, and IExceptionFilter. Here's when exception filters are the right tool, with simple examples you can drop into your project today."
summary: "Exception filters give you per-controller and per-action error handling that middleware can't. Here's how to use IExceptionFilter in ASP.NET Core."
excerpt: "A practical guide to IExceptionFilter in ASP.NET Core — when to use it, how to register it, and why it still matters alongside IExceptionHandler."
tags:
  - aspnet-core
  - csharp
  - error-handling
  - filters
categories:
  - Development
---

I want you to picture something. You open a controller in your project. Maybe it's `OrdersController`. You scroll through the action methods and every. single. one. looks like this:

```csharp
[HttpGet("{id}")]
public async Task<IActionResult> GetOrder(int id)
{
    try
    {
        var order = await _orderService.GetByIdAsync(id);
        if (order is null) return NotFound();
        return Ok(order);
    }
    catch (SqlException ex) when (ex.Number == 1205)
    {
        _logger.LogWarning(ex, "Deadlock getting order {OrderId}", id);
        return StatusCode(503, new { message = "Please try again." });
    }
    catch (SqlException ex)
    {
        _logger.LogError(ex, "Database error getting order {OrderId}", id);
        return StatusCode(500, new { message = "A database error occurred." });
    }
    catch (Exception ex)
    {
        _logger.LogError(ex, "Failed to get order {OrderId}", id);
        return StatusCode(500, new { message = "Something went wrong." });
    }
}
```

Fifteen lines of catch blocks wrapping three lines of actual logic. We were catching `SqlException` specifically — deadlocks got a 503 so the client could retry, other SQL errors got a database-specific message, and the generic `Exception` was the backstop. Every action had the same three catch blocks. Copy-paste error handling, everywhere.

Then one day we needed to add handling for timeout exceptions too. That meant touching every action in every controller. Ask me how I know.

That's when we reached for `IExceptionFilter`, and it cleaned up everything.

## What Is IExceptionFilter?

`IExceptionFilter` is an interface in `Microsoft.AspNetCore.Mvc.Filters` with exactly one method:

```csharp
public interface IExceptionFilter : IFilterMetadata
{
    void OnException(ExceptionContext context);
}
```

That's it. One method. When an unhandled exception escapes your action method, the MVC filter pipeline catches it and hands it to your filter.

The `ExceptionContext` gives you everything you need:

- `Exception` — the exception that was thrown
- `ExceptionHandled` — set this to `true` to tell the pipeline you've dealt with it
- `Result` — set an `IActionResult` to return to the caller
- `HttpContext` — the full HTTP context, including your DI services
- `ActionDescriptor` — which controller and action threw the exception

Here's the thing: this is part of the MVC filter pipeline, not middleware. That distinction matters, and we'll get to why in a minute.

## The Before and After

Let's clean up that `OrdersController`. Here's what the action looks like once you rip out the try/catch:

```csharp
[HttpGet("{id}")]
public async Task<IActionResult> GetOrder(int id)
{
    var order = await _orderService.GetByIdAsync(id);
    if (order is null) return NotFound();
    return Ok(order);
}
```

Three lines. Just the business logic. No ceremony.

And here's the exception filter that replaced all those try/catch blocks:

```csharp
public class ApiExceptionFilter : IExceptionFilter
{
    private readonly ILogger<ApiExceptionFilter> _logger;

    public ApiExceptionFilter(ILogger<ApiExceptionFilter> logger)
    {
        _logger = logger;
    }

    public void OnException(ExceptionContext context)
    {
        var (statusCode, title) = context.Exception switch
        {
            SqlException { Number: 1205 } =>
                (StatusCodes.Status503ServiceUnavailable, "A deadlock occurred. Please retry."),
            SqlException =>
                (StatusCodes.Status500InternalServerError, "A database error occurred."),
            _ =>
                (StatusCodes.Status500InternalServerError, "An unexpected error occurred.")
        };

        var level = statusCode == 503 ? LogLevel.Warning : LogLevel.Error;
        _logger.Log(level, context.Exception, "Exception in {Action}",
            context.ActionDescriptor.DisplayName);

        context.Result = new ObjectResult(new ProblemDetails
        {
            Status = statusCode,
            Title = title
        })
        {
            StatusCode = statusCode
        };

        context.ExceptionHandled = true;
    }
}
```

All the branching logic that was copy-pasted across every action? It's in one place now. `SqlException` with error 1205 (deadlock) gets a 503 so clients can retry. Other SQL errors get a database-specific message. Everything else gets the generic response.

`ExceptionHandled = true` tells the pipeline "I've got this, don't propagate it further." And setting `context.Result` controls exactly what the client gets back — proper `ProblemDetails` every time.

When we needed to add timeout handling? One switch arm. One file. Done.

## How to Register It

You've got three ways to wire up an exception filter, depending on how broadly you want it applied.

### Global — Every Controller, Every Action

```csharp
builder.Services.AddControllers(options =>
{
    options.Filters.Add<ApiExceptionFilter>();
});
```

This is usually what you want for API projects. One filter covers everything.

### Controller-Level — Just One Controller

```csharp
[ApiController]
[TypeFilter<ApiExceptionFilter>]
[Route("api/[controller]")]
public class OrdersController : ControllerBase
{
    // All actions in this controller get the filter
}
```

### Action-Level — Just One Method

```csharp
[HttpPost]
[TypeFilter<ApiExceptionFilter>]
public async Task<IActionResult> CreateOrder(CreateOrderRequest request)
{
    // Only this action gets the filter
}
```

`TypeFilter<T>` creates a new instance per request and resolves constructor dependencies from DI. If you need a scoped lifetime (maybe your filter depends on a scoped service), use `[ServiceFilter<T>]` instead — but you'll need to register the filter itself in DI:

```csharp
builder.Services.AddScoped<ApiExceptionFilter>();
```

Most of the time, `TypeFilter<T>` is what you want.

## So When Do I Use IExceptionFilter vs Everything Else?

This is the real question. ASP.NET Core gives you three mechanisms for handling exceptions, and they all feel like they do the same thing. They don't.

| Feature | UseExceptionHandler (middleware) | IExceptionHandler (.NET 8+) | IExceptionFilter |
|---|---|---|---|
| Scope | All requests | All requests | MVC actions only |
| Access to MVC context | No | No | Yes (ActionDescriptor, ModelState) |
| Per-action control | No | No | Yes |
| Catches middleware exceptions | Yes | Yes | No |
| DI support | Lambda-based | Full DI | Full DI |

Microsoft's own docs say it plainly:

> Prefer middleware for exception handling. Use exception filters only where error handling *differs* based on which action method is called.

I agree with that guidance. Here's my rule of thumb: use `IExceptionHandler` (or `UseExceptionHandler`) as your safety net for the whole app. Reach for `IExceptionFilter` when a specific controller or action needs different error behavior.

Real example: we had an API where most endpoints returned standard `ProblemDetails` on error. But the payment controller needed to return a specific error format that our payment gateway expected. One `IExceptionFilter` on that controller, done. The global handler stayed simple.

## What It Does NOT Catch

This tripped us up early on, so let me save you the headache.

`IExceptionFilter` only catches exceptions thrown during:

- Controller creation
- Model binding
- Action filters
- Action methods themselves

It does **not** catch exceptions from:

- Resource filters
- Result filters
- View/page rendering
- Middleware

We had a result filter that was doing some response transformation, and it threw an exception. Our `IExceptionFilter` never saw it. The error bubbled all the way up to the middleware exception handler, which returned a totally different format. Took us an embarrassing amount of time to figure out why that one endpoint had different error responses.

> If you're relying on `IExceptionFilter` as your only safety net — don't. Always have middleware-level exception handling as your backstop.

## Quick Note on IAsyncExceptionFilter

If your exception handling needs to do async work — say, logging to an external service or posting to a dead-letter queue — there's an async version:

```csharp
public class AsyncApiExceptionFilter : IAsyncExceptionFilter
{
    private readonly IAlertService _alertService;
    private readonly ILogger<AsyncApiExceptionFilter> _logger;

    public AsyncApiExceptionFilter(
        IAlertService alertService,
        ILogger<AsyncApiExceptionFilter> logger)
    {
        _alertService = alertService;
        _logger = logger;
    }

    public async Task OnExceptionAsync(ExceptionContext context)
    {
        _logger.LogError(context.Exception, "Unhandled exception in {Action}",
            context.ActionDescriptor.DisplayName);

        await _alertService.SendAlertAsync(
            $"Exception in {context.ActionDescriptor.DisplayName}",
            context.Exception.ToString());

        context.Result = new ObjectResult(new ProblemDetails
        {
            Status = StatusCodes.Status500InternalServerError,
            Title = "An unexpected error occurred."
        })
        {
            StatusCode = StatusCodes.Status500InternalServerError
        };

        context.ExceptionHandled = true;
    }
}
```

Same idea, just with `Task OnExceptionAsync` instead of `void OnException`. One warning: don't implement both `IExceptionFilter` and `IAsyncExceptionFilter` on the same class. The runtime will only call the async version, and you'll spend a fun afternoon figuring out why your sync logic never runs.

## Wrapping Up

Here's the practical takeaway. Use `IExceptionHandler` or `UseExceptionHandler` for the broad strokes — that's your app-wide safety net. Reach for `IExceptionFilter` when specific controllers or actions need their own error handling behavior. And always remember that exception filters only cover MVC actions. Anything outside that pipeline needs middleware.

The next time you find yourself copying that same try/catch into another action method, stop. There's a better way.

I'd love to hear how you're handling exceptions in your projects. Hit me up on [X](https://x.com/1kevgriff), [Bluesky](https://bsky.app/profile/consultwithgriff.com), or [LinkedIn](https://www.linkedin.com/in/1kevgriff/).

For more on keeping your ASP.NET Core apps healthy, check out my article on [monitoring application health with health checks](/monitoring-aspnet-core-application-health-with-health-checks). And if you're building APIs for single-page apps, you might find my guide on [SPAs with Vue.js and ASP.NET Core](/spas-with-vuejs-aspnetcore) useful too.

### Further Reading

- [Filters in ASP.NET Core](https://learn.microsoft.com/aspnet/core/mvc/controllers/filters?view=aspnetcore-10.0&WT.mc_id=DOP-MVP-4029061)
- [Handle errors in ASP.NET Core](https://learn.microsoft.com/aspnet/core/fundamentals/error-handling?view=aspnetcore-10.0&WT.mc_id=DOP-MVP-4029061)
- [IExceptionFilter Interface](https://learn.microsoft.com/dotnet/api/microsoft.aspnetcore.mvc.filters.iexceptionfilter?view=aspnetcore-10.0&WT.mc_id=DOP-MVP-4029061)
- [ExceptionContext Class](https://learn.microsoft.com/dotnet/api/microsoft.aspnetcore.mvc.filters.exceptioncontext?view=aspnetcore-10.0&WT.mc_id=DOP-MVP-4029061)
