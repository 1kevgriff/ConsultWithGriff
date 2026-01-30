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
