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
  modules: ["@nuxtjs/tailwindcss", "nuxt-primevue", "@pinia/nuxt"],
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
  routeRules: {
    '/posts/create': { ssr: false },
  },
  experimental: {
    asyncContext: true
  }
});
