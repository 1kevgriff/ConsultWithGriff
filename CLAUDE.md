# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is Kevin W. Griffin's personal website and blog, built with Astro. The site was migrated from Gridsome to Astro and features a content-focused architecture with blog posts and documentation pages.

## Development Commands

```bash
# Development
npm run dev              # Start dev server at localhost:4321

# Build & Preview
npm run build            # Build production site to ./dist/
npm run preview          # Preview production build locally
npm run type-check       # Run Astro type checking (astro check)

# Code Quality
npm run format           # Format code with Prettier
npm run format:check     # Check code formatting
npm run lint             # Lint with ESLint
npm run lint:fix         # Fix linting issues automatically

# Migration & Utilities
npm run migrate:content         # Migrate content from Gridsome (../kevgriffin.v4)
npm run validate:images         # Validate image references in content
npm run validate:meta           # Validate meta descriptions (min 100 chars)
npm run generate:search         # Generate search index
```

## Architecture

### Content Collections

The site uses Astro's Content Collections API with two main collections defined in `src/content/config.ts`:

- **blog**: Blog posts in markdown format (`src/content/blog/`)
  - Schema includes: title, date, permalink, description, summary, tags, categories, excerpt
  - `timeToRead` is calculated automatically - do not add to frontmatter
  - Loaded via glob pattern: `**/*.md`
  - Posts use date-based filenames (e.g., `YYYYMMDD-title.md`)

- **docs**: Documentation pages (`src/content/docs/`)
  - Schema includes: title, date, updated, permalink, categories, excerpt
  - Used for static pages like consulting, courses, etc.

### Routing Structure

- `/` - Homepage (src/pages/index.astro)
- `/articles/[...page]` - Paginated blog listing (10 posts per page)
- `/blog/[...slug]` - Individual blog posts (dynamic routes from content collection)
- `/docs/[...slug]` - Documentation pages
- `/article-tags/[tag]/[...page]` - Posts filtered by tag
- `/article-categories/[category]/[...page]` - Posts filtered by category
- `/[slug]` - Catch-all for docs pages at root level

### Layout System

Single base layout: `src/layouts/BaseLayout.astro`

- Handles all page metadata, fonts (Nunito Sans via astro-font), and structure
- Green theme with custom Tailwind colors
- Fixed header navigation: Consulting, Articles, Courses, Contact
- Footer with social links and copyright

### Styling

- **Tailwind CSS v4** integrated via Vite plugin (`@tailwindcss/vite`)
- Custom color system using CSS variables:
  - `background-primary/secondary/tertiary/form` - mapped to CSS custom properties
  - `copy-primary/secondary` - text colors
  - Green color palette (100-900)
  - Gray color palette (100-900)
- Global styles in `src/styles/global.css`
- Custom spacing: 80 (20rem), 108 (27rem)
- Custom border: 14px top border on header

### Markdown Processing

Configured in `astro.config.mjs`:

- **remark-gfm** - GitHub Flavored Markdown support
- **remark-external-links** - Opens external links in new tabs with security attributes
- **Shiki** syntax highlighting with `material-theme-palenight` theme
- Note: remark-embedder planned for future implementation

### Deployment

Deployed to Azure Static Web Apps:

- Configuration in `public/staticwebapp.config.json`
- Extensive redirect rules (190+ redirects) for legacy URLs
- Custom 404 handling via `/404/index.html`

## Key Files to Understand

- `src/content/config.ts` - Content collection schemas
- `src/layouts/BaseLayout.astro` - Site-wide layout and structure
- `tailwind.config.js` - Custom Tailwind configuration with color system
- `astro.config.mjs` - Astro and markdown configuration
- `public/staticwebapp.config.json` - Azure deployment and redirect rules

## Migration Context

This project was migrated from Gridsome (Vue-based static site generator). The migration script at `scripts/migrate-content.js` references the original Gridsome project at `../../kevgriffin.v4`.

Content frontmatter maintains compatibility with the original Gridsome schema, including fields like `permalink` and `excerpt`. Note: `timeToRead` is calculated at build time, not stored in frontmatter.

## Meta Images & SEO

Blog posts use static OpenGraph images generated via NanoBanana Pro API (Google Gemini 3 Pro Image):

- Images stored in `public/og/{slug}.png`
- Generate missing images: `npm run generate:og` (requires `GEMINI_API_KEY` env var)
- Script: `scripts/generate-og-images.js`
- Design: Author photo on right, title with white+cyan text on left, navy/purple gradient with circuit board patterns
- Twitter Card and Open Graph metadata configured per post
- Canonical URLs for all pages
- Site domain: `https://consultwithgriff.com`

### Meta Description Requirements

All content must have meta descriptions of at least 100 characters (120-160 recommended):

- Blog posts: Use `description` field in frontmatter (falls back to `summary` then `excerpt`)
- Docs pages: Use `excerpt` field in frontmatter
- Build fails if any content has descriptions under 100 characters
- Validation script: `scripts/validate-meta-descriptions.js`

### Internal Cross-Linking

Blog posts should include 2-3 internal links to related content for SEO and AI attribution:

- **Link format**: `/{permalink}` (use the `permalink` field from frontmatter, no `/blog/` prefix)
- **Placement**: Add at the end of posts as a natural call-to-action
- **Patterns to use**:
  - `For more on [topic], check out my article on [link text](/permalink).`
  - `As I discussed in [my previous post](/permalink)...`
  - `Learn more in my guide to [topic](/permalink).`
- **Topic clusters**: Link within related content (SignalR, Azure, ASP.NET Core, Vue.js, Consulting, Developer Tools)
- **Relevance requirements**:
  - Links must be topically related (e.g., SignalR → SignalR, not SignalR → Dapper)
  - Avoid large time gaps where context changed (e.g., C# 7 article shouldn't link to C# 14)
  - The linked content should genuinely help the reader who found the current article
- **Avoid**: Keyword stuffing, forced links, links that don't add value, topic mismatches

## Social Media Drafts (Typefully)

Blog posts are promoted via Typefully drafts across X, LinkedIn, Mastodon, and Bluesky. Drafts are created as saved (not published) so Kevin can review and schedule them.

### Setup

- **API base**: `https://api.typefully.com/v2`
- **Auth header**: `Authorization: Bearer $TYPEFULLY_API_KEY`
- **Social set ID**: `187151` (Kevin's account — `@1kevgriff`)
- **Connected platforms**: X, LinkedIn, Mastodon (bbiz.io), Bluesky (Threads is not connected)
- **Script**: `scripts/create-typefully-drafts.sh <slug>` (requires `TYPEFULLY_API_KEY` env var)

### API Workflow

1. **Get social set**: `GET /v2/social-sets` → returns `social_set_id`
2. **Upload OG image**:
   - `POST /v2/social-sets/{id}/media/upload` with `{"file_name": "slug.png", "media_type": "image/png"}`
   - `PUT` the file to the returned `upload_url` with `-H "Content-Type:"` (empty — the presigned URL is signed without a content type)
   - Poll `GET /v2/social-sets/{id}/media/{media_id}` until `status: "ready"`
3. **Create one draft**: `POST /v2/social-sets/{id}/drafts` — a **single** call with all platforms enabled and platform-specific copy:
   ```json
   {
     "platforms": {
       "x": {
         "enabled": true,
         "posts": [{"text": "Short X copy...", "media_ids": ["<media_id>"]}]
       },
       "linkedin": {
         "enabled": true,
         "posts": [{"text": "Longer LinkedIn copy...", "media_ids": ["<media_id>"]}]
       },
       "mastodon": {
         "enabled": true,
         "posts": [{"text": "Mastodon copy...", "media_ids": ["<media_id>"]}]
       },
       "bluesky": {
         "enabled": true,
         "posts": [{"text": "Bluesky copy...", "media_ids": ["<media_id>"]}]
       }
     }
   }
   ```
   This creates **one draft** in Typefully with per-platform variations — not separate drafts.

### Character Limits

| Platform | Char Limit | URL Counting | Notes |
|----------|-----------|--------------|-------|
| **X** | **280** (standard) / 25,000 (Premium) | URLs = 23 chars (t.co shortening) | Media attachments don't count |
| **LinkedIn** | 3,000 | Full URL length counts | |
| **Mastodon** | 500 (default; varies by instance) | URLs = 23 chars | bbiz.io may differ |
| **Bluesky** | **300** | Full URL length counts | Shortest limit — write tightest copy here |

When composing copy, always verify the total character count against the platform limit. For X standard accounts, subtract 23 for the URL and count the remaining text — it must fit in 257 characters. If the post exceeds the limit, use a Typefully thread (multiple entries in the `posts` array) to split it across posts.

### Copy Guidelines

| Platform | Style |
|----------|-------|
| **X** | Punchy, hook-driven, one key insight. Must fit 280 chars (URL = 23). Use thread if longer. |
| **LinkedIn** | Professional, problem→solution narrative, mentions C#/tools. 3-5 paragraphs, under 3,000 chars. |
| **Mastodon** | Conversational, benefit-focused. Under 500 chars. |
| **Bluesky** | Tightest copy — must fit 300 chars including full URL. |

- Always include the article URL: `https://consultwithgriff.com/{permalink}`
- Always attach the OG image from `public/og/{slug}.png`
- Tone: first-person, "I learned" / "I wrote up" — authentic, not promotional
- **Validate lengths before creating drafts** — count characters and compare against limits above
