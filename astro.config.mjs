// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import icon from 'astro-icon';
import remarkGfm from 'remark-gfm';
import rehypeExternalLinks from 'rehype-external-links';
import remarkYoutube from 'remark-youtube';
import rehypeSlug from 'rehype-slug';
import { remarkReadingTime } from './remark-reading-time.mjs';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://consultwithgriff.com',
  trailingSlash: 'never',
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/coasters') && !page.includes('/training'),
    }),
    icon(),
  ],
  markdown: {
    remarkPlugins: [remarkGfm, remarkYoutube, remarkReadingTime],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypeExternalLinks,
        {
          target: '_blank',
          rel: ['nofollow', 'noopener', 'noreferrer'],
        },
      ],
    ],
    shikiConfig: {
      theme: 'material-theme-palenight',
      wrap: false,
    },
  },

  vite: {
    plugins: [tailwindcss()],
  },
});
