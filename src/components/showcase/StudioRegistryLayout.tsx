import * as React from "react"
import {
  MagnifyingGlass,
  Copy,
  Check,
  Link as LinkIcon,
} from "@/components/icons"
import { Badge } from "@/components/ui/badge"
import { AutoSceneMark } from "@/components/brand/AutoSceneMark"
import { TopNavbar } from "./TopNavbar"
import { ShowcaseCommandPalette } from "./ShowcaseCommandPalette"
import { notify } from "@/components/ui/toaster"
import { motion } from "motion/react"
import { SPRING_FAST } from "@/lib/motion"
import { cn } from "@/lib/utils"
import { DISCOVERED_COMPONENTS, TOTAL_UI_COMPONENTS_COUNT } from "@/registry/discovery"
import { COMPONENT_DEMO_PREVIEWS, type ComponentCardData } from "@/registry/component-previews"
import { PreviewPlace } from "@/registry/preview-place"
import { Tooltip } from "@/components/ui/tooltip"

export function StudioRegistryLayout() {
  const [copied, setCopied] = React.useState(false)
  const [search, setSearch] = React.useState("")
  const [selectedCategory, setSelectedCategory] = React.useState("All")
  const [paletteOpen, setPaletteOpen] = React.useState(false)

  // Interactive state for live demo components
  const [demoTab, setDemoTab] = React.useState("cast")
  const [demoSwitch, setDemoSwitch] = React.useState(true)
  const [demoCheckbox, setDemoCheckbox] = React.useState(true)
  const [demoSlider, setDemoSlider] = React.useState(85)
  const [demoInput, setDemoInput] = React.useState("")
  const [demoFilterStatus, setDemoFilterStatus] = React.useState("ready")
  const [demoFilterSort, setDemoFilterSort] = React.useState("az")
  const [demoFilterSearch, setDemoFilterSearch] = React.useState("")

  const copyCli = () => {
    navigator.clipboard.writeText("npx @moongetsu/autoscene-ui add")
    setCopied(true)
    notify.success("CLI Install Command Copied", {
      description: "Run this command in your project terminal to scaffold primitives.",
      snippet: "npx @moongetsu/autoscene-ui add",
      badge: "CLI Installer",
    })
    setTimeout(() => setCopied(false), 2000)
  }

  const copyComponentLink = (id: string, title: string) => {
    const url = `https://moongetsu.github.io/AutoScene-UI-Library/components/${id}/`
    navigator.clipboard.writeText(url)
    notify.info(`Copied Direct Component Link`, {
      description: `Shareable link for ${title} copied to clipboard.`,
      snippet: url,
      badge: "Deep Link",
    })
  }

  // Dynamically generated component cards from the discovery engine
  const components: ComponentCardData[] = React.useMemo(() => {
    return DISCOVERED_COMPONENTS.map((meta) => {
      const componentNode = COMPONENT_DEMO_PREVIEWS[meta.id]({
        demoTab,
        setDemoTab,
        demoSwitch,
        setDemoSwitch,
        demoCheckbox,
        setDemoCheckbox,
        demoSlider,
        setDemoSlider,
        demoInput,
        setDemoInput,
        demoFilterStatus,
        setDemoFilterStatus,
        demoFilterSort,
        setDemoFilterSort,
        demoFilterSearch,
        setDemoFilterSearch,
      })

      return {
        id: meta.id,
        title: meta.name,
        category: meta.category,
        description: meta.description,
        component: componentNode,
      }
    })
  }, [
    demoTab,
    demoSwitch,
    demoCheckbox,
    demoSlider,
    demoInput,
    demoFilterStatus,
    demoFilterSort,
    demoFilterSearch,
  ])

  // Dynamically derive category filter pills from discovered components
  const categories = React.useMemo(() => {
    const set = new Set(DISCOVERED_COMPONENTS.map((c) => c.category))
    return ["All", ...Array.from(set).sort()]
  }, [])

  const filtered = components.filter((item) => {
    const matchesCat = selectedCategory === "All" || item.category === selectedCategory
    const matchesSearch =
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.description.toLowerCase().includes(search.toLowerCase())
    return matchesCat && matchesSearch
  })

  return (
    <div className="min-h-screen bg-[#070709] text-fg-1 flex flex-col font-sans selection:bg-accent/30 selection:text-white">
      {/* Quick Search Palette */}
      <ShowcaseCommandPalette
        open={paletteOpen}
        onOpenChange={setPaletteOpen}
      />

      {/* Universal Top Navbar */}
      <TopNavbar
        activeView="registry"
        onOpenCommandPalette={() => setPaletteOpen(true)}
        isCommandPaletteOpen={paletteOpen}
      />

      {/* Main 21st.dev Style Layout */}
      <div className="flex-1 flex flex-col lg:flex-row">
        {/* Left Hero Sidebar - Sticky on desktop */}
        <aside className="w-full lg:w-96 shrink-0 border-b lg:border-b-0 lg:border-r border-white/[0.08] p-5 sm:p-8 lg:p-10 flex flex-col justify-between lg:sticky lg:top-16 lg:h-[calc(100vh-4rem)] lg:overflow-y-auto">
          <div className="flex flex-col gap-6">
            <div className="flex items-center">
              <AutoSceneMark bare className="size-12 sm:size-16" />
            </div>

            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">AutoScene UI</h1>
              <p className="mt-2.5 sm:mt-3 text-xs sm:text-sm text-fg-2 leading-relaxed">
                A standalone dark mode component library extracted from AutoScene for creative and video editing tools. Built on Radix UI, CVA, and Tailwind CSS.
              </p>
            </div>

            {/* Authors Card - Clean Stacked Avatars Pill */}
            <div className="flex items-center gap-3 p-2.5 rounded-2xl bg-white/[0.02] border border-white/[0.08] hover:border-white/20 transition-all">
              {/* Overlapping Avatar Stack */}
              <div className="flex -space-x-2.5 items-center">
                <Tooltip label="Moongetsu">
                  <a
                    href="https://github.com/moongetsu"
                    target="_blank"
                    rel="noreferrer"
                    className="relative z-10 block rounded-full ring-2 ring-[#0c0c0f] hover:z-30 transition-transform hover:scale-110"
                  >
                    <img
                      src="https://avatars.githubusercontent.com/u/111883135?v=4"
                      alt="Moongetsu"
                      className="size-8 rounded-full object-cover"
                    />
                  </a>
                </Tooltip>
                <Tooltip label="tcmmi">
                  <a
                    href="https://github.com/tcmmi"
                    target="_blank"
                    rel="noreferrer"
                    className="relative z-20 block rounded-full ring-2 ring-[#0c0c0f] hover:z-30 transition-transform hover:scale-110"
                  >
                    <img
                      src="https://avatars.githubusercontent.com/u/119017174?v=4"
                      alt="tcmmi"
                      className="size-8 rounded-full object-cover"
                    />
                  </a>
                </Tooltip>
              </div>

              <div className="flex flex-col text-xs leading-tight">
                <span className="text-[10px] text-fg-3 uppercase font-mono tracking-wider">Created by</span>
                <div className="flex items-center gap-1 font-semibold text-white pt-0.5">
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
              </div>
            </div>

            {/* Stats row */}
            <div className="flex items-center gap-6 text-xs text-fg-3 border-y border-white/[0.06] py-3.5">
              <div>
                <span className="font-semibold text-fg-1">{TOTAL_UI_COMPONENTS_COUNT}</span> Components
              </div>
              <div>
                <span className="font-semibold text-fg-1">100%</span> TypeScript
              </div>
              <div>
                <span className="font-semibold text-accent">MIT</span> License
              </div>
            </div>

            {/* CLI Snippet Box (exact 21st.dev style) */}
            <div className="flex flex-col gap-2">
              <span className="text-[11px] font-mono uppercase tracking-wider text-fg-3">Install via CLI</span>
              <div
                onClick={copyCli}
                className="group relative flex items-center justify-between rounded-xl border border-white/[0.08] bg-white/[0.02] p-3 text-xs font-mono text-fg-2 hover:border-white/20 hover:bg-white/[0.04] transition-all cursor-pointer"
              >
                <span className="truncate pr-4 text-white">npx @moongetsu/autoscene-ui add</span>
                <span className="text-fg-3 group-hover:text-white transition-colors">
                  {copied ? <Check className="size-4 text-accent" /> : <Copy className="size-4" />}
                </span>
              </div>
            </div>
            {/* Credits Section */}
            <div className="flex flex-col gap-2 pt-2 border-t border-white/[0.06]">
              <span className="text-[11px] font-mono uppercase tracking-wider text-fg-3">Credits</span>
              <p className="text-[11px] text-fg-3 leading-relaxed">
                Derived from <a href="https://github.com/tcmmi/AutoScene" target="_blank" rel="noreferrer" className="text-fg-2 hover:text-accent transition-colors">AutoScene</a> by <a href="https://github.com/tcmmi" target="_blank" rel="noreferrer" className="text-fg-2 hover:text-accent transition-colors">tcmmi</a>. Inspired by <a href="https://21st.dev" target="_blank" rel="noreferrer" className="text-fg-2 hover:text-accent transition-colors">21st.dev</a> and <a href="https://github.com/animate-ui" target="_blank" rel="noreferrer" className="text-fg-2 hover:text-accent transition-colors">animate-ui</a>.
              </p>
            </div>
          </div>

          <div className="pt-6 text-xs text-fg-3">
            &copy; Copyright AutoScene UI (2026)
          </div>
        </aside>

        {/* Right Gallery Grid */}
        <main className="flex-1 p-4 sm:p-6 lg:p-10 flex flex-col gap-6">
          {/* Mobile Search Bar (visible on mobile where top nav hides search) */}
          <div className="relative w-full md:hidden">
            <MagnifyingGlass className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-fg-3 pointer-events-none" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search components..."
              className="w-full h-10 rounded-xl border border-white/[0.08] bg-white/[0.03] pl-10 pr-4 text-xs text-fg-1 placeholder:text-fg-3 focus:outline-none focus:border-accent/60 transition-colors"
            />
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={cn(
                    "relative px-4 py-1.5 rounded-full text-xs font-medium transition-colors whitespace-nowrap cursor-pointer select-none",
                    isSelected ? "text-black font-semibold" : "text-fg-2 hover:text-white"
                  )}
                >
                  {isSelected && (
                    <motion.div
                      layoutId="registry-category-pill"
                      transition={SPRING_FAST}
                      className="absolute inset-0 rounded-full bg-white shadow-lg pointer-events-none"
                    />
                  )}
                  {!isSelected && (
                    <div className="absolute inset-0 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06] pointer-events-none transition-colors" />
                  )}
                  <span className="relative z-10">{cat}</span>
                </button>
              )
            })}
          </div>

          {/* 21st.dev Style Component Card Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filtered.map((item) => (
              <div
                key={item.id}
                className="group relative flex flex-col rounded-2xl border border-white/[0.08] bg-[#0c0c0f] hover:border-white/20 transition-all duration-300 overflow-hidden shadow-xl"
              >
                {/* Visual Stage */}
                <div className="relative aspect-[4/3] w-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/[0.04] via-transparent to-transparent flex items-center justify-center p-8 border-b border-white/[0.06]">
                  <PreviewPlace.Provider value="gallery">{item.component}</PreviewPlace.Provider>
                </div>

                {/* Card Info Footer */}
                <div className="p-4 flex flex-col gap-1.5 bg-[#0c0c0f]">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-fg-1 group-hover:text-accent transition-colors">
                      {item.title}
                    </h3>
                    <div className="flex items-center gap-1.5">
                      <Badge tone="neutral" className="text-[10px] h-4 px-1.5">
                        {item.category}
                      </Badge>
                      <Tooltip label="Copy direct component link">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation()
                            copyComponentLink(item.id, item.title)
                          }}
                          className="size-5 rounded flex items-center justify-center text-fg-3 hover:text-white hover:bg-white/[0.08] transition-colors cursor-pointer"
                          aria-label="Copy direct component link"
                        >
                          <LinkIcon className="size-3" />
                        </button>
                      </Tooltip>
                    </div>
                  </div>
                  <p className="text-xs text-fg-3 line-clamp-1">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}
