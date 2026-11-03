import * as React from "react"
import { TopNavbar } from "./TopNavbar"
import { ShowcaseNav, type ShowcaseSectionId } from "./ShowcaseNav"
import { ShowcaseCommandPalette } from "./ShowcaseCommandPalette"
import { ButtonsShowcase } from "./sections/ButtonsShowcase"
import { BadgesShowcase } from "./sections/BadgesShowcase"
import { InputsShowcase } from "./sections/InputsShowcase"
import { TogglesShowcase } from "./sections/TogglesShowcase"
import { IndicatorsShowcase } from "./sections/IndicatorsShowcase"
import { OverlaysShowcase } from "./sections/OverlaysShowcase"
import { MediaShowcase } from "./sections/MediaShowcase"
import { CardsShowcase } from "./sections/CardsShowcase"
import { ShellShowcase } from "./sections/ShellShowcase"
import { TokensShowcase } from "./sections/TokensShowcase"
import { ButtonPlayground } from "./playground/ButtonPlayground"
import { AnimationTarget } from "./recorder/AnimationTarget"

const SECTION_LABELS: Record<ShowcaseSectionId, string> = {
  buttons: "Buttons & Pills",
  badges: "Badges & Tags",
  inputs: "Inputs & Search",
  toggles: "Toggles & Sliders",
  indicators: "Status & Progress",
  overlays: "Dropdowns & Overlays",
  media: "Media & Artwork",
  cards: "Composite Cards",
  shell: "Shell & Headers",
  tokens: "Colors & Tokens",
  playground: "Playground",
  record: "Animation Target",
}

export function ShowcaseLayout() {
  const getInitialSection = (): ShowcaseSectionId => {
    const hash = window.location.hash
    const match = hash.match(/section=([a-z-]+)/)
    if (match && match[1] in SECTION_LABELS) {
      return match[1] as ShowcaseSectionId
    }
    return "buttons"
  }

  const [active, setActive] = React.useState<ShowcaseSectionId>(getInitialSection)
  const [search, setSearch] = React.useState("")
  const [mobileNavOpen, setMobileNavOpen] = React.useState(false)
  const [paletteOpen, setPaletteOpen] = React.useState(false)

  // Listen to hash changes (e.g. from Command Palette navigation or direct URL)
  React.useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash
      const match = hash.match(/section=([a-z-]+)/)
      if (match && match[1] in SECTION_LABELS) {
        setActive(match[1] as ShowcaseSectionId)
      }
    }
    window.addEventListener("hashchange", handleHash)
    return () => window.removeEventListener("hashchange", handleHash)
  }, [])

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
        breadcrumb={SECTION_LABELS[active]}
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
            {active === "buttons" && <ButtonsShowcase />}
            {active === "badges" && <BadgesShowcase />}
            {active === "inputs" && <InputsShowcase />}
            {active === "toggles" && <TogglesShowcase />}
            {active === "indicators" && <IndicatorsShowcase />}
            {active === "overlays" && <OverlaysShowcase />}
            {active === "media" && <MediaShowcase />}
            {active === "cards" && <CardsShowcase />}
            {active === "shell" && <ShellShowcase />}
            {active === "tokens" && <TokensShowcase />}
            {active === "playground" && <ButtonPlayground />}
            {active === "record" && <AnimationTarget />}
          </div>
        </main>
      </div>
    </div>
  )
}
