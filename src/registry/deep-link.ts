import catalog from "./catalog.json"

/**
 * The hash route of a static page's address (`scripts/prerender-routes.mjs`):
 * a page's URL is for the scrapers, and the app itself routes by hash.
 * `showcase/<section>/` opens that section; `components/<id>/` the section of
 * that entry, a feature scrolled to. Null for anything else.
 */
export function hashForPath(pathname: string, base: string): string | null {
  if (!pathname.startsWith(base)) return null
  const [kind, id, ...rest] = pathname.slice(base.length).split("/").filter(Boolean)
  if (!id || rest.length > 0) return null
  if (kind === "showcase") return `#/showcase?section=${id}`
  if (kind !== "components") return null
  const entry = catalog.entries.find((c) => c.id === id)
  if (entry?.category === "Features") return `#/showcase?section=features&item=${id}`
  if (entry) return `#/showcase?section=${entry.section}`
  const look = catalog.showcase.find((c) => c.id === id)
  return look ? `#/showcase?section=${look.showcaseSection}` : null
}
