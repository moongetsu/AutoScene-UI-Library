import * as React from "react"
import { useRouter } from "@tanstack/react-router"
import { AppMenu } from "@/components/shell/AppMenu"
import { COMPONENT_DEMO_PREVIEWS } from "@/registry/component-previews"
import { DISCOVERED_COMPONENTS } from "@/registry/discovery"
import { ShowcasePageHeader } from "../ShowcasePageHeader"

const FEATURES = DISCOVERED_COMPONENTS.filter((c) => c.category === "Features")
const GROUPS = [...new Set(FEATURES.map((c) => c.feature ?? "Other"))].sort()

/** How long a linked entry is held in place while the previews above it size themselves. */
const SETTLE_MS = 3000

/**
 * Takes the page to the entry `item=` in the link names (from a registry card,
 * the palette or a static page), and keeps it there while the previews above
 * it load and change the page's height, until the person scrolls. It runs
 * after the router has rendered, since the router scrolls to the top then,
 * and on a new link while Features is already open.
 */
function useLinkedItem() {
  const router = useRouter()
  const list = React.useRef<HTMLDivElement>(null)
  React.useEffect(() => {
    let release = () => {}
    const follow = () => {
      release()
      const item = window.location.hash.match(/item=([a-z-]+)/)?.[1]
      const target = item ? document.getElementById(`feature-${item}`) : null
      if (!target || !list.current) return
      const place = () => target.scrollIntoView({ block: "start" })
      place()
      const sizes = new ResizeObserver(place)
      sizes.observe(list.current)
      const timer = window.setTimeout(() => release(), SETTLE_MS)
      const stop = () => release()
      window.addEventListener("wheel", stop, { passive: true })
      window.addEventListener("touchmove", stop, { passive: true })
      window.addEventListener("keydown", stop)
      release = () => {
        sizes.disconnect()
        window.clearTimeout(timer)
        window.removeEventListener("wheel", stop)
        window.removeEventListener("touchmove", stop)
        window.removeEventListener("keydown", stop)
        release = () => {}
      }
    }
    follow()
    const rendered = router.subscribe("onRendered", follow)
    window.addEventListener("hashchange", follow)
    return () => {
      release()
      rendered()
      window.removeEventListener("hashchange", follow)
    }
  }, [router])
  return list
}

/**
 * Feature components: whole parts of the app, grouped by where they live.
 * They run here on the mock backend, with made-up data. `item=` in the link
 * scrolls to one.
 */
export function FeaturesShowcase() {
  const list = useLinkedItem()

  return (
    <div className="flex flex-col gap-10">
      <ShowcasePageHeader
        title="Features"
        description="Whole parts of the AutoScene app, kept in step with it. They run here on a mock backend with made-up data. Buttons, menus and dialogs work as in the app, and what needs the desktop app says so."
      />

      {/* The right-click menus of what is shown here, without the app's own entries. */}
      <AppMenu appEntries={false}>
        <div ref={list} className="flex flex-col gap-10">
          {GROUPS.map((group) => (
            <section key={group} className="flex flex-col gap-6">
              <h3 className="text-sm font-semibold text-fg-3">{group}</h3>
              {FEATURES.filter((c) => (c.feature ?? "Other") === group).map((c) => (
                <article
                  key={c.id}
                  id={`feature-${c.id}`}
                  className="scroll-mt-20 overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0c0c0f]"
                >
                  <header className="border-b border-white/[0.06] bg-white/[0.015] px-4 py-3.5 sm:px-6">
                    <h4 className="text-sm font-semibold tracking-tight text-white">{c.name}</h4>
                    <p className="mt-0.5 text-xs text-fg-3">{c.description}</p>
                  </header>
                  <div className="flex min-h-[150px] items-center justify-center p-4 sm:p-8">{COMPONENT_DEMO_PREVIEWS[c.id]()}</div>
                </article>
              ))}
            </section>
          ))}
        </div>
      </AppMenu>
    </div>
  )
}
