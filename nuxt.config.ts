// https://nuxt.com/docs/api/configuration/nuxt-config
import vuetify, { transformAssetUrls } from "vite-plugin-vuetify";

export default defineNuxtConfig({
    devtools: {
        enabled: true,

        timeline: {
            enabled: true,
        },
    },
    nitro: {
        prerender: {
            crawlLinks: true,
            routes: ["/"],
        },
    },
    routeRules: {
        // prerender index route by default
        "/": { prerender: true },
    },
    build: {
        transpile: ["vuetify"],
    },
    modules: [
        "@nuxtjs/sanity",
        (_options, nuxt) => {
            nuxt.hooks.hook("vite:extendConfig", (config) => {
                // @ts-expect-error
                config.plugins.push(vuetify({ autoImport: true }));
            });
        },
    ],
    sanity: {
        projectId: "ombs0vlk",
        dataset: "vueproject",
        apiVersion: "2022-03-25",
    },
    vite: {
        vue: {
            template: {
                transformAssetUrls,
            },
        },
    },
});
