// https://v3.nuxtjs.org/api/configuration/nuxt.config
import { resolve } from 'path';
import { readdirSync } from 'fs';
import { getHighlighter } from 'shiki';


export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss', '@nuxt/content'],
  content: {
    highlight: {
      theme: 'github-light',
      preload: ['json', 'js', 'ts', 'html', 'css', 'vue', 'csharp']
    }
  },
  debug: true
});
