import primevue from './primevue/primevue.config'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: {
    enabled: true,
    timeline: {
      enabled: true,
    },
  },
  ssr: false,
  typescript: {
    shim: false,
    // typeCheck: true,
  },
  experimental: {
    typedPages: true,
    viewTransition: true,
  },
  modules: ['nuxt-primevue', '@nuxtjs/tailwindcss'],
  // @ts-expect-error primevue module throwing TS error
  primevue,
  pages: true,
})
