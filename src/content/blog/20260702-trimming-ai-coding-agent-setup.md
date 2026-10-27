---
title: "Your AI Coding Agent Is Carrying Too Much. Here's How I Trimmed Mine."
date: 2026-07-02T00:00:00Z
permalink: trimming-ai-coding-agent-setup
description: "My AI coding setup had quietly ballooned to 311 MCP tools and a global config that loaded everything into every session. Here's how I audited it and what I cut."
summary: "Your agent's context isn't free. I trimmed my Claude Code setup from 311 tools to 168, moved my always-on docs behind on-demand skills, and audited every plugin. Here's the playbook."
excerpt: "The day I realized my AI coding agent was hauling around a backpack full of tools and context it never used — and what I did about it."
tags:
  - ai
  - claude
  - claude-code
  - developer-tools
  - productivity
categories:
  - Development
---

> **A note on how this article came to be:** I wrote this one with Claude, right after I used Claude to audit my own Claude setup. Very meta, I know. The setup is mine, the numbers are real, and the embarrassing parts really happened. The AI just helped me get it onto the page.

I watched a video the other day — a walkthrough of somebody's "agentic engineering" workflow, the whole captain-and-crew-of-agents thing. Slick setup. And about ten minutes in, I got that uncomfortable feeling. You know the one. Where you're nodding along and simultaneously realizing the thing on screen is quietly roasting you.

Because my setup? My setup had gotten *fat*.

Not on purpose. That's the thing. Nobody sits down and decides to bloat their AI coding agent. It happens the way a junk drawer happens — one useful thing at a time, and then one day you can't find the scissors. So I spent an afternoon auditing the whole thing. Here's what I found, what I cut, and the rules I'm using now so it doesn't happen again.

## Everything you load, you pay for. Every single time.

Here's the lesson that reframed all the others: **the context your agent loads on startup isn't free.** It's not a one-time setup cost. It gets loaded into the model's context on *every single request*, whether the task needs it or not.

I had a global config file — the one that applies to every repo I open — that dutifully imported my proxy docs, my captcha service notes, my project credentials for two different clients, and a full C#/.NET best-practices reference. Into every session. So when I asked the agent to rename a variable, it was also silently hauling along everything it knows about residential proxy rotation.

That's ridiculous. And I did it to myself.

The fix is a concept Anthropic calls *progressive disclosure*, and skills are how you get it. Instead of jamming a domain doc into the always-on context, you wrap it in a skill. The agent only sees a one-line description of what the skill does — and it only reads the full thing when a task actually calls for it.

So I pulled seven chunks of conditional knowledge out of my global config and turned each into a skill: my two client projects, the .NET conventions, the web-scraping stack, my CLI tool catalog, the Markdown rules, the JSON rules. Best guess, that moved somewhere between 15,000 and 20,000 tokens off my always-on context. Every request, every repo, all day.

Here's the rule I use now: **if a piece of context is only useful for *some* tasks, it does not belong in your global memory file.** It belongs behind a skill.

## MCP servers aren't free tools. They're a tax.

Let's talk about MCP servers, because this is where I got the real bill.

I run a Docker-based MCP gateway that bundles a pile of servers together. Convenient. I'd been adding to it for months. When I finally counted, it was exposing **311 tools**. Three hundred and eleven. Every one of those tool definitions is schema the model has to reason about, and a lot of them I hadn't touched in my entire life.

Worse — some of them were straight-up redundant. I had the GitHub MCP server enabled, and I use the `gh` CLI constantly. Turns out that's not a wash. Benchmarks put the GitHub MCP server at roughly **3x the token cost and more than 2x the latency** of just calling `gh` for the same task. I was paying a premium to do something I already had a faster, cheaper way to do.

So I went server by server. Here's how it shook out:

| Kept | Cut |
|------|-----|
| Jira (I live in it) | GitHub server (I use `gh`) |
| Azure | Browser automation (had two other ways) |
| Context7 (library docs) | A design-docs server for a framework I don't use |
| Fetch, time, and a couple I actually use | A voice/TTS server I'd never called |
| | A social server, a video-transcript server |

Fourteen servers down to eight. **311 tools down to 168.** I cut 143 tools I was carrying around for nothing.

The rule: **when a CLI and an MCP server do the same job, reach for the CLI.** MCP is for the things that have no good command-line equivalent. Everything else is overhead you're paying on every call.

## Popular does not mean good

While I was in there, I audited my plugins too — 18 of them.

Here's a trap worth naming out loud: on GitHub, stars measure *popularity*, not *quality*. It is entirely possible for a skill with tens of thousands of stars to make your agent perform *worse* while using *more* tokens. Popular means a lot of people found it and shared it. It does not mean somebody rigorously proved it helps.

I'm not immune to this. I had plugins installed for a mobile framework I don't build in, a GraphQL stack I don't use, and a machine-learning toolchain that made sense the week I installed it and never again. None of it was load-bearing. All of it was surface area.

Four plugins came off. Fourteen stayed. And two things to keep in mind here, because this one's not just about tokens:

> **Heads up:** every skill or plugin you install can instruct your agent to run things on your machine. A random one from the internet is a security decision, not just a convenience. Vet before you enable — especially anything promising to *magically* make your agent smarter with no evidence behind the claim.

## The setting you never approved

Now for the part where I found something I wasn't even looking for.

One of my client repos was prompting me about a Figma integration every time I opened my agent in it. Every time. I'd been swatting it away for weeks like a mosquito.

Turns out a teammate had committed a project-level config that declared a Figma MCP server. My agent, very reasonably, kept asking, "Hey, do you want to approve this server?" — and because I'd never actually said yes *or* no, it just... kept asking. Forever. The prompt was a decision I'd never recorded.

But here's the part that made me sit up. While I was in that repo's config, I found a *second* MCP config with a hardcoded production API token sitting in it. In plaintext.

Now, the good news — it was correctly gitignored, so it had never left the machine. Crisis averted. But it's a hard reminder: **your project config files can hold secrets and servers you've completely forgotten about.** When did you last actually read the `.mcp.json`, `.vscode/mcp.json`, or agent config committed to your repos? Ask me how I know that's worth doing.

## Treat your setup like a system, not a junk drawer

If there's one thing to take from all of this, it's a mindset shift.

Your AI coding agent isn't a toy you configure once and forget. It's a system. And like any system, it accumulates cruft, drifts from its original intent, and quietly gets slower and more expensive if nobody maintains it. The person who maintains it is you.

You don't need to do what I did all at once. But the next time you open your agent, ask yourself three questions:

- What's in my global config that only matters for *some* tasks? (Move it behind a skill.)
- How many tools am I loading that I never call? (Count them. You'll be surprised.)
- What did I install because it was popular, not because I proved it helps?

That's it. That's the whole audit. It cost me an afternoon and made every session after it leaner, faster, and cheaper.

I've been leaning hard into working *with* AI this year — I even let Claude do most of the heavy lifting on [my Microsoft MVP renewal application](/how-claude-helped-with-my-mvp-application), which was its own kind of eye-opening. And if you want to hear me and a few other folks argue about where AI in development is actually headed, I got into it on [the Fervent Four podcast](/fervent-four-podcast-tech-communities).

Have you looked at your own setup lately? I'd genuinely love to know what you find in your junk drawer. Hit me up on X, Bluesky, or LinkedIn — I'm easy to find.
