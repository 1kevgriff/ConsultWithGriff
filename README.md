# Kevin W. Griffin's Personal Website & Blog

Personal website and blog built with [Astro](https://astro.build), featuring articles on software development, consulting, and technology.

**Live site:** [consultwithgriff.com](https://consultwithgriff.com)

## Tech Stack

- **Framework:** Astro
- **Styling:** Tailwind CSS v4
- **Language:** TypeScript
- **Deployment:** Azure Static Web Apps

## Development

```bash
# Install dependencies
npm install

# Start dev server at localhost:4321
npm run dev

# Build production site to ./dist/
npm run build

# Preview production build locally
npm run preview

# Type checking
npm run type-check

# Code formatting
npm run format

# Linting
npm run lint
```

## Project Structure

```
/
├── public/              # Static assets (images, fonts, etc.)
├── src/
│   ├── components/      # Reusable Astro components
│   ├── content/
│   │   ├── blog/        # Blog posts (markdown)
│   │   └── docs/        # Documentation pages
│   ├── layouts/         # Page layouts
│   ├── pages/           # Route pages
│   └── styles/          # Global styles
├── scripts/             # Build and utility scripts
└── astro.config.mjs     # Astro configuration
```

## Content Collections

The site uses Astro's Content Collections API:

- **Blog** (`src/content/blog/`) - Markdown blog posts with frontmatter for title, date, tags, categories, and more
- **Docs** (`src/content/docs/`) - Static documentation pages for consulting, courses, and other content

## Learn More

- [Astro Documentation](https://docs.astro.build)
- [Astro Discord](https://astro.build/chat)
