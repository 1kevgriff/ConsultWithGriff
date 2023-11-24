import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import vue from "@astrojs/vue";

import tailwind from "@astrojs/tailwind";
import Unfonts from 'unplugin-fonts/astro'

// https://astro.build/config

const unfontOptions = {
  typekit: {
    id: 'wou4pvn',
    defer: true,
    injectTo: 'head-prepend'
  },
};

export default defineConfig({
  site: 'https://consultwithgriff.com',
  integrations: [mdx(), sitemap(), vue(), tailwind({
    applyBaseStyles: false
  }), Unfonts(unfontOptions)],
  markdown: {
    remarkPlugins: [],
    shikiConfig: {
      theme: "github-dark"
    }
  },
  redirects: {
    'sitemap.xml': 'sitemap-index.xml'
  }
});