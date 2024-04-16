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
    // Keys within public are also exposed client-side
    public: {
      apiBase: 'http://localhost:3000/api-gateway'
    }
  }
})