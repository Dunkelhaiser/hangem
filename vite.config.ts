import tailwindcss from "@tailwindcss/vite";
import { devtools } from "@tanstack/devtools-vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import tsConfigPaths from "vite-tsconfig-paths";

export default defineConfig({
    plugins: [
        tsConfigPaths(),
        devtools(),
        tanstackRouter({
            target: "react",
            autoCodeSplitting: true,
        }),
        viteReact({
            babel: {
                plugins: ["babel-plugin-react-compiler"],
            },
        }),
        tailwindcss(),
        VitePWA({ registerType: "autoUpdate", workbox: { maximumFileSizeToCacheInBytes: 9_000_000 } }),
    ],
    optimizeDeps: {
        exclude: ["@electric-sql/pglite"],
    },
});
