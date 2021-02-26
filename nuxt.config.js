export default {
  // Target (https://go.nuxtjs.dev/config-target)
  target: "static",

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: "Etudiants Polytech Montpellier",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/fav.ico" }]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: ["~assets/style/main.css", "~assets/style/overlay.scss"],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/buefy
    ["nuxt-buefy", { css: false }],
    // https://go.nuxtjs.dev/axios
    "@nuxtjs/axios",
    // https://auth.nuxtjs.org
    "@nuxtjs/auth-next",
    // https://github.com/nuxt-community/apollo-module
    "@nuxtjs/apollo",
  ],

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {
    baseURL: process.env.BACKEND_URL || "http://localhost:3001/"
  },

  apollo: {
    clientConfigs: {
      default: "~/plugins/auth-linker.js"
    }
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {},

  auth: {
    redirect: {
      login: "/authentification",
      logout: "/",
      callback: "/",
      home: "/"
    },
    strategies: {
      local: {
        scheme: 'refresh',
        token: {
          property: 'access_token'
        },
        refreshToken: {
          property: 'refresh_token'
        },
        endpoints: {
          login: { url: '/oauth/token', method: 'post' },
          refresh: { url: '/oauth/token', method: 'post' },
          user: { url: '/graphql?query=query{me{firstname,lastname,specialty{shortName,year},bde{id,name}}}' },
          logout: false
        },
        user: {
          property: "data.me"
        },
        tokenType: "bearer",
        grantType: 'password',
        scope: []
      },
    }
  }
};
