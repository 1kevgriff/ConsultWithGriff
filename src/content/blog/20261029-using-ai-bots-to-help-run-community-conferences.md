---
title: 'Using AI Bots to Help Run Community Conferences'
date: 2026-10-29T00:00:00Z
permalink: using-ai-bots-to-help-run-community-conferences
description: "How I'm using an AI bot named Jimothy to help run Hampton Roads DevFest — from sponsor research and social media to email management and task tracking."
summary: "For Hampton Roads DevFest 2027, I've been experimenting with an AI bot named Jimothy to handle sponsor research, social media scheduling, email triage, and task management. Here's what's working and why I think bots will change how we run community events."
tags:
  - AI
  - Conference Organization
  - Developer Community
  - Event Planning
  - Hampton Roads DevFest
categories:
  - Conferences
  - Community Management
  - Deep Thoughts
---

I've been running community events for a long time. I helped run my first code camp back in 2010, and now I'm organizing the seventh edition of [Hampton Roads DevFest](https://hrdevfest.org).

A lot of work falls on organizers and volunteers—lining up sponsors, coordinating speakers, managing email, keeping social media active, and everything else that makes an event happen. These are folks doing this around the rest of their lives: jobs, families, everything. Running these events is hard. It takes a lot of time. And plenty of it is just tedious work that has to get done.

So why do we keep signing up for it?

For the latest edition of Hampton Roads DevFest, I've been experimenting with bringing an AI bot into a lot of my workflow. His name is Jimothy, he's a Grok Bot, and he has a few different jobs on the event. In this article, I'll walk through what Jimothy does for the event, what he does for me, and why I think he'll make a real difference for DevFest going forward.

<img src="/images/20261029-jimothy.png" alt="Jimothy, my AI bot for Hampton Roads DevFest" class="img-centered" width="200" />

## The Council

One of the first things I did when I started planning Hampton Roads DevFest 2027 was create what I call "the council." The council is a group of AI personas that represent the people and companies I want to attend or sponsor the event.

A persona can be as simple as "I'm the hiring manager at a local consulting company," "I'm a recruiter at a local staffing firm," or "I'm in marketing or sales at a national or global product company." Depending on your region, you might add one for each major industry, like a healthcare engineering manager or an engineering manager at a defense contractor. There's really no limit to how many you can have.

The point is that each of them wants something different from an event. A defense contractor might want to see you supporting veterans, while a recruiter or consulting company might care most about students and junior developers. So you run your questions and your materials past the council, because you want each of those unique points of view.

Here's an example. I've been working on the sponsor prospectus for DevFest, so I took it to the council. Actually, let me take that up a notch: I don't take it to the council. My bot, Jimothy, does. He goes off and has all those conversations on my behalf, collects the feedback from every persona, thinks it through, and then comes back to me with the issues they raised and a list of changes I might want to make.

This has been invaluable. The council kept raising issues I'd never considered, and I don't think anyone else on our organizing team would have either. We don't think like an engineering manager at a defense contractor, because none of us is one.

The council helped us plan a new post-event report for sponsors. The council suggested that after the event, we give them information about who attended: not just how many, but what companies or industries they came from, whether they were looking for work, or whether their company was hiring. We can ask all of this during registration, and it makes a really good set of charts and graphs for sponsors to understand where people came from. We wouldn't give away any personal information, and much of it is opt-in for attendees, so it won't be perfect, but it's a better snapshot of who comes to Hampton Roads DevFest than a sponsor would get just sitting at their table. It also gives us data for next year, so we can go to sponsors with more concrete numbers about who attends.

> **Community Resource:** I've published many of the personas we use for Hampton Roads DevFest in a GitHub repo: [conference-council-personas](https://github.com/1kevgriff/conference-council-personas). Pull some down, contribute your own, or suggest changes. I'd love for this to become a shared resource the whole community can build on.

## Finding Sponsors

One of the first jobs I gave Jimothy was to catalog all our past sponsors. We ran Hampton Roads DevFest for several years before COVID and have run it again since, so that's a long list. For each sponsor, he recorded the level they sponsored at and what they got for what they paid.

That becomes our warm list: companies that have worked with us before and might again. Jimothy also tracks down who the current contact is at each one, often by digging through old Google Sheets or the event's email (more on email later).

Then there's the cold list. I gave Jimothy access to LinkedIn and other social media to find companies in the area we serve, specifically ones with open job listings. A company that's hiring is a good sign it wants to reach developers and other technologists. Once he finds those companies, he looks for the people who make decisions and, more importantly, can spend money on their teams: hiring managers, engineering managers, sales managers and marketing managers. We keep that list on LinkedIn, and Jimothy can also try to work out whether email addresses exist for those people.

I do the outreach myself, as Kevin—emails from my own Google account, LinkedIn messages sent directly. It's personal, it's relevant to them, and I take responsibility for every message. Jimothy's job is figuring out who I should be reaching out to. For a person, that research is hours and hours of work. Jimothy can do it in minutes, and it doesn't all have to happen in one day. It can be a daily task that takes two or three minutes, where he records what he found and moves on.

It also helps a ton with follow-up. One email or message easily gets lost, and people who mean to reply often forget. Jimothy tracks all of it like a glorified CRM, so I know when to follow up, or whether I even need to.

We're still experimenting with this one, and I'll write a follow-up once I've seen how it plays out. But I'm hoping it pays off, and I think it's going to be a huge help for [Hampton Roads DevFest](https://hrdevfest.org).

## Social Media

Honestly, this is where I've failed most as a conference organizer: keeping up with social media. When you run an event, there's so much you need to post. You need to post that your prospectus is out and you're looking for sponsors, who your sponsors are, who your speakers are, and when your call for speakers is open. You need FOMO photos from past years. And keeping a consistent posting schedule—even just once a day—takes real effort when you're juggling everything else.

This is the part of running a conference I just hate. I hate scheduling posts. I hate making images for Instagram and videos for TikTok. There are so many platforms now that getting it all scheduled is exhausting.

This is where a bot helps the most. With the right integrations, it can work across all your accounts—Bluesky, X, Threads, Instagram, TikTok. Tell it you want to post once or twice a day, and it helps build the schedule and makes sure the posts actually go out. It can also track engagement, so you can see whether you're doing better on LinkedIn than on X. I think this is one of the best things bots can do for us.

Conference social media is mostly the same post over and over anyway. You swap out names, sessions and dates. It's pretty straightforward, and a person approves every post before it goes out.

I've also had a lot of luck with image generation. Images and videos usually get more engagement than plain text, so I had the bot create a consistent template for our social media images. Now any post that needs text in an image uses that template. A year ago, image generation was terrible: the results were inconsistent, words were misspelled, and none of it was great. That's improved a lot. The quality is consistent every time I ask now, and I've been happy with the engagement we're seeing.

It's as simple as the bot saying, "I'd like to post that so-and-so is speaking at Hampton Roads DevFest. Get your tickets today," with their headshot in the image. I approve it, and it gets scheduled. The bot also checks that each post actually goes out on every platform it's supposed to. If something goes wrong, it comes to me. Sometimes I have to fix it myself, and sometimes the bot fixes it on its own. I'm always impressed by how quickly it recovers from problems it finds.

## Watching Email

I gave Jimothy access to my conference email address. This has been a huge step up for me.

Jimothy checks the inbox regularly and sorts the good email from the bad. Some of it is clearly junk: "You should use our event management software," or "Do you need AV support?" That's fine, and I probably don't need any of it, so it gets archived and out of my inbox.

Then you get something like this from an attendee: "Hi, I registered, but I need to transfer my ticket to someone else. Can you help?" That's something I need to see right away, and the bot can put it in front of me.

Here's where it could get even better: if the bot could handle that ticket transfer through the APIs of the systems we already use, that's one less thing I have to think about while running an event. And for the attendee, a quick turnaround shows we're responsive and serious about running this event.

Email also helps with follow-up. When I'm doing cold outreach to a potential sponsor, I want to know if and when they reply. Do they have questions? Are they asking about something that isn't in the prospectus? Jimothy takes all of that in, brings me the questions, and then makes the updates we need. That might mean replying to the sponsor or updating the website, both of which we let him do.

One rule I hold to: no email goes out on my behalf automatically. Jimothy drafts, I review, and I approve each one before it's sent. The email is usually close to my own voice, and I either hit send or tell the bot, "This is nice, but I'd like a couple of changes." The bot remembers those changes and uses them in future emails. Nine times out of ten, I like what it wrote. The tenth time, I turn it down and send the reply myself, or rewrite the email completely because I didn't like how it was presented.

## Keeping the To-Do List

Every conference I've been part of has a to-do list. It might be in GitHub issues, in Trello, or in some odd system we came up with at the start, but there's always a list of things that have to get done. You have to book the venue and the food. You have to line up sponsors, follow up with them, and make sure they actually pay. You have to design the signage and get it printed. You have to follow up with every speaker. And when a speaker cancels, you have to find a replacement. I could go on, but there's always a to-do list.

One thing I've always done poorly, and I think a lot of conferences do too, is keep that list up to date and make sure it turns into a to-done list. The bot is incredibly good at managing to-do lists and following up on them. In a lot of cases, it can even do the tasks for you.

I won't go into detail here about exactly what a bot can do, because that depends on which bot system you use and how much access you give it. But here's an example. Say I need to email all our speakers. Jimothy drafts the messages, I review and approve each one, and he sends them. That to-do becomes a to-done.

Or say you need to look up a speaker's social media to see whether they're a good fit for the event. That might take a person a few minutes, but it's still a to-do. The bot can do it much faster and turn it into a to-done.

## Why We Keep Signing Up

At the start of this article, I asked why we keep signing up for this. If you've ever run a community event, a conference or a user group, you already know: we love it. We love the people, we love bringing folks together, and we love teaching everything we know. Bringing people and ideas together like this is something special about the developer community.

But it's exhausting. I've watched conferences and user groups come and go, and people burn out on the monotony and the sheer number of tasks. Every year, I finish an event exhausted and swear I'll never do another one. And then six to nine months later I think, "Well, maybe one more."

So here's where I land. A bot, whichever one you choose, is a game changer for the tasks that fall through the cracks. Sometimes that's because you don't have time. More often, it's because there's just too much to do and not enough people to do it. We're all volunteers here, doing this because we care about the community.

I hope you picked up a few ideas here. If you want to talk about how I actually set all this up, I'd love to. I've experimented with Hermes and OpenAI Dots, but I run most of my stuff on Grok Bot—including Jimothy. If you want to hear more, hit me up on [X](https://x.com/1kevgriff), [Bluesky](https://bsky.app/profile/consultwithgriff.com), [LinkedIn](https://www.linkedin.com/in/1kevgriff), or [Mastodon](https://bbiz.io/@1kevgriff). I'd love to chat.
