---
title: '.NET Conf 2026 Day 1: .NET 11, C# 15 Unions, and Faster Builds'
date: 2026-11-17T00:00:00Z
permalink: dotnet-conf-2026-day-1-recap
description: 'A recap of .NET Conf 2026 Day 1: .NET 11 GA, C# 15 unions, faster CLI and builds, runtime async, ASP.NET Core and Blazor updates, MAUI on CoreCLR, and Aspire 17.'
summary: 'Everything that stood out from Day 1 of .NET Conf 2026, from the .NET 11 launch and C# 15 unions to build speedups, runtime async, MAUI, Aspire, and the security numbers, with links to jump into the replay.'
tags:
  - dotnet
  - csharp
  - dotnet-conf
  - aspnetcore
  - aspire
  - maui
categories:
  - Conferences
  - Development
---

.NET 11 shipped on Tuesday. If you missed the .NET Conf 2026 live stream because you had actual work to do, you're in good company. So did I.

I had an agent watching the stream for me all day (I wrote up [how I livetweeted .NET Conf without watching all of it](/how-i-livetweeted-dotnet-conf-without-watching-it)), and it left me with hours of notes and screenshots. This article is the cleaned-up version of Day 1: what shipped, what's still in preview, and which numbers came with fine print.

> These notes come from AI transcription of the live stream plus screenshots of what was on screen. I've kept every number tied to the benchmark or demo it came from. If a speaker walked something back later in the session, the correction is what you'll read here.

## The short version

- **.NET 11 is GA.** C# 15 brings unions, closed hierarchies, collection expression arguments, labeled `break` and `continue`, and extension indexers.
- **The tooling got faster.** The keynote showed 66% to 75% faster startup for selected CLI commands. C# Dev Kit's BuildX took a single-change build of the Aspire repo from 36.1 seconds to 2.1 seconds.
- **Runtime async is opt-in.** The synchronous-completion benchmark allocated 0 bytes per operation, compared with 216 to 504 bytes for the compiler-generated state machines.
- **ASP.NET Core got header-based CSRF protection** that showed roughly 4x the form-post throughput of token validation.
- **MAUI moved to CoreCLR** on every supported platform. Android Native AOT is still experimental.
- **Aspire keeps going beyond C#.** TypeScript AppHosts are GA, and Go is in preview for Aspire 17.
- **Security research exploded.** [Barry Dorrans](https://x.com/blowdart) reported 2,622 MSRC cases and 97 CVEs for 2026. In 2025, it was 84 cases and 12 CVEs.

![The .NET 11 release announcement from the .NET Conf 2026 keynote](/images/20261117-dotnetconf-net11-ga.jpg)

## C# 15 unions

In _What's new in C#_, [Mads Torgersen](https://x.com/MadsTorgersen) and Dustin Campbell showed what unions change in ordinary code.

They started with a `List<object>` holding unrelated types. You know the pattern. Every switch over it needs a catch-all arm, because the compiler has no idea what could be in there. Swap that for a union, and the compiler knows the full set of possible types. Now it can tell you when your switch misses a case.

![Visual Studio showing a C# 15 union of Dog, Cat, and Bird, with the compiler flagging a Shark case that isn't part of the union](/images/20261117-dotnetconf-csharp-unions.jpg)

A few details worth knowing:

- The cases can be types from libraries you don't own. They don't need a shared base class.
- The compiler generates a struct for the union. You can also implement the union pattern yourself, including storage that avoids boxing value types.
- **Closed hierarchies** solve the same problem for inheritance. A public `closed` class only allows direct inheritance inside its own assembly, so the compiler can check your switches for exhaustiveness.

The session also covered collection expression arguments (handy for passing comparers), labeled loop exits, and extension indexers. If you liked [C# 14 extension members](/csharp-14-extension-members), extension indexers fill in the next obvious gap. The new memory safety rules were shown separately as a preview.

## Faster CLI, faster loads, faster builds

A lot of Day 1 was about making the inner loop shorter.

[Chet Husk](https://x.com/ChetHusk)'s _Moving dotnet Ahead (of Time)!_ walked through compiling the CLI with Native AOT. On his macOS arm64 machine, `dotnet --version` dropped from about 118 ms to 33 ms. `dotnet tool list --local` dropped from 121 ms to 32 ms.

![Bar chart of managed versus Native AOT timings for dotnet --version, dotnet tool list --local, and dotnet user-secrets list on macOS arm64](/images/20261117-dotnetconf-cli-aot.jpg)

It isn't free. Moving tool-command resolution into AOT added 2.19 MiB to the SDK while saving roughly 100 ms per tool execution. The team offset that with SDK-wide deduplication that saved 53 MB in the compressed Linux x64 SDK.

In _C# Dev Kit 11_, [Drew Noakes](https://x.com/drewnoakes) and Emanuel Fernandez Dell'Oca showed shared project caches and a build system that knows the difference between rebuilding a project, copying its outputs, and skipping it entirely. Warm workspace loads for the Roslyn repo went from 89.0 seconds to 15.9 seconds. Aspire went from 87.9 to 19.9.

![C# Dev Kit 11 warm workspace load times for Orleans, Roslyn, and Aspire, showing about 77% faster loads](/images/20261117-dotnetconf-devkit-loads.jpg)

On the 407-project Aspire solution, BuildX cut a single-change build from 36.1 seconds to 2.1 seconds, and a no-change build from 34.4 seconds to 0.9 seconds. Those are medians of five runs on the session's Windows machine. With the shared cache, the IDE can reuse work that an agent or another build already did.

Husk came back later for _More Processes, More Problems: Multithreaded MSBuild_. The `-mt` switch cuts process overhead and still works with existing tasks. Fair warning: the OrchardCore numbers in this session and the keynote came from different machines, so they don't match.

| OrchardCore benchmark  | Keynote, Windows          | MSBuild session, Windows      | MSBuild session, Linux       |
| ---------------------- | ------------------------- | ----------------------------- | ---------------------------- |
| Cold full build        | 104.7 to 92.4 s, 12% less | 116.05 to 88.74 s, 23.5% less | 96.15 to 84.74 s, 11.9% less |
| Warm incremental build | 28.4 to 17.9 s, 37% less  | 54.58 to 17.36 s, 68.2% less  | 25.47 to 22.13 s, 13.1% less |

Multithreaded builds are still opt-in. The team is targeting SDK 11.0.200 to make them the default.

![Multithreaded MSBuild warm incremental build results from the dedicated session](/images/20261117-dotnetconf-msbuild-mt.jpg)

## ASP.NET Core and Blazor

[Daniel Roth](https://x.com/danroth27)'s _Modern web development with ASP.NET Core & Blazor in .NET 11_ opened with header-based CSRF protection. It uses the Fetch Metadata headers browsers already send, with an `Origin` header fallback. Compared with token validation, the slide showed about 4x the form-post throughput and 65% less allocation. Your existing antiforgery middleware still works alongside it.

![ASP.NET Core header-based CSRF protection benchmark compared with token validation](/images/20261117-dotnetconf-csrf.jpg)

SignalR can now refresh authentication without reconnecting. In the Blazor demo, revoking a permission updated an open page and kept everything the user had typed. One caveat Roth made sure to call out: the refresh runs on an interval near token expiration. The demo used a short interval. Permission changes aren't pushed to the client the instant they happen.

C# unions showed up again, this time in API contracts. System.Text.Json serializes the active case, and OpenAPI 3.2 describes the options with `anyOf`. Shared async validation runs in both Blazor forms and Minimal APIs. And a WebAssembly demo moved CPU-heavy work to a .NET Web Worker so the UI stayed responsive.

Roth also shared production numbers from MSN: 29% lower P95 GC pauses, 11% lower async plugin latency, and 20% shorter thread-pool queues. Those came from moving .NET 8 to .NET 10, so they're about the upgrade path in general and not .NET 11 specifically.

## WinForms and MAUI

The WinForms post was my most-viewed post of the conference.

[Klaus Löffelmann](https://x.com/loeffelmann) demoed the new .NET 11 visual styles mode on existing controls. The app picked up the Windows accent color, honored text-size settings, supported dark mode and toggle switches, and used a form-reveal setting to kill the white flash on startup. There are also new designer analyzers that give coding agents diagnostics to fix designer code they generate.

![A WinForms customer entry form using the new .NET 11 visual styles mode with dark mode and toggle switches](/images/20261117-dotnetconf-winforms.jpg)

[Gerald Versluis](https://x.com/jfversluis)'s _What's New in .NET MAUI in .NET 11_ covered the move to CoreCLR on Android, iOS, Mac Catalyst, and Windows. XAML source generation is on by default. C# expressions in XAML cover a lot of cases where you used to write a converter. And an Avalonia backend adds Linux and WebAssembly targets in preview.

The keynote led with "2.4x faster Native AOT startup." The dedicated session had the device-level details. On a Pixel 5 running Android 14, the BaristaNotes sample started in a median of 973.5 ms with full ReadyToRun and 280.0 ms with Native AOT. That was a .NET 11 RC2 benchmark with 1,000 drinks and 30 launches per configuration. On an iPhone 15 Pro, it was 490 ms versus 322 ms. Remember that Android Native AOT is still experimental.

![.NET MAUI Android startup and package size measurements for the BaristaNotes sample](/images/20261117-dotnetconf-maui-startup.jpg)

[Jonathan Peppers](https://x.com/JonathanPeppers) closed the day with _Bringing dotnet run, test, and watch to .NET MAUI_. Pick a device, and `dotnet run` installs the app, launches it, and streams the logs. Hot Reload runs over WebSockets. New Android and iOS test templates run tests on the device through Microsoft.Testing.Platform. A cross-platform `mauitest` template is coming from the experimental MAUI Labs work.

![Slide showing the dotnet new androidtest and iostest platform test templates, with mauitest coming from MAUI Labs](/images/20261117-dotnetconf-maui-tests.jpg)

## AI in the app and in the tools

[Luis Quintanilla](https://x.com/ljquintanilla)'s _.NET AI Stack_ session used a media-production app to cover model calls, document extraction, speech, image generation, and agent-driven UI. The official OpenAI and Anthropic SDK integrations both expose `IChatClient`, and a new `RoutingChatClient` picks the model for each request based on policy.

![The .NET AI stack map: experiences, agents and tools, multimodal, context, and models, with cloud and local providers](/images/20261117-dotnetconf-ai-stack.jpg)

The app mixed cloud and local providers. One example: an `IImageGenerator` implementation asked a chat model to write SVG and then rendered it to PNG. Microsoft Agent Framework handled orchestration, and AG-UI plus the experimental Blazor AI components connected the agent to editable app state.

[Wendy Breiding](https://x.com/wendybreiding)'s _Beyond Autocomplete_ chased a duplicate purchase-order bug across a WinForms UI in Visual Studio, an ASP.NET Core API in VS Code, and a reporting task in the Copilot app. The agents passed a handoff document between them, and .NET skills supplied task-specific guidance. NuGet packages can also ship skills that come down during restore.

The skills evaluation dashboard was the most-saved post I made all week. It reports results per model, including the inconclusive ones. The C# expert skill with Claude Sonnet 5 used 41% fewer tokens and finished 73% faster, for that model and that skill. Don't read it as a blanket claim about every model or task.

![The .NET skills evaluation dashboard comparing model results with and without the C# expert skill](/images/20261117-dotnetconf-skills-eval.jpg)

## Aspire 17

In _What's New in Aspire for .NET Developers_, [Maddy Montaquila](https://x.com/maddymontaquila) and [Damian Edwards](https://x.com/DamianEdwards) previewed Aspire 17, due the following week. AppHosts become plain `Microsoft.NET.Sdk` projects, so upgrading is a package bump. Project references by path let the dashboard start without waiting on the full MSBuild graph. And you can attach a debugger to an app that's already running.

![Aspire 17 changes: plain .NET project AppHosts, projects by path, NuGet setup as is, and attach to running apps](/images/20261117-dotnetconf-aspire-17.jpg)

Montaquila and Jose Perez Rodriguez came back later to explain how Aspire supports other AppHost languages. Exported C# APIs produce a shared contract and generated guest SDKs, and the calls run against a .NET host over JSON-RPC. TypeScript is GA. Go is in preview for Aspire 17. Python, Java, and Rust are behind feature flags.

They ran a TypeScript AppHost with Node and Vite apps on a fresh WSL install with no .NET SDK installed. The dashboard was a custom Blazor build compiled with Native AOT: startup went from 1,429 ms to 491 ms, and deployment size (runtime included) dropped from 183 MB to 110 MB. That was a custom build done with the Blazor team. Don't go expecting your Blazor Server app to compile with Native AOT just yet.

![Aspire dashboard Native AOT results: 491 ms startup versus 1,429 ms, and 110 MB versus 183 MB deployment size](/images/20261117-dotnetconf-aspire-aot.jpg)

## Runtime async, memory safety, and numerics

[Andy Gocke](https://bsky.app/profile/agocke.bsky.social) and [Richard Lander](https://x.com/runfaster2000)'s _.NET Runtime vNext_ explained the runtime async opt-in. You write the same C# async code, and the runtime handles the work that used to live in compiler-generated state machines. The team expects it to become the default in .NET 12.

In the synchronous-completion benchmark, going from three to seven async frames gave speedups of 1.06x to 1.13x. Allocations dropped from 216 to 504 bytes per operation down to zero. An eight-frame exception benchmark showed 2.5x faster handling without suspension and 3.4x faster with suspension.

![Runtime async versus state machines at 3, 5, and 7 async frames, showing 1.06x to 1.13x faster](/images/20261117-dotnetconf-runtime-async.jpg)

Memory safety rules v2 are a preview in .NET 11, with GA expected in .NET 12. They make unsafe contracts explicit at the call site. Lander turned them on in his own project and found unnecessary unsafe code that an AI agent had added.

[Tanner Gooding](https://x.com/tannergooding)'s _.NET 11 Numerics_ introduced IEEE 754 decimal floating-point types: `Decimal32`, `Decimal64`, and `Decimal128`, with 7, 16, and 34 significant digits. Generic `Complex<T>` lets you pick the numeric representation. Tensor optimizations produced some big wins on specific operations. The dense float Add benchmark went from 16.37 microseconds to 0.114 microseconds.

![Slide showing Decimal32, Decimal64, and Decimal128 with 7, 16, and 34 significant digits](/images/20261117-dotnetconf-decimal.jpg)

## Security

Barry Dorrans's _2 Secure 2 Curmudgeonly_ reported a sharp increase. MSRC cases went from 84 to 2,622. CVEs went from 12 to 97. Bounties went from $635,500 to $1,012,500. Dorrans credited the jump to researchers using AI to dig through existing code.

![Slide comparing 2026 and 2025 MSRC cases and CVEs](/images/20261117-dotnetconf-msrc.jpg)

The examples were specific implementation bugs: repeated certificate construction, missing validation at native-code boundaries, bad assumptions about span APIs, and malformed HTTP/2 input. In one case, a 117 KB SignedCms message triggered about 160,000 certificate constructions. The fix parses it once.

Jeremy Barton's _Post-Quantum Cryptography with .NET 11_ covered Composite ML-KEM (ML-KEM paired with a traditional algorithm, so an attacker has to break both) and HPKE support under RFC 9180. More ML-KEM integration with HPKE and Composite ML-KEM in EnvelopedCms are planned for .NET 11 servicing.

![Slide explaining Composite ML-KEM](/images/20261117-dotnetconf-ml-kem.jpg)

## Session replays

Times are the scheduled ET times. Each session title links to the start of that session in the Day 1 replay.

| Time (ET) | Session                                                                                    | Speakers                                |
| --------- | ------------------------------------------------------------------------------------------ | --------------------------------------- |
| 12:00 PM  | [C# 15 unions and closed hierarchies](https://www.youtube.com/watch?v=SIBdHRrk8os&t=4165s) | Mads Torgersen, Dustin Campbell         |
| 12:30 PM  | [ASP.NET Core and Blazor](https://www.youtube.com/watch?v=SIBdHRrk8os&t=5965s)             | Daniel Roth                             |
| 2:00 PM   | [The .NET AI Stack](https://www.youtube.com/watch?v=SIBdHRrk8os&t=11425s)                  | Luis Quintanilla                        |
| 3:00 PM   | [C# Dev Kit 11](https://www.youtube.com/watch?v=SIBdHRrk8os&t=15025s)                      | Drew Noakes, Emanuel Fernandez Dell'Oca |
| 3:30 PM   | [Multithreaded MSBuild](https://www.youtube.com/watch?v=SIBdHRrk8os&t=16825s)              | Chet Husk                               |
| 6:00 PM   | [Aspire's language support](https://www.youtube.com/watch?v=SIBdHRrk8os&t=25825s)          | Maddy Montaquila, Jose Perez Rodriguez  |
| 6:30 PM   | [Runtime async and memory safety](https://www.youtube.com/watch?v=SIBdHRrk8os&t=27685s)    | Richard Lander, Andy Gocke              |
| 7:30 PM   | [MAUI run, test, and watch](https://www.youtube.com/watch?v=SIBdHRrk8os&t=31165s)          | Jonathan Peppers                        |

## What caught your eye?

Day 2 was all about Visual Studio, Blazor resilience, and AI workflows. Read my [.NET Conf 2026 Day 2 recap](/dotnet-conf-2026-day-2-recap) next.

What are you most excited to try in .NET 11? Hit me up on [X](https://x.com/1kevgriff), [Bluesky](https://bsky.app/profile/consultwithgriff.com), or [LinkedIn](https://www.linkedin.com/in/1kevgriff/).
