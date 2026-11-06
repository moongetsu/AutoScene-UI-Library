#!/usr/bin/env node

import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const ROOT = path.resolve(__dirname, "..")

// Every primitive with the files it needs and the packages they import.
// catalog.test.ts checks this list against the imports in the source.
const COMPONENT_REGISTRY = JSON.parse(fs.readFileSync(path.join(__dirname, "registry.json"), "utf8"))

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
  --src <path>       What @/ means in your project, for the files the
                     components share (default: src)
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

async function addComponent(componentName, targetDir, srcRoot) {
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
    const destFile = path.join(destDir, file)
    fs.copyFileSync(path.join(srcDir, file), destFile)
    console.log(`  Added ${file} -> ${path.relative(process.cwd(), destFile)}`)
  }

  // Files the components share (icons, cn). One you already have stays yours.
  for (const file of component.support) {
    const destFile = path.resolve(process.cwd(), srcRoot, file)
    if (fs.existsSync(destFile)) {
      console.log(`  Kept ${path.relative(process.cwd(), destFile)}`)
      continue
    }
    fs.mkdirSync(path.dirname(destFile), { recursive: true })
    fs.copyFileSync(path.join(ROOT, "src", file), destFile)
    console.log(`  Added ${file} -> ${path.relative(process.cwd(), destFile)}`)
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

    let srcRoot = "src"
    const srcIndex = args.indexOf("--src")
    if (srcIndex !== -1 && args[srcIndex + 1]) {
      srcRoot = args[srcIndex + 1]
    }

    console.log(`\nAutoScene UI Scaffolder\nTarget directory: ${targetDir}\n`)

    if (componentName === "all") {
      const allKeys = Object.keys(COMPONENT_REGISTRY)
      for (const name of allKeys) {
        console.log(`\nScaffolding ${name}...`)
        await addComponent(name, targetDir, srcRoot)
      }
      console.log("\nAll components successfully scaffolded!\n")
      return
    }

    await addComponent(componentName, targetDir, srcRoot)
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

