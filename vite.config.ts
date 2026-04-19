/// <reference types="vitest/config" />

// https://vite.dev/config/
import { createRequire } from "node:module"
import { fileURLToPath } from "node:url"
import path from "path"

import { storybookTest } from "@storybook/addon-vitest/vitest-plugin"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { playwright } from "@vitest/browser-playwright"
import { defineConfig } from "vite"
import dts from "vite-plugin-dts"

const dirname =
    typeof __dirname !== "undefined"
        ? __dirname
        : path.dirname(fileURLToPath(import.meta.url))

const isLib = process.env.BUILD_MODE === "lib"

const requireFromRoot = createRequire(import.meta.url)
const pkg = requireFromRoot("./package.json") as {
    peerDependencies?: Record<string, string>
    dependencies?: Record<string, string>
}

/** npm package names that stay external in the library build (peer + runtime deps + subpaths). */
const libExternalPackageNames = new Set([
    ...Object.keys(pkg.peerDependencies ?? {}),
    ...Object.keys(pkg.dependencies ?? {}),
])

/** True when `id` is a package specifier that must not be bundled into dist. */
function isLibExternal(id: string): boolean {
    if (id.startsWith(".") || path.isAbsolute(id)) return false
    if (id.startsWith("@/")) return false
    for (const name of libExternalPackageNames) {
        if (id === name || id.startsWith(`${name}/`)) return true
    }
    return false
}

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
    plugins: [
        react(),
        ...(isLib ? [] : [tailwindcss()]),
        ...(isLib
            ? [
                  dts({
                      tsconfigPath: "./tsconfig.lib.json",
                      exclude: [
                          "**/*.stories.tsx",
                          "**/*.mdx",
                          "src/docs/**",
                          "src/vite-env.d.ts",
                      ],
                      rollupTypes: false,
                  }),
              ]
            : []),
    ],
    resolve: {
        alias: {
            "@/public": path.resolve(__dirname, "./public"),
            "@": path.resolve(__dirname, "./src"),
        },
    },
    build: isLib
        ? {
              lib: {
                  entry: path.resolve(__dirname, "src/index.ts"),
                  formats: ["es"],
                  fileName: "index",
              },
              rollupOptions: {
                  external: isLibExternal,
                  output: {
                      preserveModules: true,
                      preserveModulesRoot: path.resolve(__dirname, "src"),
                      entryFileNames: "[name].js",
                  },
              },
              outDir: "dist",
              emptyOutDir: true,
              sourcemap: true,
          }
        : undefined,
    test: {
        projects: [
            {
                extends: true,
                plugins: [
                    // The Storybook test plugin for Vitest
                    storybookTest({
                        configDir: path.join(dirname, ".storybook"),
                    }),
                ],
                test: {
                    name: "storybook",
                    browser: {
                        enabled: true,
                        headless: true,
                        provider: playwright({}),
                        instances: [
                            {
                                browser: "chromium",
                            },
                        ],
                    },
                },
            },
        ],
    },
})
