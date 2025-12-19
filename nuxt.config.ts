// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
    compatibilityDate: "2025-07-15",
    modules: ["shadcn-nuxt", "@pinia/nuxt", "@nuxtjs/color-mode"],

    css: ["~/assets/css/tailwind.css"],

    vite: {
        plugins: [tailwindcss()],
    },

    devtools: { enabled: true },
    ssr: false,
    shadcn: {
        /**
         * Prefix for all the imported component.
         * @default "Ui"
         */
        prefix: "",
        /**
         * Directory that the component lives in.
         * Will respect the Nuxt aliases.
         * @link https://nuxt.com/docs/api/nuxt-config#alias
         * @default "@/components/ui"
         */
        componentDir: "@/components/ui",
    },

    colorMode: {
        preference: "dark", // 默认暗色模式
        fallback: "dark", // 回退到暗色
        globalName: "__NUXT_COLOR_MODE__",
        componentName: "ColorScheme",
        classPrefix: "",
        classSuffix: "",
        storageKey: "nuxt-color-mode",
    },
    app: {
        head: {
            script: [
                {
                    async: true,
                    src: "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5978423097771370",
                    crossorigin: "anonymous",
                },
            ],
        },
    },
});
