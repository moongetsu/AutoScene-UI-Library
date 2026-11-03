import * as React from "react"
import { GithubLogo, MagnifyingGlass, Check, List, X } from "@phosphor-icons/react"
import { motion, AnimatePresence } from "motion/react"
import { AutoSceneMark } from "@/components/brand/AutoSceneMark"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { SPRING_FAST } from "@/lib/motion"

interface TopNavbarProps {
  activeView: "registry" | "showcase"
  breadcrumb?: string
  searchValue?: string
  onSearchChange?: (val: string) => void
  searchPlaceholder?: string
  onToggleMobileNav?: () => void
  isMobileNavOpen?: boolean
  onOpenCommandPalette?: () => void
}

export function TopNavbar({
  activeView,
  breadcrumb,
  searchValue,
  onSearchChange,
  searchPlaceholder = "Search components, primitives... (⌘K)",
  onToggleMobileNav,
  isMobileNavOpen,
  onOpenCommandPalette,
}: TopNavbarProps) {
  const [copied, setCopied] = React.useState(false)
  const [isExpanded, setIsExpanded] = React.useState(false)
  const inputRef = React.useRef<HTMLInputElement>(null)

  const copyCli = () => {
    navigator.clipboard.writeText("npx @moongetsu/autoscene-ui add")
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleOpenSearch = () => {
    setIsExpanded(true)
    setTimeout(() => inputRef.current?.focus(), 50)
  }

  const handleCloseSearch = () => {
    setIsExpanded(false)
  }

  return (
    <header className="sticky top-0 z-50 h-16 border-b border-white/[0.08] bg-[#070709]/85 backdrop-blur-xl px-4 sm:px-6 lg:px-8 flex items-center justify-between relative overflow-hidden">
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

      {/* Middle Animated Search Bar (Expands smoothly into the center when clicked) */}
      <div className="absolute left-1/2 -translate-x-1/2 z-20 pointer-events-none">
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              layoutId="topnavbar-search-bar"
              initial={{ opacity: 0, scale: 0.9, y: -4 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: -4 }}
              transition={{
                type: "spring",
                damping: 25,
                stiffness: 350,
                mass: 0.7,
              }}
              className="pointer-events-auto relative w-[min(480px,calc(100vw-48px))] flex items-center"
            >
              <MagnifyingGlass className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-accent pointer-events-none" />
              <input
                ref={inputRef}
                value={searchValue || ""}
                onChange={(e) => onSearchChange?.(e.target.value)}
                onClick={onOpenCommandPalette}
                onKeyDown={(e) => {
                  if (e.key === "Escape") {
                    handleCloseSearch()
                  }
                }}
                placeholder={searchPlaceholder}
                className="w-full h-10 rounded-full border border-white/20 bg-[#0d0d11] shadow-2xl pl-10 pr-20 text-xs text-white placeholder:text-fg-3 focus:outline-none focus:border-accent/80 transition-all cursor-pointer"
              />
              <div className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
                <kbd
                  onClick={onOpenCommandPalette}
                  className="text-[10px] font-mono text-fg-3 bg-white/[0.08] hover:text-white px-1.5 py-0.5 rounded border border-white/[0.1] cursor-pointer transition-colors"
                >
                  ⌘K
                </kbd>
                <button
                  type="button"
                  onClick={handleCloseSearch}
                  className="size-6 rounded-full flex items-center justify-center text-fg-3 hover:text-white hover:bg-white/[0.1] transition-colors cursor-pointer"
                  title="Close search"
                >
                  <X className="size-3.5" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Right: Search Pill Icon + View Switcher + GitHub + Get Started Button */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        {/* Right Placed Search Trigger Icon Button (Morphs to middle on press) */}
        {!isExpanded && (
          <motion.button
            layoutId="topnavbar-search-bar"
            type="button"
            onClick={handleOpenSearch}
            className="flex items-center gap-2 h-9 px-3 rounded-full border border-white/[0.08] bg-white/[0.03] text-fg-2 hover:text-white hover:bg-white/[0.06] hover:border-white/20 transition-all cursor-pointer group shadow-sm"
            title="Search components (⌘K)"
          >
            <MagnifyingGlass className="size-4 text-fg-3 group-hover:text-accent transition-colors" />
            <span className="hidden xl:inline text-xs font-medium text-fg-3 group-hover:text-white transition-colors">
              Search
            </span>
            <kbd className="hidden sm:inline-flex text-[10px] font-mono text-fg-3 bg-white/[0.05] px-1.5 py-0.5 rounded border border-white/[0.08] group-hover:text-white transition-colors">
              ⌘K
            </kbd>
          </motion.button>
        )}

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
          className="size-8 rounded-lg flex items-center justify-center text-fg-3 hover:text-white hover:bg-white/[0.04] transition-colors"
          aria-label="GitHub Repository"
        >
          <GithubLogo className="size-4 sm:size-5" />
        </a>

        {/* CLI Copy / CTA Button */}
        <Button variant="primary" size="sm" onClick={copyCli} className="text-xs px-2.5 sm:px-3.5">
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
    </header>
  )
}
