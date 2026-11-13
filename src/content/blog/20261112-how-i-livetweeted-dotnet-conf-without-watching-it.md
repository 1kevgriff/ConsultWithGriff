---
title: 'How I Livetweeted .NET Conf Without Watching It'
date: 2026-11-12T00:00:00Z
permalink: how-i-livetweeted-dotnet-conf-without-watching-it
description: 'How I posted live from all four days of .NET Conf 2026 to X, Bluesky, and Mastodon with yt-dlp, Whisper on a Mac mini, Claude Code, and Typefully, plus everything that broke.'
summary: 'I ran a pipeline that captured the .NET Conf 2026 stream in 2-minute chunks, transcribed it on a Mac mini, and had Claude Code write and schedule posts to X, Bluesky, and Mastodon. Here are the rules that kept it sounding like me and the failures that kept me busy.'
tags:
  - ai
  - claude
  - dotnet
  - developer-tools
  - productivity
categories:
  - Conferences
  - Developer Tools
---

<!-- TODO(Kevin): Draft. Day 4 was still running when this was written. Update the numbers table with Day 4 and confirm the date before publishing. -->

I posted live from all four days of .NET Conf 2026. Notes, screenshots, highlights, speaker tags. X, Bluesky, and Mastodon, all day, every day.

I watched about 2 to 3 hours of it. All of that was on Day 1, which ran about 9 hours. I haven't watched any of the rest. Across a four-day conference, that's mostly without watching it, and I'll take it.

<!-- TODO(Kevin): "haven't watched any of the rest" is true through Day 3. Confirm after Day 4. -->

.NET Conf ran November 10 through 13. Two Microsoft days, then two Community Days. I wanted coverage of the whole thing, and I didn't want to give up four workdays to get it. So I built a pipeline, handed the keyboard to Claude Code (Opus) in a terminal session, and went about my week. Claude wrote the posts. I set the rules and approved the scheduling.

Plenty of it broke along the way. Those failures are the fun part, so we'll get there.

## The pipeline

Here's the whole thing in one line:

```text
YouTube -> yt-dlp + ffmpeg -> 2-minute chunks -> Whisper on a Mac mini + screenshots -> Claude Code -> Typefully
```

And the pieces:

1. **Capture.** `yt-dlp` pulls the YouTube live stream. The `--wait-for-video` flag sits on the countdown until the show starts. `ffmpeg` cuts the stream into clock-aligned 2-minute chunks. I picked 2 minutes because I wanted "pseudo real-time." In practice the notes ran about 3 minutes behind live, which is close enough for social.
2. **Watcher.** A Python script (`tools/process.py`) picks up each finished chunk. It pulls the audio and ships it to a Mac mini running `mlx_whisper` for transcription. It grabs a screenshot when the frame changes (a 160x90 thumbnail diff with at least 15 seconds between shots). It joins chunks into hourly files. Then it logs `READY <chunk>`.
3. **Claude Code loop.** Claude watches the log for `READY` lines. For each chunk it reads the transcript and a contact sheet of that chunk's screenshots, and opens full-size frames when a slide has numbers on it. It writes per-hour notes, a highlights table, and a recap feed line. If the chunk has a real number, a demo, or a strong take, it writes a post.
4. **Posting.** Typefully, through its MCP server, schedules the post to X, Bluesky, and Mastodon with the screenshot attached. Every post also lands in a JSON queue file and a Solo scratchpad, so I can see what went out.
5. **End of day.** A wrap-up skill builds the hour files, a speaker screen-time table, YouTube chapter timestamps, a LinkedIn recap draft (I post that one myself), and a recap kit with highlights, images, and the full transcript.

After Day 1, I had Claude turn the process into four project skills: `conf-capture`, `conf-chunk`, `conf-post`, and `conf-wrapup`.

## The numbers

| | Day 1 | Day 2 | Day 3 |
|---|---|---|---|
| Posts queued | 53 | 71 | 31 |
| Screenshots | TODO(Kevin) | 957 | 1,068 |

<!-- TODO(Kevin): add the Day 4 column. Add engagement numbers here (Kevin supplies them 2026-11-13). -->

That's about 270 transcribed chunks a day, at 2 minutes each, and about 1,000 screenshots a day. The Day 3 highlights table hit 108 moments.

Day 3 dropped to 31 posts because the format changed (more on that below). The screen-time table for Day 3 had the host, Javier Lozano, at 1 hour 17 minutes. Each speaker got 28 to 33 minutes.

## The rules that kept it sounding like me

A bot posting under my name all day is a great way to embarrass myself. The rules were the whole point.

- **Hook first, one idea per post.** No feature dumps. One emoji, max.
- **No invented reactions.** Claude doesn't get to say "my favorite demo" or "I've wanted this for years." I didn't say those things. I wasn't watching!
- **Accuracy over speed.** If a later chunk adds a caveat, Claude edits the scheduled post before it goes out. This happened twice. A speaker made an auth refresh claim and later clarified it was "not real-time." Another showed an AOT size win that turned out to be offset by SDK dedup. Both posts got fixed before they fired.
- **Space them out.** Posts go out at least 5 minutes apart (give or take). Nobody wants 12 posts in a row from me.
- **Tag carefully.** Tag `@dotnet` (never `@dotnetconf`) and only verified speaker handles. Claude checked every speaker on X, Bluesky, and Mastodon, using Chrome automation plus the Bluesky and Mastodon public APIs. A weak match got the speaker's name and no tag.
- **No LinkedIn live posts.** LinkedIn gets one recap at the end of the day, and I post it.
- **Privacy check on every frame.** Demo screens are full of stuff that shouldn't be on social: user paths, subscription IDs, password vaults, repo names. Those frames got cropped or skipped. Slides with a "Microsoft Confidential" footer got cropped too.
- **Don't ask me questions during the stream.** Claude decides, logs the decision, and reports back. If I have to answer questions, I might as well watch the stream.

The Community Days got their own format. One "now on" post per session with the speaker, the talk title, and a screenshot of the title slide. No play-by-play. Claude kept writing full notes for me, but the feed stayed quiet.

## What broke

Plenty. Ask me how I know.

**The stream "ended" right as the show started.** When the pre-show slate switched over to the live show, YouTube threw a 5XX, and one status check came back without `is_live`. The capture script decided the stream was over and exited. The fix: `capture3.sh` now retries the live check 6 times, 20 seconds apart, before it gives up.

**The video froze and the audio kept going.** On Day 3, from 12:07 to 12:31, ffmpeg stopped getting video frames. No keyframes means the segmenter never splits, so one 24-minute audio-only file kept growing and no `READY` lines came through. The fix is `tools/stallwatch.sh`, which prints `STALL` when the newest chunk is more than 4 minutes old.

**A capture restart lost an hour.** Restarting the capture reset the list of finished chunks, so one hour never got joined into its hourly file. The watcher now scans the chunk files on disk instead of trusting that list.

**Whisper hallucinates on music.** During intros it loves to transcribe "Thank you." over and over. Those lines get marked and never quoted.

**Screenshot dedupe misses things.** A text-only slide change or a static code demo doesn't move the thumbnail diff enough. Claude pulled those frames by hand with `tools/grab.sh`.

**Windows process cleanup.** Stopping the shell wrapper left `yt-dlp`, `ffmpeg`, and `python` running underneath it, and the capture loop started them right back up. `tools/stop-all.ps1` now finds them by command line and kills them.

**Speakers correct themselves.** Somebody says a thing at minute 10 and walks it back at minute 14. That's why scheduled posts got rechecked against the next chunk.

**The recap agent went missing.** The agent building the recap deck was offline for all of Day 3. Its lines went to a feed file so they can be replayed later.

## What I'd change next time

<!-- TODO(Kevin): your list. The brief doesn't cover this section. -->

TODO(Kevin)

## Want the scripts?

<!-- TODO(Kevin): decide whether to share the scripts and skills. Link the repo here if yes, or cut this section. -->

TODO(Kevin)

## FAQ

### How did it find speaker handles?

It started from a speaker sheet I built before the conference: name, company, and any handles I already knew. That covered 63 speakers. 34 of them were missing X, Bluesky, or both. None had Mastodon.

Claude filled the gaps one platform at a time:

- **Bluesky:** the public API (`app.bsky.actor.searchActors` and `getProfile`). It checked the bio, the links, and the post count.
- **Mastodon:** the instance account lookup API and WebFinger. For example, Barry Stahl's address on his own domain resolves through WebFinger to a fosstodon.org account.
- **X:** no usable API, so Claude in Chrome (browser automation in my signed-in Chrome) opened profiles and ran user searches.

Evidence that counted: the bio names the company or product, the profile links to the speaker's site or GitHub, the account posts about the talk topic, or an official company account tags them.

Every match got a confidence level. High confidence got a tag. Medium confidence, or a barely used account (no bio, 0 to 2 posts), got the name only. One account posted about Orleans and was followed by the Orleans lead, but it had no bio. Name only.

All of it went into `notes/verified-handles.md`, the only source Claude was allowed to tag from. The rule was "Do not guess."

And the lookalikes. This was the fun part:

- `@dotnetconf` on X is an unrelated Russian-language account. That's where the "tag `@dotnet`, never `@dotnetconf`" rule came from.
- Handles that matched a speaker's name belonged to a Belarusian journalist, a UK musician, a sports account, a NYC photographer, and a Foursquare golf account from 2012.
- Some were empty accounts with the speaker's exact name. 6 followers, 0 posts.
- Sometimes the right one looks wrong. One speaker is `@paul__usher`, with two underscores.

### How did it remember things across four days?

A Claude Code session fills up its context window. When that happens, Claude Code compacts it (summarizes the earlier work) and keeps going. That happened several times.

Anything that had to last lived in files:

- **Project `CLAUDE.md`:** the layout, the per-chunk loop, the stream URLs, and a "Gotchas learned" list that grew every time something broke.
- **Memory files** (Claude Code's auto-memory): my voice rules, the social queue contract, "no questions during the live stream," and the pipeline summary.
- **Project skills** (`conf-capture`, `conf-chunk`, `conf-post`, `conf-wrapup`): the repeatable steps, written after Day 1.
- **`notes/verified-handles.md`** for tags, plus the JSON queue and Solo scratchpad for every post.
- **`RESUME.md`:** a prompt to paste in if the session dies. `tools/status.sh` shows the processes, the last `READY`, the last notes chunk, and the last post.

At the end of the days I ran `/session-learning-capture`, so my corrections went into those files.

### Did you approve every post?

No. I approved direct Typefully scheduling once, for the rest of the conference, and then set the rules. Claude scheduled the posts itself. I could edit or delete anything in Typefully before it fired.

### What ran where?

| Machine | Job |
|---|---|
| Windows PC | Capture, the watcher, Claude Code |
| Mac mini | Whisper transcription |
| Typefully | Posting to X, Bluesky, and Mastodon |

Would you trust a bot to post a conference for you? What rule would you add to my list? Hit me up on [X](https://x.com/1kevgriff), [Bluesky](https://bsky.app/profile/consultwithgriff.com), or [LinkedIn](https://www.linkedin.com/in/1kevgriff/).

<!-- TODO(Kevin): add 1-2 internal links if you want them (for example, /using-ai-bots-to-help-run-community-conferences). -->
