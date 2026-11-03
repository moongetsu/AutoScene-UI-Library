import * as React from "react"
import * as Icons from "@/components/icons"
import { ShowcasePageHeader } from "../ShowcasePageHeader"
import { Segmented } from "@/components/ui/segmented"
import { notify } from "@/components/ui/toaster"
import { MagnifyingGlass, Check, Copy } from "@phosphor-icons/react"
import { motion } from "motion/react"

// Filter out non-component exports like types or utils.
// Phosphor icon components in React 18/19 are React.forward_ref objects or functions.
const ICON_LIST = Object.entries(Icons)
  .filter(([key, val]) => (typeof val === "function" || (typeof val === "object" && val !== null)) && /^[A-Z]/.test(key))
  .map(([name, Component]) => ({
    name,
    Component: Component as React.ComponentType<{ className?: string; weight?: "regular" | "fill" }>,
  }))
  .sort((a, b) => a.name.localeCompare(b.name))

export function IconsShowcase() {
  const [search, setSearch] = React.useState("")
  const [size, setSize] = React.useState<"sm" | "md" | "lg">("md")
  const [weight, setWeight] = React.useState<"regular" | "fill">("regular")
  const [copiedName, setCopiedName] = React.useState<string | null>(null)

  const filteredIcons = React.useMemo(() => {
    const q = search.trim().toLowerCase()
    if (!q) return ICON_LIST
    return ICON_LIST.filter((icon) => icon.name.toLowerCase().includes(q))
  }, [search])

  const copyIconCode = (name: string) => {
    const code = `<${name} className="size-4"${weight === "fill" ? ' weight="fill"' : ""} />`
    navigator.clipboard.writeText(code)
    setCopiedName(name)
    notify.success(`Copied <${name} />`, {
      description: "Ready to paste into your JSX template.",
      snippet: code,
      badge: "Icon JSX",
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
        title="Iconography"
        description="A curated collection of Phosphor icons tailored for video editing and creator tools. Consistent regular weights with fill accents."
        importPath='import { Play, Scissors, FilmStrip } from "@moongetsu/autoscene-ui/icons"'
      />

      {/* Control Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-4 rounded-2xl border border-white/[0.08] bg-[#0c0c10]/80 backdrop-blur-xl shadow-xl">
        {/* Search Bar */}
        <div className="relative flex-1 max-w-md">
          <MagnifyingGlass className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-fg-3 pointer-events-none" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search 80+ icons by name..."
            className="w-full h-9 rounded-xl border border-white/[0.08] bg-white/[0.03] pl-10 pr-4 text-xs text-white placeholder:text-fg-3 focus:outline-none focus:border-accent/60 transition-colors"
          />
        </div>

        {/* View Switches: Size & Weight */}
        <div className="flex items-center gap-3 self-end sm:self-auto">
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

      {/* Counter bar */}
      <div className="flex items-center justify-between px-1 text-xs text-fg-3 font-mono">
        <span>Showing {filteredIcons.length} of {ICON_LIST.length} icons</span>
        <span>Click any icon to copy JSX</span>
      </div>

      {/* Grid of Icons */}
      {filteredIcons.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-12 rounded-2xl border border-white/[0.06] bg-white/[0.01] text-fg-3 text-xs">
          <span>{search.trim() ? `No icons matching "${search.trim()}"` : "No icons available"}</span>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
          {filteredIcons.map(({ name, Component }) => {
            const isCopied = copiedName === name

            return (
              <motion.button
                key={name}
                type="button"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => copyIconCode(name)}
                className="group relative flex flex-col items-center justify-center gap-2.5 p-4 rounded-xl border border-white/[0.06] bg-[#0c0c10]/60 hover:bg-white/[0.04] hover:border-accent/40 transition-colors cursor-pointer text-fg-2 hover:text-white"
                title={`Copy <${name} />`}
              >
                {/* Rendered Icon */}
                <div className="size-10 rounded-lg flex items-center justify-center bg-white/[0.02] border border-white/[0.04] group-hover:border-accent/30 group-hover:bg-accent/[0.08] transition-colors">
                  <Component className={`${iconSizeClass} transition-transform group-hover:scale-110 text-current group-hover:text-accent`} weight={weight} />
                </div>

                {/* Name Label */}
                <span className="text-[11px] font-mono truncate max-w-full text-fg-3 group-hover:text-white transition-colors">
                  {name}
                </span>

                {/* Copied indicator pill */}
                {isCopied && (
                  <span className="absolute top-1.5 right-1.5 flex items-center gap-0.5 text-[9px] font-mono text-accent bg-accent/15 px-1.5 py-0.5 rounded-full border border-accent/30">
                    <Check className="size-2.5" /> Copied
                  </span>
                )}
              </motion.button>
            )
          })}
        </div>
      )}
    </div>
  )
}

