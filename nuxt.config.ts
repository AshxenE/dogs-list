// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: [
    '@pinia/nuxt',
  ],
  build: {
    publicPath: '/_nuxt/',
  },
  image: {
    staticFilename: '[publicPath]/images/[name][ext]',
  },
})
