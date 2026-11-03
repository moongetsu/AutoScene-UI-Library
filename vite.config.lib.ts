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
      include: ["src/components/ui", "src/components/brand", "src/lib", "src/index.ts"],
      outDir: "dist",
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
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === "style.css") return "index.css"
          return assetInfo.name || "asset"
        },
      },
    },
    sourcemap: true,
    emptyOutDir: false,
  },
})

