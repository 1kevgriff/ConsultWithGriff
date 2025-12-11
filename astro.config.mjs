// @ts-check
import { defineConfig } from 'astro/config';
import remarkGfm from 'remark-gfm';
import remarkExternalLinks from 'remark-external-links';
import remarkYoutube from 'remark-youtube';
import rehypeSlug from 'rehype-slug';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  markdown: {
    remarkPlugins: [
      remarkGfm,
      // @ts-ignore - Type inference issue with remark plugin options
      [
        remarkExternalLinks,
        {
          target: '_blank',
          rel: ['nofollow', 'noopener', 'noreferrer'],
        },
      ],
      remarkYoutube,
    ],
    rehypePlugins: [rehypeSlug],
    shikiConfig: {
      theme: 'material-theme-palenight',
      wrap: false,
    },
  },

  vite: {
    plugins: [tailwindcss()],
  },
});
