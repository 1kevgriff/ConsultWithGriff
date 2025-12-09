import { z, defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';

// Blog collection - matches Gridsome frontmatter schema
const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    permalink: z.string().optional(),
    description: z.string(),
    summary: z.string(),
    tags: z.array(z.string()),
    categories: z.array(z.string()),
    excerpt: z.string().optional(),
    timeToRead: z.number().optional(),
  }),
});

// Documentation collection - matches Gridsome docs schema
const docs = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/docs' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    permalink: z.string().optional(),
    categories: z.array(z.string()),
    excerpt: z.string().optional(),
  }),
});

// Export collections
export const collections = { blog, docs };
