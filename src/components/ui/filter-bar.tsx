import * as React from "react"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "./dropdown-menu"
import { MagnifyingGlass, Funnel, ArrowsDownUp, X } from "@/components/icons"
import { motion, AnimatePresence } from "motion/react"
import { cn } from "@/lib/utils"

export type FilterOption = {
  value: string
  label: string
  count?: number
}

export type FilterGroup = {
  id: string
  label: string
  options: FilterOption[]
}

export type SortOption = {
  value: string
  label: string
}

export interface FilterBarProps {
  search?: string
  onSearchChange?: (val: string) => void
  searchPlaceholder?: string
  filterGroups?: FilterGroup[]
  selectedFilters?: Record<string, string>
  onFilterChange?: (groupId: string, value: string) => void
  sortOptions?: SortOption[]
  selectedSort?: string
  onSortChange?: (val: string) => void
  onResetFilters?: () => void
  actions?: React.ReactNode
  className?: string
  showSearchShortcut?: boolean
}

/**
 * FilterBar - Reusable desktop filter and sorting toolbar.
 * Combines search, filter popovers, sorting, and active filter pill tags with spring animations.
 */
export function FilterBar({
  search,
  onSearchChange,
  searchPlaceholder = "Search...",
  filterGroups = [],
  selectedFilters = {},
  onFilterChange,
  sortOptions = [],
  selectedSort,
  onSortChange,
  onResetFilters,
  actions,
  className,
  showSearchShortcut = true,
}: FilterBarProps) {
  const searchInputRef = React.useRef<HTMLInputElement>(null)

  // Keyboard shortcut "/" to focus search
  React.useEffect(() => {
    if (!showSearchShortcut || !onSearchChange) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "/" && document.activeElement !== searchInputRef.current) {
        e.preventDefault()
        searchInputRef.current?.focus()
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [showSearchShortcut, onSearchChange])

  // Count active non-default filters
  const activeFilterEntries = Object.entries(selectedFilters).filter(([_, val]) => val && val !== "all" && val !== "All" && val !== "regular")
  const hasActiveFilters = activeFilterEntries.length > 0 || (search && search.trim().length > 0)

  const activeSortLabel = sortOptions.find((s) => s.value === selectedSort)?.label || "Sort"

  return (
    <div className={cn("flex flex-col gap-3 p-3 rounded-2xl border border-white/[0.08] bg-[#0c0c10]/80 backdrop-blur-2xl shadow-2xl", className)}>
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Search Input */}
        {onSearchChange && (
          <div className="relative flex-1 max-w-md">
            <MagnifyingGlass className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-fg-3 pointer-events-none" />
            <input
              ref={searchInputRef}
              value={search ?? ""}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder={searchPlaceholder}
              className="w-full h-9 rounded-xl border border-white/[0.08] bg-white/[0.03] pl-10 pr-9 text-xs text-white placeholder:text-fg-3 focus:outline-none focus:border-accent/60 transition-colors"
            />
            {search ? (
              <button
                type="button"
                onClick={() => onSearchChange("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 p-0.5 rounded-full text-fg-3 hover:text-white cursor-pointer"
              >
                <X className="size-3.5" />
              </button>
            ) : showSearchShortcut ? (
              <kbd className="absolute right-2.5 top-1/2 -translate-y-1/2 inline-flex h-4 items-center justify-center rounded border border-white/10 bg-white/[0.05] px-1.5 font-mono text-[10px] text-fg-3 pointer-events-none">
                /
              </kbd>
            ) : null}
          </div>
        )}

        {/* Action Controls */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Filter Dropdown */}
          {filterGroups.length > 0 && onFilterChange && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  className={cn(
                    "inline-flex items-center gap-2 h-9 px-3 rounded-xl border text-xs font-medium transition-all cursor-pointer",
                    activeFilterEntries.length > 0
                      ? "border-accent/60 bg-accent/15 text-accent shadow-[0_0_12px_rgba(245,165,36,0.15)]"
                      : "border-white/[0.08] bg-white/[0.04] text-fg-2 hover:bg-white/[0.07] hover:text-white",
                  )}
                >
                  <Funnel className="size-3.5" />
                  <span>Filter</span>
                  {activeFilterEntries.length > 0 && (
                    <span className="size-1.5 rounded-full bg-accent" />
                  )}
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                {filterGroups.map((group, idx) => (
                  <React.Fragment key={group.id}>
                    {idx > 0 && <DropdownMenuSeparator />}
                    <DropdownMenuLabel>{group.label}</DropdownMenuLabel>
                    <DropdownMenuRadioGroup
                      value={selectedFilters[group.id]}
                      onValueChange={(val) => onFilterChange(group.id, val)}
                    >
                      {group.options.map((opt) => (
                        <DropdownMenuRadioItem key={opt.value} value={opt.value}>
                          <span className="flex items-center justify-between w-full">
                            <span>{opt.label}</span>
                            {typeof opt.count === "number" && (
                              <span className="text-[10px] font-mono opacity-60">{opt.count}</span>
                            )}
                          </span>
                        </DropdownMenuRadioItem>
                      ))}
                    </DropdownMenuRadioGroup>
                  </React.Fragment>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          {/* Sort Dropdown */}
          {sortOptions.length > 0 && onSortChange && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  className={cn(
                    "inline-flex items-center gap-2 h-9 px-3 rounded-xl border text-xs font-medium transition-all cursor-pointer",
                    selectedSort && selectedSort !== sortOptions[0]?.value
                      ? "border-accent/60 bg-accent/15 text-accent"
                      : "border-white/[0.08] bg-white/[0.04] text-fg-2 hover:bg-white/[0.07] hover:text-white",
                  )}
                >
                  <ArrowsDownUp className="size-3.5" />
                  <span>{activeSortLabel}</span>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuLabel>Sort Order</DropdownMenuLabel>
                <DropdownMenuRadioGroup value={selectedSort} onValueChange={onSortChange}>
                  {sortOptions.map((opt) => (
                    <DropdownMenuRadioItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          {/* Custom Extensible Actions (View toggles, segmented pills, etc.) */}
          {actions}
        </div>
      </div>

      {/* Active Filter Chips with Spring Motion */}
      <AnimatePresence>
        {hasActiveFilters && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 450, damping: 30 }}
            className="flex items-center gap-2 pt-2 border-t border-white/[0.06] overflow-hidden flex-wrap"
          >
            <span className="text-[11px] font-mono text-fg-3">Active:</span>

            {activeFilterEntries.map(([groupId, val]) => {
              const group = filterGroups.find((g) => g.id === groupId)
              const opt = group?.options.find((o) => o.value === val)
              const displayLabel = opt ? `${group?.label}: ${opt.label}` : val

              return (
                <span
                  key={groupId}
                  className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-accent/15 text-accent border border-accent/30"
                >
                  {displayLabel}
                  <button
                    type="button"
                    onClick={() => onFilterChange?.(groupId, group?.options[0]?.value || "All")}
                    className="hover:opacity-75 cursor-pointer"
                  >
                    <X className="size-3" />
                  </button>
                </span>
              )
            })}

            {search && search.trim() && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-white/[0.08] text-white border border-white/10">
                Query: "{search}"
                <button
                  type="button"
                  onClick={() => onSearchChange?.("")}
                  className="hover:opacity-75 cursor-pointer"
                >
                  <X className="size-3" />
                </button>
              </span>
            )}

            {onResetFilters && (
              <button
                type="button"
                onClick={onResetFilters}
                className="text-[11px] font-mono text-fg-3 hover:text-accent ml-auto cursor-pointer transition-colors"
              >
                Reset all
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
