// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['usebootstrap', "@nuxt/image"],
  usebootstrap: {
    bootstrap: {
      prefix: ``
    },
    html: {
      prefix: `B`
    },
  },
  css: [
    "bootstrap/scss/bootstrap.scss"
  ],
  runtimeConfig: {
    public: {
      baseURL: process.env.BASE_URL,
    },
  },
})
