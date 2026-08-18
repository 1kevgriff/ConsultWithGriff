---
title: "I'm a Builder, Not a Craftsman | Coffee and Open Source"
date: 2026-08-11T00:00:00Z
permalink: builder-not-craftsman-coffee-and-open-source
description: 'I joined Isaac Levin on Coffee and Open Source to talk about AI agents, software craftsmanship, .NET workflows, developer communities, and why humans still own what reaches production.'
summary: 'My Coffee and Open Source conversation with Isaac Levin covered AI agents, changing developer workflows, software craftsmanship, community, and responsibility.'
excerpt: 'AI can write the code, run the tests, and open the pull request. It still cannot take responsibility for what we ship.'
tags:
  - ai
  - software-development
  - dotnet
  - developer-tools
  - podcast
categories:
  - Podcast
---

> **A note on how this article came to be:** This recap was written with AI assistance, and the transcript below was regenerated from the episode audio with AI transcription and speaker identification. The conversation, opinions, stories, and questionable roller coaster enthusiasm are entirely human.

I recently joined [Isaac Levin](https://isaacrlevin.com/) on **Coffee and Open Source**. We started by talking about roller coasters, which is a perfectly reasonable way to begin any serious technology conversation.

An hour later, we'd covered how I got into programming, why I think of myself as a builder instead of a software craftsman, what happens when you run too many AI agents at once, and whether technology communities survive when nobody cares what language generated the final output.

Light stuff.

https://www.youtube.com/watch?v=Wms4XH0zL-o

You can also find the episode on the [Coffee and Open Source website](https://www.coffeeandopensource.com/guest/kevin-griffin.html).

## What We Covered

- Learning QBasic from _DOS for Dummies_ on my family's Packard Bell 486
- Why solving business problems clicked harder for me than traditional computer science
- The satisfaction of fixing things yourself, whether it's software, brakes, woodworking, or the mini-split in my office
- Why I describe myself as a **builder**, not a software craftsman
- Using Claude, Codex, Copilot, and other agents as part of a real production workflow
- The mental cost of running multiple agents and switching contexts hundreds of times per day
- Why twenty years of experience still matters when an agent writes most of the code
- The state of AI-generated .NET and C#
- How my daily workflow moved away from Rider and traditional IDEs toward agents and pull requests
- Whether AI will flatten language-specific developer communities into one large AI community
- Why the human shipping the software remains responsible for the result

## I'm a Builder, Not a Craftsman

One of the ideas I keep coming back to is the difference between being a craftsman and being a builder.

In woodworking, one person might cut every dovetail by hand. Another might use a CNC. They're both creating something, but they care about different parts of the process.

Software works the same way.

I can handcraft every keyword, variable, and byte. Or I can use the most efficient tool available to solve the customer's problem. Right now, that tool is often an AI agent.

My clients don't care whether I personally typed every line. They care whether the software does what they need, whether it's reliable, and whether I can deliver it at a price that makes business sense.

That's not an excuse to stop caring about quality. Far from it. It means I spend less time physically entering code and more time defining the problem, providing context, challenging decisions, and verifying the result.

## Experience Becomes Context

There's a fair concern that developers who stop writing code will eventually lose the ability to write code.

They probably will. Skills get rusty when you don't use them.

But the value of twenty years in software was never just my ability to remember syntax. It's understanding why a ten-year-old system looks the way it does. It's knowing the business rules that never made it into a Jira ticket. It's spotting when a locally reasonable implementation blocks something on the roadmap six months from now.

An agent doesn't know any of that unless I tell it.

Even a million-token context window can't contain all the source code, customer history, production data, architectural decisions, and scar tissue that make up a mature system. The agent sees a slice. My job is to understand the larger picture and manage it accordingly.

Honestly, AI has also made me learn more. It proposes approaches I wouldn't have considered, and I get to decide whether I was ignorant of a useful technique or whether the agent is confidently wrong. Either way, I end up researching something.

## More Agents, More Problems

If one agent makes you productive, six agents should make you six times as productive. Right?

No. Not even close.

I've told an orchestrator to take an entire Jira board and go to work. Claude implements. Codex reviews. Copilot adds its opinion. The agents iterate, open pull requests, and keep the machinery moving.

Meanwhile, I have fifteen terminal windows open and no idea what half of them are doing.

The limiting factor becomes human context switching. Every time an agent stops and asks for input, I have to remember what problem that terminal was solving, where it is in the process, and what decisions led us there. Do that hundreds of times in a day and you're fried.

I've found that two or three concurrent tasks are about my practical limit. Increasingly, I'm going back to one thing at a time. If the agent needs a few minutes, I can wait just like I used to wait for a build, deployment, or test suite.

Or I can touch grass. Wild concept.

## The Tools Are Changing

My old workflow lived in Rider for backend work and VS Code for frontend work. Then Cursor arrived. Today, most of my development happens through Claude or Codex, with the actual review occurring in GitHub pull requests.

I sometimes don't open an IDE at all.

That transition isn't comfortable for everyone, especially developers who've spent ten or twenty years building a reliable workflow around Visual Studio, Rider, or another mature environment. Many AI-first tools treat .NET and Java as afterthoughts. They lead with the agent and expect the editor to get out of the way.

The generated .NET code has improved immensely, but it still needs context. Models reach for older framework patterns, over-comment simple changes, and produce documentation nobody requested. I use skills to inject the C# conventions and modern .NET approaches I expect.

The tools will improve. Until then, we manage the gaps.

## What Happens to Developer Communities?

This was the part of the conversation I found most uncomfortable.

For decades, we've built communities around languages, frameworks, and platforms. I'm a .NET person. Other folks identify with Java, Python, Rails, Go, or JavaScript. Conferences and user groups give those communities places to exchange ideas and teach each other.

But what happens when the implementation is one prompt away?

If nobody cares which language sits between the input and output, what happens to the .NET community? What happens to conference sessions that once spent an hour exploring a framework feature the AI can now apply on demand? What happens to open-source maintainers when someone can request a custom replacement for their project?

I don't think community disappears. I think it changes.

Maybe we organize more around the problems we're solving and less around the syntax used to solve them. Maybe I'm still "the .NET guy" inside a broader community of builders using every stack imaginable.

That change makes me a little sad. The old communities have given me a career, friendships, and more opportunities than I can count. But technology communities have always evolved along with the technology. This time won't be different.

## The Human Still Owns the Result

The most important point came near the end of the conversation.

I replaced the brakes on my truck. I watched the videos, used the tools, and did the work myself. When I drove onto the road, I was responsible for whether those brakes worked. I couldn't blame the wrench or the YouTube video if they failed.

AI-generated software is no different.

If customer data leaks, the agent isn't responsible. If a deployment loses money, the agent doesn't take the call. If the system hurts someone, "Claude wrote it" isn't a defense.

I'm still responsible for what reaches production. That means tests, reviews, safeguards, and enough due diligence to know the result is safe. The tool can produce the code. It can't accept accountability.

AI is the future whether we like it or not. Use it. Learn it. Let it make you faster. But don't outsource your judgment along with the typing.

And seriously, go outside every now and then.

## Coffee and Open Source Transcript

> This transcript was generated using AI-based transcription with speaker identification. While we've done our best to clean it up, there may be errors or inaccuracies. Any mistakes are unintentional.

### Introduction and Welcome

**Isaac Levin:** Welcome, everybody, to another edition of Coffee and Open Source, a place to meet some new friends, have some great conversations, and maybe learn something along the way. I'm your host, Isaac Levin. If you're enjoying the conversation, be sure to like, subscribe, and follow wherever you're watching or listening. Also, if you or someone you know would like to come on the show and have a chat with me, you can find me on whatever social media platform you're on, and more than likely my handle is isaacrlevin. But if you have any curiosity about all the different places I am, if you go to isaacrlevin.com, you can see a list of them. With that out of the way, I'm looking forward to the chat. We were chatting about roller coasters, for God's sake, before we got started. My guest is Kevin Griffin. I'm looking forward to having a chat with you. Do you want to say hello and introduce yourself?

**Kevin Griffin:** Sure. Hi everyone, I'm Kevin Griffin, long-time Microsoft MVP. I'm a consultant, been specifically in the .NET and Azure space for as long as I can remember. I'm also currently the acting CTO for a company called Shows On Sale. We build tools for ticket brokers, so if you've ever bought a ticket off of StubHub, I probably helped with that transaction at one point. So yeah, that's me in a nutshell. And I love roller coasters. I could talk about them all day.

**Isaac Levin:** Yeah, let's not talk coa— let's just talk coasters.

**Kevin Griffin:** Well, I mean, we could probably talk a little bit of both. We'll talk about the thrill of each.

**Isaac Levin:** I'm looking forward to this chat for a few reasons, but I'd like to get started with how it got started for you. When did you realize that technology was something you'd end up choosing as a career?

### Getting Started: QBasic and a Packard Bell 486

**Kevin Griffin:** When I was a kid — and we were talking about this pre-show, we're both near the same age — I remember when computers weren't a thing in the house. I remember being around 10 years old and my parents going out to get the computer. We went to Circuit City and we bought a Packard Bell 486. It did have a CD-ROM, so it was new and fancy. Brought that home, and I wasn't allowed to touch it, because it was a very expensive machine and my parents didn't want to risk me doing something dumb on it that they couldn't fix.

I'm a Navy brat, so my dad was deploying every now and then. I remember very specifically he went on a deployment, and when the cat's away, the mouse will play. I picked up a book — it was DOS for Dummies. Being a kid, all you had back then was books, because there was no internet yet, or at least nothing we would define as internet. I flipped through it, going chapter to chapter, and I got to this section on QBasic. It was like, oh, there's a programming language built into your computer and you didn't even know it. I typed in a couple of commands and thought, oh my gosh, I can tell the computer how to do things. This was a completely foreign idea to me.

I remember very specifically going into school, going to the library back when you did that, and getting every book I could on programming and learning as much as I could. That developed into the passion of, all right, I want to tell the computer how to do things. Back then the public school system didn't know how to help kids like us. The best I had was a math teacher who knew a little bit of programming. It wasn't really until high school that I got in and was able to do more hands-on stuff. I easily aced all the computer science classes in high school and said, all right, I really want to do this for a living, this is great, and went to college for it. Hated college. I was not built for college, but I got my degree. It's over there on the couch, not even hanging on the wall.

But yeah, I decided I really like telling the computer what to do, and as I got older that turned into, I can use the computer to help people and businesses solve problems and do a lot of unique, interesting things with it. That's kind of where we are today. I'm still doing that, and that hasn't changed. I just enjoy telling the computer what to do. Even though I might not be writing the code directly anymore, I'm telling the AI what I want the code to do. I'm still building things and producing software.

### Solving Business Problems Over Computer Science

**Isaac Levin:** I think it's very fascinating. I relate to the college thing specifically, where I didn't directly correlate what I was learning to how I was going to have a job that makes money. I was in computer science and I switched to information systems. When I went to information systems, I actually got it, because I thought, oh, you're taking technology as a tool to solve a business problem. That's all I really cared about. I didn't ever really care about what the logarithm of time for a particular thing was. I wasn't interested in the network stack. What I was interested in was, okay, some company needs a developer to do something, and how do I do that?

The curriculum at the business school, which was for information systems, was systems design. You learn doing stuff in UML, and database design, and there was some web stuff. Once I started doing that — oh, this makes much more sense than learning how to program an ATM in computer science class.

So do you think that solving business problems has been the thing you've always gravitated to your entire life? Have you always seen problems and figured out how to fix them pretty quickly?

**Kevin Griffin:** Yeah, I'm just by nature a handy person. I love tinkering on things. Talking about business information systems in college — I minored in information systems, and I 100% agree. Those were the moments in school where I got it. I enjoyed those classes immensely.

I like looking at something broken and wanting to know how to fix it, or at least coming up with the process to fix it. It doesn't matter if that's software, or we were talking about working on old cars. I do most of my own work around the house if something's broken. I never want to have to be reliant on someone else to fix that. It's like, all right, I'm a smart guy, I can figure this out. I do 99% of my own maintenance on everything, whether or not that's the financially smart or time-smart thing to do. I just enjoy it. I do a lot of woodworking on the side, at least I try to. I do electronics tinkering here and there. I just enjoy fixing things.

That was the benefit of doing so and having a business mindset: there's a lot of things broken in business, or there's a lot of improvements you can make. You just need to be the smart one to go in and go, well, what if we just did this, this, and this, and that would save you 40 hours a month? That turns into money, and it turns out businesses like money. So any suggestion you can make to make a process faster or more cost efficient is usually a win.

### The Satisfaction of Fixing Things Yourself

**Isaac Levin:** I 100% agree. I also think there's just something — it cannot be described how satisfying it is to do something yourself. The idea of taking a block of wood and turning it into — I picked up woodworking recently, and I made a little bird. I was like, look at my little ugly bird that I did myself. And my kid is like, that doesn't look like a bird. I'm like, it looks like a bird to me, damn it.

With software specifically, we are so immune to failure. We put up with failure constantly, and the payoff is worth it. The dopamine hit, the adrenaline hit of your build works, the website works, the button works, all the things. We are able to put up with things not working 99% of the time because the payoff is so good. I think that works with other areas of life too. I am not as handy as you. I can do some things, but there's also something where, the financial piece aside, it's like, okay, I did this thing, I fixed it. I need to replace the alternator on my truck and I did that, instead of having to go pay somebody — because let's be real, it's not financially sound to go pay a dealership or whoever to do small work on your vehicle anyway.

**Kevin Griffin:** Yeah, absolutely. And we're living in such an information age, where if you don't know how to do it, you're probably one YouTube video away from getting enough information. This past weekend I replaced the mini-split in my office, the AC unit. Now, I'm not an HVAC guy, but I can watch a YouTube video, and I did most of the work. The tools I didn't have, I could just go borrow for free from a different place here in town. The tools and the knowledge are all accessible, so there's no reason not to do it other than you just don't want to — which I think is completely fair. You don't have the time. You'd rather trade the money, so it's more efficient for you to pay someone to come do it and get it done in an hour than me spending probably the better part of a day doing it. There is something to be said for paying for expertise to just come take care of a job. But I do get the satisfaction of, it is nice and cool in my office right now, and I did that. And in 10 years when it breaks, I'll know how to replace it. I'll just replace it again.

**Isaac Levin:** I replaced the brakes on my car a couple of months ago, and same thing. I had most of the tools and I got the rest of them. I watched a video. The only thing that was very annoying is that the guy in the video has probably done brakes five million times, so it was a 10-minute video and it took me the better part of an hour for each tire. But the feeling when the car brakes work — there's nothing really better to describe that. And this is probably somewhat offensive, but you feel like a real man. And not to say that people who don't identify as men can't do these things, but at least in your core. It's like going to a monster truck show. There's nothing more aggressive, adrenaline-filled than that, and there's nothing more fulfilling than being able to say, oh, this thing, I fixed it with my own two hands.

But anyway, you mentioned AI at the beginning. How do you square the circle with the fact that you love solving problems and you love getting your hands dirty, and now you're just prompting? For a lot of people it's, well, the agent or the LLM is now a tool — before it was an IDE and programming languages and all these other things, and we've just gone up the stack a little bit. But how do you feel about the idea that if somebody comes to you and says, hey Kevin, I need an app that does this, you're more than likely not going to write more than five lines of code yourself by hand?

### Builder, Not Craftsman

**Kevin Griffin:** I think the way I kind of push back on this is, maybe at my core I'm not a software craftsman. To use an analogy going back to woodworking: there are woodworkers with hand tools doing hand-cut dovetails on boxes, and they're very into the craft of building something with their hands. But then there are people who are just knocking stuff out on CNCs. They're both woodworking, but one's using a more automated device to do the work and one's doing all the work by hand.

Software is very much the same thing. I could handcraft every byte, molded from my fingertips into the keyboard to produce this software. Or am I just a builder who wants to build things, and I'll use the most efficient tool for the job? At the moment, the most efficient tool for that job is using an AI agent, where I instruct it on the problem, how I think the problem should be solved if I even want to go that deep, and then review it and go, does it solve the problem? If it checks those boxes, then awesome, I did the thing I needed to get done.

If that's for a paying client, I'm more likely to get more work if I'm able to knock things out. They don't care if I handcrafted every keyword, every variable. They just care, does it do the thing I needed it to do? At the end of the day, I could do more work in a day, or I could do the same work faster and then have time for other activities.

I did a trip with my son two, three weeks ago. They had a camp, and I went to ride roller coasters one day while my agents were doing the work for me. I was monitoring the progress on my phone, but the work was still getting done, and I was enjoying another hobby at the same time. And I still do a 20% review of everything it builds. We still have tests in place. We have all the infrastructure to make sure we don't accidentally blow something up. But that's the previous 15, 20 years of experience talking. I know how to set up those systems. I'm not a person who just comes in and goes, oh, let's build a thing. Oh, you mean you're supposed to put a password on your database? Oh, dang, didn't mean to leak all that PII.

But yeah, that's the roundabout way of saying I'm more of a builder, I'm not a craftsman. I just want to get stuff done. I want to solve problems, and right now the best tool for that is the agent. If it wasn't, I'd go back to whatever the next best tool was.

### Twenty Years of Experience as Context

**Isaac Levin:** I feel the same way. I also feel, to use your anecdote, I've been doing this — I have 15 years of history to be able to know what the right thing is. I think it's important occasionally to remind yourself that these agents are not deterministic. They don't understand the concept of, I need to do a good job, or I need to make sure the tests pass, unless they're instructed to.

One of the things I struggle with is that at some point in time I will lose the craft of coding. You don't have to be separated from something for that long to start to get very rusty. There's going to be a point in time in the future where if somebody for whatever reason asked me to do something and said, oh, you can't use AI, I will struggle. But then there's a pushback where it's like, well, why would I not be able to? It's like an interview sort of thing. Why would I not be able to use AI? I'm going to use AI for the job.

Have you kind of made peace with that — that the Kevin that got to this day, the 20 years of Kevin, isn't useless, but is history? It's no longer current?

**Kevin Griffin:** I'm perfectly okay with that. I think the real benefit now is going into a problem space — so I work with this company, Shows On Sale, and we have 20 years of history. I understand the industry, I understand the business. I was basically working on a system that I hand-built over a 10-year period, and then years before that I maintained an old system. There's so much knowledge that comes from how the system got to what it is today. Now, when I prompt the agent, it's me giving it the context of what I've been doing over the past years and telling it, I now need you to add this one thing, and this is how I would do it.

It's also like having two or three more Kevins to argue with me, because so many decisions I made back then were because I was working in a box just by myself. I didn't have a colleague to riff ideas off of who had their own experiences. Now the AI goes, Kevin, all right, I understand your problem, I understand your proposed solution, I'm going to push back and offer an alternative, and you tell me if you think this is a good idea.

I actually think I've learned more from working with the AI, because I'm introduced to ideas and techniques that I would not have normally done previously. It's like going to conferences and watching YouTube videos. You watch someone do something that you think you know very well, and then they do one little thing differently, and you go, oh my gosh, I didn't even know you could do that. And you now have a new technique in your toolbox. I feel like that every single day. I just learned something new. And I'm a natural skeptic — sometimes I'll learn something new and go, well, did I not know that just because I was ignorant, or is it wrong? Then I've got to research it, and I learn something else new along the way.

I think I was getting burnt out before AI. I was just kind of done with the daily, let's sling the code, all right, production's running, everyone's happy. Now AI is like, ooh, I can just iterate on dumb ideas I have very quickly. I can throw them away if they're crap. I can put them into production if they're working the way they're supposed to. I have a team of folks I work with and they're all doing the same thing, and we're all just iterating so much faster than we ever iterated before. It's exhausting, actually, but it's very exciting at the same time.

### Running Multiple Agents

**Isaac Levin:** Exhausting and exciting at the same time — that's a pretty good way to phrase it. One of the things I'm struggling with, and I'd love to get your thoughts, is that we have done everything in software to this point in a synchronous world. We plan, we code, we review, we test, we ship. Now you're talking about agents, not agent. I understand the idea of agent replaces Isaac — replacing is whatever, that's the word I'm using — agent replaces Isaac. But it's really agents with an s, so multiple.

How do I effectively wrap my head around there being three or four things running now on separate tasks, and they're all committing differently, and they're doing pull requests, and they're doing all these things that a quote-unquote group of individuals would do — but they're all centrally you? Have you been able to effectively pay attention when you have multiple agents running? Because that's what I'm struggling with today. If it's one agent running, two agents running, okay. Three, I immediately think there's too much going on here. And then to go back to what you were saying about the review thing, I will never review some of this stuff.

**Kevin Griffin:** Because it's just too much. I definitely think I have a limit of two or three concurrent tasks at any time. I've done dumb things where I've started a sprint — we use Jira for all of our task tracking — and I have an orchestrator, and I'll say, just go do the whole board for me. It spawns half a dozen different tasks all picking up different tickets, and they start iterating on the tickets. Claude does the implementation, then Codex does the review, and then we throw it up in a pull request, and then Copilot gets its two cents in, and then Claude iterates, and just go around and around and around. I lose track very easily of all the work being done.

That is just mentally exhausting. At the end of the day, I'm wrapping up and I am fried, because I have probably switched context no less than 500 times that day, just jumping from one task to another. I'll watch the terminal windows, and if something stops spinning, it's like, oh, it's waiting for my input, let me switch to that tab. And the first thing I do is ask myself, what was this tab even for? What problem are we solving in this tab? Because I have 15 of them and I actually don't know what each tab is doing, but they're all doing something.

Sometimes I'll complicate it more where I'll do cross-client work. I have a couple of small clients I do a couple hours a month for, and I'll open another set of terminals just for that client. Just go iterate on an issue, make me some money while I'm over here working on regular day job stuff. And halfway through the day I'll switch back and I don't even remember what these agents were working on.

So it's definitely a problem, and I don't know a solution to it. I've told a lot of the folks on my team, I'm going back to really just doing one thing at a time, even if I have to sit there and wait for the agent to do the work. It's no different than me typing and then waiting for compilation, or waiting for a deployment to a test environment, or waiting for tests to run. I'm just going to take this moment to not think about anything else. And that's why Reddit and Twitter and Bluesky — I don't spend nearly enough time on those platforms, because the agents are keeping all my attention.

**Isaac Levin:** I mean, I think that's healthy. Being chronically online is not a good thing. You made an interesting point about how you don't know what they're doing. I've started to sort of frame this as, do I even care what they're doing? Because all I care about is what they give me at the end. They're going to go off and do whatever these things think is the right approach to solve the problem we give them. Do I care about the way they got there?

**Kevin Griffin:** I think an AI purist would say no. I think I'm still enough of a craftsman where I say I do care a little bit, more or less because I have a roadmap that I know I'm eventually going to get to. I know the task I'm working on right now, if it's solved in the way that the AI is solving it, I might not be able to easily implement other parts of my roadmap. So I might need to push back and say, don't hard-code this, put it in a database, because we're going to need to add more later. I've had to tell the AI, it's not on my sprint right now, but just go casually look at this other ticket and change your direction, because we're going to have to do this future work later.

I really have to remember the AI has a very limited context. Even though we have million-token windows, that still cannot fit all the source code, 10 years of knowledge, all the data in our databases, all of our customers, how we expect every customer to use it. It's still looking at a very small sub-slice of the total picture. So it is a little bit on me to be the responsible manager of the agent and say, you're doing good work, but I need you to tweak this a little bit.

I'm actually working on a set of issues right now where I gave the agent more flexibility in its decisions and implementation. I'm realizing there were a couple dozen gaps that I just missed — and I missed it too. So the limited review that I did, I missed all these things, and now we're having to go back and fix all these issues. Which actually, I don't know, is it saving me time? I assume it is, because I don't know if I hand-rolled all this code whether I'd still have these problems, or I would just be responsible for fixing my own crap code. But yeah, it's all exhausting.

### Is .NET an AI-Friendly Ecosystem?

**Isaac Levin:** What do they say in season one of True Detective? I don't know if you've seen that show or not, but the phrase that's carried on from that show is, time is a flat circle. How much time are you spending versus how much time are you saving? I think it really depends on what your comfort level is of trusting the output.

I think too, and I'm just going to say this, there are certain types of developers that are more AI-friendly than not AI-friendly. For what it's worth, for people who don't know, Kevin and myself are both active in the .NET community. .NET has been around for a long time, almost 25 years. And there are other languages that are quote-unquote newer that I see as more — and their communities are more AI-friendly, because they don't have the baggage, quote-unquote, of 25 years of how we built software a particular way.

Do you think that .NET, and communities like .NET or Java or some of these older, enterprise-y quote-unquote languages or frameworks, are friendly to AI? Or do you think that AI makes it more complicated?

**Kevin Griffin:** I don't think it's as friendly as it could be, primarily because I don't think a lot of these models were trained on heavy .NET or Java code. They were probably trained on some of these newer languages. But there's definitely something you can work around. I have skills that are specifically for injecting .NET and C# conventions and the way I expect code to be written.

It is immensely better now than it was. Let's go back a year and a half, two years ago, when we were copying and pasting code into ChatGPT and going, add a method for me, or I need a class that does XYZ, and it would come back with code that didn't compile at all. We are much better than we were, and I think we just need more training in the system.

I used to correct a lot of things in agent-generated .NET, where it's like, oh, I know there's a better way to do this. And a lot of times it's all training context. If I'm building on .NET 10 and it's doing things the way I would have done it in, say, .NET 6, I say, hey, there are completely new structures that you can use, and injections. You just don't know about any of this because it wasn't in your training data. As soon as you mention something, it goes, oh, let me go look that up. And it's like, oh, you're absolutely right.

So as these models get bigger and better and badder, I think a lot of that's eventually just going to come down to style. I'm kind of a purist. I like one class per file. I like comments, but not too many comments. I don't know about y'all's agents, but my agent loves to write a book in a comment block, and sometimes I have to say, why are you writing a 15-line comment for a one-line code change? And it goes, oh Kevin, you're right, let me cut back on this. Or summary —

**Isaac Levin:** Or summary markdowns. Do I need you to create three markdown files when I'm asking you to add a feature for something? But I interrupted you, sorry.

**Kevin Griffin:** No, you're absolutely right. So I have not done enough in other languages. Actually, I take that back. It does all of its scripting and stuff in Python. It seems most trained on Python, which I think makes sense, from what I've heard from others. So whenever it does scripting stuff, even though I'm working primarily in PowerShell, it will write a Python script, because it can do that most quickly and most efficiently, and it solves the same problem. These are scripts I'm not going to go look at, so knock yourself out. If it's something I'm going to run and manage, I might ask it to rewrite it in PowerShell, just something that's local to me.

But yeah, the .NET stuff has been getting better. I don't think it's as good as it could be, but that's fine. I'll keep giving it my training data every day I work with it.

### How the Workflow Changed

**Isaac Levin:** What about the workflow, though? Because I think that if you're a .NET developer, you probably use the same set of tools you have for the last 10 years. Yes, there are new versions of the tools and maybe some enhancements, but you've used more or less the same couple of tools for your entire professional career if you've been just a .NET developer.

So when you see a Cursor, or a Replit, or the GitHub app, or the other tools that exist that are AI-first tools, do you immediately go, I don't know about that? I struggle with it. I use Cursor a little bit because I'm trying to be more AI-friendly, like we've been talking about. And when I open up Cursor for the first time, it opens up an agent view. I don't want that. I want the IDE to open up first. It's just little things like that. I imagine there's a setting I can set, but why by default are you giving me the agent view? And it makes me irrationally angry. I want to stomp like a toddler having a tantrum. Don't put the AI directly into my face. Let me choose to use the AI. So my workflow is changing and I'm not happy with it.

**Kevin Griffin:** So the way my workflow has changed: I used to have everything .NET in Rider. I'd have Rider open all the time. I'd have two or three versions of Rider running different projects, and that was for all my back-end work. And then for front end, I'd have VS Code open.

I remember when Cursor dropped. I was probably one of the first people that paid for an annual subscription to Cursor. I'm like, if I'm going to use VS Code anyway, let me use the Cursor flavor of VS Code. I went deep in Cursor early on and got to the point actually where I stopped opening Rider. Actually, no, I take that back. I had Rider open, but all it was for was running the .NET project. I would have Cursor make a change and I would jump over to Rider to run it, because you can't use the DevKit in Cursor.

And now I'm at the point where I use Claude primarily and Codex secondary. I don't even open Cursor anymore. Most of my code editing is actually in GitHub pull requests. I'll do all the work local, have the agent do it, and then if I actually want to look at what changed and make comments, I'll submit a pull request and I'll comment on my own code. Then I'll have Claude or whatever go back and read my comments, and I have the conversation with the agent, and the agent always has the context of what's going on. I don't jump applications anymore.

Now, Cursor has gotten so much better since the acquisition. There's just a lot in there, and I still pay for the annual subscription, so I'll load it up and I'll do secondary reviews on it, because I get access to models I wouldn't normally pay for. It's been insanely useful. But really it's my default text editor that just happens to have all these AI tools built into it. I don't even have VS Code anymore, that's gone off my system. So if I need to edit immediately, it's in Notepad. And then if I need a little bit of syntax highlighting or whatnot, it's in Cursor. But I haven't opened Rider in months. I still have it — I think I need to update it — but I'm not opening it every day. It's all Claude to pull request.

### A Fancy Version of Notepad

**Isaac Levin:** Do you think it's good? You mentioned Notepad. Do you think it's good that you use Notepad? That's a joke, right? I mean, the first time I ever built a web page I did it in Notepad, and I remember it being awful. Then you get introduced to other tools like Adobe Dreamweaver or FrontPage or whatever, and you're like, oh, this is so much better. And then you find out those tools suck for certain reasons, and then you're using other tools. But those tools, even though they're annoying, are immensely better than just typing text into an open box.

The reason why I bring up the Notepad thing is because that's what we're doing. If you want to plainly think about it, yeah, we can add files or add attachments or reference sections of code or whatever, but we're just typing into a fancy version of Notepad. There's no IntelliSense. There's no code completion. There's no Roslyn analyzers. There's none of those things. It's just typing.

**Kevin Griffin:** Yep. The biggest reason I will use Notepad at all is it's still the fastest loading app on the machine. So if I just need to get into a text file and make a tweak or write down something, it's Notepad. Even though in Windows 11 they've crapped up Notepad so badly that it also doesn't load as quickly as you want it to anymore.

Cursor is my secondary, specifically for what you were saying — I need syntax highlighting. I want to be able to read the code like I would have read the code years ago. I need a little bit of that context. But it is a fancy Notepad at that point, like you said, because I'm not running the application from it. And it's why I don't load Rider: I can just have Claude start the app for me in a background shell. Everything works. And actually, if the compilation fails for any reason, Claude just comes in and goes, let me fix that for you, and it fixes its own issues, and then the application eventually starts.

**Isaac Levin:** This is going to sound really gross and I apologize to everybody, but I work at JetBrains. You were talking about Cursor and not having great .NET support — the ReSharper plugin for Cursor now has full C# support.

**Kevin Griffin:** Oh, does it? Okay.

**Isaac Levin:** Yeah, it was announced a couple of weeks ago. So anyway, for people that are listening and they're like, oh, you're a corporate shill — sorry. I just find it very fascinating, because if you think about some of these tools, .NET and Java and some of the more enterprise languages are an afterthought. A complete afterthought. Because the expectation is, why would you do this? Why would you build a .NET app today in the year of our Lord 2026? Everything should be written in React, right?

And that's kind of the point I was making about the workflows earlier. The workflows for some of these new AI-friendly tools are built in a way that is not accessible to people that have been writing code a specific way for a long time. And I know that's the goal, but the transition is very painful for somebody going, I use Rider or Visual Studio, and then I do this — and now I'm using this other tool that doesn't have any of the support that I need. Also, it wants to force me down this path of only using prompts. It's just a painful transition, right?

**Kevin Griffin:** Yeah, it is. And I didn't know that JetBrains had a plugin for Cursor, so I'm actually going to go look that up as soon as we're done.

There have been a number of times — I kind of feel bad for admitting this — where I've had to prompt a one-line code change just because I was too lazy to go open the editor. It's like, I need you to change this, I need you to change that. And it literally would have been faster for me to open the editor to make the change. But I'm like, well, then the agent won't have the context of my one-line code change. I don't know if it's a tooling issue. It's not a tooling issue. It's that I'm just being lazy and I don't want to open another thing.

### Talking Down to the Agent

**Isaac Levin:** Also, and this is probably an unhealthy personality trait that I have, it's also nice to kind of tell the thing it did something wrong. It's like, this button should be rounded and the background should be blah, blah, blah. Okay, I'm sorry. And then it does the change, but then it's like, well, actually, you didn't do what I wanted you to do.

I know we're not supposed to anthropomorphize these things, we're not supposed to treat them like people, but it's very satisfying, because you would never talk to a person the same way you talk to these things. You would get fired. No one would want to be friends with you. So it is somewhat satisfying to just kind of beat up the agent a little bit, talk down to it, do all the things.

**Kevin Griffin:** We always say, when the AIs take over, they're going to go after the mean ones first. There have been a number of times where I've typed into the prompt, what the hell were you thinking doing this? What is wrong with you? And it always has the same response for me: I'm so sorry. Or, that's fair, that's a fair pushback. I'm like, just go fix it.

The issue I'm running into is with all the new models, Claude doesn't like doing anything anymore because of the classifier. It goes, I'm not going to do that, because that doesn't seem safe. I'm like, I'm just asking you to read from a database. We haven't talked about processes or skills or anything like that, but I have a whole set of skills specifically around how to safely read data from databases without putting too much in the context, and letting the agent do a lot of the work for me without giving too much up. That all used to work so well until this dumb classifier started getting in the way, saying, well, I'm not going to do that, Kevin, because that doesn't seem safe. I might see someone's first name. And I'm like, I don't care if you see their name, it's all dev data anyway. Just go read the database.

The solution to all this stuff is, here, I'm going to give you a script, go run this command for me. But it gives me the wrong command, and then I'm like, that didn't work. And it's like, well, here's a different command. And eventually I have to say, just effing do it. And turns out that's the unlock for going around the classifier, because it comes back, oh, okay, yeah, I'll take care of it. And then it all works great.

**Isaac Levin:** I had a similar thing. I was using — I can't remember if I was using Codex or Claude — but I have all of my family's photos saved on a hard drive. I've gone through my Google Drive to OneDrive to Amazon Drive, and I don't know if there are duplicates. So I was like, okay, let me create a skill. I basically go through this for any folder, just go through here and check if there are duplicates and whatever. And I want to test it with a hard-coded file path.

And it says, I can't do that, looks like it's an unsafe file path, I don't know what's in there, don't want to go there, sorry. And I'm like, why not? I think I actually said, why not? And it was like, well, because of the fact that that folder might not exist, that folder might not be a folder that you want me to look in for duplicates. And I'm like, I gave it to you, though. I gave it to you. I'm not the one to think that I am the all-knowing benevolent dictator, but at the same time, if I ask you to do something, you should damn well do it.

**Kevin Griffin:** Exactly. I am the commander of this. Do as I say.

**Isaac Levin:** What is it that Moana says to Maui? You will board my boat. Just be very direct in what you're telling the thing to do.

### Will Everyone Get Here?

**Isaac Levin:** What I find fascinating about this point in time in technology, especially around AI, is that the community is very split into two factions. There's, I see the value here, but I still like doing the work that I'm doing. And then there are the people that are like, I've built a cluster of agents to manage my entire life, and all I do is sit and look at my screen and watch the text fly by.

I have a feeling I know what camp you're in, but do you think that some of these alternate realities that these very, very pro-AI folks live in are ever going to be attainable for the mass population of people that work in tech? Do you think we will ever get to the point where the experiments or machinations that these more AI-truther types live in are accessible or reachable for most of the people in tech?

**Kevin Griffin:** At some point, I think eventually we're going to get to that point. I do realize that a lot of us live in an AI bubble. I'm not bleeding edge by any means, but I'm very cutting edge at least when it comes to AI. And I still talk to people who aren't allowed to use AI, and they don't care enough to experiment with AI on their own. There's still a good percentage of the tech world who's not using AI in any capacity.

But my wife and kids and my mother-in-law all know about ChatGPT, and they're using it for different types of problems. Almost everyone's at a point where they ask ChatGPT before they ask me about something. So I do think it's a matter of time. I think eventually we're all going to have the agent in our pocket — whenever Apple figures out the best way to make Siri useful. We're all going to have our own little agent in our pocket where I can have a conversation with it like I would with ChatGPT or Claude, and it's going to do all the amazing things I want it to do.

We also have to figure out our token situation. Are we ever going to have to pay for tokens directly? The reason I can do what I do is because I pay for the subscription, and I burn tokens like they're going out of style. Across two subscriptions — two, three, I have three subscriptions, two to Claude and one to Codex. Oh, and I have Cursor, so I have four subscriptions. We're burning tokens like our lives depend on it.

I think it'll become way more open for everyone. So yeah, it's just a matter of time. I think we'll get there. I just can't tell you when. Two years ago, I would have told you, what's AI? Oh, ChatGPT is fun, I've used that a couple of times, it didn't know how to do basic math. And now it's passing the bar exam.

### The Future of Developer Communities

**Isaac Levin:** I think for some tasks the lift is so simple. Where I struggle, and we talked about this a little bit earlier, is doing all of the stuff at the same time and doing it as effectively as a group of people. And yes, I understand that 18 months ago none of this stuff was really viable and now we're here.

But I worry about how the community changes. Right now — and whether this is good or bad or indifferent, I don't really know — we have a .NET community. There's a Java community. There's people that love microservice architecture. There's people that love gaming. There are all these different areas of tech, and every area of tech has a community. My worry is that at some point in time, is there going to be a future where there aren't all these different communities, because we don't care about the language anymore? We don't care about the frameworks. We don't care about the architecture. We just care about input, output, and AI in the middle.

**Kevin Griffin:** I do fear that's probably what's going to happen. Submitting to conferences, coming up with useful topics — this used to be a lot easier before AI, because you could just pick any little thing in a language or framework or platform and you could do a 60-minute talk on it, and you would be new and cutting edge and you would blow everyone's mind. Now, how many of these conversations could just be done with, well, tell the AI to go set up a Bicep script and deploy an Azure Kubernetes cluster? There's nothing left to teach, nothing left to learn. You just tell the AI what to do.

It's like in the .NET community — how does .NET get better? If we're all telling the AIs what to do, who's leading the charge on what new exciting things .NET can do? And this goes for any language. Who's commanding that? I'd be super fearful if I was a contributor to an open source project right now. I'd be super fearful if I was trying to monetize an open source project right now, because all these open source projects are literally one prompt away from being completely copied and unnecessary. It's not good for the community. But again, if we're just builders and we need to get stuff done, everything's one prompt away.

**Isaac Levin:** My honest take on it is that there will be pushback to the consolidation of interests. I don't know what that pushback looks like, but I just have a hard time believing that somebody who has been a .NET developer for 25 years all of a sudden goes into work one day and says, I'm no longer a .NET developer, I am an AI engineer, or whatever it is. Especially at scale, I do not believe that's a thing. Especially like you're mentioning about some companies just saying no to AI.

I also think that it is essential for us to continue to live on as humans if we have community. If we're all centered around one singular community, which is AI, the robot overlords is a thing. And you kind of already see it — a lot of people are up in arms about the cost of AI, and obviously the data center thing, and all these other sorts of things that come into play.

But it's fascinating to me, because tech has always been about solving problems and finding community. I've never really been hung up on the abstract things about tech. But without the ability to have community, it's not interesting to me. Really, it isn't. I can go solve problems somewhere else. The money's nice. But if I don't really have the community, I don't know how much I really will enjoy being in tech.

**Kevin Griffin:** I've said before, maybe I'll just go take up another trade.

**Isaac Levin:** You already have all the skills. You could be a mechanic. You could be a woodworker.

**Kevin Griffin:** But the problem is, even in the .NET communities and the people I talk to, the conversation ultimately always comes back around to AI. It's not like, oh, did you see the new thing they added in .NET 11? I don't have those conversations with anyone anymore. It's always, oh, what's your agent stack? Hey, I'm trying out this skill. Or, have you seen this MCP server?

I don't know if the community is going to go away, or if the community is just going to change. So it might not be that we're super niched in .NET like we had been, but now we're the AI crew, and maybe we're the part of the crew that uses .NET. I'm in a small business group with a couple dozen entrepreneurs, and I'm the .NET guy in the crew. Everyone else is Rails or Go or everything in between. I have a community with them on a different set of topics, but I'm also the .NET guy if anyone ever runs across a .NET problem.

Yeah, I think the community is just going to change. I don't think it's going to be the way it used to be, which is sad.

**Isaac Levin:** Oh yeah. I mean, I think also there will still always be a want for people to actually write code. I don't mean it as a full-time job, but there will always be a group of individuals who are like, you know what, I know that I could probably have Claude write this for me in eight seconds, but if I can do it in an hour, I'll do it in an hour. There isn't as much of a time constraint in some particular cases. And I understand that in your world, at the will of our employers — but at the same time, especially when you think about every time you hit enter it costs money, there'll be opportunities in the future where it's like, do I want to waste money writing this method?

**Kevin Griffin:** Yeah. Is it worth my time?

**Isaac Levin:** Is it worth my time, or is it worth my company's money? More than likely it's going to be my company's money.

**Kevin Griffin:** Unless you're paying for the subscription yourself, maybe not.

Another thought: I was listening to another podcast and they were talking about the retro game community. One of the things a lot of these folks have done is they've poured years and years into taking old retro video games and making them run on modern hardware — taking something like an old Nintendo 64 game and doing a lot of the work so it can run on a modern PC.

What this community is finding is that with AI, you could actually take any retro game and the AI could build a compilable version of it in a couple of hours. You could say, oh, you wanted to play Donkey Kong on your PC? Boom, now you can. And there are still the purists out there going, no, you have to spend five years going through every byte to figure out how this should compile on modern hardware — when there are other people just saying, I just want to play Donkey Kong. Or, I want to play Mario Kart. I just want to do that, and I don't care how I get to the end result. I could just tell the machine to do the thing and it'll do the thing.

So what we might get out of this is one community turning into multiple communities — very niche communities that all care about solving a problem a very specific way for a very specific reason.

### Responsibility and Wrapping Up

**Isaac Levin:** Well, the future is definitely up in the air. That's what I think. And I just looked at the time and I'm like, oh, it's been an hour. This has been great, Kevin.

It's funny, you mentioned you have conversations with people at conferences or whatever and it's all about AI. Well, I can tell you, as somebody that has a podcast, I talk to people that are in .NET, I talk to people that are in Python, I talk to people in JavaScript — it's all about AI. Sometimes I feel like, am I just having the same conversation 18 different times? But what I've come to grips with is everybody's got a very strong opinion on how this works in their life. It was great to hear how you have been able to be more effective, but also not lose that craftsmanship that you were talking about, which I think is really important.

**Kevin Griffin:** In the end, this is the moral of the story: I am still responsible for what goes into production. It doesn't matter what tool I'm using. The same way, if I'm changing the brakes on my truck, I'm responsible for whether those brakes work or not when I get out onto the road.

Because of that responsibility, I am going to do the due diligence necessary to make sure that what I'm putting out there is safe, whether or not I'm hand-rolling the code or I'm asking the agent to write the code for me. Because if data leaks, if people lose money, I'm ultimately responsible for that, not the agent.

What's the thing? Because the computer can't be held accountable, it shouldn't make decisions. We really need to remember that. I think everyone should do a little bit of due diligence checking what the AIs do, because we are ultimately responsible for it. And until we can blame the computer and it takes responsibility —

**Isaac Levin:** I don't even want to touch that. If the computer can accept failure and accept responsibility, I don't think we need to be around anymore.

But again, this has been great, Kevin. For folks that maybe aren't following Kevin already, there are a couple of different places. Consult with Griff is a good place — consultwithgriff.com. That's a website where you can get to know a little bit more about him. There'll be some links to some other social media handles and places you can find information about him in the show notes. Before we sign off, my friend, do you have any parting words?

**Kevin Griffin:** AI is the future, whether you like it or not. Throw away all your other convictions, and don't forget to touch grass every now and then. You can sit at your desk from eight to five and not think about anything other than the agents, but go outside every now and then. It's very important. It's very, very important.

**Isaac Levin:** Especially when it's nice outside. Even when it's not nice outside, it's nice to touch grass.

And again, thanks for this. And thanks to the folks that were listening in live and the folks that are listening or watching in the future. My name is Isaac Levin. This has been Coffee and Open Source. If you like this episode, like it, share it, do all the things with it, because I would love to do this more and get more feedback and figure out what sort of people I like to chat with. So I hope you have a great day. And for my friend Kevin, enjoy the rest. Take care.

**Kevin Griffin:** Thank you, Isaac.

For more on practical AI use, read how [Claude helped with my Microsoft MVP renewal](/how-claude-helped-with-my-mvp-application). You can also check out my earlier [conversation about tech communities and AI on the Fervent Four podcast](/fervent-four-podcast-tech-communities) and my discussion of [using AI to close gaps in production test coverage](/engineering-for-system-uptime-azure-devops-podcast).

If you're experimenting with agents in your own workflow, hit me up on [X](https://x.com/1kevgriff), [Bluesky](https://bsky.app/profile/consultwithgriff.com), or [LinkedIn](https://www.linkedin.com/in/1kevgriff/). I'd love to hear where you're finding the line between useful automation and complete mental overload.
