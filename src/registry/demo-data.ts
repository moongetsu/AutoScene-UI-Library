import type { Character, ProjectSummary } from "@/bindings"

/** A still of `public/footage`, wherever the site is served from. */
export const still = (name: string) => `${import.meta.env.BASE_URL}footage/${name}`

/** What the stills below are, for wherever they show. */
export const STILL_CREDIT = "Tears of Steel · Blender Foundation · CC BY 3.0"

/** Everything here is made up for the previews: a project of the open film Tears of Steel. */
export const DEMO_PROJECT: ProjectSummary = {
  id: "demo",
  title: "Tears of Steel",
  kind: "movie",
  content: "live",
  dir: String.raw`C:\Users\you\Videos\Tears of Steel.autoscene`,
  createdAt: 1_760_000_000_000,
  updatedAt: 1_760_500_000_000,
  mediaCount: 1,
  readyCount: 1,
  durationSec: 734,
  poster: still("live-1.webp"),
  posterSmall: still("live-1.webp"),
}

const person = (id: string, name: string, picture: string, shots: number, screenSec: number): Character => ({
  id,
  name,
  label: name,
  hidden: false,
  tracks: shots * 2,
  shots,
  media: 1,
  screenSec,
  cover: still(picture),
  coverSmall: still(picture),
  unsure: 0,
  waiting: 0,
})

export const DEMO_CHARACTERS: Character[] = [person("demo-thom", "Thom", "live-2.webp", 48, 212), person("demo-celia", "Celia", "live-3.webp", 31, 164)]
