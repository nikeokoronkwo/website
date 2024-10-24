// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@nuxt/content",
    "@nuxt/image",
    "@nuxtjs/tailwindcss",
    "@nuxtjs/color-mode",
    "@nuxtjs/device",
  ],

  routeRules: {
    "/blog/*": { prerender: true },
    '/rss.xml': { prerender: true }
  },

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  content: {
    navigation: {
      fields: ['description', 'date']
    }
  },

  css: ["~/assets/css/main.css"],
  compatibilityDate: "2024-10-11",
});