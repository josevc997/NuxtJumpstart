import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  ssr: false,
  css: ["~/assets/css/main.css"],
  vite: {
    plugins: [tailwindcss()],
  },

  runtimeConfig: {
    backendUrl: "",
    public: {
      backendUrl: "",
    },
  },

  modules: [
    "nuxt-headlessui",
    "@nuxt/image",
    "@nuxtjs/i18n",
    "@pinia/nuxt",
    "@nuxt/devtools",
    "@sidebase/nuxt-auth",
    "@vee-validate/nuxt",
    "shadcn-nuxt",
    "@nuxt/icon",
  ],

  devtools: { enabled: true, vueDevTools: true },

  // Optionally change the default prefix.
  headlessui: {
    prefix: "",
  },

  image: {
    dir: "assets/img",
  },

  i18n: {
    /* module options */
    locales: [
      {
        code: "en",
        file: "./en.json",
      },
      {
        code: "es",
        file: "./es.json",
      },
    ],
    strategy: "no_prefix",
  },

  imports: {
    dirs: ["./stores"],
  },

  pinia: {},

  auth: {
    baseURL: `${process.env.NUXT_BACKEND_URL}/api/users`,
    provider: {
      type: "local",
      pages: {
        login: "/login",
      },
      endpoints: {
        signIn: { path: "/login/", method: "post" },
        signOut: { path: "/logout/", method: "post" },
        getSession: { path: "/session/", method: "post" },
      },
      token: {
        maxAgeInSeconds: 60 * 60 * 1,
      },
      session: {
        dataType: {
          refresh: "string",
          access: "string",
          id: "number",
          _id: "number",
          username: "string",
          email: "string",
          name: "string",
          isAdmin: "boolean",
          token: "string",
          image: "string",
        },
      },
    },
    sessionRefresh: {
      enableOnWindowFocus: true,
      enablePeriodically: false,
    },
    globalAppMiddleware: true,
  },

  veeValidate: {
    // disable or enable auto imports
    autoImports: true,
  },
  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: "",
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: "./components/ui",
  },

  compatibilityDate: "2025-04-15",
});
