import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import vue from "@astrojs/vue";

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
import {remarkReadingTime} from "./remark-reading-time.mjs";

export default defineConfig({
  site: 'https://consultwithgriff.com',
  integrations: [mdx(), sitemap(), vue(), tailwind({
    applyBaseStyles: false
  })],
  markdown: {
    remarkPlugins: [remarkReadingTime],
    shikiConfig: {
      theme: "github-dark"
    }
  },
  redirects: {
    'sitemap.xml' : 'sitemap-index.xml'
  }
});