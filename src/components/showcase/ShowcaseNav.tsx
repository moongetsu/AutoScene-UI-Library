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
import { cn } from "@/lib/utils"

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
  | "playground"
  | "record"

interface ShowcaseNavProps {
  activeSection: ShowcaseSectionId
  onSelect: (id: ShowcaseSectionId) => void
}

const NAV_ITEMS: { id: ShowcaseSectionId; label: string; icon: React.ReactNode; group: string; count?: number }[] = [
  // Primitives
  { id: "buttons", label: "Buttons & Pills", icon: <CursorClick className="size-4" />, group: "Primitives", count: 6 },
  { id: "badges", label: "Badges & Tags", icon: <Tag className="size-4" />, group: "Primitives", count: 4 },
  { id: "inputs", label: "Inputs & Search", icon: <Square className="size-4" />, group: "Primitives", count: 3 },
  { id: "toggles", label: "Toggles & Sliders", icon: <ToggleLeft className="size-4" />, group: "Primitives", count: 5 },
  // Feedback
  { id: "indicators", label: "Indicators & Status", icon: <CircleNotch className="size-4" />, group: "Feedback", count: 4 },
  { id: "overlays", label: "Overlays & Menus", icon: <ChatCircle className="size-4" />, group: "Feedback", count: 3 },
  // Surfaces
  { id: "media", label: "Media & Artwork", icon: <Image className="size-4" />, group: "Surfaces", count: 3 },
  { id: "cards", label: "Composite Cards", icon: <Cards className="size-4" />, group: "Surfaces", count: 4 },
  { id: "shell", label: "Shell & Headers", icon: <Sidebar className="size-4" />, group: "Surfaces", count: 2 },
  // Foundation
  { id: "tokens", label: "Design Tokens", icon: <Palette className="size-4" />, group: "Foundation" },
  // Studio Tools
  { id: "playground", label: "Live Playground", icon: <SlidersHorizontal className="size-4" />, group: "Studio Tools" },
  { id: "record", label: "Animation Target", icon: <VideoCamera className="size-4" />, group: "Studio Tools" },
]

export function ShowcaseNav({ activeSection, onSelect }: ShowcaseNavProps) {
  const [filter, setFilter] = React.useState("")
  const groups = Array.from(new Set(NAV_ITEMS.map((item) => item.group)))

  const filteredItems = filter.trim()
    ? NAV_ITEMS.filter((i) => i.label.toLowerCase().includes(filter.toLowerCase()) || i.group.toLowerCase().includes(filter.toLowerCase()))
    : NAV_ITEMS

  return (
    <nav className="w-full lg:w-72 shrink-0 border-b lg:border-b-0 lg:border-r border-white/[0.08] bg-[#09090c]/80 backdrop-blur-xl flex flex-col justify-between select-none lg:sticky lg:top-16 lg:h-[calc(100vh-4rem)] lg:overflow-y-auto scrollbar-thin scrollbar-thumb-white/10">
      <div className="p-5 flex flex-col gap-5">
        {/* Directory Title & Stats */}
        <div className="flex flex-col gap-1.5 px-1">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase tracking-widest text-accent font-semibold flex items-center gap-1.5">
              <span className="size-1.5 rounded-full bg-accent animate-pulse" />
              Component Studio
            </span>
            <span className="text-[10px] font-mono text-fg-3">28 Primitives</span>
          </div>
          <h2 className="text-sm font-bold text-white tracking-tight">Design System Index</h2>
        </div>

        {/* Quick Filter Search */}
        <div className="relative">
          <MagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-fg-3 pointer-events-none" />
          <input
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder="Filter components..."
            className="w-full h-8 rounded-lg border border-white/[0.08] bg-white/[0.03] pl-9 pr-3 text-xs text-fg-1 placeholder:text-fg-3 focus:outline-none focus:border-accent/60 transition-colors"
          />
        </div>

        {/* Categorized List */}
        <div className="flex flex-col gap-6">
          {groups.map((group) => {
            const items = filteredItems.filter((item) => item.group === group)
            if (items.length === 0) return null

            const isStudio = group === "Studio Tools"

            return (
              <div key={group} className="flex flex-col gap-1">
                <span className="text-[10px] font-semibold text-fg-3 uppercase tracking-wider px-2 mb-1 flex items-center justify-between">
                  <span>{group}</span>
                  {isStudio && (
                    <span className="text-[9px] font-mono text-accent uppercase tracking-wider bg-accent/10 px-1.5 py-0.5 rounded">
                      Interactive
                    </span>
                  )}
                </span>

                <div className={cn("flex flex-col gap-0.5", isStudio && "rounded-xl border border-white/[0.06] bg-white/[0.015] p-1")}>
                  {items.map((item) => {
                    const active = activeSection === item.id

                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => onSelect(item.id)}
                        className={cn(
                          "group relative flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all text-left cursor-pointer",
                          active
                            ? "bg-accent/10 text-white font-semibold border-l-2 border-accent pl-2.5 shadow-sm"
                            : "text-fg-2 hover:bg-white/[0.04] hover:text-white hover:translate-x-0.5"
                        )}
                      >
                        <div className="flex items-center gap-2.5">
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
                              "text-[10px] font-mono px-1.5 py-0.2 rounded transition-colors",
                              active
                                ? "bg-accent/20 text-accent font-semibold"
                                : "bg-white/[0.04] text-fg-3 group-hover:text-fg-2"
                            )}
                          >
                            {item.count}
                          </span>
                        )}
                      </button>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Bottom Sticky Author & Metadata Footer */}
      <div className="p-4 border-t border-white/[0.06] bg-[#070709]/60 flex items-center justify-between">
        <a
          href="https://github.com/moongetsu"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2.5 group cursor-pointer"
        >
          <img
            src="https://avatars.githubusercontent.com/u/111883135?v=4"
            alt="Moongetsu Avatar"
            className="size-7 rounded-full border border-white/20 object-cover transition-transform group-hover:scale-105"
          />
          <div className="text-xs">
            <span className="text-white font-semibold group-hover:text-accent transition-colors block">
              Moongetsu
            </span>
            <span className="text-[10px] text-fg-3 block">AutoScene UI</span>
          </div>
        </a>

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
  )
}
