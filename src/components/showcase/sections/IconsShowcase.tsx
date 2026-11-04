import * as React from "react"
import * as Icons from "@/components/icons"
import { ShowcasePageHeader } from "../ShowcasePageHeader"
import { Segmented } from "@/components/ui/segmented"
import { FilterBar, type FilterGroup, type SortOption } from "@/components/ui/filter-bar"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu"
import { notify } from "@/components/ui/toaster"
import { Check, SlidersHorizontal } from "@phosphor-icons/react"
import { motion } from "motion/react"

// Category mapping for the 88 curated Phosphor icons in AutoScene
const ICON_CATEGORIES: Record<string, string[]> = {
  Media: [
    "Play",
    "Pause",
    "SkipBack",
    "SkipForward",
    "FastForward",
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
    "ArrowsClockwise",
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
type SortMode = "az" | "za" | "category"

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

const CATEGORIES = ["All", "Media", "Navigation", "Actions", "Files", "Interface"] as const

export function IconsShowcase() {
  const [search, setSearch] = React.useState("")
  const [selectedCategory, setSelectedCategory] = React.useState<string>("All")
  const [sortMode, setSortMode] = React.useState<SortMode>("az")
  const [copyFormat, setCopyFormat] = React.useState<CopyFormat>("jsx")
  const [size, setSize] = React.useState<"sm" | "md" | "lg">("md")
  const [weight, setWeight] = React.useState<"regular" | "fill">("regular")
  const [copiedName, setCopiedName] = React.useState<string | null>(null)

  const searchInputRef = React.useRef<HTMLInputElement>(null)

  // Quick keyboard shortcut "/" to focus search
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "/" && document.activeElement !== searchInputRef.current) {
        e.preventDefault()
        searchInputRef.current?.focus()
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  const filteredIcons = React.useMemo(() => {
    const q = search.trim().toLowerCase()
    const list = ICON_LIST.filter((icon) => {
      const matchesSearch = !q || icon.name.toLowerCase().includes(q)
      const matchesCategory = selectedCategory === "All" || icon.category === selectedCategory
      return matchesSearch && matchesCategory
    })

    return list.sort((a, b) => {
      if (sortMode === "za") return b.name.localeCompare(a.name)
      if (sortMode === "category") {
        const catCmp = a.category.localeCompare(b.category)
        return catCmp !== 0 ? catCmp : a.name.localeCompare(b.name)
      }
      return a.name.localeCompare(b.name)
    })
  }, [search, selectedCategory, sortMode])

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

  const resetFilters = () => {
    setSelectedCategory("All")
    setWeight("regular")
    setSearch("")
  }

  const filterGroups: FilterGroup[] = [
    {
      id: "category",
      label: "Category",
      options: CATEGORIES.map((cat) => ({
        value: cat,
        label: cat,
        count: cat === "All" ? ICON_LIST.length : ICON_LIST.filter((i) => i.category === cat).length,
      })),
    },
    {
      id: "weight",
      label: "Weight",
      options: [
        { value: "regular", label: "Regular Line" },
        { value: "fill", label: "Solid Fill" },
      ],
    },
  ]

  const sortOptions: SortOption[] = [
    { value: "az", label: "Name: A to Z" },
    { value: "za", label: "Name: Z to A" },
    { value: "category", label: "Grouped by Category" },
  ]

  const handleFilterChange = (groupId: string, val: string) => {
    if (groupId === "category") setSelectedCategory(val)
    if (groupId === "weight") setWeight(val as "regular" | "fill")
  }

  return (
    <div className="flex flex-col gap-6">
      <ShowcasePageHeader
        title="Icons"
        description="Phosphor icons used across the app, with regular line weight and fill variants."
        importPath='import { Play, Scissors, FilmStrip } from "@moongetsu/autoscene-ui/icons"'
      />

      {/* Reusable FilterBar Component */}
      <FilterBar
        search={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search 88 icons... (press / to focus)"
        filterGroups={filterGroups}
        selectedFilters={{ category: selectedCategory, weight }}
        onFilterChange={handleFilterChange}
        sortOptions={sortOptions}
        selectedSort={sortMode}
        onSortChange={(val) => setSortMode(val as SortMode)}
        onResetFilters={resetFilters}
        actions={
          <>
            {/* View Settings: Size Toggle */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  className="inline-flex items-center gap-1.5 h-9 px-3 rounded-xl border border-white/[0.08] bg-white/[0.04] text-xs font-medium text-fg-2 hover:bg-white/[0.07] hover:text-white transition-all cursor-pointer"
                  title="Icon display size"
                >
                  <SlidersHorizontal className="size-3.5" />
                  <span className="font-mono text-[11px]">{size === "sm" ? "16px" : size === "md" ? "20px" : "24px"}</span>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40">
                <DropdownMenuLabel>Display Size</DropdownMenuLabel>
                <DropdownMenuRadioGroup value={size} onValueChange={(val) => setSize(val as "sm" | "md" | "lg")}>
                  <DropdownMenuRadioItem value="sm">Small (16px)</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="md">Medium (20px)</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="lg">Large (24px)</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Copy Format Segmented Pill */}
            <Segmented
              aria-label="Copy Format"
              value={copyFormat}
              onChange={(val) => setCopyFormat(val as CopyFormat)}
              options={[
                { value: "jsx", label: "JSX" },
                { value: "import", label: "Import" },
                { value: "name", label: "Name" },
              ]}
            />
          </>
        }
      />

      {/* Live Counter bar */}
      <div className="flex items-center justify-between px-1 text-xs text-fg-3 font-mono">
        <span>Showing {filteredIcons.length} of {ICON_LIST.length} icons</span>
        <span>Click icon to copy {copyFormat.toUpperCase()}</span>
      </div>

      {/* Grid of Icons with Animated Layout Transitions */}
      {filteredIcons.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-12 rounded-2xl border border-white/[0.06] bg-white/[0.01] text-fg-3 text-xs">
          <span>{search.trim() ? `No icons matching "${search.trim()}" in ${selectedCategory}` : "No icons available"}</span>
        </div>
      ) : (
        <motion.div
          layout
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3"
        >
          {filteredIcons.map(({ name, Component }) => {
            const isCopied = copiedName === name

            return (
              <motion.button
                key={name}
                layout="position"
                type="button"
                whileHover={{ scale: 1.025, y: -2 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 500, damping: 28 }}
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
                      transition={{ type: "spring", stiffness: 500, damping: 24 }}
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
        </motion.div>
      )}
    </div>
  )
}

