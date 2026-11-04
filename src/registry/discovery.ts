import catalog from "./catalog.json"

export interface ComponentMeta {
  id: string
  name: string
  category: "Buttons" | "Inputs" | "Toggles" | "Feedback" | "Cards & Media" | "Navigation" | "Overlays" | "Features"
  /** The showcase section it shows in. */
  section: string
  /** Where in the app it lives (Features only): Plugins, Player, Settings, Shell... */
  feature?: string
  description: string
  file: string
  /** What `src/index.ts` exports for it. Features and app-bound parts have none: they stay in the repo. */
  exports?: string[]
}

/**
 * The catalog is one list: `catalog.json`. The registry, the showcase counts,
 * the command palette and the static pages (`scripts/prerender-routes.mjs`)
 * all read it. `catalog.test.ts` fails when a file in src/components/ui has no
 * entry, or an entry has no preview.
 */
export function getDiscoveredComponents(): ComponentMeta[] {
  return (catalog.entries as ComponentMeta[]).toSorted((a, b) => a.name.localeCompare(b.name))
}

export const DISCOVERED_COMPONENTS = getDiscoveredComponents()
export const TOTAL_UI_COMPONENTS_COUNT = DISCOVERED_COMPONENTS.length
