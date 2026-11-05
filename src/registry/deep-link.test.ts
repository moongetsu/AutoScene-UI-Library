import { describe, expect, it } from "vitest"
import { hashForPath } from "./deep-link"

const BASE = "/AutoScene-UI-Library/"

describe("hashForPath", () => {
  it("opens a showcase section", () => {
    expect(hashForPath(`${BASE}showcase/features/`, BASE)).toBe("#/showcase?section=features")
  })

  it("opens the section of a primitive, and a named look", () => {
    expect(hashForPath(`${BASE}components/banner/`, BASE)).toBe("#/showcase?section=indicators")
    expect(hashForPath(`${BASE}components/hardware-switch/`, BASE)).toBe("#/showcase?section=toggles")
  })

  it("scrolls to a feature", () => {
    expect(hashForPath(`${BASE}components/plugin-card/`, BASE)).toBe("#/showcase?section=features&item=plugin-card")
  })

  it("leaves everything else alone", () => {
    expect(hashForPath(BASE, BASE)).toBeNull()
    expect(hashForPath(`${BASE}components/nothing-here/`, BASE)).toBeNull()
    expect(hashForPath("/elsewhere/components/banner/", BASE)).toBeNull()
  })
})
