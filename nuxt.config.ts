// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  css: ["~/assets/css/main.css"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  runtimeConfig: {
    backendUrl: "",
    public: {
      backendUrl: "",
    },
  },
  modules: [
    "nuxt-icon",
    "nuxt-headlessui",
    "@nuxt/image",
    "@nuxtjs/i18n",
    "@pinia/nuxt",
    "@nuxt/devtools",
    "@sidebase/nuxt-auth",
    "@vee-validate/nuxt",
  ],
  devtools: { enabled: true },
  // Optionally change the default prefix.
  headlessui: {
    prefix: "",
  },
  image: {
    dir: "assets/img",
  },
  i18n: {
    /* module options */
  },
  imports: {
    dirs: ["./stores"],
  },
  pinia: {
    autoImports: [
      // automatically imports `defineStore`
      "defineStore", // import { defineStore } from 'pinia'
      ["defineStore", "definePiniaStore"], // import { defineStore as definePiniaStore } from 'pinia'
    ],
  },
  auth: {
    baseURL: `${process.env.NUXT_BACKEND_URL}/api/users`,
    provider: {
      type: "local",
      pages: {
        login: "/login",
      },
      sessionDataType: {
        refresh: "string",
        access: "string",
        id: "number",
        _id: "number",
        username: "string",
        email: "string",
        name: "string",
        isAdmin: "boolean",
        token: "string",
      },
      endpoints: {
        signIn: { path: "/login/", method: "post" },
        signOut: { path: "/logout/", method: "post" },
        getSession: { path: "/session/", method: "post" },
      },
      token: {
        maxAgeInSeconds: 60 * 60 * 1,
      },
    },
    session: {
      enableRefreshOnWindowFocus: true,
      enableRefreshPeriodically: false,
    },
    globalAppMiddleware: true,
  },
  veeValidate: {
    // disable or enable auto imports
    autoImports: true,
  },
});
