---
title: "I Decided To Jump From Gridsome to Astro"
date: 2026-01-09T00:00:00Z
permalink: i-decided-to-jump-from-gridsome-to-astro
description: "TODO: Write a brief description for SEO and social sharing"
summary: "TODO: Write a 1-2 sentence summary of the post"
excerpt: "TODO: Write a brief excerpt (can be same as description)"
tags:
  - astro
  - gridsome
  - vibe coding
  - claude
categories:
  - Personal
---

Years ago I made the amazing decision to build my personal site on [Gridsome](https://gridsome.org).  Gridsome is a platform for building static web sites which was powered by Vue.js (specifically Vue 2).

I had been diving heavy into Vue 2, because I had taken the React kool-aid and vomitted it all up. I wasn't interested in using the more popular React-based generators out there. Gridsome seemed like the best way to generate a static site, which is ultimately was my goal.

It seems pretty silly to listen to a pretty self-proclaimed .NET guy today about building his personal site on a Javascript-based platform.  That's a whole set of conversations, but honestly the Javascript folks have the tooling for this type of thing down pat.  Use the best tool for the job.

I built my site, migrated the content off Wordpress, and went live!  

Fast forward several years, and Vue 3 drops and it's flippin' amazing. I had been keeping up with Gridsome updates to this point, and I had been waiting for an upgrade path to the next version. I just went an looked up the [GitHub issue](https://github.com/gridsome/gridsome/issues/1289) for it, which is dated July 2020.  

I'm writing this in January of 2026. Almost six years later, this issue is still open. Gridsome, which started off as a great project, essentially fell off the rails, abandoned by its team.  

Typically, it's bad form for us developers to rebuild our sites instead of just writing content, but I found myself in a place where I wanted to make changes to site but still having to support a multi-year-old system. I had to change.

## Looking at Alternatives

There are a number of static site generators out there, and all of them essentially do the same thing: convert Markdown into HTML. But I didn't want to learn a propriatary component language, or worse, have to use React.  I put off the process of migrating just because there wasn't a "right" solution.

Introduce [Astro](https://astro.build).

What I thought was really interesting about Astro was that you could build components in any language you wanted.  There was a propriatary `Astro` markup language, but you could also bring Vue or React or Angular!  


## Why I Decided to Migrate


### Why Astro?
- Content-first architecture alignment
- Better developer experience
- Modern tooling and TypeScript support
- Active community and future-proofing
- Performance benefits (less JavaScript, faster builds)

## What is "Vibe Coding"?

### Defining the Approach
- Collaborative coding with AI (Claude)
- Iterative, conversational development
- Letting the AI handle boilerplate and structure
- Focus on high-level decisions and architecture

### Why Vibe Coding for This Migration?
- Complex migration with many moving parts
- Opportunity to learn Astro while building
- AI excels at repetitive tasks and pattern matching
- Faster iteration cycles

## The Migration Process

### Phase 1: Planning & Setup
- Initial project scaffolding with Astro
- Understanding Astro's Content Collections API
- Setting up TypeScript and Tailwind CSS v4
- Configuring markdown processing (remark/rehype plugins)

### Phase 2: Content Migration
- Creating the migration script (`scripts/migrate-content.js`)
- Copying blog posts and documentation
- Handling frontmatter differences
- Image and asset migration

### Phase 3: Building the Structure
- Content Collections schema definition
- Routing structure (blog, docs, tags, categories)
- Layout system (BaseLayout.astro)
- Component creation (Header, Footer, Cards, etc.)

### Phase 4: Styling & Polish
- Tailwind CSS v4 configuration
- Custom color system and design tokens
- Responsive design considerations
- Markdown styling and syntax highlighting

### Phase 5: Features & Enhancements
- Search index generation
- RSS feed setup
- Sitemap generation
- OG image generation
- Reading time calculation
- Table of contents

### Phase 6: Deployment & Redirects
- Azure Static Web Apps configuration
- Legacy URL redirects (190+ redirects!)
- 404 handling
- Performance optimization

## The Vibe Coding Experience

### What Worked Well
- AI's ability to understand context and generate boilerplate
- Rapid prototyping and iteration
- Learning Astro through conversation
- Handling repetitive tasks (redirects, schemas, etc.)

### Challenges & Learnings
- When to take control vs. let AI handle it
- Debugging AI-generated code
- Understanding Astro's conventions
- Balancing speed with code quality

### Key Decisions Made Along the Way
- Content Collections vs. file-based routing
- Tailwind CSS v4 vs. other styling approaches
- Markdown plugin choices
- Deployment strategy

## Results & Reflections

### What I Gained
- Modern, maintainable codebase
- Better performance
- Improved developer experience
- Future-proof architecture

### What I Learned
- Astro's philosophy and best practices
- The power of AI-assisted development
- When vibe coding is most effective
- The importance of understanding the tools you use

## Takeaways

- Vibe coding can accelerate complex migrations
- AI is great for structure and boilerplate, but you need to understand the decisions
- Astro is excellent for content-focused sites
- The migration was smoother than expected thanks to AI assistance

## Next Steps

- Future enhancements planned
- What I'd do differently
- Recommendations for others considering similar migrations

