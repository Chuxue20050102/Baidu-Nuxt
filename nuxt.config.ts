import { defineNuxtConfig } from 'nuxt/config'
export default defineNuxtConfig({
  compatibilityDate: '2025-07-11',

  css: [
    '~/assets/css/tailwind.css',
    '~/assets/css/global.scss',
  ],

  postcss: {
    plugins: {
      '@tailwindcss/postcss': {},
      autoprefixer: {},
    },
  },

  app: {
    head: {
      title: 'Nuxt3百度',
    }
  },

  typescript:
  {
    typeCheck:
    true
  },

  modules: ['@nuxt/eslint', '@nuxt/image']
})