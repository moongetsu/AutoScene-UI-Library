import * as React from "react"
import { Command } from "cmdk"
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
  Copy,
} from "@phosphor-icons/react"
import { REGISTRY_COMPONENTS } from "@/data/registry-items"
import { toast } from "sonner"

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
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault()
        onOpenChange(!open)
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [open, onOpenChange])

  const copySnippet = (snippet: string, title: string) => {
    navigator.clipboard.writeText(snippet)
    onOpenChange(false)
    toast.success(`Copied import for ${title}`, {
      description: snippet,
    })
  }

  const navigateTo = (view: "registry" | "showcase", sectionId?: string) => {
    onOpenChange(false)
    if (view === "registry") {
      window.location.hash = "#/"
    } else {
      window.location.hash = "#/showcase"
      if (sectionId && onNavigateSection) {
        onNavigateSection(sectionId)
      }
    }
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] px-4">
      {/* Static Backdrop */}
      <div
        onClick={() => onOpenChange(false)}
        className="fixed inset-0 bg-black/65 backdrop-blur-md"
      />

      {/* Static Palette Dialog Box */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Quick Search Palette"
        className="relative z-10 w-full max-w-[580px] overflow-hidden rounded-2xl border border-white/10 bg-[#0d0d10] p-0 shadow-2xl focus:outline-none"
      >
        <Command className="flex flex-col w-full bg-transparent">
          {/* Top search bar */}
          <div className="flex items-center gap-3 px-4 py-3 border-b border-white/[0.08] bg-white/[0.02]">
            <MagnifyingGlass className="size-5 text-fg-3 shrink-0" />
            <Command.Input
              autoFocus
              placeholder="Search components, copy imports, or jump to tabs..."
              className="w-full bg-transparent text-sm text-fg-1 placeholder:text-fg-3 outline-none"
            />
            <kbd className="text-[10px] font-mono text-fg-3 bg-white/[0.06] px-1.5 py-0.5 rounded border border-white/[0.08]">
              ESC
            </kbd>
          </div>

          {/* Items list */}
          <Command.List className="max-h-[360px] overflow-y-auto p-2 scrollbar-thin scrollbar-thumb-white/10">
            <Command.Empty className="py-8 text-center text-xs text-fg-3">
              No matching components found.
            </Command.Empty>

            {/* Navigation group */}
            <Command.Group heading="Navigation" className="text-[11px] font-medium text-fg-3 px-2 py-1.5 [&_[cmdk-group-heading]]:text-[10px] [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-wider">
              <Command.Item
                onSelect={() => navigateTo("registry")}
                className="flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium text-fg-2 hover:bg-white/[0.06] hover:text-white cursor-pointer data-[selected=true]:bg-white/[0.08] data-[selected=true]:text-white transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <ArrowSquareOut className="size-4 text-accent" />
                  <span>Component Registry (21st.dev Grid)</span>
                </div>
                <span className="text-[10px] font-mono text-fg-3">View</span>
              </Command.Item>

              <Command.Item
                onSelect={() => navigateTo("showcase", "playground")}
                className="flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium text-fg-2 hover:bg-white/[0.06] hover:text-white cursor-pointer data-[selected=true]:bg-white/[0.08] data-[selected=true]:text-white transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <SlidersHorizontal className="size-4 text-accent" />
                  <span>Interactive Button Playground</span>
                </div>
                <span className="text-[10px] font-mono text-fg-3">Tool</span>
              </Command.Item>
            </Command.Group>

            {/* Components group */}
            <Command.Group heading="Components & Primitives" className="text-[11px] font-medium text-fg-3 px-2 py-1.5 [&_[cmdk-group-heading]]:text-[10px] [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-wider">
              {REGISTRY_COMPONENTS.map((item) => (
                <Command.Item
                  key={item.id}
                  value={`${item.title} ${item.category} ${item.description}`}
                  onSelect={() => copySnippet(item.importStatement, item.title)}
                  className="flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium text-fg-2 hover:bg-white/[0.06] hover:text-white cursor-pointer data-[selected=true]:bg-white/[0.08] data-[selected=true]:text-white transition-colors"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    {SECTION_ICONS[item.showcaseSection] || <Code className="size-4 text-accent" />}
                    <div className="flex flex-col min-w-0">
                      <span className="text-white truncate">{item.title}</span>
                      <span className="text-[10px] text-fg-3 truncate font-mono">{item.importStatement}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0 pl-2">
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/[0.04] text-fg-3">
                      {item.category}
                    </span>
                    <Copy className="size-3.5 text-fg-3" />
                  </div>
                </Command.Item>
              ))}
            </Command.Group>
          </Command.List>

          {/* Footer tip */}
          <div className="px-4 py-2 border-t border-white/[0.06] bg-white/[0.015] flex items-center justify-between text-[11px] text-fg-3">
            <span>Select an item to copy import statement</span>
            <span className="font-mono">AutoScene UI</span>
          </div>
        </Command>
      </div>
    </div>
  )
}

}

