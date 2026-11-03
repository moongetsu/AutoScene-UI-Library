import * as React from "react"
import * as Icons from "@/components/icons"
import { ShowcasePageHeader } from "../ShowcasePageHeader"
import { Segmented } from "@/components/ui/segmented"
import { notify } from "@/components/ui/toaster"
import { MagnifyingGlass, Check, Copy } from "@phosphor-icons/react"
import { motion } from "motion/react"

// Category mapping for the 82 curated Phosphor icons in AutoScene
const ICON_CATEGORIES: Record<string, string[]> = {
  Media: [
    "Play",
    "Pause",
    "SkipBack",
    "SkipForward",
    "Scissors",
    "FilmSlate",
    "FilmStrip",
    "Television",
    "SpeakerHigh",
    "SpeakerLow",
    "SpeakerSlash",
    "Queue",
    "Clock",
  ],
  Navigation: [
    "ArrowLeft",
    "ArrowCounterClockwise",
    "ArrowLineLeft",
    "ArrowLineRight",
    "ArrowSquareOut",
    "ArrowUUpLeft",
    "ArrowUUpRight",
    "ArrowsDownUp",
    "ArrowsMerge",
    "ArrowsOutLineHorizontal",
    "CaretDown",
    "CaretLeft",
    "CaretLineLeft",
    "CaretLineRight",
    "CaretRight",
    "Compass",
  ],
  Actions: [
    "Check",
    "CheckCircle",
    "Checks",
    "CircleNotch",
    "Copy",
    "DownloadSimple",
    "Eye",
    "EyeSlash",
    "MagnifyingGlass",
    "MagnifyingGlassMinus",
    "MagnifyingGlassPlus",
    "Minus",
    "PencilSimple",
    "Plus",
    "Prohibit",
    "Trash",
    "X",
    "Crosshair",
    "Scan",
    "SelectionAll",
  ],
  Files: [
    "FilePlus",
    "FileText",
    "FileX",
    "FolderOpen",
    "FolderPlus",
    "ClipboardText",
    "Image",
    "Package",
    "Table",
  ],
  Interface: [
    "Backspace",
    "CornersIn",
    "CornersOut",
    "DotsThree",
    "GearSix",
    "GithubLogo",
    "Info",
    "Keyboard",
    "Link",
    "List",
    "ListBullets",
    "ListNumbers",
    "PuzzlePiece",
    "SidebarSimple",
    "SlidersHorizontal",
    "Square",
    "SquaresFour",
    "ShieldWarning",
    "Warning",
    "User",
    "UserCircleDashed",
    "UserFocus",
    "UserPlus",
    "Users",
  ],
}

type CopyFormat = "jsx" | "import" | "name"

// Filter out non-component exports like types or utils.
// Phosphor icon components in React 18/19 are React.forward_ref objects or functions.
const ICON_LIST = Object.entries(Icons)
  .filter(([key, val]) => (typeof val === "function" || (typeof val === "object" && val !== null)) && /^[A-Z]/.test(key))
  .map(([name, Component]) => {
    // Assign category
    let category = "Interface"
    for (const [cat, names] of Object.entries(ICON_CATEGORIES)) {
      if (names.includes(name)) {
        category = cat
        break
      }
    }
    return {
      name,
      category,
      Component: Component as React.ComponentType<{ className?: string; weight?: "regular" | "fill" }>,
    }
  })
  .sort((a, b) => a.name.localeCompare(b.name))

const CATEGORIES = ["All", "Media", "Navigation", "Actions", "Files", "Interface"] as const

export function IconsShowcase() {
  const [search, setSearch] = React.useState("")
  const [selectedCategory, setSelectedCategory] = React.useState<string>("All")
  const [copyFormat, setCopyFormat] = React.useState<CopyFormat>("jsx")
  const [size, setSize] = React.useState<"sm" | "md" | "lg">("md")
  const [weight, setWeight] = React.useState<"regular" | "fill">("regular")
  const [copiedName, setCopiedName] = React.useState<string | null>(null)

  const filteredIcons = React.useMemo(() => {
    const q = search.trim().toLowerCase()
    return ICON_LIST.filter((icon) => {
      const matchesSearch = !q || icon.name.toLowerCase().includes(q)
      const matchesCategory = selectedCategory === "All" || icon.category === selectedCategory
      return matchesSearch && matchesCategory
    })
  }, [search, selectedCategory])

  const copyIconCode = (name: string) => {
    let textToCopy = ""
    let badgeText = ""

    if (copyFormat === "jsx") {
      textToCopy = `<${name} className="size-4"${weight === "fill" ? ' weight="fill"' : ""} />`
      badgeText = "JSX"
    } else if (copyFormat === "import") {
      textToCopy = `import { ${name} } from "@moongetsu/autoscene-ui/icons"`
      badgeText = "Import"
    } else {
      textToCopy = name
      badgeText = "Name"
    }

    navigator.clipboard.writeText(textToCopy)
    setCopiedName(name)
    notify.success(`Copied ${name} (${badgeText})`, {
      snippet: textToCopy,
    })
    setTimeout(() => setCopiedName(null), 1800)
  }

  const iconSizeClass = {
    sm: "size-4",
    md: "size-5",
    lg: "size-6",
  }[size]

  return (
    <div className="flex flex-col gap-8">
      <ShowcasePageHeader
        title="Icons"
        description="Phosphor icons used across the app, with regular line weight and fill variants."
        importPath='import { Play, Scissors, FilmStrip } from "@moongetsu/autoscene-ui/icons"'
      />

      {/* Control Bar */}
      <div className="flex flex-col gap-4 p-4 rounded-2xl border border-white/[0.08] bg-[#0c0c10]/80 backdrop-blur-xl shadow-xl">
        {/* Top row: Search & Format Switcher */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          {/* Search Bar */}
          <div className="relative flex-1 max-w-md">
            <MagnifyingGlass className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-fg-3 pointer-events-none" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search icons by name..."
              className="w-full h-9 rounded-xl border border-white/[0.08] bg-white/[0.03] pl-10 pr-4 text-xs text-white placeholder:text-fg-3 focus:outline-none focus:border-accent/60 transition-colors"
            />
          </div>

          {/* Copy Format & Visual Controls */}
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Copy format toggle */}
            <div className="flex items-center gap-1.5 text-xs text-fg-3">
              <span className="text-[11px] font-mono text-fg-3 hidden sm:inline">Copy:</span>
              <Segmented
                value={copyFormat}
                onChange={(val) => setCopyFormat(val as CopyFormat)}
                options={[
                  { value: "jsx", label: "JSX" },
                  { value: "import", label: "Import" },
                  { value: "name", label: "Name" },
                ]}
              />
            </div>

            {/* Size segmented */}
            <Segmented
              value={size}
              onChange={(val) => setSize(val as "sm" | "md" | "lg")}
              options={[
                { value: "sm", label: "16px" },
                { value: "md", label: "20px" },
                { value: "lg", label: "24px" },
              ]}
            />

            {/* Weight segmented */}
            <Segmented
              value={weight}
              onChange={(val) => setWeight(val as "regular" | "fill")}
              options={[
                { value: "regular", label: "Regular" },
                { value: "fill", label: "Fill" },
              ]}
            />
          </div>
        </div>

        {/* Bottom row: Category Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-1 scrollbar-none border-t border-white/[0.05]">
          {CATEGORIES.map((cat) => {
            const count = cat === "All" ? ICON_LIST.length : ICON_LIST.filter((i) => i.category === cat).length
            const isSelected = selectedCategory === cat

            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium transition-colors whitespace-nowrap cursor-pointer ${
                  isSelected
                    ? "bg-accent/20 text-accent border border-accent/40"
                    : "bg-white/[0.02] text-fg-3 hover:text-white border border-white/[0.05] hover:bg-white/[0.05]"
                }`}
              >
                <span>{cat}</span>
                <span className={`text-[10px] font-mono ${isSelected ? "text-accent" : "text-fg-3"}`}>
                  {count}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Counter bar */}
      <div className="flex items-center justify-between px-1 text-xs text-fg-3 font-mono">
        <span>Showing {filteredIcons.length} of {ICON_LIST.length} icons</span>
        <span>Click icon to copy {copyFormat.toUpperCase()}</span>
      </div>

      {/* Grid of Icons */}
      {filteredIcons.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-12 rounded-2xl border border-white/[0.06] bg-white/[0.01] text-fg-3 text-xs">
          <span>{search.trim() ? `No icons matching "${search.trim()}" in ${selectedCategory}` : "No icons available"}</span>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
          {filteredIcons.map(({ name, Component }) => {
            const isCopied = copiedName === name

            return (
              <motion.button
                key={name}
                type="button"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => copyIconCode(name)}
                className={`group relative flex flex-col items-center justify-center h-28 p-3 rounded-2xl border transition-all duration-200 cursor-pointer overflow-hidden ${
                  isCopied
                    ? "border-accent bg-accent/[0.08] shadow-[0_0_24px_rgba(245,165,36,0.15)]"
                    : "border-white/[0.07] bg-[#0c0c10]/70 hover:border-white/20 hover:bg-white/[0.03]"
                }`}
                title={`Copy ${name} (${copyFormat})`}
              >
                {/* Center Icon presentation with smooth swap on copied */}
                <div className="relative flex items-center justify-center size-12 rounded-xl">
                  {isCopied ? (
                    <motion.div
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="size-11 rounded-xl bg-accent/20 border border-accent/40 flex items-center justify-center text-accent shadow-[0_0_12px_rgba(245,165,36,0.2)]"
                    >
                      <Check className="size-5" weight="bold" />
                    </motion.div>
                  ) : (
                    <div className="size-11 rounded-xl flex items-center justify-center bg-white/[0.03] border border-white/[0.08] group-hover:border-accent/40 group-hover:bg-accent/[0.08] group-hover:shadow-[0_0_16px_rgba(245,165,36,0.12)] transition-all duration-200">
                      <Component
                        className={`${iconSizeClass} transition-transform duration-200 group-hover:scale-110 text-fg-2 group-hover:text-accent`}
                        weight={weight}
                      />
                    </div>
                  )}
                </div>

                {/* Name Label or Copied feedback */}
                <span
                  className={`mt-1 text-[11px] font-mono tracking-tight truncate max-w-full transition-colors ${
                    isCopied ? "text-accent font-medium" : "text-fg-3 group-hover:text-fg-1"
                  }`}
                >
                  {isCopied ? "Copied" : name}
                </span>
              </motion.button>
            )
          })}
        </div>
      )}
    </div>
  )
}

