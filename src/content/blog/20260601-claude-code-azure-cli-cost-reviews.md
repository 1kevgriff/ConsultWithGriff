---
title: "Azure Cost Management with Claude Code"
date: 2026-06-01T00:00:00Z
permalink: claude-code-azure-cli-cost-reviews
description: 'How letting Claude Code call the Azure CLI directly turned my monthly cost review from a spreadsheet slog into a real-time conversation — and how I hit Azure Cost Management API rate limits along the way.'
summary: 'Monthly Azure cost reviews used to mean exporting CSVs and squinting at pivot tables. Now I let Claude Code call the Azure CLI directly, ask follow-up questions in plain English, and watch it pivot from "what spent the most last month" to "find me five-figure savings" in the same session. This article walks through a real cost review session — including the Azure Cost Management API rate limits I hit, the headers Azure exposes to tell you exactly how to back off, and why having an AI that can read those headers in real-time changes the workflow.'
excerpt: 'Cost reviews used to mean CSVs and pivot tables. Now I let Claude talk to the Azure CLI directly, hit rate limits, read the response headers, and pivot the conversation in real-time.'
tags:
  - Azure
  - Cloud Costs
  - FinOps
  - Claude Code
  - AI
categories:
  - Azure
  - AI
---

I'll be honest: monthly cloud cost reviews used to be my least favorite recurring meeting with myself.

Export the invoice CSV. Pivot it in Excel. Try to remember which resource group belongs to which client. Cross-reference the Azure Cost Management blade. Realize the numbers don't quite tie out. Curse. Start over.

Then I gave Claude Code an Azure CLI session, and the whole workflow flipped.

## The Setup

I run a few Azure subscriptions for clients and for my own SaaS products. The total bill isn't massive — but it's big enough that I can't ignore it, and small enough that paying for a dedicated FinOps tool would defeat the purpose. The classic in-between zone where everybody loses interest.

My usual approach was to set aside an hour at the start of every month, open the Azure portal, click around the Cost Analysis blade, and try to remember what changed from last month.

The Cost Analysis blade is fine. It's not why I'm here. The problem was that any time I wanted to ask a slightly different question — "what did the SQL elastic pool cost vs. the standalone databases?", "show me containers that have grown more than 20% MoM" — I had to either filter manually or drop into the REST API and write a query body by hand.

That's friction. And friction is what kills good habits.

## Enter Claude Code

If you haven't used [Claude Code](https://docs.claude.com/en/docs/claude-code), the elevator pitch is this: it's Anthropic's CLI that gives Claude direct access to your shell, your files, and any tools you've authorized. It runs in your terminal, reads your repo, runs commands, and reads the output back.

The piece that matters for cost reviews: Claude can call `az` commands directly.

So instead of:

> "Let me go pull the cost-by-service breakdown for May and paste it into Excel and..."

It's:

> "Pull my May cost breakdown by service, sorted highest to lowest."

And Claude fires off the `az rest --method post` against the Cost Management Query API, captures the JSON, parses it, and hands me a markdown table. In about ten seconds.

Here's what the call actually looks like under the hood. First, the query body — saved as a JSON file because the Cost Management API wants a structured payload, not query-string params:

```json
{
  "type": "Usage",
  "timeframe": "Custom",
  "timePeriod": {
    "from": "2026-05-01T00:00:00+00:00",
    "to":   "2026-06-01T00:00:00+00:00"
  },
  "dataset": {
    "granularity": "None",
    "aggregation": {
      "totalCost": { "name": "Cost", "function": "Sum" }
    },
    "grouping": [
      { "type": "Dimension", "name": "ServiceName" }
    ]
  }
}
```

Then the actual `az` call:

```powershell
az rest --method post `
  --url "https://management.azure.com/subscriptions/<sub-id>/providers/Microsoft.CostManagement/query?api-version=2024-08-01" `
  --headers "Content-Type=application/json" `
  --body @cost-by-service.json
```

The catch I tripped on the first time: leaving off `Content-Type=application/json` gets you a 415 Unsupported Media Type, because `az rest` defaults to `application/octet-stream` when you pass a body file. Easy fix once you see the error. Annoying when you don't.

The follow-up questions are where it gets fun:

- "Now show me which resources are inside that top service."
- "What's the daily trend look like for that one?"
- "Are any of these in subscriptions we forgot about?"
- "Find me $5K of savings I haven't already implemented."

Each question gets translated into the right Cost Management or ARM query. I never write the query body. I never look up the API version. I just ask.

## How I Almost Got Throttled Into Oblivion

But — and there's always a but — Azure has rate limits on the Cost Management Query API. And they're tighter than you'd think.

About 30 minutes into a review session this morning, Claude came back with this:

```
ERROR: Too Many Requests({"error":{"code":"429","message":"Too many requests. Please retry."}})
```

So Claude did exactly what I'd do: it tried again. And got another 429. And another. We were stuck.

This is where the workflow really showed its value. Instead of me having to Google around and figure out what limit I'd hit, I just said:

> "Can we research rate limits on this endpoint?"

Claude searched [Microsoft Learn](https://learn.microsoft.com/azure/cost-management-billing/costs/manage-automation?WT.mc_id=DOP-MVP-4029061#data-latency-and-rate-limits), pulled the relevant page, and explained it back to me in plain English.

## What I Learned About Azure Cost Management Limits

It turns out the Cost Management Query API meters you on something called **Query Processing Units (QPU)**. One QPU is roughly one month of data queried. The quotas are per Microsoft Entra ID (formerly Azure AD) tenant — so every script, every portal user, every automation in your tenant shares the same pool.

| Window     | QPU Limit |
|------------|-----------|
| 10 seconds | 12        |
| 1 minute   | 60        |
| 1 hour     | 600       |

If you blow through any of those buckets, you get a 429. Simple.

But here's the part nobody talks about: there's a *second* limit beyond QPU. There's a per-client-type bucket that limits how many requests a particular SDK or tool can fire, independent of QPU cost. That's actually the one I was hitting. Not the QPU pool — that was barely touched. The client-type request bucket, fully exhausted.

You only learn this by reading the response headers:

| Header | What It Tells You |
|--------|-------------------|
| `x-ms-ratelimit-microsoft.costmanagement-qpu-consumed` | What this call cost in QPU |
| `x-ms-ratelimit-microsoft.costmanagement-qpu-remaining` | What's left in each window |
| `x-ms-ratelimit-microsoft.costmanagement-qpu-retry-after` | Seconds to wait when QPU is the bottleneck |
| `x-ms-ratelimit-microsoft.costmanagement-clienttype-retry-after` | Seconds to wait when client-type is the bottleneck |
| `x-ms-ratelimit-remaining-microsoft.costmanagement-clienttype-requests` | What's left in your client-type bucket |

A heads-up worth its own paragraph: as of this writing, only the three `qpu-*` headers are in the [official rate-limit docs](https://learn.microsoft.com/azure/cost-management-billing/costs/manage-automation?WT.mc_id=DOP-MVP-4029061#data-latency-and-rate-limits). The `clienttype-*` headers show up in actual API responses, but they aren't formally documented — so if you go to verify them, you won't find them on that page. Which is exactly the point: trust what the response returns, not just what the docs describe.

The headers literally tell you how long to back off. If you honor them, you stay healthy. If you ignore them and do `sleep 30` in a retry loop like I was, you keep hitting the wall.

> **The rule of thumb:** When you get a 429 from Cost Management, don't guess your backoff. Read the response headers and use the value Azure gives you. There may be multiple `*-retry-after` headers — take the maximum.

## The Fix

Claude rewrote my retry logic in PowerShell to read every retry-after header it could find — the QPU one, the client-type one, and the standard `Retry-After` — take the max, and sleep exactly that long. Then re-tried. Worked first try.

The relevant chunk of the retry script:

```powershell
try {
    $resp = Invoke-WebRequest -Uri $uri -Method Post `
              -Headers $headers -Body $body -UseBasicParsing
    $resp.Content | Out-File -FilePath $OutPath -Encoding utf8
    exit 0
}
catch {
    $r = $_.Exception.Response
    if ([int]$r.StatusCode -eq 429) {
        # Collect every retry-after header Azure might send, take the max
        $candidates = @(
            $r.Headers['x-ms-ratelimit-microsoft.costmanagement-qpu-retry-after'],
            $r.Headers['x-ms-ratelimit-microsoft.costmanagement-clienttype-retry-after'],
            $r.Headers['Retry-After']
        ) | Where-Object { $_ }

        $retryAfter = ($candidates | ForEach-Object { [int]$_ } |
                       Measure-Object -Maximum).Maximum
        Start-Sleep -Seconds ($retryAfter + 2)
    }
}
```

The `+ 2` is a small cushion — Azure's clock and my clock don't always agree, and sleeping a tick longer than told is free insurance against an immediate re-throttle.

The code isn't the point. What's the point is the loop:

1. I asked Claude to pull a cost query.
2. Claude got a 429.
3. I asked Claude to research the rate limits.
4. Claude found the official docs, summarized them, and proposed a fix.
5. Claude wrote the fix.
6. I ran it. It worked.

That's a 90-second loop. In my old workflow, that would've been a 30-minute detour through Stack Overflow, Microsoft Learn, and three browser tabs of "azure cost management 429 retry" results.

## Why This Matters For Cost Reviews

Here's the bigger thing this experience hammered home:

Cost optimization isn't a one-pass exercise. It's a conversation. You look at the data, ask a question, get a partial answer, ask a sharper question, and slowly zero in on the things you can actually do something about.

Tools that make you context-switch — open the portal, open Excel, open the docs, open Stack Overflow — kill that conversation. By the time you've got the data in front of you, you've forgotten what you were looking for in the first place.

Claude Code keeps the conversation in one place. The data, the analysis, the docs lookups, the retry logic, the JIRA ticket draft for the fix — all in the same scrollback.

## What I'm Doing Now

A few things have stuck from this experiment:

1. **Monthly cost reviews are now conversations, not reports.** I open Claude Code, say "let's check costs," and we dig in until I'm satisfied.
2. **Findings turn into tickets immediately.** When Claude surfaces something — "this storage account is on GRS but the data isn't anywhere outside West US" — I have it draft the JIRA ticket right there.
3. **Memory across sessions.** Claude Code keeps notes between sessions, so it remembers things like "you already flipped this storage account to LRS three weeks ago" and doesn't propose it again.
4. **Real-time fact-checking.** When Claude tells me "this Reserved Instance would save $X/year," I ask it to verify against the Azure pricing calculator in the same session.

I'm not going to pretend this replaces a proper FinOps practice at scale. If you're spending six or seven figures on Azure, you need actual tooling and humans with FinOps in their job title. But for the consultant-sized cloud bill? This is the workflow I wish I'd had five years ago.

## A Few Practical Notes

If you want to try this:

- **Use a least-privilege identity.** Don't hand Claude Code an Owner-scoped key. The purpose-built **Cost Management Reader** role is enough for cost queries (plain subscription Reader works too, but it also grants read on every other resource type — more than you need here).
- **Be specific about scope.** Tell it which subscription, which resource group, which time window. Azure has a lot of data — narrow the question.
- **Verify expensive recommendations.** If Claude proposes deleting something, or buying a Reserved Instance, or changing storage tier — make it explain its reasoning and tie back to actual usage data before you act.
- **Watch your QPU budget.** Especially if you have other automation running in the same tenant. The 600/hour QPU pool sounds big until you have three cost dashboards refreshing every five minutes.

## The Easier Path I Skipped

Quick honest aside: I built this whole workflow with raw `az rest` calls and hand-rolled retry logic. That's how I learn the moving parts — get my hands on the headers, see the 429s, write the back-off myself.

But you don't have to. Microsoft maintains an official plugin called [Azure Skills](https://github.com/microsoft/azure-skills) that packages exactly this kind of capability:

- Curated Azure skills, including an `azure-cost` skill that handles the cost-review workflow I just walked through
- The **Azure MCP Server** — 200+ structured tools across 40+ Azure services
- **Foundry MCP** for Microsoft Foundry / AI scenarios

It runs in Claude Code, Copilot CLI, Cursor, Codex, Gemini, and IntelliJ. In Claude Code, installation is a one-liner:

```bash
/plugin install azure@claude-plugins-official
```

I didn't use it for this article. I wanted to feel the rate-limit headers myself and understand what was happening one layer down. But if you want the wins without the rope-burn — start there. It's a much shorter path to the same conversation-driven cost review I described above, and you get the skills for diagnostics, RBAC, compliance, and a dozen other Azure scenarios in the same install.

## The Takeaway

The thing that surprised me wasn't that Claude could call the Azure CLI. That's table stakes for any agentic CLI tool now.

The thing that surprised me was how much the *conversation* changes when the AI can act on the data it's looking at. I'm not asking it to write a report. I'm asking it to help me make decisions. And when it hits a rate limit, it doesn't just give up — it researches the limit, adapts the approach, and keeps going.

That's the loop I want for cost optimization. Look, ask, act, repeat. No more spreadsheets.

If you've been putting off your monthly cost review because the workflow is too painful, give this a shot. The setup cost is one evening. The payback is every month forward.

I'd love to hear how others are using Claude Code (or similar tools) for cloud cost work. Hit me up on [X](https://x.com/1kevgriff), [Bluesky](https://bsky.app/profile/consultwithgriff.com), or [LinkedIn](https://www.linkedin.com/in/1kevgriff/).

## Further Reading

- [Manage costs with automation — Data latency and rate limits](https://learn.microsoft.com/azure/cost-management-billing/costs/manage-automation?WT.mc_id=DOP-MVP-4029061#data-latency-and-rate-limits) — The official Microsoft docs on the QPU model and rate limit headers.
- [Cost Management Query API reference](https://learn.microsoft.com/rest/api/cost-management/query?WT.mc_id=DOP-MVP-4029061) — The REST endpoint Claude calls under the hood.
- [Claude Code documentation](https://docs.claude.com/en/docs/claude-code) — The CLI itself.
- [microsoft/azure-skills](https://github.com/microsoft/azure-skills) — Microsoft's official plugin that bundles Azure skills (including `azure-cost`), the Azure MCP Server, and Foundry MCP. The easier path I skipped.
- [My $8,000 Serverless Mistake](/my-8000-serverless-mistake) — A reminder of why I take cost reviews seriously in the first place.
