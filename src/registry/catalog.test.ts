import { describe, expect, it } from "vitest"
import index from "@/index.ts?raw"
import { COMPONENT_DEMO_PREVIEWS } from "./component-previews"
import catalog from "./catalog.json"
import catalogText from "./catalog.json?raw"
import { DISCOVERED_COMPONENTS } from "./discovery"

const CATEGORIES = ["Buttons", "Inputs", "Toggles", "Feedback", "Cards & Media", "Navigation", "Overlays", "Features"]

// Only the paths: nothing here is loaded.
const uiFiles = Object.keys(import.meta.glob(["/src/components/ui/*.tsx", "!/src/components/ui/*.test.tsx"]))
const sourceFiles = new Set(Object.keys(import.meta.glob("/src/**/*.tsx")))
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

  it("names only what the package exports", () => {
    for (const c of DISCOVERED_COMPONENTS) {
      for (const name of c.exports ?? []) expect(index, `${c.id}: ${name}`).toMatch(new RegExp(`\\b${name}\\b`))
    }
  })

  it("keeps em and en dashes out of what it says", () => {
    expect(catalogText).not.toMatch(/[\u2013\u2014]/)
  })
})
