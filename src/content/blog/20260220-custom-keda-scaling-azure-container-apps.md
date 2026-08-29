---
title: 'Custom KEDA Scaling with Azure Container Apps Using an HTTP Metrics Endpoint'
date: 2026-02-20T12:00:00Z
permalink: custom-keda-scaling-azure-container-apps
description: "How to build a custom HTTP scaling endpoint for KEDA in Azure Container Apps when built-in scalers don't fit your workload. Scale containers based on business logic, not just CPU or queue depth."
summary: "How to build a custom HTTP scaling endpoint for KEDA in Azure Container Apps when built-in scalers don't fit your workload. Scale containers based on business logic, not just CPU or queue depth."
tags:
  - Azure
  - KEDA
  - Azure Container Apps
  - Scaling
  - .NET
categories:
  - Azure
  - Architecture
---

On a recent client project, we run a fleet of containers that need to scale based on internal business metrics -- not external signals like queue depth, HTTP requests, or Service Bus message counts.

When we moved this workload to **Azure Container Apps** (part of the same migration I wrote about in [my $8,000 serverless mistake](/my-8000-serverless-mistake)), the natural question was: how do we scale it?

I looked at every built-in KEDA scaler I could find, and none of them fit. CPU scaling is reactive -- by the time CPU spikes, you've already fallen behind. Queue-based scaling doesn't apply when you're not processing a backlog. Cron scaling is too rigid for something that fluctuates unpredictably.

What we actually needed was for KEDA to ask our system one simple question: *"How many containers do you need right now?"*

Turns out, you can do exactly that.

## The Setup

Imagine you have a workload where:

- An **Orchestrator** service knows how many work items are active at any given time
- Each **Worker** container handles a fixed number of items (say, 300)
- Items come and go throughout the day -- the count is never static

The Orchestrator already knows exactly how many items are active and how many containers that requires. You just need a way to tell KEDA.

## The Solution: Custom Scaler

KEDA supports a [Metrics API scaler](https://keda.sh/docs/latest/scalers/metrics-api/) that polls an HTTP endpoint for a metric value. Azure Container Apps supports this through [custom scale rules](https://learn.microsoft.com/en-us/azure/container-apps/scale-app?WT.mc_id=DOP-MVP-4029061&pivots=azure-cli#custom), but the documentation doesn't explain how to actually build the endpoint that KEDA calls. It tells you the configuration shape -- not what your API should return or how to structure the response. That's the gap this post fills.

The idea is simple:

1. Add an endpoint to your Orchestrator that returns the number of needed instances
2. Configure KEDA to poll that endpoint
3. KEDA scales the Worker deployment to match

### What KEDA Expects from Your Endpoint

KEDA's Metrics API scaler doesn't enforce a specific response schema. It sends a GET request to your endpoint and uses a `valueLocation` parameter to extract a single numeric value from whatever JSON you return. The path uses [GJSON notation](https://github.com/tidwall/gjson#path-syntax), so if your response looks like:

```json
{
  "neededInstances": 7,
  "totalItems": 1827
}
```

Then setting `valueLocation` to `neededInstances` tells KEDA to read `7` as the metric value. You can nest it however you want -- `scaling.instances`, `data.count`, whatever fits your API. KEDA just needs a path to a number.

The `targetValue` in your scale rule tells KEDA how to interpret that number. With `targetValue: "1"`, KEDA sets the replica count equal to the metric value. With `targetValue: "100"`, KEDA would divide the metric by 100 to determine replicas. For our use case, `targetValue: "1"` gives us direct control -- the endpoint says exactly how many replicas we want.

### Step 1: The Metrics Endpoint

Here's what the endpoint looks like in an ASP.NET Core controller:

```csharp
[HttpGet("scaling-metrics")]
public async Task<ActionResult<object>> GetScalingMetrics()
{
    if (!ValidateAccessKey())
        return Unauthorized();

    var totalItems = await GetActiveItemCountAsync();

    const int MaxItemsPerWorker = 300;
    var baseInstances = (int)Math.Ceiling((double)totalItems / MaxItemsPerWorker);

    // Only add a buffer instance when remaining capacity < 10%
    var remainingCapacity = (baseInstances * MaxItemsPerWorker) - totalItems;
    var bufferThreshold = (int)(MaxItemsPerWorker * 0.10);
    var needsBuffer = remainingCapacity < bufferThreshold;
    var neededInstances = Math.Max(1, needsBuffer ? baseInstances + 1 : baseInstances);

    return Ok(new { neededInstances });
}
```

The logic is straightforward: divide total items by the max per container, round up, and optionally add a buffer when you're nearly full. With 1,800 items and 300 per worker, that's `ceil(1800/300) = 6` instances. If you had 1,795 items (only 5 slots remaining, well under the 30-slot threshold), it would bump to 7.

The buffer prevents a situation where a burst of new items arrives and you have to wait for KEDA's next polling cycle to scale up.

### Step 2: Authentication

KEDA needs to authenticate with the endpoint. We support multiple auth methods so we're not locked into one approach:

```csharp
// X-Access-Key header (preferred)
Request.Headers.TryGetValue("X-Access-Key", out var headerKey);

// Authorization: Bearer token
Request.Headers.TryGetValue("Authorization", out var authHeader);

// Query string fallback (for KEDA compatibility)
Request.Query.TryGetValue("access_key", out var queryKey);
```

The query string fallback exists because Azure Container Apps' KEDA HTTP scaler configuration makes it easier to pass auth via query parameters than custom headers in some configurations.

### Step 3: Azure Container Apps Scale Rule

Now wire it up in your Container App configuration. You can do this through the Azure CLI, Bicep, or the portal:

```json
{
  "name": "orchestrator-metrics",
  "custom": {
    "type": "external",
    "metadata": {
      "scalerAddress": "https://your-orchestrator.azurecontainerapps.io/api/scaling-metrics?access_key=your-key",
      "valueLocation": "neededInstances",
      "targetValue": "1"
    }
  }
}
```

The `valueLocation` tells KEDA which field to read from your JSON response. The `targetValue` of `1` means KEDA sets the replica count equal to that value. KEDA polls this endpoint on its configured interval (default: 30 seconds) and adjusts the replica count to match.

## What the Response Looks Like in Practice

```json
{
  "neededInstances": 7
}
```

KEDA reads `neededInstances` and scales the Worker Container App to 7 replicas. If new items come in and `neededInstances` bumps to 8, KEDA scales up on the next poll. If items drop overnight and you only need 5, it scales down. You can include additional fields for your own logging and debugging, but KEDA only cares about the field specified in `valueLocation`.

## Lessons Learned

### The +1 Buffer Trap

Our first implementation always added a +1 buffer instance:

```csharp
var neededInstances = (int)Math.Ceiling((double)totalItems / MaxItemsPerWorker) + 1;
```

This meant we always had an idle container running with 0 items assigned. At small scale that's fine, but it's wasted cost for no benefit when you have plenty of remaining capacity. The 10% threshold approach only adds the buffer when you actually need it.

### Scaling Metrics Should Be Fast

KEDA polls this endpoint frequently (multiple times per minute in our setup). The endpoint needs to respond quickly. We back our event tracking with **Redis**, so the count lookup is a fast key operation, not a database query.

### Protect Your Metrics Endpoint

This is easy to overlook. The scaling endpoint returns operational details about your infrastructure -- how many items, how many containers, capacity utilization. Put an access key on it from day one. If you're already using [ASP.NET Core health checks](/monitoring-aspnet-core-application-health-with-health-checks) for your services, treat your scaling endpoint with the same level of care.

### Log the Scaling Decisions

Include `remainingCapacity` and `bufferActive` in your response and logs. When something scales unexpectedly, you want to see *why* KEDA asked for that many instances without having to reverse-engineer the math.

## When to Use This Pattern

This pattern works well when:

- Your scaling factor is a **business metric**, not an infrastructure metric
- The metric is **known ahead of time** (not reactive like CPU)
- You need **precise control** over replica counts
- Built-in KEDA scalers don't understand your workload shape

It's overkill if a simple queue-length or CPU scaler gets you close enough. But when your orchestrator *knows* exactly how many workers it needs, this gives you direct control over the scaling decision. If you're running long-lived background processes like these, you might also find my guide on [building Windows services in .NET](/building-window-services-in-dotnet) useful for understanding the hosted service patterns we use inside these containers.

## Further Reading

- [Set scaling rules in Azure Container Apps](https://learn.microsoft.com/en-us/azure/container-apps/scale-app?WT.mc_id=DOP-MVP-4029061) -- Microsoft's documentation on configuring custom scale rules, including KEDA-based scalers.
- [KEDA Metrics API Scaler](https://keda.sh/docs/latest/scalers/metrics-api/) -- The official KEDA documentation for the metrics API trigger used in this post.
- [KEDA External Scalers](https://keda.sh/docs/latest/concepts/external-scalers/) -- If you need even more control than an HTTP endpoint, KEDA supports full gRPC-based external scalers.
- [Scaling in Azure Container Apps](https://learn.microsoft.com/en-us/azure/container-apps/tutorial-scaling?WT.mc_id=DOP-MVP-4029061) -- Microsoft's tutorial on scaling Container Apps, covering HTTP, TCP, and custom rules.

If you've hit a similar wall with KEDA's built-in scalers, or you've found a different approach that works for your workload, I'd love to hear about it. Let's continue this conversation on [X](https://x.com/1kevgriff), [BlueSky](https://bsky.app/profile/consultwithgriff.com), or [LinkedIn](https://www.linkedin.com/in/1kevgriff/).
