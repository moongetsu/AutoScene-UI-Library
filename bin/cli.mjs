#!/usr/bin/env node

import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const ROOT = path.resolve(__dirname, "..")

// Known UI component primitives and their support files
const COMPONENT_REGISTRY = {
  button: {
    files: ["button.tsx"],
    deps: ["@phosphor-icons/react", "motion", "tailwind-merge", "clsx"],
  },
  badge: {
    files: ["badge.tsx"],
    deps: ["clsx", "tailwind-merge"],
  },
  input: {
    files: ["input.tsx"],
    deps: ["@phosphor-icons/react", "clsx", "tailwind-merge"],
  },
  switch: {
    files: ["switch.tsx"],
    deps: ["radix-ui", "clsx", "tailwind-merge"],
  },
  slider: {
    files: ["slider.tsx"],
    deps: ["radix-ui", "motion", "clsx", "tailwind-merge"],
  },
  segmented: {
    files: ["segmented.tsx"],
    deps: ["motion", "clsx", "tailwind-merge"],
  },
  kbd: {
    files: ["kbd.tsx"],
    deps: ["clsx", "tailwind-merge"],
  },
  progress: {
    files: ["progress.tsx"],
    deps: ["clsx", "tailwind-merge"],
  },
  skeleton: {
    files: ["skeleton.tsx"],
    deps: ["clsx", "tailwind-merge"],
  },
  tooltip: {
    files: ["tooltip.tsx"],
    deps: ["radix-ui", "clsx", "tailwind-merge"],
  },
  toaster: {
    files: ["toaster.tsx"],
    deps: ["sonner", "@phosphor-icons/react", "clsx", "tailwind-merge"],
  },
  "empty-state": {
    files: ["empty-state.tsx"],
    deps: ["clsx", "tailwind-merge"],
  },
  "error-state": {
    files: ["error-state.tsx"],
    deps: ["@phosphor-icons/react", "clsx", "tailwind-merge"],
  },
  artwork: {
    files: ["artwork.tsx"],
    deps: ["clsx", "tailwind-merge"],
  },
  hero: {
    files: ["hero.tsx"],
    deps: ["clsx", "tailwind-merge"],
  },
  select: {
    files: ["select.tsx"],
    deps: ["radix-ui", "@phosphor-icons/react", "clsx", "tailwind-merge"],
  },
  sheet: {
    files: ["sheet.tsx"],
    deps: ["radix-ui", "motion", "@phosphor-icons/react", "clsx", "tailwind-merge"],
  },
  shelf: {
    files: ["shelf.tsx"],
    deps: ["motion", "clsx", "tailwind-merge"],
  },
  dialog: {
    files: ["dialog.tsx"],
    deps: ["radix-ui", "@phosphor-icons/react", "clsx", "tailwind-merge"],
  },
  "filter-bar": {
    files: ["filter-bar.tsx", "dropdown-menu.tsx", "menu-base.ts"],
    deps: ["radix-ui", "motion", "@phosphor-icons/react", "clsx", "tailwind-merge"],
  },
  "dropdown-menu": {
    files: ["dropdown-menu.tsx", "menu-base.ts", "context-menu.tsx"],
    deps: ["radix-ui", "@phosphor-icons/react", "clsx", "tailwind-merge"],
  },
  "context-menu": {
    files: ["context-menu.tsx", "menu-base.ts"],
    deps: ["radix-ui", "@phosphor-icons/react", "clsx", "tailwind-merge"],
  },
  "context-area": {
    files: ["context-area.tsx"],
    deps: ["clsx", "tailwind-merge"],
  },
  "menu-actions": {
    files: ["menu-actions.tsx"],
    deps: ["@phosphor-icons/react", "clsx", "tailwind-merge"],
  },
  topbar: {
    files: ["topbar.tsx"],
    deps: ["@phosphor-icons/react", "clsx", "tailwind-merge"],
  },
  page: {
    files: ["page.tsx", "page-scroll.ts"],
    deps: ["clsx", "tailwind-merge"],
  },
  "virtual-grid": {
    files: ["virtual-grid.tsx", "page-scroll.ts"],
    deps: ["@tanstack/react-virtual", "clsx", "tailwind-merge"],
  },
}

function showHelp() {
  console.log(`
AutoScene UI CLI

Usage:
  npx @moongetsu/autoscene-ui add <component> [options]
  npx @moongetsu/autoscene-ui list

Commands:
  add <component>    Scaffold a component primitive into your project
  list               List all available component primitives

Options:
  --dir <path>       Target directory (default: src/components/ui)
  --help             Show this help menu

Examples:
  npx @moongetsu/autoscene-ui add button
  npx @moongetsu/autoscene-ui add toaster
  npx @moongetsu/autoscene-ui add filter-bar
  npx @moongetsu/autoscene-ui add all
`)
}

function listComponents() {
  console.log("\nAvailable AutoScene UI Components:\n")
  const keys = Object.keys(COMPONENT_REGISTRY).sort()
  for (const key of keys) {
    console.log(`  - ${key}`)
  }
  console.log(`\nTotal: ${keys.length} components\n`)
}

async function addComponent(componentName, targetDir) {
  const component = COMPONENT_REGISTRY[componentName]
  if (!component) {
    console.error(`\nError: Component "${componentName}" not found in registry.`)
    console.log("Run `npx @moongetsu/autoscene-ui list` to see available components.\n")
    process.exit(1)
  }

  // Ensure target folder exists
  const destDir = path.resolve(process.cwd(), targetDir)
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true })
  }

  const srcDir = path.join(ROOT, "src", "components", "ui")

  // Copy each file required for this component
  for (const file of component.files) {
    const srcFile = path.join(srcDir, file)
    const destFile = path.join(destDir, file)

    if (fs.existsSync(srcFile)) {
      let content = fs.readFileSync(srcFile, "utf8")
      // Normalize internal imports if needed
      content = content.replace(/@\/lib\/utils/g, "@/lib/utils")
      fs.writeFileSync(destFile, content, "utf8")
      console.log(`  Added ${file} -> ${path.relative(process.cwd(), destFile)}`)
    }
  }

  if (component.deps.length > 0) {
    console.log(`\nDependencies used: ${component.deps.join(" ")}`)
    console.log(`Install if missing: npm install ${component.deps.join(" ")}`)
  }
}

async function main() {
  const args = process.argv.slice(2)
  const command = args[0]

  if (!command || args.includes("--help") || args.includes("-h")) {
    showHelp()
    return
  }

  if (command === "list") {
    listComponents()
    return
  }

  if (command === "add") {
    const componentName = args[1]
    if (!componentName) {
      console.error("\nError: Please specify a component to add, e.g. `add button` or `add all`.\n")
      showHelp()
      process.exit(1)
    }

    let targetDir = "src/components/ui"
    const dirIndex = args.indexOf("--dir")
    if (dirIndex !== -1 && args[dirIndex + 1]) {
      targetDir = args[dirIndex + 1]
    }

    console.log(`\nAutoScene UI Scaffolder\nTarget directory: ${targetDir}\n`)

    if (componentName === "all") {
      const allKeys = Object.keys(COMPONENT_REGISTRY)
      for (const name of allKeys) {
        console.log(`\nScaffolding ${name}...`)
        await addComponent(name, targetDir)
      }
      console.log("\nAll components successfully scaffolded!\n")
      return
    }

    await addComponent(componentName, targetDir)
    console.log(`\nComponent "${componentName}" successfully added!\n`)
    return
  }

  console.error(`\nUnknown command: "${command}"`)
  showHelp()
  process.exit(1)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})

