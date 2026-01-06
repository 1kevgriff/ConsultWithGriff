// @ts-check
import { defineConfig } from 'astro/config';
import remarkGfm from 'remark-gfm';
import rehypeExternalLinks from 'rehype-external-links';
import remarkYoutube from 'remark-youtube';
import rehypeSlug from 'rehype-slug';
import { remarkReadingTime } from './remark-reading-time.mjs';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
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
