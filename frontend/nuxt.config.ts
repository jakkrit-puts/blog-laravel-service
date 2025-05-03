import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  modules: [
    "@nuxt/eslint",
    "@nuxt/fonts",
    "@nuxt/image",
    "shadcn-nuxt",
    "@nuxtjs/seo",
  ],
  app: {
    head: {
      htmlAttrs: {
        lang: "th",
      },
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      ],
      titleTemplate: "%s | Jakkrit DEV",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "description", content: "แชร์ความรู้ BLOG TEST" },
        { property: "og:title", content: "Jakkrit DEV" },
        { property: "og:description", content: "แชร์ความรู้ BLOG TEST" },
        { property: "og:image", content: "/og-default.jpg" }, // ภาพตัวอย่างที่แชร์บนโซเชียล
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:site", content: "@yourhandle" },
        { name: "twitter:title", content: "Jakkrit DEV" },
        { name: "twitter:description", content: "แชร์ความรู้ BLOG TEST" },
        { name: "twitter:image", content: "/og-default.jpg" },
      ],
    },
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
  css: ["~/assets/css/tailwind.css"],
  vite: {
    plugins: [tailwindcss()],
    build: {
      sourcemap: false,
    },
  },
  components: true,
});
