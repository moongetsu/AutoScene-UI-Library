import * as React from "react"
import { GithubLogo, MagnifyingGlass, Check, Copy, List, X } from "@phosphor-icons/react"
import { AutoSceneMark } from "@/components/brand/AutoSceneMark"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface TopNavbarProps {
  activeView: "registry" | "showcase"
  breadcrumb?: string
  searchValue?: string
  onSearchChange?: (val: string) => void
  searchPlaceholder?: string
  onToggleMobileNav?: () => void
  isMobileNavOpen?: boolean
}

export function TopNavbar({
  activeView,
  breadcrumb,
  searchValue,
  onSearchChange,
  searchPlaceholder = "Search components, primitives... (⌘K)",
  onToggleMobileNav,
  isMobileNavOpen,
}: TopNavbarProps) {
  const [copied, setCopied] = React.useState(false)

  const copyCli = () => {
    navigator.clipboard.writeText("npx @moongetsu/autoscene-ui add")
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <header className="sticky top-0 z-50 h-16 border-b border-white/[0.08] bg-[#070709]/85 backdrop-blur-xl px-4 sm:px-6 lg:px-8 flex items-center justify-between">
      {/* Left: Mobile Nav Toggle + Brand + Version + Dynamic Breadcrumb */}
      <div className="flex items-center gap-2 sm:gap-3">
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

      {/* Middle: Universal Search Bar */}
      <div className="relative w-72 lg:w-96 hidden md:block">
        <MagnifyingGlass className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-fg-3 pointer-events-none" />
        <input
          value={searchValue || ""}
          onChange={(e) => onSearchChange?.(e.target.value)}
          placeholder={searchPlaceholder}
          className="w-full h-9 rounded-full border border-white/[0.08] bg-white/[0.03] pl-10 pr-12 text-xs text-fg-1 placeholder:text-fg-3 focus:outline-none focus:border-accent/60 transition-colors"
        />
        <kbd className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-mono text-fg-3 bg-white/[0.05] px-1.5 py-0.5 rounded border border-white/[0.08] pointer-events-none">
          ⌘K
        </kbd>
      </div>

      {/* Right: Switcher + GitHub + Get Started Button */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Registry vs Showcase Toggle */}
        <div className="flex items-center gap-1 rounded-full bg-white/[0.04] p-1 border border-white/[0.08]">
          <a
            href="#/"
            className={cn(
              "text-[11px] sm:text-xs px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full transition-all",
              activeView === "registry"
                ? "bg-white/[0.1] text-white font-semibold shadow-sm"
                : "text-fg-2 hover:text-white"
            )}
          >
            Registry
          </a>
          <a
            href="#/showcase"
            className={cn(
              "text-[11px] sm:text-xs px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full transition-all",
              activeView === "showcase"
                ? "bg-white/[0.1] text-white font-semibold shadow-sm"
                : "text-fg-2 hover:text-white"
            )}
          >
            Showcase
          </a>
        </div>

        {/* GitHub link */}
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
          rel="noreferrer"
          className="size-8 rounded-lg flex items-center justify-center text-fg-3 hover:text-white hover:bg-white/[0.04] transition-colors"
          aria-label="GitHub Repository"
        >
          <GithubLogo className="size-5" />
        </a>

        {/* CLI Copy / CTA Button */}
        <Button variant="primary" size="sm" onClick={copyCli}>
          {copied ? (
            <>
              <Check className="size-3.5 text-accent mr-1 animate-pop-in" />
              <span>Copied CLI</span>
            </>
          ) : (
            <span>Get Started</span>
          )}
        </Button>
      </div>
    </header>
  )
}

