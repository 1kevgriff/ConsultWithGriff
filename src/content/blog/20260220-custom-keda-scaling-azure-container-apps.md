---
title: 'Custom KEDA Scaling with Azure Container Apps Using an HTTP Metrics Endpoint'
date: 2026-02-20T12:00:00Z
permalink: custom-keda-scaling-azure-container-apps
description: "How to build a custom HTTP scaling endpoint for KEDA in Azure Container Apps when built-in scalers don't fit your workload. A real-world example of scaling WebSocket monitoring containers based on business logic, not just CPU or queue depth."
summary: "How to build a custom HTTP scaling endpoint for KEDA in Azure Container Apps when built-in scalers don't fit your workload. A real-world example of scaling WebSocket monitoring containers based on business logic, not just CPU or queue depth."
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

At [Shows On Sale](https://www.showsonsale.com/), we run a fleet of WebSocket-based **SocketMonitor** containers that watch live ticket events in real time. Each container handles up to 300 events, and the number of active events shifts constantly throughout the day -- events go on sale, sell out, expire. It's never the same number twice.

When we moved this workload to **Azure Container Apps** (part of the same migration I wrote about in [my $8,000 serverless mistake](/my-8000-serverless-mistake)), the natural question was: how do we scale it?

I looked at every built-in KEDA scaler I could find, and none of them fit. CPU scaling is reactive -- by the time CPU spikes, we've already missed events. Queue-based scaling doesn't apply because we're not processing a backlog. Cron scaling is too rigid for something that fluctuates unpredictably.

What we actually needed was for KEDA to ask our system one simple question: *"How many containers do you need right now?"*

Turns out, you can do exactly that.

## Our Architecture

The setup is straightforward:

- An **Orchestrator** service tracks all active events and assigns them to SocketMonitor containers
- Each **SocketMonitor** handles up to 300 events via WebSocket connections
- Events are added and removed throughout the day as inventory changes

The Orchestrator already knows exactly how many events are active and how many containers that requires. We just needed a way to tell KEDA.

## The Solution: External HTTP Scaler

KEDA supports a [Metrics API scaler](https://keda.sh/docs/latest/scalers/metrics-api/) that polls an HTTP endpoint for a metric value. Azure Container Apps supports this through [custom scale rules](https://learn.microsoft.com/en-us/azure/container-apps/scale-app?WT.mc_id=DOP-MVP-4029061). The idea is simple:

1. Add an endpoint to the Orchestrator that returns the number of needed instances
2. Configure KEDA to poll that endpoint
3. KEDA scales the SocketMonitor deployment to match

### Step 1: The Metrics Endpoint

Here's the endpoint in our Orchestrator's ASP.NET Core controller:

```csharp
[HttpGet("scaling-metrics")]
public async Task<ActionResult<object>> GetScalingMetrics()
{
    // Authenticate the request
    if (!ValidateAccessKey())
        return Unauthorized();

    var trackingStatus = await monitorTracker.GetTrackingStatusAsync();
    var totalEvents = (int)trackingStatus["TotalEvents"];

    const int MaxEventsPerMonitor = 300;
    var baseInstances = (int)Math.Ceiling((double)totalEvents / MaxEventsPerMonitor);

    // Only add a buffer instance when remaining capacity < 10%
    var remainingCapacity = (baseInstances * MaxEventsPerMonitor) - totalEvents;
    var bufferThreshold = (int)(MaxEventsPerMonitor * 0.10);
    var needsBuffer = remainingCapacity < bufferThreshold;
    var neededInstances = Math.Max(1, needsBuffer ? baseInstances + 1 : baseInstances);

    return Ok(new
    {
        neededInstances,
        totalEvents,
        maxEventsPerMonitor = MaxEventsPerMonitor,
        remainingCapacity,
        bufferActive = needsBuffer,
        timestamp = DateTime.UtcNow
    });
}
```

The logic is straightforward: divide total events by the max per container, round up, and optionally add a buffer when we're nearly full. With 1,800 events and 300 per monitor, that's `ceil(1800/300) = 6` instances. If we had 1,795 events (only 5 slots remaining, well under the 30-slot threshold), it would bump to 7.

The buffer prevents a situation where a burst of new events arrives and we have to wait for KEDA's next polling cycle to scale up.

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
      "scalerAddress": "https://your-orchestrator.azurecontainerapps.io/api/monitor/scaling-metrics?access_key=your-key",
      "targetValue": "1"
    }
  }
}
```

The `targetValue` of `1` means KEDA will set the replica count equal to the `neededInstances` value returned by the endpoint. KEDA polls this endpoint on its configured interval (default: 30 seconds) and adjusts the replica count to match.

## What the Response Looks Like in Practice

```json
{
  "neededInstances": 7,
  "totalEvents": 1827,
  "maxEventsPerMonitor": 300,
  "remainingCapacity": 273,
  "bufferActive": false,
  "timestamp": "2026-02-20T15:00:00Z"
}
```

KEDA reads `neededInstances` and scales the SocketMonitor Container App to 7 replicas. If 200 new events come in and `neededInstances` bumps to 8, KEDA scales up on the next poll. If events expire overnight and we only need 5, it scales down.

## Lessons Learned

### The +1 Buffer Trap

Our first implementation always added a +1 buffer instance:

```csharp
// Old approach: always +1
var neededInstances = (int)Math.Ceiling((double)totalEvents / MaxEventsPerMonitor) + 1;
```

This meant we always had an idle container running with 0 events assigned. At small scale that's fine, but it's wasted cost for no benefit when you have plenty of remaining capacity. The 10% threshold approach only adds the buffer when you actually need it.

### Scaling Metrics Should Be Fast

KEDA polls this endpoint frequently (multiple times per minute in our setup). The endpoint needs to respond quickly. We back our event tracking with **Redis**, so `GetTrackingStatusAsync()` is a fast key count operation, not a database query.

### Protect Your Metrics Endpoint

This is easy to overlook. The scaling endpoint returns operational details about your infrastructure -- how many events, how many containers, capacity utilization. Put an access key on it from day one. If you're already using [ASP.NET Core health checks](/monitoring-aspnet-core-application-health-with-health-checks) for your services, treat your scaling endpoint with the same level of care.

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
