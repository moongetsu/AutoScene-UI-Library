import catalog from "@/registry/catalog.json"
import { DISCOVERED_COMPONENTS } from "@/registry/discovery"

export interface RegistryComponentItem {
  id: string
  title: string
  category: string
  description: string
  importStatement: string
  showcaseSection: string
}

/** What the command palette finds: the named looks of the showcase (`catalog.json`), then every catalog entry. */
export const REGISTRY_COMPONENTS: RegistryComponentItem[] = [
  ...catalog.showcase,
  ...DISCOVERED_COMPONENTS.map((c) => ({
    id: c.id,
    title: c.name,
    category: c.category,
    description: c.description,
    importStatement: c.exports ? `import { ${c.exports[0]} } from "@moongetsu/autoscene-ui"` : "",
    showcaseSection: c.section,
  })),
]
