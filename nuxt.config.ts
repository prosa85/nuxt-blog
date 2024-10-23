// https://nuxt.com/docs/api/configuration/nuxt-config
import vuetify, { transformAssetUrls } from "vite-plugin-vuetify";
import { createClient } from "@sanity/client";

// Function to fetch slugs from Sanity
const sanityClient = createClient({
    projectId: "ombs0vlk",
    dataset: "vueproject", // Replace with your Sanity dataset
    useCdn: true,
});
async function fetchPosts() {
    const posts = await sanityClient.fetch('*[_type == "post"]{slug}');
    const posturls = posts.map((post) => post.slug.current);
    return [...posturls];
}
async function fetchPages() {
    const pages = await sanityClient.fetch('*[_type == "page"]{slug}');
    const pageurls = pages.map((page) => page.slug.current);
    return [...pageurls];
}
/**
 * Nuxt configuration options.
 *
 * @remarks
 * These options can be used to configure the behavior of Nuxt.js.
 *
 * @see {@link https://nuxtjs.org/docs/2.x/configuration-glossary/configuration-target}
 * @see {@link https://nuxtjs.org/docs/2.x/configuration-glossary/configuration-devtools}
 * @see {@link https://nuxtjs.org/docs/2.x/configuration-glossary/configuration-nitro}
 * @see {@link https://nuxtjs.org/docs/2.x/configuration-glossary/configuration-route-rules}
 * @see {@link https://nuxtjs.org/docs/2.x/configuration-glossary/configuration-build}
 * @see {@link https://nuxtjs.org/docs/2.x/configuration-glossary/configuration-modules}
 * @see {@link https://nuxtjs.org/docs/2.x/configuration-glossary/configuration-vite}
 * @see {@link https://nuxtjs.org/docs/2.x/configuration-glossary/configuration-sanity}
 * @see {@link https://vitejs.dev/config/}
 *
 * @returns The Nuxt configuration object.
 */
export default defineNuxtConfig(async () => {
    const slugs = await fetchPosts();
    const pages = await fetchPages();
    const dynamicRoutes = slugs.map((slug) => `/blog/${slug}`);
    const dynamicPages = [...pages];
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
                routes: ["/", ...dynamicRoutes, ...dynamicPages],
            },
        },
        routeRules: {
            "/": { isr: true },
            "/blog/**": { isr: true },
        },
        build: {
            transpile: ["vuetify"],
        },
        modules: [
            "@nuxtjs/sanity",
            "@nuxt/image",
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
        components: {
            global: true,
            dirs: ["~/components/modules", "~/components/"],
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
