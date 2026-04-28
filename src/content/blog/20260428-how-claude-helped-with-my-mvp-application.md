---
title: 'How Claude Helped Me Apply for My 17th Microsoft MVP Renewal'
date: 2026-04-28T00:00:00Z
permalink: how-claude-helped-with-my-mvp-application
description: "The Microsoft MVP renewal application is a brutal slog of remembering everything you did all year. This year I let Claude do the heavy lifting — calendar review, meetup data, drafting answers, and even filing activities in the portal. Here's the play-by-play."
summary: "Calendar review, meetup mining, drafting answers, and filling out the portal — here's how I used Claude to make the MVP renewal application almost fun this year."
excerpt: "How I used Claude to compress a year's worth of MVP renewal busywork into something that didn't ruin my month."
tags:
  - ai
  - claude
  - microsoft-mvp
  - productivity
categories:
  - Career
---

If you're a Microsoft MVP, you already know exactly what I'm about to complain about. The renewal application.

You have to go back through twelve months of your life and remember every event you spoke at, every podcast you appeared on, every user group you hosted, every article you published, and every Slack thread where you helped a stranger. And the catch? You're supposed to log all of this _as it happens_ throughout the year. But who actually does that? Not me. Probably not you either. Ask me how I know.

I'll be honest. Every year, I put this off until the very last minute. Then I sit down with a blank application, a year of fuzzy memories, and the slow, creeping horror that I truly can't remember where I was last March.

This year was different. This year, I got Claude involved.

## Step 1: Let Claude Read My Calendar

The first thing I did was hook my Google Calendar up to Claude Desktop with a connector — read-only access only. My calendar isn't a state secret — it's mostly meetings and travel — but yours might be, so think about your own comfort level before you turn anything loose on it.

I'm pretty disciplined about putting travel and events on my calendar, even if I forget to log them anywhere else. So having a year's worth of calendar data is a jackpot. Claude went through everything: every flight, every conference, every "drive to Richmond for user group" entry, and built me a list of events to start from.

Here's the part I didn't expect. It caught things I would've completely forgotten. Podcasts I appeared on. Random panels nobody recorded. The stuff that doesn't feel important when you're doing it, but absolutely belongs on an MVP application.

That list alone saved me a full evening of looking at Google Calendar.

## Step 2: Mining Meetup.com with Claude for Chrome

Next, I pointed **Claude for Chrome** at Meetup.com. If you haven't played with it yet, Claude for Chrome is the browser extension that lets Claude actually drive the page — clicking, scrolling, reading, filling in fields. Install it from the Chrome Web Store, link your Claude account, and you're off. (Yes, it works in Edge too, since Edge is Chromium underneath.) It's freakin' cool to watch.

I don't speak at a huge number of meetups in a given year — it's a handful — but the data on Meetup is _exactly_ what the MVP application asks for. RSVP counts. Event dates. Topics. Locations.

Claude for Chrome walked through each event I'd RSVP'd to as a speaker and pulled the numbers. No copy-paste. No tab-switching. No "wait, was that the one in March or April?" Just structured data, ready to drop into an application.

## Step 3: Drafting Answers (But Not Writing Them)

The MVP application doesn't just ask "what did you do?" It asks the reflective questions. The big ones. The kind that stare at you from a blank text box until you stare back.

Two of them this year:

> **How do you use your knowledge and skills to help others?**

> **How would you support the community with your technical knowledge and skills moving forward?**

These are _good_ questions. There are also questions you don't think about while you're in the middle of running DevFest or hosting a user group. You think about them once a year, when somebody makes you write them down. And then you sit there and try to summarize a decade of community work in a paragraph. Cool. No pressure.

Here's the thing. If you're like me, you've been feeding your AI agents context all year through your regular work. By April, I've given Claude a year of conversations about my business, my community, my projects. So when the MVP application asked me a tough reflective question, I just handed it back. _Based on everything I've told you about me, how would you answer this?_

Claude knocked it out of the park. It pulled insight about my work with RevolutionVA (RevolutionConf and Hampton Roads DevFest), the Hampton Roads .NET Users Group I've been hosting since 2009, the newer Hampton Roads Azure group, Stir Trek, where I've been speaker co-coordinator, the .NET Foundation — the whole picture. It built outlines that made me go "oh yeah, I should definitely mention that." Honestly, it spoke kindly about my work in a way I have a hard time doing about myself.

To be clear: I didn't let Claude write the answers. The voice had to be mine — that's the whole point. Claude gave me bullet points, structure, and "don't forget about `X`" reminders that turned a blank page into a real draft. I rewrote everything in my own words. Then I handed my version back to Claude to check for grammar and anything I'd missed.

That feedback loop is the whole game.

## Step 4: Reading My Own Website

This one's a little embarrassing. I asked Claude to go through my own website and tell me what I'd written this year.

I lost analytics during a Gridsome-to-Astro migration a while back, and I never bothered to put them back. The MVP application asks for things like page views and reach, and I genuinely can't tell you how many people read any given article. I have no dashboard. No numbers. Nothing. (Losing your analytics in a migration and not noticing for months is, I'm told, the most on-brand thing a developer can do.)

But Claude for Chrome just... read the site. Pulled the article list. Categorized it. Handed me back a clean rundown of content I'd shipped this year. The reach numbers stayed blank — that's a me problem, not a Claude problem — but the article inventory itself populated a whole section of the application I would've otherwise rage-typed at midnight.

If there's a lesson in here for next year, it's "put analytics back on the site." Ask me again in twelve months whether I actually did it.

## Step 5: The Cumbersome Part – Actually Filing the Activities

Here's the part of the MVP application that has always made me want to hurl my laptop into traffic.

If you've never seen the inside of the MVP portal, picture this. Each activity needs a category, a sub-category, a date, a title, a description, a URL, an audience size, sometimes a co-presenter, sometimes a screenshot. Click. Type. Tab. Dropdown. Wait for the dropdown to load. Pick. Tab. Type. Submit. Now do it again. And again. And again. For dozens of activities. It's the kind of work that should take fifteen minutes and somehow always takes three hours.

After Claude and I had compiled my full list of activities — meetups, podcasts, conferences, articles, the works — and I'd cross-checked it against my calendar, decks, and site, I handed the verified list back and turned it loose on the portal. Claude for Chrome prompts me to confirm before each form submission and any state-changing click, so this was not a "set it and forget it" situation. I watched. It opened each activity form, filled in every field, hit submit, and moved on to the next one.

I sat there with coffee, watching forms fill themselves out. It was, genuinely, the most fun part of the whole renewal.

Was it perfect? No. Out of around fifty activities, three or four needed manual cleanup. The rest went in clean on the first pass — par for the course on this kind of automation.

## One Big Gotcha: Claude Will Confidently Make Things Up

I'd be doing you a disservice if I didn't talk about this part. **Claude blends.** If you've spent a year throwing context at it — completed work, half-baked ideas, brainstorms that never shipped — Claude won't separate them on its own when you ask for a summary.

Here's what happened to me. I've been typing into Claude all year — random conversations, strategy sessions, "what if I spoke at..." ideas that never went anywhere. All of that lives in the conversation history. When I asked Claude to summarize my community work, it pulled from everything because I'd never told it which entries were "things I actually did" and which were "things I was kicking around."

At one point, Claude told me, with full confidence: "Oh, nice, you hosted [conference that does not exist]!" I never hosted that conference. It only existed in a chat where I'd been thinking out loud about whether it would be a good idea. Claude faithfully grabbed the name and treated it like a real event on my résumé. That's not Claude inventing things from nowhere — that's Claude doing exactly what I told it to do with sloppy inputs. Same outcome from your perspective: bad data has to get caught before it lands in the application.

So if you do this, **verify every single thing Claude hands you before it goes anywhere near the application.** Cross-check events against your calendar. Cross-check speaking gigs against actual decks or RSVPs. If Claude cites an article, make sure it actually lives on your site. The MVP team checks. You should, too.

Treat Claude's output like notes from a very enthusiastic research intern. Useful starting point. Fact-check it before anything goes near the application.

## A Wishlist for the MVP Team

Look, I love that this worked. But the fact that it worked only because Claude for Chrome was scraping its way through the MVP portal tells me something. **There should be an MCP server for this.**

If the MVP team gave us an official MCP server — something that exposed activity creation, event lookup, and contribution tracking through a clean interface — every MVP could plug in their AI agent of choice and have renewal be a non-event. No browser automation. No fragile DOM scraping. Just structured data going where it belongs.

I don't know how feasible that is on Microsoft's side. But I'd use it on day one. Every MVP I know would use it.

And before someone says "maybe the friction is part of the verification" — no, it isn't. The MVP team verifies submissions on their end regardless of how the data got into the form. The friction is just data entry. Painful UX is not a feature, it's a backlog.

## So Did It Actually Work?

I don't know yet. The renewal isn't decided.

But I can tell you this was the first year in a long time where the application didn't ruin my month. The cumbersome work got compressed. The reflective work got _better_ because I had a thinking partner instead of a blank text box. And the portal data entry, the part I hate most, was almost pleasant.

Fingers crossed on my 17th renewal. Either way, I'm not going back to the old way.

If you're an MVP staring down your own renewal, or if you're using AI to compress some other annual slog, hit me up on [X](https://x.com/1kevgriff), [Bluesky](https://bsky.app/profile/consultwithgriff.com), or [LinkedIn](https://www.linkedin.com/in/1kevgriff/). I'd love to hear what's working for you.

For more on how I think about AI in day-to-day developer work, check out my [conversation about tech communities and AI in development on the Fervent Four podcast](/fervent-four-podcast-tech-communities). And if you want a sense of the kind of community work that fuels an MVP application in the first place, here's my [recap of Hampton Roads DevFest 2024](/hampton-roads-devfest-2024-retrospective).
