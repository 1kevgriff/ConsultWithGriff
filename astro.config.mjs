// @ts-check
import { defineConfig } from 'astro/config';
import remarkGfm from 'remark-gfm';
import remarkExternalLinks from 'remark-external-links';

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
      // Note: remark-embedder will be added after testing basic config
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
