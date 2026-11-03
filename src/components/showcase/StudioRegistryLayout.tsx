import * as React from "react"
import {
  MagnifyingGlass,
  Copy,
  Check,
  GithubLogo,
  Play,
  DotsThree,
  Trash,
  DownloadSimple,
  FilmStrip,
  Plus,
  Link as LinkIcon,
} from "@/components/icons"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Segmented } from "@/components/ui/segmented"
import { Kbd } from "@/components/ui/kbd"
import { AutoSceneMark } from "@/components/brand/AutoSceneMark"
import { TopNavbar } from "./TopNavbar"
import { ShowcaseCommandPalette } from "./ShowcaseCommandPalette"
import { toast } from "sonner"
import { notify } from "@/components/ui/toaster"
import { motion } from "motion/react"
import { SPRING_FAST } from "@/lib/motion"
import { cn } from "@/lib/utils"

interface ComponentCardData {
  id: string
  title: string
  category: string
  description: string
  component: React.ReactNode
}

export function StudioRegistryLayout() {
  const [copied, setCopied] = React.useState(false)
  const [search, setSearch] = React.useState("")
  const [selectedCategory, setSelectedCategory] = React.useState("All")
  const [paletteOpen, setPaletteOpen] = React.useState(false)

  // Interactive state for live demo components
  const [demoTab, setDemoTab] = React.useState("cast")
  const [demoSwitch, setDemoSwitch] = React.useState(true)
  const [demoSlider, setDemoSlider] = React.useState(85)
  const [demoInput, setDemoInput] = React.useState("")

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

  // Live component cards for the gallery grid
  const components: ComponentCardData[] = [
    {
      id: "button-primary",
      title: "Primary Action Pill",
      category: "Buttons",
      description: "White glassmorphic CTA pill with inner specular glow and spring depression.",
      component: (
        <Button variant="primary" size="md" onClick={() => toast.success("Built scene pack")}>
          <Play weight="fill" className="size-4" /> Build a scenepack
        </Button>
      ),
    },
    {
      id: "button-accent",
      title: "Accent Gold Button",
      category: "Buttons",
      description: "AutoScene brand gold with subtle backdrop glow for focal actions.",
      component: (
        <Button variant="accent" size="md" onClick={() => toast("Filtered vocals")}>
          <Plus weight="bold" className="size-4 text-accent" /> Filter Vocals
        </Button>
      ),
    },
    {
      id: "button-glass",
      title: "Frosted Glass Pill",
      category: "Buttons",
      description: "Translucent backdrop pill designed to float over media footage.",
      component: (
        <Button variant="glass" size="md" onClick={() => toast("Saved EDL file")}>
          <DownloadSimple className="size-4" /> Save EDL
        </Button>
      ),
    },
    {
      id: "button-danger",
      title: "Danger Destructive Pill",
      category: "Buttons",
      description: "Muted crimson border with red glow hover for deletions.",
      component: (
        <Button variant="danger" size="sm" onClick={() => toast.error("Media removed")}>
          <Trash className="size-3.5" /> Remove Media
        </Button>
      ),
    },
    {
      id: "segmented-tabs",
      title: "Segmented Sliding Tabs",
      category: "Toggles",
      description: "Spring-animated sliding tab switcher with zero latency.",
      component: (
        <div className="flex flex-col items-center gap-2">
          <Segmented
            aria-label="Filter"
            value={demoTab}
            onChange={(val) => setDemoTab(val)}
            options={[
              { value: "episodes", label: "Episodes" },
              { value: "cast", label: "Cast" },
            ]}
          />
          <span className="text-[11px] font-mono text-fg-3">
            Active: <span className="text-accent">{demoTab}</span>
          </span>
        </div>
      ),
    },
    {
      id: "switch-toggle",
      title: "Hardware Switch",
      category: "Toggles",
      description: "High-contrast boolean switch with fluid thumb easing.",
      component: (
        <label className="flex items-center gap-3 cursor-pointer select-none">
          <span className="text-xs text-fg-2">Hardware Acceleration</span>
          <Switch
            checked={demoSwitch}
            onCheckedChange={(checked) => {
              setDemoSwitch(checked)
              toast(checked ? "Hardware acceleration enabled" : "Hardware acceleration disabled")
            }}
          />
        </label>
      ),
    },
    {
      id: "slider-precision",
      title: "Precision Range Slider",
      category: "Toggles",
      description: "Glass track slider with instant drag feedback and percentage chip.",
      component: (
        <div className="w-52 flex flex-col gap-2">
          <div className="flex justify-between text-xs text-fg-2">
            <span>Threshold</span>
            <span className="font-mono text-accent">{demoSlider}%</span>
          </div>
          <Slider
            label="Threshold"
            value={demoSlider}
            min={0}
            max={100}
            step={1}
            format={(val) => `${val}%`}
            onChange={(val) => setDemoSlider(val)}
          />
        </div>
      ),
    },
    {
      id: "input-search",
      title: "Cinematic Search Bar",
      category: "Inputs",
      description: "Dark glass input with embedded icon and subtle white focus border.",
      component: (
        <div className="relative w-56">
          <MagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-fg-3 pointer-events-none" />
          <Input
            value={demoInput}
            onChange={(e) => setDemoInput(e.target.value)}
            className="pl-9 h-8 text-xs"
            placeholder="Search cast or scenes…"
          />
        </div>
      ),
    },
    {
      id: "character-card",
      title: "Cast Profile Card",
      category: "Cards",
      description: "Face recognition card with portrait frame, clip counter badge and menu.",
      component: (
        <div className="w-52 rounded-xl border border-white/[0.08] bg-panel p-3 flex flex-col gap-2.5">
          <div className="relative aspect-square w-full rounded-lg overflow-hidden bg-overlay">
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&fit=crop"
              alt="Character"
              className="size-full object-cover"
            />
            <div className="absolute top-2 right-2">
              <Badge tone="accent">42 clips</Badge>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs font-semibold text-fg-1">Patrick Jane</div>
              <div className="text-[10px] text-fg-3">The Mentalist</div>
            </div>
            <Button variant="ghost" size="icon-sm" className="size-6">
              <DotsThree weight="bold" />
            </Button>
          </div>
        </div>
      ),
    },
    {
      id: "export-row-card",
      title: "Export Status Card",
      category: "Cards",
      description: "Export summary card with codec tag, progress state, and quick play.",
      component: (
        <div className="w-64 rounded-xl border border-white/[0.08] bg-panel p-3.5 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="flex size-8 items-center justify-center rounded-lg bg-accent/15 text-accent">
              <FilmStrip className="size-4" />
            </div>
            <div>
              <div className="text-xs font-medium text-fg-1 truncate max-w-[120px]">Patrick_Jane.mov</div>
              <div className="text-[10px] text-fg-3">ProRes 422 · 42 clips</div>
            </div>
          </div>
          <Badge tone="accent" className="h-5 px-1.5 text-[10px]">Verified</Badge>
        </div>
      ),
    },
    {
      id: "status-badges",
      title: "Design System Badges",
      category: "Feedback",
      description: "Pill tags for counts, media overlays, and states.",
      component: (
        <div className="flex flex-wrap gap-2">
          <Badge tone="accent">Gold Focus</Badge>
          <Badge tone="danger">Failed</Badge>
          <Badge tone="outline">Outline</Badge>
          <Badge tone="media">Media Frost</Badge>
        </div>
      ),
    },
    {
      id: "kbd-shortcuts",
      title: "Keyboard Shortcuts (Kbd)",
      category: "Feedback",
      description: "Tactile key caps with drop shadows and shortcuts.",
      component: (
        <div className="flex items-center gap-3 text-xs text-fg-2">
          <span>Command Palette:</span>
          <Kbd keys={["⌘", "K"]} />
        </div>
      ),
    },
  ]

  const categories = ["All", "Buttons", "Toggles", "Inputs", "Cards", "Feedback"]

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
                A collection of components, blocks, and templates for building clean video editing and creative tools. Built on Radix UI, CVA, and Tailwind CSS.
              </p>
            </div>

            {/* Authors Card - Clean Stacked Avatars Pill */}
            <div className="flex items-center gap-3 p-2.5 rounded-2xl bg-white/[0.02] border border-white/[0.08] hover:border-white/20 transition-all">
              {/* Overlapping Avatar Stack */}
              <div className="flex -space-x-2.5 items-center">
                <a
                  href="https://github.com/moongetsu"
                  target="_blank"
                  rel="noreferrer"
                  className="relative z-10 block rounded-full ring-2 ring-[#0c0c0f] hover:z-30 transition-transform hover:scale-110"
                  title="Moongetsu"
                >
                  <img
                    src="https://avatars.githubusercontent.com/u/111883135?v=4"
                    alt="Moongetsu"
                    className="size-8 rounded-full object-cover"
                  />
                </a>
                <a
                  href="https://github.com/tcmmi"
                  target="_blank"
                  rel="noreferrer"
                  className="relative z-20 block rounded-full ring-2 ring-[#0c0c0f] hover:z-30 transition-transform hover:scale-110"
                  title="tcmmi"
                >
                  <img
                    src="https://avatars.githubusercontent.com/u/119017174?v=4"
                    alt="tcmmi"
                    className="size-8 rounded-full object-cover"
                  />
                </a>
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
                <span className="font-semibold text-fg-1">28</span> Components
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
          </div>

          <div className="pt-8 text-xs text-fg-3">
            Derived with love from AutoScene open source.
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
                  {item.component}
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
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation()
                          copyComponentLink(item.id, item.title)
                        }}
                        className="size-5 rounded flex items-center justify-center text-fg-3 hover:text-white hover:bg-white/[0.08] transition-colors cursor-pointer"
                        title="Copy direct component link"
                      >
                        <LinkIcon className="size-3" />
                      </button>
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
