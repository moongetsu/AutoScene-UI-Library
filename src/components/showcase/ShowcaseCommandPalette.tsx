import * as React from "react"
import { Command } from "cmdk"
import { motion, AnimatePresence } from "motion/react"
import {
  MagnifyingGlass,
  CursorClick,
  Tag,
  Square,
  ToggleLeft,
  CircleNotch,
  ChatCircle,
  Image,
  Cards,
  Sidebar,
  Palette,
  SlidersHorizontal,
  Code,
  ArrowSquareOut,
  ArrowRight,
  X,
  Compass,
  SquaresFour,
} from "@/components/icons"
import { REGISTRY_COMPONENTS } from "@/data/registry-items"
import { Tooltip } from "@/components/ui/tooltip"

interface ShowcaseCommandPaletteProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onNavigateSection?: (sectionId: string) => void
}

const SECTION_ICONS: Record<string, React.ReactNode> = {
  buttons: <CursorClick className="size-4 text-accent" />,
  badges: <Tag className="size-4 text-accent" />,
  inputs: <Square className="size-4 text-accent" />,
  toggles: <ToggleLeft className="size-4 text-accent" />,
  indicators: <CircleNotch className="size-4 text-accent" />,
  overlays: <ChatCircle className="size-4 text-accent" />,
  media: <Image className="size-4 text-accent" />,
  cards: <Cards className="size-4 text-accent" />,
  shell: <Sidebar className="size-4 text-accent" />,
  features: <SquaresFour className="size-4 text-accent" />,
  tokens: <Palette className="size-4 text-accent" />,
  icons: <Image className="size-4 text-accent" />,
  playground: <SlidersHorizontal className="size-4 text-accent" />,
}

const QUICK_LINKS = [
  { id: "buttons", label: "Buttons & Pills", section: "buttons" },
  { id: "icons", label: "Icons", section: "icons" },
  { id: "toggles", label: "Toggles & Sliders", section: "toggles" },
  { id: "inputs", label: "Search & Form Inputs", section: "inputs" },
  { id: "cards", label: "Composite Cards", section: "cards" },
  { id: "features", label: "Features", section: "features" },
  { id: "playground", label: "Button Playground", section: "playground" },
]

export function ShowcaseCommandPalette({
  open,
  onOpenChange,
  onNavigateSection,
}: ShowcaseCommandPaletteProps) {
  const [search, setSearch] = React.useState("")

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault()
        onOpenChange(!open)
      }
      if (e.key === "Escape" && open) {
        e.preventDefault()
        onOpenChange(false)
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [open, onOpenChange])

  // Reset search query when palette closes
  React.useEffect(() => {
    if (!open) {
      setSearch("")
    }
  }, [open])

  const navigateTo = (view: "registry" | "showcase", sectionId?: string, itemId?: string) => {
    onOpenChange(false)
    if (view === "registry") {
      window.location.hash = "#/"
    } else {
      const targetHash = sectionId ? `#/showcase?section=${sectionId}${itemId ? `&item=${itemId}` : ""}` : "#/showcase"
      window.location.hash = targetHash
      if (sectionId && onNavigateSection) {
        onNavigateSection(sectionId)
      }
    }
  }

  // Filter components dynamically so we can stagger animations seamlessly on every search keystroke
  const filteredNav = React.useMemo(() => {
    const q = search.trim().toLowerCase()
    const navItems = [
      {
        id: "nav-registry",
        title: "Component Registry (21st.dev Grid)",
        view: "registry" as const,
        icon: <ArrowSquareOut className="size-4 text-accent" />,
        badge: "View",
      },
      {
        id: "nav-playground",
        title: "Interactive Button Playground",
        view: "showcase" as const,
        sectionId: "playground",
        icon: <SlidersHorizontal className="size-4 text-accent" />,
        badge: "Tool",
      },
    ]
    if (!q) return navItems
    return navItems.filter((i) => i.title.toLowerCase().includes(q))
  }, [search])

  const filteredComponents = React.useMemo(() => {
    const q = search.trim().toLowerCase()
    if (!q) return REGISTRY_COMPONENTS
    return REGISTRY_COMPONENTS.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.showcaseSection.toLowerCase().includes(q)
    )
  }, [search])

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[12vh] px-4">
          {/* Apple-style deep blurred backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            onClick={() => onOpenChange(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-xl"
          />

          {/* Floating Rounded Spotlight Capsule Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: -16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -12 }}
            transition={{
              type: "spring",
              damping: 26,
              stiffness: 350,
              mass: 0.8,
            }}
            className="relative z-10 w-[min(620px,calc(100vw-32px))] rounded-2xl border border-white/10 bg-[#0d0d11]/95 backdrop-blur-2xl p-0 shadow-2xl focus:outline-none overflow-hidden"
          >
            <Command shouldFilter={false} className="flex flex-col w-full bg-transparent">
              {/* Top search input bar */}
              <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/[0.08] bg-white/[0.02]">
                <MagnifyingGlass className="size-5 text-accent shrink-0" />
                <Command.Input
                  autoFocus
                  value={search}
                  onValueChange={setSearch}
                  placeholder="Search components, documentation, or jump to tabs..."
                  className="w-full bg-transparent text-sm text-fg-1 placeholder:text-fg-3/70 outline-none"
                />
                <Tooltip label="Close (Esc)">
                  <button
                    type="button"
                    onClick={() => onOpenChange(false)}
                    className="size-6 rounded-full flex items-center justify-center text-fg-3 hover:text-white hover:bg-white/[0.08] transition-colors cursor-pointer mr-1"
                    aria-label="Close"
                  >
                    <X className="size-3.5" />
                  </button>
                </Tooltip>
                <kbd className="text-[10px] font-mono text-fg-3 bg-white/[0.06] px-1.5 py-0.5 rounded border border-white/[0.08]">
                  ESC
                </kbd>
              </div>

              {/* Quick Searches chips when input is empty */}
              {!search.trim() && (
                <div className="px-3 pt-3 pb-1 border-b border-white/[0.04]">
                  <div className="flex items-center gap-1.5 px-1 pb-2 text-[10px] font-mono uppercase tracking-wider text-fg-3">
                    <Compass className="size-3 text-accent" />
                    <span>Quick Suggestions</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 pb-2">
                    {QUICK_LINKS.map((ql, idx) => (
                      <motion.button
                        key={ql.id}
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.02, duration: 0.15 }}
                        type="button"
                        onClick={() => navigateTo("showcase", ql.section)}
                        className="px-2.5 py-1 rounded-full text-xs font-medium text-fg-2 bg-white/[0.04] hover:bg-white/[0.08] hover:text-white border border-white/[0.06] transition-colors cursor-pointer flex items-center gap-1.5"
                      >
                        <span>{ql.label}</span>
                        <ArrowRight className="size-3 text-fg-3" />
                      </motion.button>
                    ))}
                  </div>
                </div>
              )}

              {/* Items list with smooth height transitions */}
              <Command.List className="max-h-[380px] overflow-y-auto p-2 scrollbar-thin scrollbar-thumb-white/10 transition-[height] duration-150 ease-out">
                {search.trim() && filteredNav.length === 0 && filteredComponents.length === 0 && (
                  <Command.Empty className="py-8 text-center text-xs text-fg-3">
                    No matching components found for "{search}".
                  </Command.Empty>
                )}

                {/* Navigation group */}
                {filteredNav.length > 0 && search.trim() && (
                  <Command.Group
                    heading="Navigation"
                    className="text-[11px] font-medium text-fg-3 px-2 py-1.5 [&_[cmdk-group-heading]]:text-[10px] [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-wider"
                  >
                    {filteredNav.map((item, index) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          type: "spring",
                          damping: 24,
                          stiffness: 300,
                          delay: index * 0.02,
                        }}
                      >
                        <Command.Item
                          onSelect={() => navigateTo(item.view, item.sectionId)}
                          className="flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium text-fg-2 hover:bg-white/[0.06] hover:text-white cursor-pointer data-[selected=true]:bg-white/[0.08] data-[selected=true]:text-white transition-colors"
                        >
                          <div className="flex items-center gap-2.5">
                            {item.icon}
                            <span>{item.title}</span>
                          </div>
                          <span className="text-[10px] font-mono text-fg-3">{item.badge}</span>
                        </Command.Item>
                      </motion.div>
                    ))}
                  </Command.Group>
                )}

                {/* Components group */}
                {filteredComponents.length > 0 && (
                  <Command.Group
                    heading={search.trim() ? "Components & Primitives" : "All Components"}
                    className="text-[11px] font-medium text-fg-3 px-2 py-1.5 [&_[cmdk-group-heading]]:text-[10px] [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-wider"
                  >
                    {filteredComponents.map((item, index) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          type: "spring",
                          damping: 24,
                          stiffness: 300,
                          delay: Math.min(index * 0.02, 0.22),
                        }}
                      >
                        <Command.Item
                          value={`${item.title} ${item.category} ${item.description}`}
                          onSelect={() => navigateTo("showcase", item.showcaseSection, item.category === "Features" ? item.id : undefined)}
                          className="flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium text-fg-2 hover:bg-white/[0.06] hover:text-white cursor-pointer data-[selected=true]:bg-white/[0.08] data-[selected=true]:text-white transition-colors group"
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            {SECTION_ICONS[item.showcaseSection] || (
                              <Code className="size-4 text-accent" />
                            )}
                            <div className="flex flex-col min-w-0">
                              <span className="text-white truncate">{item.title}</span>
                              <span className="text-[10px] text-fg-3 truncate font-mono">
                                {item.description}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 shrink-0 pl-2">
                            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/[0.04] text-fg-3">
                              {item.category}
                            </span>
                            <ArrowRight className="size-3.5 text-fg-3 group-hover:text-white group-hover:translate-x-0.5 transition-transform" />
                          </div>
                        </Command.Item>
                      </motion.div>
                    ))}
                  </Command.Group>
                )}
              </Command.List>
            </Command>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
