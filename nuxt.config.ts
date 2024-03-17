import path from "path";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  css: ["~/assets/css/main.css"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  modules: ["@nuxtjs/tailwindcss", "nuxt-primevue", "@pinia/nuxt", "@nuxtjs/i18n", "@nuxtjs/color-mode"],
  runtimeConfig: {
    public: {
      backendUrl: process.env.NUXT_PUBLIC_BACKEND_URL,
      frontendUrl: process.env.NUXT_PUBLIC_FRONTEND_URL,
      imageBaseUrl: process.env.NUXT_PUBLIC_BACKEND_URL + '/storage/images/'
    },
  },
  imports: {
    dirs: ["./utils"],
  },
  primevue: {
    options: {
      unstyled: true
    },
    importPT: { from: path.resolve(__dirname, "./presets/wind-full/").replace(/\\/g, '/') },
  },
  i18n: {
    locales: [
      {
        code: 'en-US',
        name: 'English'
      },
      {
        code: 'ru-RU',
        name: 'Русский'
      },
    ],     
    strategy: 'no_prefix',
    defaultLocale: "ru-RU",
    vueI18n: './i18n.config.ts'
  },
  routeRules: {
    '/posts/create': { ssr: false },
  },
  colorMode: {
    classSuffix: ''
  },
  experimental: {
    asyncContext: true
  }
});
