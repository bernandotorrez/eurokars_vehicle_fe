// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  $meta: [
    { charset: "utf-8" },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
    { hid: "description", name: "description", content: 'Test' }
  ],
  devtools: { enabled: false },
  modules: ['usebootstrap', '@nuxt/image', '@pinia/nuxt', '@vee-validate/nuxt'],
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
      apiGatewayURL: process.env.API_GATEWAY_URL,
    },
  },
})
