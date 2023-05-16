const path = require("path");
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    css: ["~/assets/css/main.css"],
    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
        },
    },
    modules: ["nuxt-icon", "nuxt-headlessui", "@nuxt/content"],
    // Optionally change the default prefix.
    headlessui: {
        prefix: "",
    },
    content: {
        sources: {
            // overwrite default source AKA `content` directory
            content: {
                driver: "fs",
                prefix: "/docs", // All contents inside this source will be prefixed with `/docs`
                base: path.resolve(__dirname, "content"),
            },
        },
    },
});
