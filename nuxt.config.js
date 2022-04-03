export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'nuxt-blog',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;500;700&display=swap',
      },
    ],
  },

  loading: { color: '#fa923f', duration: 5000 },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['~assets/styles/main.css'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    // https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCpKRInQFgiuwSBGTm9ipcKH9qtIXmNx54
    // https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCpKRInQFgiuwSBGTm9ipcKH9qtIXmNx54
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  env: {
    API_KEY: process.env.API_KEY || 'AIzaSyCpKRInQFgiuwSBGTm9ipcKH9qtIXmNx54',
    AUTH_BASE_URL: 'https://identitytoolkit.googleapis.com/v1/accounts:',
    BASE_URL:
      'https://nuxt-blog-66f91-default-rtdb.europe-west1.firebasedatabase.app',
  },
  transition: {
    name: 'fade',
    mode: 'out-in',
  },
};
