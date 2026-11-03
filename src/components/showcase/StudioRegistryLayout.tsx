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
} from "@/components/icons"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Segmented } from "@/components/ui/segmented"
import { Kbd } from "@/components/ui/kbd"
import { AutoSceneMark } from "@/components/brand/AutoSceneMark"
import { toast } from "sonner"

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

  const copyCli = () => {
    navigator.clipboard.writeText("npx @moongetsu/autoscene-ui add")
    setCopied(true)
    toast.success("Copied install command to clipboard")
    setTimeout(() => setCopied(false), 2000)
  }

  // Live component cards for the gallery grid
  const components: ComponentCardData[] = [
    {
      id: "button-primary",
      title: "Primary Action Pill",
      category: "Buttons",
      description: "White glassmorphic CTA pill with inner specular glow and spring depression.",
      component: (
        <Button variant="primary" size="md">
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
        <Button variant="accent" size="md">
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
        <Button variant="glass" size="md">
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
        <Button variant="danger" size="sm">
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
        <div className="w-56">
          <Segmented
            aria-label="Filter"
            value="cast"
            onChange={() => {}}
            options={[
              { value: "episodes", label: "Episodes" },
              { value: "cast", label: "Cast" },
            ]}
          />
        </div>
      ),
    },
    {
      id: "switch-toggle",
      title: "Hardware Switch",
      category: "Toggles",
      description: "High-contrast boolean switch with fluid thumb easing.",
      component: (
        <div className="flex items-center gap-3">
          <span className="text-xs text-fg-2">Hardware Acceleration</span>
          <Switch checked={true} onCheckedChange={() => {}} />
        </div>
      ),
    },
    {
      id: "slider-precision",
      title: "Precision Range Slider",
      category: "Toggles",
      description: "Glass track slider with instant drag feedback and percentage chip.",
      component: (
        <div className="w-48 flex flex-col gap-1.5">
          <div className="flex justify-between text-[11px] text-fg-3">
            <span>Threshold</span>
            <span className="font-mono text-accent">85%</span>
          </div>
          <Slider label="Threshold" value={85} max={100} onChange={() => {}} />
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
          <MagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-fg-3" />
          <Input className="pl-9 h-8 text-xs" placeholder="Search cast or scenes…" />
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
      {/* Top Navbar */}
      <header className="sticky top-0 z-50 h-16 border-b border-white/[0.08] bg-[#070709]/80 backdrop-blur-xl px-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <AutoSceneMark className="size-7" />
          <span className="font-bold text-lg tracking-tight text-white flex items-center gap-1.5">
            AutoScene <span className="text-xs px-2 py-0.5 rounded-full bg-accent/15 text-accent font-mono font-medium">UI</span>
          </span>
        </div>

        {/* Global Search Bar */}
        <div className="relative w-96 hidden md:block">
          <MagnifyingGlass className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-fg-3" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search components, blocks, primitives... (⌘K)"
            className="w-full h-9 rounded-full border border-white/[0.08] bg-white/[0.03] pl-10 pr-4 text-xs text-fg-1 placeholder:text-fg-3 focus:outline-none focus:border-accent/60 transition-colors"
          />
        </div>

        <div className="flex items-center gap-4">
          <a
            href="https://github.com/moongetsu/AutoScene-UI-Library"
            target="_blank"
            rel="noreferrer"
            className="text-fg-3 hover:text-white transition-colors"
          >
            <GithubLogo className="size-5" />
          </a>
          <Button variant="primary" size="sm" onClick={copyCli}>
            Get Started
          </Button>
        </div>
      </header>

      {/* Main 21st.dev Style Layout */}
      <div className="flex-1 flex flex-col lg:flex-row">
        {/* Left Hero Sidebar */}
        <aside className="w-full lg:w-96 shrink-0 border-b lg:border-b-0 lg:border-r border-white/[0.08] p-8 lg:p-10 flex flex-col justify-between">
          <div className="flex flex-col gap-6">
            <div className="size-16 rounded-2xl bg-panel border border-white/[0.1] shadow-2xl flex items-center justify-center p-3">
              <AutoSceneMark className="size-full" />
            </div>

            <div>
              <h1 className="text-3xl font-extrabold text-white tracking-tight">AutoScene UI</h1>
              <p className="mt-3 text-sm text-fg-2 leading-relaxed">
                A collection of cinematic shadcn/ui components, blocks, and templates for building modern, high-density video editing and creative tools. Built on Radix UI, CVA, and Framer Motion.
              </p>
            </div>

            {/* Author Credit */}
            <div className="flex items-center gap-3 pt-2">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&fit=crop"
                alt="Avatar"
                className="size-8 rounded-full border border-white/20 object-cover"
              />
              <div className="text-xs">
                <span className="text-fg-3 block">Crafted by</span>
                <span className="font-semibold text-white">Moongetsu</span>
              </div>
            </div>

            {/* Stats row */}
            <div className="flex items-center gap-6 text-xs text-fg-3 border-y border-white/[0.06] py-3.5">
              <div>
                <span className="font-semibold text-fg-1">32+</span> Components
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
        <main className="flex-1 p-6 lg:p-10 flex flex-col gap-6">
          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all whitespace-nowrap ${
                  selectedCategory === cat
                    ? "bg-white text-black shadow-lg font-semibold"
                    : "bg-white/[0.04] text-fg-2 hover:bg-white/[0.08] hover:text-white border border-white/[0.06]"
                }`}
              >
                {cat}
              </button>
            ))}
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
                    <Badge tone="neutral" className="text-[10px] h-4 px-1.5">
                      {item.category}
                    </Badge>
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
