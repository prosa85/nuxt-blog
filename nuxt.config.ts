// https://nuxt.com/docs/api/configuration/nuxt-config
import vuetify, { transformAssetUrls } from "vite-plugin-vuetify";
import { createClient } from "@sanity/client";

// Function to fetch slugs from Sanity
async function fetchSlugs() {
    const sanityClient = createClient({
        projectId: "ombs0vlk",
        dataset: "vueproject", // Replace with your Sanity dataset
        useCdn: true,
    });

    const posts = await sanityClient.fetch('*[_type == "post"]{slug}');
    return posts.map((post) => post.slug.current);
}

export default defineNuxtConfig(async () => {
    const slugs = await fetchSlugs();
    const dynamicRoutes = slugs.map((slug) => `/blog/${slug}`);

    return {
        target: "static",
        devtools: {
            enabled: true,
            timeline: {
                enabled: true,
            },
        },
        nitro: {
            prerender: {
                crawlLinks: true,
                routes: ["/", ...dynamicRoutes],
            },
        },
        routeRules: {
            "/": { prerender: true },
        },
        build: {
            transpile: ["vuetify"],
        },
        modules: [
            "@nuxtjs/sanity",
            (_options, nuxt) => {
                nuxt.hooks.hook("vite:extendConfig", (config) => {
                    config.plugins.push(vuetify({ autoImport: true }));
                });
            },
        ],
        vite: {
            plugins: [
                vuetify({
                    autoImport: true,
                    styles: { configFile: "path/to/your/vuetify/styles.scss" },
                }),
            ],
        },
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
    };
});
