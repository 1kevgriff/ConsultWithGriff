// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
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
  integrations: [sitemap(), mdx(), icon()],
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

  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp',
      config: {
        limitInputPixels: false, // Allow large source images
      },
    },
    domains: [], // Only allow local images
    remotePatterns: [], // Block external image optimization
  },

  vite: {
    plugins: [tailwindcss()],
  },
});
