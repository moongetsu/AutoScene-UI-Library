import * as React from "react"
import { GithubLogo, MagnifyingGlass, Check, Copy } from "@phosphor-icons/react"
import { AutoSceneMark } from "@/components/brand/AutoSceneMark"
import { Button } from "@/components/ui/button"
import { ShowcaseNav, type ShowcaseSectionId } from "./ShowcaseNav"
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

export function ShowcaseLayout() {
  const [active, setActive] = React.useState<ShowcaseSectionId>("buttons")
  const [copied, setCopied] = React.useState(false)

  const copyCli = () => {
    navigator.clipboard.writeText("npx @moongetsu/autoscene-ui add")
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-[#070709] text-fg-1 flex flex-col font-sans selection:bg-accent/30 selection:text-white">
      {/* Unified Top Navbar */}
      <header className="sticky top-0 z-50 h-16 border-b border-white/[0.08] bg-[#070709]/80 backdrop-blur-xl px-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <a href="#/" className="flex items-center gap-3 group">
            <AutoSceneMark className="size-7" />
            <span className="font-bold text-lg tracking-tight text-white flex items-center gap-1.5 group-hover:text-accent transition-colors">
              AutoScene <span className="text-xs px-2 py-0.5 rounded-full bg-accent/15 text-accent font-mono font-medium">UI</span>
            </span>
          </a>
        </div>

        {/* Navigation Switcher Pills */}
        <div className="flex items-center gap-1 rounded-full bg-white/[0.04] p-1 border border-white/[0.08]">
          <a
            href="#/"
            className="text-xs font-medium text-fg-2 hover:text-white px-3.5 py-1.5 rounded-full transition-colors"
          >
            Registry
          </a>
          <a
            href="#/showcase"
            className="text-xs font-semibold text-white px-3.5 py-1.5 rounded-full bg-white/[0.08] shadow-sm"
          >
            Showcase
          </a>
        </div>

        <div className="flex items-center gap-4">
          <a
            href="https://github.com/moongetsu/AutoScene-UI-Library"
            target="_blank"
            rel="noreferrer"
            className="text-fg-3 hover:text-white transition-colors"
            aria-label="GitHub Repository"
          >
            <GithubLogo className="size-5" />
          </a>
          <Button variant="primary" size="sm" onClick={copyCli}>
            {copied ? (
              <>
                <Check className="size-3.5 text-accent mr-1" /> Copied CLI
              </>
            ) : (
              "Get Started"
            )}
          </Button>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col lg:flex-row">
        {/* Navigation Sidebar */}
        <ShowcaseNav activeSection={active} onSelect={setActive} />

        {/* Content Viewer Stage */}
        <main className="flex-1 p-6 lg:p-12 overflow-y-auto">
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
