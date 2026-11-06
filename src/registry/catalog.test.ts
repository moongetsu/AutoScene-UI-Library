import { describe, expect, it } from "vitest"
import * as library from "@/index"
import cli from "../../bin/registry.json"
import packageJson from "../../package.json"
import { COMPONENT_DEMO_PREVIEWS } from "./component-previews"
import catalog from "./catalog.json"
import catalogText from "./catalog.json?raw"
import { DISCOVERED_COMPONENTS } from "./discovery"

const CATEGORIES = ["Buttons", "Inputs", "Toggles", "Feedback", "Cards & Media", "Navigation", "Overlays", "Features"]

// Only the paths: nothing here is loaded.
const uiFiles = Object.keys(import.meta.glob(["/src/components/ui/*.tsx", "!/src/components/ui/*.test.tsx"]))
const sourceFiles = new Set(Object.keys(import.meta.glob("/src/**/*.{ts,tsx}")))
// The source of what the CLI copies.
const sources = import.meta.glob<string>(
  ["/src/components/ui/*.{ts,tsx}", "!/src/components/ui/*.test.*", "/src/components/brand/*.tsx", "/src/components/icons.ts", "/src/lib/*.ts"],
  { query: "?raw", import: "default", eager: true },
)

/** What a source file imports from this repo: not `import type`, which leaves nothing behind. */
function localImports(source: string): string[] {
  const found = source.matchAll(/(?:^|\n)(?:import|export)\s+(?!type\s)(?:[^'"]*?\sfrom\s+)?["']((?:\.|@\/)[^"']+)["']/g)
  return [...found].map((m) => m[1])
}

/** `spec` as imported from a file in src/components/ui, as a path under src/, without its extension. */
const fromUi = (spec: string) => (spec.startsWith("@/") ? spec.slice(2) : `components/ui/${spec.slice(2)}`)

const stem = (file: string) => file.replace(/\.tsx?$/, "")

const showcaseSections = Object.keys(import.meta.glob("/src/components/showcase/sections/*Showcase.tsx")).map((f) =>
  f.replace(/^.*\//, "").replace(/Showcase\.tsx$/, "").toLowerCase(),
)

describe("the catalog", () => {
  it("has an entry for every component in src/components/ui", () => {
    const listed = new Set(DISCOVERED_COMPONENTS.map((c) => `/${c.file}`))
    expect(uiFiles.filter((f) => !listed.has(f))).toEqual([])
  })

  it("has one entry per id, and each says what it is and where it is", () => {
    const ids = [...DISCOVERED_COMPONENTS.map((c) => c.id), ...catalog.showcase.map((c) => c.id)]
    expect(ids.filter((id, i) => ids.indexOf(id) !== i)).toEqual([])
    for (const c of DISCOVERED_COMPONENTS) {
      expect(sourceFiles.has(`/${c.file}`), `${c.id}: ${c.file}`).toBe(true)
      expect(CATEGORIES, c.id).toContain(c.category)
      expect(showcaseSections, c.id).toContain(c.section)
      expect(c.description.length, c.id).toBeGreaterThan(0)
      if (c.category === "Features") expect(c.feature, c.id).toBeTruthy()
    }
  })

  it("has a preview for every entry, and no preview without one", () => {
    const ids = DISCOVERED_COMPONENTS.map((c) => c.id).sort()
    expect(Object.keys(COMPONENT_DEMO_PREVIEWS).sort()).toEqual(ids)
  })

  it("says what the package exports for every entry, and the package exports it", () => {
    for (const c of DISCOVERED_COMPONENTS) {
      expect(Array.isArray(c.exports), c.id).toBe(true)
      for (const name of c.exports) expect(library, `${c.id}: ${name}`).toHaveProperty(name)
    }
  })

  it("keeps em and en dashes out of what it says", () => {
    expect(catalogText).not.toMatch(/[\u2013\u2014]/)
  })

  it("has every primitive of the package in the CLI, topbar aside", () => {
    // TopBar is bound to the app's shortcuts and window: it isn't scaffolded.
    const ui = uiFiles.map((f) => f.replace(/^.*\//, "").replace(/\.tsx$/, "")).filter((f) => f !== "topbar")
    // Entries that are a file outside src/components/ui.
    expect(Object.keys(cli).sort()).toEqual([...ui, "card-grid", "discord-mark"].sort())
  })

  it("has in each CLI entry every file its files import", () => {
    for (const [key, entry] of Object.entries(cli)) {
      const have = new Set([...entry.files.map((f) => `components/ui/${stem(f)}`), ...entry.support.map(stem)])
      const paths = [...entry.files.map((f) => `/src/components/ui/${f}`), ...entry.support.map((f) => `/src/${f}`)]
      for (const path of paths) {
        expect(sources, `${key}: ${path}`).toHaveProperty([path])
        for (const spec of localImports(sources[path])) {
          // Only files in ui/ import with "./"; files outside it import with "@/".
          expect([...have], `${key}: ${path} imports ${spec}`).toContain(fromUi(spec))
        }
      }
    }
  })

  it("ships what the CLI copies", () => {
    for (const entry of Object.values(cli)) {
      for (const file of entry.support) expect(packageJson.files, file).toContain(`src/${file}`)
    }
  })
})
