import * as React from "react"
import { AppMenu } from "@/components/shell/AppMenu"
import { COMPONENT_DEMO_PREVIEWS } from "@/registry/component-previews"
import { DISCOVERED_COMPONENTS } from "@/registry/discovery"
import { ShowcasePageHeader } from "../ShowcasePageHeader"

const FEATURES = DISCOVERED_COMPONENTS.filter((c) => c.category === "Features")
const GROUPS = [...new Set(FEATURES.map((c) => c.feature ?? "Other"))].sort()

/**
 * Feature components: whole parts of the app, grouped by where they live.
 * They run here on the mock backend, with made-up data. `item=` in the link
 * (from a registry card or the palette) scrolls to one.
 */
export function FeaturesShowcase() {
  React.useEffect(() => {
    const item = window.location.hash.match(/item=([a-z-]+)/)?.[1]
    if (item) document.getElementById(`feature-${item}`)?.scrollIntoView({ block: "start" })
  }, [])

  return (
    <div className="flex flex-col gap-10">
      <ShowcasePageHeader
        title="Features"
        description="Whole parts of the AutoScene app, kept in step with it. They run here on the mock backend with made-up data, so what you press is answered, but nothing leaves the page."
      />

      {/* The app's right-click menu, which the rest of this site leaves to the browser. */}
      <AppMenu>
        <div className="flex flex-col gap-10">
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
