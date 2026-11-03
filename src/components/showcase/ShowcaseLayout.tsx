import * as React from "react"
import { TopNavbar } from "./TopNavbar"
import { ShowcaseNav, type ShowcaseSectionId } from "./ShowcaseNav"
import { ShowcaseCommandPalette } from "./ShowcaseCommandPalette"
import { ButtonPlayground } from "./playground/ButtonPlayground"
import { AnimationTarget } from "./recorder/AnimationTarget"
import { SECTION_MAP, DISCOVERED_SECTIONS } from "@/registry/showcase-discovery"

const STATIC_SECTION_COMPONENTS: Record<string, React.ComponentType> = {
  playground: ButtonPlayground,
  record: AnimationTarget,
}

const STATIC_SECTION_LABELS: Record<string, string> = {
  playground: "Playground",
  record: "Animation Target",
}

export function ShowcaseLayout() {
  const getInitialSection = (): ShowcaseSectionId => {
    const hash = window.location.hash
    const match = hash.match(/section=([a-z-]+)/)
    if (match && (match[1] in SECTION_MAP || match[1] in STATIC_SECTION_COMPONENTS)) {
      return match[1] as ShowcaseSectionId
    }
    return DISCOVERED_SECTIONS[0]?.id || "buttons"
  }

  const [active, setActive] = React.useState<ShowcaseSectionId>(getInitialSection)
  const [mobileNavOpen, setMobileNavOpen] = React.useState(false)
  const [paletteOpen, setPaletteOpen] = React.useState(false)

  // Listen to hash changes (e.g. from Command Palette navigation or direct URL)
  React.useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash
      const match = hash.match(/section=([a-z-]+)/)
      if (match && (match[1] in SECTION_MAP || match[1] in STATIC_SECTION_COMPONENTS)) {
        setActive(match[1] as ShowcaseSectionId)
      }
    }
    window.addEventListener("hashchange", handleHash)
    return () => window.removeEventListener("hashchange", handleHash)
  }, [])

  const currentLabel = SECTION_MAP[active]?.label || STATIC_SECTION_LABELS[active] || "Showcase"
  const ActiveComponent = SECTION_MAP[active]?.Component || STATIC_SECTION_COMPONENTS[active]

  return (
    <div className="min-h-screen bg-[#070709] text-fg-1 flex flex-col font-sans selection:bg-accent/30 selection:text-white">
      {/* Quick Search Palette */}
      <ShowcaseCommandPalette
        open={paletteOpen}
        onOpenChange={setPaletteOpen}
        onNavigateSection={(sec) => setActive(sec as ShowcaseSectionId)}
      />

      {/* Top Navbar */}
      <TopNavbar
        activeView="showcase"
        breadcrumb={currentLabel}
        isMobileNavOpen={mobileNavOpen}
        onToggleMobileNav={() => setMobileNavOpen(!mobileNavOpen)}
        onOpenCommandPalette={() => setPaletteOpen(true)}
        isCommandPaletteOpen={paletteOpen}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col lg:flex-row relative">
        {/* Navigation Sidebar (Slide-out drawer on mobile, sticky sidebar on desktop) */}
        <ShowcaseNav
          activeSection={active}
          onSelect={setActive}
          isOpen={mobileNavOpen}
          onClose={() => setMobileNavOpen(false)}
        />

        {/* Content Viewer Stage */}
        <main className="flex-1 p-4 sm:p-6 lg:p-12 overflow-y-auto">
          <div className="max-w-4xl mx-auto pb-24">
            {ActiveComponent ? <ActiveComponent /> : null}
          </div>
        </main>
      </div>
    </div>
  )
}
