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
  PlayCircle,
  VideoCamera,
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
  { id: "playground", label: "Live Playground", icon: <PlayCircle className="size-4" />, group: "Studio" },
  { id: "record", label: "Animation Target", icon: <VideoCamera className="size-4" />, group: "Studio" },
]

export function ShowcaseNav({ activeSection, onSelect }: ShowcaseNavProps) {
  const groups = Array.from(new Set(NAV_ITEMS.map((item) => item.group)))

  return (
    <nav className="w-full lg:w-72 shrink-0 border-b lg:border-b-0 lg:border-r border-white/[0.08] bg-[#0c0c0f]/60 backdrop-blur-md p-5 flex flex-col gap-6 select-none lg:sticky lg:top-16 lg:h-[calc(100vh-4rem)] lg:overflow-y-auto">
      <div className="flex flex-col gap-1 px-2 pt-1">
        <span className="text-[11px] font-mono uppercase tracking-widest text-accent font-medium">Design System</span>
        <h2 className="text-base font-bold text-white tracking-tight">Component Studio</h2>
      </div>

      <div className="flex flex-col gap-5">
        {groups.map((group) => (
          <div key={group} className="flex flex-col gap-1">
            <span className="text-[10px] font-semibold text-fg-3 uppercase tracking-wider px-2 mb-1">
              {group}
            </span>
            {NAV_ITEMS.filter((item) => item.group === group).map((item) => {
              const active = activeSection === item.id
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onSelect(item.id)}
                  className={cn(
                    "group flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all text-left",
                    active
                      ? "bg-accent/15 text-accent shadow-sm border border-accent/20"
                      : "text-fg-2 hover:bg-white/[0.04] hover:text-white"
                  )}
                >
                  <div className="flex items-center gap-2.5">
                    <span className={cn("transition-colors", active ? "text-accent" : "text-fg-3 group-hover:text-fg-2")}>
                      {item.icon}
                    </span>
                    <span>{item.label}</span>
                  </div>
                  {item.count && (
                    <span className="text-[10px] font-mono text-fg-3 px-1.5 py-0.5 rounded bg-white/[0.04]">
                      {item.count}
                    </span>
                  )}
                </button>
              )
            })}
          </div>
        ))}
      </div>
    </nav>
  )
}
