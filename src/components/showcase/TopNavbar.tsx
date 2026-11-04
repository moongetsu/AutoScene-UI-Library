import * as React from "react"
import { GithubLogo, MagnifyingGlass, Check, List, X } from "@phosphor-icons/react"
import { motion } from "motion/react"
import { AutoSceneMark } from "@/components/brand/AutoSceneMark"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { SPRING_FAST } from "@/lib/motion"

interface TopNavbarProps {
  activeView: "registry" | "showcase"
  breadcrumb?: string
  onToggleMobileNav?: () => void
  isMobileNavOpen?: boolean
  onOpenCommandPalette?: () => void
  isCommandPaletteOpen?: boolean
}

export function TopNavbar({
  activeView,
  breadcrumb,
  onToggleMobileNav,
  isMobileNavOpen,
  onOpenCommandPalette,
  isCommandPaletteOpen,
}: TopNavbarProps) {
  const [copied, setCopied] = React.useState(false)

  const copyCli = () => {
    navigator.clipboard.writeText("npx @moongetsu/autoscene-ui add")
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <header className="sticky top-0 z-50 h-16 border-b border-white/[0.08] bg-[#070709]/85 backdrop-blur-xl px-4 sm:px-6 lg:px-8 flex items-center justify-between relative overflow-hidden">
      {/* Animated Navbar Content Container: Smoothly dims & shrinks slightly when search curtain opens, exactly like Apple */}
      <motion.div
        animate={isCommandPaletteOpen ? { opacity: 0.25, filter: "blur(2px)", scale: 0.985 } : { opacity: 1, filter: "blur(0px)", scale: 1 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        className="w-full flex items-center justify-between pointer-events-auto"
        style={{ pointerEvents: isCommandPaletteOpen ? "none" : "auto" }}
      >
        {/* Left: Mobile Nav Toggle + Brand + Version + Dynamic Breadcrumb */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {onToggleMobileNav && (
            <button
              type="button"
              onClick={onToggleMobileNav}
              className="lg:hidden size-9 rounded-lg flex items-center justify-center text-fg-2 hover:text-white hover:bg-white/[0.06] transition-colors -ml-1 cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {isMobileNavOpen ? <X className="size-5" /> : <List className="size-5" />}
            </button>
          )}

          <a href="#/" className="flex items-center gap-2 sm:gap-2.5 group">
            <AutoSceneMark bare className="size-5 sm:size-6 transition-transform group-hover:scale-105" />
            <span className="font-bold text-sm sm:text-base tracking-tight text-white flex items-center gap-1.5">
              AutoScene <span className="text-[10px] sm:text-[11px] px-1.5 py-0.5 rounded-md bg-accent/15 text-accent font-mono font-medium">UI</span>
            </span>
          </a>

          {/* Version Badge */}
          <span className="hidden sm:inline-flex text-[10px] font-mono text-fg-3 px-2 py-0.5 rounded-full bg-white/[0.03] border border-white/[0.06]">
            v1.0.3
          </span>

          {/* Dynamic Breadcrumb */}
          {breadcrumb && (
            <div className="hidden md:flex items-center gap-2 text-xs text-fg-3 pl-1 border-l border-white/[0.08]">
              <span className="text-white/20 select-none">/</span>
              <span className="text-white font-medium truncate max-w-[180px]">{breadcrumb}</span>
            </div>
          )}
        </div>

        {/* Right: Search Icon Button + View Switcher + GitHub + Get Started */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Right Placed Search Icon Button */}
          <button
            type="button"
            onClick={onOpenCommandPalette}
            className="size-9 rounded-full border border-white/[0.08] bg-white/[0.03] flex items-center justify-center text-fg-3 hover:text-white hover:bg-white/[0.08] hover:border-white/20 transition-all cursor-pointer shadow-sm group"
            title="Search components (⌘K)"
            aria-label="Open command palette search"
          >
            <MagnifyingGlass className="size-4 group-hover:text-accent transition-colors" />
          </button>

          {/* Registry vs Showcase View Switcher */}
          <div className="relative flex items-center gap-1 rounded-full bg-white/[0.04] p-1 border border-white/[0.08]">
            <a
              href="#/"
              className={cn(
                "relative z-10 text-[11px] sm:text-xs px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full transition-colors",
                activeView === "registry"
                  ? "text-white font-semibold"
                  : "text-fg-2 hover:text-white"
              )}
            >
              {activeView === "registry" && (
                <motion.div
                  layoutId="topnavbar-active-pill"
                  transition={SPRING_FAST}
                  className="absolute inset-0 rounded-full bg-white/[0.12] shadow-sm -z-10"
                />
              )}
              Registry
            </a>
            <a
              href="#/showcase"
              className={cn(
                "relative z-10 text-[11px] sm:text-xs px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full transition-colors",
                activeView === "showcase"
                  ? "text-white font-semibold"
                  : "text-fg-2 hover:text-white"
              )}
            >
              {activeView === "showcase" && (
                <motion.div
                  layoutId="topnavbar-active-pill"
                  transition={SPRING_FAST}
                  className="absolute inset-0 rounded-full bg-white/[0.12] shadow-sm -z-10"
                />
              )}
              Showcase
            </a>
          </div>

          {/* GitHub Link */}
          <a
            href="https://github.com/moongetsu/AutoScene-UI-Library"
            target="_blank"
            rel="noreferrer"
            className="hidden size-8 rounded-lg sm:flex items-center justify-center text-fg-3 hover:text-white hover:bg-white/[0.04] transition-colors"
            aria-label="GitHub Repository"
          >
            <GithubLogo className="size-4 sm:size-5" />
          </a>

          {/* CLI Copy / CTA Button */}
          <Button variant="primary" size="sm" onClick={copyCli} className="hidden sm:inline-flex text-xs px-2.5 sm:px-3.5">
            {copied ? (
              <>
                <Check className="size-3.5 text-accent mr-1 animate-pop-in" />
                <span>Copied</span>
              </>
            ) : (
              <span>Get Started</span>
            )}
          </Button>
        </div>
      </motion.div>
    </header>
  )
}
