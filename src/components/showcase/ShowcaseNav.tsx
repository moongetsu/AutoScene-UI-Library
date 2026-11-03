import * as React from "react"
import {
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
  VideoCamera,
  MagnifyingGlass,
  GithubLogo,
} from "@phosphor-icons/react"
import { motion, AnimatePresence } from "motion/react"
import { cn } from "@/lib/utils"
import { SPRING_FAST } from "@/lib/motion"

export type ShowcaseSectionId =
  | "buttons"
  | "badges"
  | "inputs"
  | "toggles"
  | "indicators"
  | "overlays"
  | "media"
  | "cards"
  | "shell"
  | "tokens"
  | "icons"
  | "playground"
  | "record"

interface ShowcaseNavProps {
  activeSection: ShowcaseSectionId
  onSelect: (id: ShowcaseSectionId) => void
  isOpen?: boolean
  onClose?: () => void
}

const NAV_ITEMS: { id: ShowcaseSectionId; label: string; icon: React.ReactNode; group: string; count?: number }[] = [
  // Basic UI
  { id: "buttons", label: "Buttons & Pills", icon: <CursorClick className="size-4" />, group: "Components", count: 6 },
  { id: "badges", label: "Badges & Tags", icon: <Tag className="size-4" />, group: "Components", count: 4 },
  { id: "inputs", label: "Inputs & Search", icon: <Square className="size-4" />, group: "Components", count: 3 },
  { id: "toggles", label: "Toggles & Sliders", icon: <ToggleLeft className="size-4" />, group: "Components", count: 5 },
  // Feedback
  { id: "indicators", label: "Status & Progress", icon: <CircleNotch className="size-4" />, group: "Feedback", count: 4 },
  { id: "overlays", label: "Dropdowns & Overlays", icon: <ChatCircle className="size-4" />, group: "Feedback", count: 3 },
  // Media & Shell
  { id: "media", label: "Media & Artwork", icon: <Image className="size-4" />, group: "Layout & Media", count: 3 },
  { id: "cards", label: "Composite Cards", icon: <Cards className="size-4" />, group: "Layout & Media", count: 4 },
  { id: "shell", label: "Shell & Headers", icon: <Sidebar className="size-4" />, group: "Layout & Media", count: 2 },
  // Colors & Tokens
  { id: "tokens", label: "Colors & Tokens", icon: <Palette className="size-4" />, group: "Tokens" },
  { id: "icons", label: "Icons (80+)", icon: <Image className="size-4" />, group: "Tokens", count: 82 },
  // Tools
  { id: "playground", label: "Playground", icon: <SlidersHorizontal className="size-4" />, group: "Tools" },
  { id: "record", label: "Animation Target", icon: <VideoCamera className="size-4" />, group: "Tools" },
]

export function ShowcaseNav({ activeSection, onSelect, isOpen, onClose }: ShowcaseNavProps) {
  const [filter, setFilter] = React.useState("")
  const groups = Array.from(new Set(NAV_ITEMS.map((item) => item.group)))

  const filteredItems = filter.trim()
    ? NAV_ITEMS.filter((i) => i.label.toLowerCase().includes(filter.toLowerCase()) || i.group.toLowerCase().includes(filter.toLowerCase()))
    : NAV_ITEMS

  const handleSelect = (id: ShowcaseSectionId) => {
    onSelect(id)
    onClose?.()
  }

  return (
    <>
      {/* Mobile Drawer Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden transition-opacity"
        />
      )}

      <nav
        className={cn(
          "shrink-0 border-r border-white/[0.08] bg-[#09090c] lg:bg-[#09090c]/80 backdrop-blur-xl flex flex-col justify-between select-none transition-transform duration-300 ease-out z-30 lg:z-10",
          // Mobile: Off-canvas fixed drawer
          "fixed top-16 bottom-0 left-0 w-72 max-w-[85vw] overflow-y-auto lg:sticky lg:top-16 lg:h-[calc(100vh-4rem)] lg:translate-x-0 scrollbar-thin scrollbar-thumb-white/10",
          isOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full lg:translate-x-0"
        )}
      >
      <div className="p-5 flex flex-col gap-4">
        {/* Simple Directory Header */}
        <div className="flex items-center justify-between px-1">
          <h2 className="text-sm font-semibold text-white tracking-tight">Components</h2>
          <span className="text-[11px] font-mono text-fg-3">28 items</span>
        </div>

        {/* Quick Filter Search */}
        <div className="relative">
          <MagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-fg-3 pointer-events-none" />
          <input
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder="Search list..."
            className="w-full h-8 rounded-lg border border-white/[0.08] bg-white/[0.03] pl-9 pr-3 text-xs text-fg-1 placeholder:text-fg-3 focus:outline-none focus:border-accent/60 transition-colors"
          />
        </div>

        {/* Categorized List */}
        <motion.div layout className="flex flex-col gap-5 pt-1">
          <AnimatePresence mode="popLayout" initial={false}>
            {groups.map((group) => {
              const items = filteredItems.filter((item) => item.group === group)
              if (items.length === 0) return null

              return (
                <motion.div
                  key={group}
                  layout="position"
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={SPRING_FAST}
                  className="flex flex-col gap-1"
                >
                  <span className="text-[11px] font-medium text-fg-3 px-2 mb-0.5">
                    {group}
                  </span>

                  <div className="flex flex-col gap-0.5">
                    {items.map((item) => {
                      const active = activeSection === item.id

                      return (
                        <motion.button
                          layout="position"
                          key={item.id}
                          type="button"
                          onClick={() => handleSelect(item.id)}
                          className={cn(
                            "group relative flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors text-left cursor-pointer",
                            active
                              ? "text-white font-semibold"
                              : "text-fg-2 hover:text-white"
                          )}
                        >
                          {active && (
                            <motion.div
                              layoutId="sidebar-active-indicator"
                              transition={SPRING_FAST}
                              className="absolute inset-0 rounded-lg bg-accent/10 border-l-2 border-accent shadow-sm"
                            />
                          )}
                          <div className="relative z-10 flex items-center gap-2.5">
                            <span
                              className={cn(
                                "transition-colors",
                                active ? "text-accent" : "text-fg-3 group-hover:text-fg-2"
                              )}
                            >
                              {item.icon}
                            </span>
                            <span className="truncate">{item.label}</span>
                          </div>

                          {item.count && (
                            <span
                              className={cn(
                                "relative z-10 text-[10px] font-mono px-1.5 py-0.2 rounded transition-colors",
                                active
                                  ? "bg-accent/20 text-accent font-semibold"
                                  : "bg-white/[0.04] text-fg-3 group-hover:text-fg-2"
                              )}
                            >
                              {item.count}
                            </span>
                          )}
                        </motion.button>
                      )
                    })}
                  </div>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Bottom Sticky Author & Metadata Footer */}
      <div className="p-3.5 border-t border-white/[0.06] bg-[#070709]/80 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          {/* Overlapping Avatar Stack */}
          <div className="flex -space-x-2 items-center">
            <a
              href="https://github.com/moongetsu"
              target="_blank"
              rel="noreferrer"
              className="relative z-10 block rounded-full ring-2 ring-[#09090c] hover:z-30 transition-transform hover:scale-110"
              title="Moongetsu"
            >
              <img
                src="https://avatars.githubusercontent.com/u/111883135?v=4"
                alt="Moongetsu"
                className="size-7 rounded-full object-cover"
              />
            </a>
            <a
              href="https://github.com/tcmmi"
              target="_blank"
              rel="noreferrer"
              className="relative z-20 block rounded-full ring-2 ring-[#09090c] hover:z-30 transition-transform hover:scale-110"
              title="tcmmi"
            >
              <img
                src="https://avatars.githubusercontent.com/u/119017174?v=4"
                alt="tcmmi"
                className="size-7 rounded-full object-cover"
              />
            </a>
          </div>

          <div className="flex flex-col text-xs leading-tight">
            <div className="flex items-center gap-1 font-semibold text-white">
              <a
                href="https://github.com/moongetsu"
                target="_blank"
                rel="noreferrer"
                className="hover:text-accent transition-colors"
              >
                Moongetsu
              </a>
              <span className="text-fg-3 font-normal">&</span>
              <a
                href="https://github.com/tcmmi"
                target="_blank"
                rel="noreferrer"
                className="hover:text-accent transition-colors"
              >
                tcmmi
              </a>
            </div>
            <span className="text-[10px] text-fg-3 pt-0.5">AutoScene UI</span>
          </div>
        </div>

        <a
          href="https://github.com/moongetsu/AutoScene-UI-Library"
          target="_blank"
          rel="noreferrer"
          className="size-7 rounded-lg flex items-center justify-center text-fg-3 hover:text-white hover:bg-white/[0.04] transition-colors"
          aria-label="GitHub Repo"
        >
          <GithubLogo className="size-4" />
        </a>
      </div>
    </nav>
    </>
  )
}
