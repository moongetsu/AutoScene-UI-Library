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
    <AnimatePresence mode="popLayout">
      {open && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[14vh] px-4">
          {/* Animated Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            onClick={() => onOpenChange(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-md"
          />

          {/* Morphing Palette Modal */}
          <motion.div
            layoutId="shared-command-palette-morph"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 32,
              mass: 0.8,
            }}
            className="relative z-10 w-[min(580px,calc(100vw-32px))] rounded-2xl border border-white/10 bg-[#0d0d10] p-0 shadow-2xl focus:outline-none overflow-hidden"
          >
            <Command
              shouldFilter={false}
              className="flex flex-col w-full bg-transparent"
            >
              {/* Top search bar */}
              <div className="flex items-center gap-3 px-4 py-3 border-b border-white/[0.08] bg-white/[0.02]">
                <MagnifyingGlass className="size-5 text-accent shrink-0" />
                <Command.Input
                  autoFocus
                  value={search}
                  onValueChange={setSearch}
                  placeholder="Search components, documentation, or jump to tabs..."
                  className="w-full bg-transparent text-sm text-fg-1 placeholder:text-fg-3 outline-none"
                />
                <button
                  type="button"
                  onClick={() => onOpenChange(false)}
                  className="size-6 rounded-full flex items-center justify-center text-fg-3 hover:text-white hover:bg-white/[0.1] transition-colors cursor-pointer mr-1"
                  title="Close (Esc)"
                >
                  <X className="size-3.5" />
                </button>
                <kbd className="text-[10px] font-mono text-fg-3 bg-white/[0.06] px-1.5 py-0.5 rounded border border-white/[0.08]">
                  ESC
                </kbd>
              </div>

              {/* Items list with smooth height transitions */}
              <Command.List className="max-h-[360px] overflow-y-auto p-2 scrollbar-thin scrollbar-thumb-white/10 transition-[height] duration-150 ease-out">
                {filteredNav.length === 0 && filteredComponents.length === 0 && (
                  <Command.Empty className="py-8 text-center text-xs text-fg-3">
                    No matching components found.
                  </Command.Empty>
                )}

                {/* Navigation group */}
                {filteredNav.length > 0 && (
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
                          delay: index * 0.03,
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
                    heading="Components & Primitives"
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
                          delay: Math.min(index * 0.025, 0.25),
                        }}
                      >
                        <Command.Item
                          value={`${item.title} ${item.category} ${item.description}`}
                          onSelect={() => navigateTo("showcase", item.showcaseSection)}
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
