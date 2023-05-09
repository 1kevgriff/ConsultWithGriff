// https://v3.nuxtjs.org/api/configuration/nuxt.config
import { resolve } from 'path';
import { readdirSync } from 'fs';

export default defineNuxtConfig({
  modules: ['@nuxt/content'],
  debug: true,
  // generate: {
  //   async routes() {

  //   },
  // }
})
