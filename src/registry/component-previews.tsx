import * as React from "react"
import { Play, Plus, DownloadSimple, Trash } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Segmented } from "@/components/ui/segmented"
import { Kbd } from "@/components/ui/kbd"
import { FilterBar } from "@/components/ui/filter-bar"
import { Progress } from "@/components/ui/progress"
import { Skeleton } from "@/components/ui/skeleton"
import { Select } from "@/components/ui/select"
import { toast } from "sonner"

export interface ComponentCardData {
  id: string
  title: string
  category: string
  description: string
  component: React.ReactNode
}

/**
 * Previews for each discovered component.
 * Fallback is provided if a component does not have an explicit custom demo preview.
 */
export const COMPONENT_DEMO_PREVIEWS: Record<string, (handlers?: any) => React.ReactNode> = {
  button: () => (
    <Button variant="primary" size="md" onClick={() => toast.success("Built scene pack")}>
      <Play weight="fill" className="size-4" /> Build a scenepack
    </Button>
  ),
  badge: () => (
    <div className="flex flex-wrap gap-2">
      <Badge tone="accent">Gold Focus</Badge>
      <Badge tone="danger">Failed</Badge>
      <Badge tone="outline">Outline</Badge>
      <Badge tone="media">Media Frost</Badge>
    </div>
  ),
  input: (h) => (
    <div className="w-full max-w-xs space-y-2">
      <Input
        value={h?.demoInput ?? ""}
        onChange={(e) => h?.setDemoInput?.(e.target.value)}
        placeholder="Search footage clips..."
      />
    </div>
  ),
  switch: (h) => (
    <div className="flex items-center gap-3">
      <span className="text-xs text-fg-3">Hardware Acceleration</span>
      <Switch
        checked={h?.demoSwitch ?? true}
        onCheckedChange={(c) => h?.setDemoSwitch?.(c)}
      />
    </div>
  ),
  slider: (h) => (
    <div className="w-full max-w-xs space-y-2">
      <div className="flex justify-between text-xs text-fg-3">
        <span>Master Volume</span>
        <span className="font-mono text-fg-1">{h?.demoSlider ?? 85}%</span>
      </div>
      <Slider
        value={[h?.demoSlider ?? 85]}
        onValueChange={(val) => h?.setDemoSlider?.(val[0])}
        max={100}
        step={1}
      />
    </div>
  ),
  segmented: (h) => (
    <div className="flex flex-col items-center gap-2">
      <Segmented
        value={h?.demoTab ?? "cast"}
        onChange={(v) => h?.setDemoTab?.(v)}
        options={[
          { value: "episodes", label: "Episodes" },
          { value: "cast", label: "Cast" },
        ]}
      />
      <span className="text-[11px] font-mono text-fg-3">
        Active: <span className="text-accent">{h?.demoTab ?? "cast"}</span>
      </span>
    </div>
  ),
  kbd: () => (
    <div className="flex items-center gap-3 text-xs text-fg-2">
      <span>Command Palette:</span>
      <Kbd keys={["⌘", "K"]} />
    </div>
  ),
  "filter-bar": (h) => (
    <div className="w-full max-w-sm">
      <FilterBar
        search={h?.demoFilterSearch ?? ""}
        onSearchChange={h?.setDemoFilterSearch}
        searchPlaceholder="Search footage... (/)"
        filterGroups={[
          {
            id: "status",
            label: "Status",
            options: [
              { value: "all", label: "All Items" },
              { value: "ready", label: "Ready", count: 12 },
              { value: "rendering", label: "Rendering", count: 4 },
            ],
          },
        ]}
        selectedFilters={{ status: h?.demoFilterStatus ?? "ready" }}
        onFilterChange={(_, val) => h?.setDemoFilterStatus?.(val)}
        sortOptions={[
          { value: "az", label: "Name A–Z" },
          { value: "za", label: "Name Z–A" },
        ]}
        selectedSort={h?.demoFilterSort ?? "az"}
        onSortChange={h?.setDemoFilterSort}
        onResetFilters={() => {
          h?.setDemoFilterStatus?.("all")
          h?.setDemoFilterSearch?.("")
        }}
      />
    </div>
  ),
  progress: () => (
    <div className="w-full max-w-xs space-y-2">
      <div className="flex justify-between text-xs text-fg-3">
        <span>Exporting ProRes</span>
        <span className="font-mono text-fg-1">68%</span>
      </div>
      <Progress value={68} />
    </div>
  ),
  skeleton: () => (
    <div className="flex items-center gap-3 w-full max-w-xs">
      <Skeleton className="size-12 rounded-xl shrink-0" />
      <div className="space-y-2 flex-1">
        <Skeleton className="h-4 w-3/4 rounded-md" />
        <Skeleton className="h-3 w-1/2 rounded-md" />
      </div>
    </div>
  ),
  select: () => (
    <div className="w-full max-w-xs">
      <Select
        value="prores"
        onChange={() => {}}
        options={[
          { value: "prores", label: "Apple ProRes 422 HQ" },
          { value: "h265", label: "HEVC / H.265 (10-bit)" },
          { value: "dnxhr", label: "Avid DNxHR HQX" },
        ]}
      />
    </div>
  ),
}

/**
 * Returns a fallback interactive demo for any newly discovered component
 */
export function getFallbackComponentPreview(id: string, name: string): React.ReactNode {
  return (
    <div className="flex flex-col items-center justify-center p-4 rounded-xl border border-white/[0.06] bg-white/[0.02] text-center gap-2">
      <span className="text-xs font-medium text-fg-2">{name} Component</span>
      <span className="text-[10px] font-mono text-fg-3">import &#123; {name.replace(/\s+/g, "")} &#125; from "@moongetsu/autoscene-ui"</span>
    </div>
  )
}
