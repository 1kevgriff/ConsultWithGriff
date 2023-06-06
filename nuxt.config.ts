// https://v3.nuxtjs.org/api/configuration/nuxt.config
import { resolve } from 'path';
import { readdirSync } from 'fs';

export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss', '@nuxt/content'],
  debug: true
})
