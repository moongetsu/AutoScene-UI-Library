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
} from "@phosphor-icons/react"
import { REGISTRY_COMPONENTS } from "@/data/registry-items"

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
  tokens: <Palette className="size-4 text-accent" />,
  playground: <SlidersHorizontal className="size-4 text-accent" />,
}

const QUICK_LINKS = [
  { id: "buttons", label: "Buttons & Pills", section: "buttons" },
  { id: "toggles", label: "Toggles & Sliders", section: "toggles" },
  { id: "inputs", label: "Search & Form Inputs", section: "inputs" },
  { id: "cards", label: "Composite Cards", section: "cards" },
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

  const navigateTo = (view: "registry" | "showcase", sectionId?: string) => {
    onOpenChange(false)
    if (view === "registry") {
      window.location.hash = "#/"
    } else {
      const targetHash = sectionId ? `#/showcase?section=${sectionId}` : "#/showcase"
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
        <div className="fixed inset-0 z-[100] flex flex-col items-center">
          {/* Apple Style Deep Scrim Backdrop with Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            onClick={() => onOpenChange(false)}
            className="fixed inset-0 bg-black/75 backdrop-blur-2xl"
          />

          {/* Apple Style Top Expanding Curtain Container */}
          <motion.div
            initial={{ opacity: 0, y: -24, scaleY: 0.96 }}
            animate={{ opacity: 1, y: 0, scaleY: 1 }}
            exit={{ opacity: 0, y: -20, scaleY: 0.98 }}
            transition={{
              duration: 0.3,
              ease: [0.16, 1, 0.3, 1], // Apple proprietary fluid curve
            }}
            className="relative z-10 w-full border-b border-white/[0.08] bg-[#0c0c10]/95 backdrop-blur-3xl shadow-2xl origin-top"
          >
            <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-5 pb-7 flex flex-col gap-4">
              <Command shouldFilter={false} className="flex flex-col w-full bg-transparent">
                {/* Search Bar Head */}
                <div className="flex items-center gap-3.5 pb-3 border-b border-white/[0.08]">
                  <MagnifyingGlass className="size-5 text-accent shrink-0" />
                  <Command.Input
                    autoFocus
                    value={search}
                    onValueChange={setSearch}
                    placeholder="Search components, tokens, or jump to tabs..."
                    className="w-full bg-transparent text-base sm:text-lg text-white placeholder:text-fg-3/70 outline-none font-medium"
                  />
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => onOpenChange(false)}
                      className="size-7 rounded-full flex items-center justify-center text-fg-3 hover:text-white hover:bg-white/[0.08] transition-colors cursor-pointer"
                      title="Cancel (Esc)"
                    >
                      <X className="size-4" />
                    </button>
                    <kbd className="hidden sm:inline-block text-[10px] font-mono text-fg-3 bg-white/[0.06] px-1.5 py-0.5 rounded border border-white/[0.08]">
                      ESC
                    </kbd>
                  </div>
                </div>

                {/* Quick Links Section (Shows when search is empty, exactly like Apple.com) */}
                {!search.trim() && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.08, duration: 0.2 }}
                    className="flex flex-col gap-2 pt-3"
                  >
                    <div className="flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider text-fg-3">
                      <Compass className="size-3.5 text-accent" />
                      <span>Quick Searches</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {QUICK_LINKS.map((ql, idx) => (
                        <motion.button
                          key={ql.id}
                          initial={{ opacity: 0, y: 4 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 + idx * 0.02, duration: 0.2 }}
                          type="button"
                          onClick={() => navigateTo("showcase", ql.section)}
                          className="px-3 py-1.5 rounded-full text-xs font-medium text-fg-2 bg-white/[0.04] hover:bg-white/[0.08] hover:text-white border border-white/[0.06] transition-colors cursor-pointer flex items-center gap-1.5"
                        >
                          <span>{ql.label}</span>
                          <ArrowRight className="size-3 text-fg-3" />
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Dynamic Results List */}
                <Command.List className="max-h-[380px] overflow-y-auto pt-2 scrollbar-thin scrollbar-thumb-white/10 transition-[height] duration-200 ease-out">
                  {search.trim() && filteredNav.length === 0 && filteredComponents.length === 0 && (
                    <Command.Empty className="py-8 text-center text-xs text-fg-3">
                      No matching components found for "{search}".
                    </Command.Empty>
                  )}

                  {/* Navigation Group */}
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
                            duration: 0.2,
                            delay: index * 0.02,
                            ease: [0.16, 1, 0.3, 1],
                          }}
                        >
                          <Command.Item
                            onSelect={() => navigateTo(item.view, item.sectionId)}
                            className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium text-fg-2 hover:bg-white/[0.06] hover:text-white cursor-pointer data-[selected=true]:bg-white/[0.08] data-[selected=true]:text-white transition-colors"
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

                  {/* Components Group */}
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
                            duration: 0.2,
                            delay: Math.min(index * 0.02, 0.25),
                            ease: [0.16, 1, 0.3, 1],
                          }}
                        >
                          <Command.Item
                            value={`${item.title} ${item.category} ${item.description}`}
                            onSelect={() => navigateTo("showcase", item.showcaseSection)}
                            className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium text-fg-2 hover:bg-white/[0.06] hover:text-white cursor-pointer data-[selected=true]:bg-white/[0.08] data-[selected=true]:text-white transition-colors group"
                          >
                            <div className="flex items-center gap-3 min-w-0">
                              {SECTION_ICONS[item.showcaseSection] || (
                                <Code className="size-4 text-accent" />
                              )}
                              <div className="flex flex-col min-w-0">
                                <span className="text-white font-medium truncate">{item.title}</span>
                                <span className="text-[11px] text-fg-3 truncate font-mono">
                                  {item.description}
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center gap-2 shrink-0 pl-2">
                              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/[0.04] text-fg-3">
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
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
