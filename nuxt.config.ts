// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    css: ["~/assets/css/main.css"],
    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
        },
    },
    modules: ["nuxt-icon", "nuxt-headlessui"],
    // Optionally change the default prefix.
    headlessui: {
        prefix: "",
    },
});
