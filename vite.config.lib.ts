import path from "node:path"
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"
import dts from "vite-plugin-dts"

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    dts({
      include: ["src/components/ui", "src/components/brand", "src/components/icons.ts", "src/index.ts", "src/lib/context-areas.ts", "src/lib/errors.ts", "src/lib/grid.ts", "src/lib/motion.ts", "src/lib/open-logs.ts", "src/lib/top-bar-rail.ts", "src/lib/ua.ts", "src/lib/utils.ts"],
      outDir: "dist",
      // The root tsconfig only points at the others: on its own it has no files.
      tsconfigPath: "./tsconfig.app.json",
      entryRoot: "src",
      exclude: ["src/**/*.test.ts", "src/**/*.test.tsx", "src/components/ui/topbar.tsx"],
      insertTypesEntry: true,
      rollupTypes: false,
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "./src"),
    },
  },
  build: {
    lib: {
      entry: path.resolve(import.meta.dirname, "src/index.ts"),
      name: "AutoSceneUI",
      formats: ["es", "cjs"],
      fileName: (format) => (format === "es" ? "index.js" : "index.cjs"),
      // What package.json's "./styles.css" points at.
      cssFileName: "index",
    },
    rollupOptions: {
      // Externalize peer dependencies to keep package lightweight
      external: [
        "react",
        "react-dom",
        "react/jsx-runtime",
        "@phosphor-icons/react",
      ],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          "react/jsx-runtime": "jsxRuntime",
          "@phosphor-icons/react": "PhosphorReact",
        },
      },
    },
    sourcemap: true,
    emptyOutDir: false,
    // The footage and the site's pictures aren't part of the package.
    copyPublicDir: false,
  },
})

