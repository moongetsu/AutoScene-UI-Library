import { describe, expect, it } from "vitest"
import { FOOTAGE } from "./footage"

describe("FOOTAGE", () => {
  it("reads its stills from where the site is served", () => {
    for (const f of FOOTAGE) {
      for (const still of f.stills) expect(still.startsWith(`${import.meta.env.BASE_URL}footage/`), still).toBe(true)
    }
  })
})
