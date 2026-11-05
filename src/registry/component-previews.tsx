import * as React from "react"
import { Play, ShieldWarning, Warning } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Banner } from "@/components/ui/banner"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Segmented } from "@/components/ui/segmented"
import { Kbd } from "@/components/ui/kbd"
import { FilterBar } from "@/components/ui/filter-bar"
import { Progress } from "@/components/ui/progress"
import { Skeleton } from "@/components/ui/skeleton"
import { Select } from "@/components/ui/select"
import { Tooltip, TooltipProvider } from "@/components/ui/tooltip"
import { toast, notify, CleanToastCapsule } from "@/components/ui/toaster"
import { PathText, SettingRow, SettingsGroup } from "@/features/settings/primitives"
import { FEATURE_PREVIEWS } from "./feature-previews"

export interface ComponentCardData {
  id: string
  title: string
  category: string
  description: string
  component: React.ReactNode
}

/**
 * Previews for each discovered component.
 * Custom crafted previews tailored to video editing & creator workflows.
 */
export const COMPONENT_DEMO_PREVIEWS: Record<string, (handlers?: any) => React.ReactNode> = {
  button: () => (
    <Button variant="primary" size="md" onClick={() => toast.success("Built scene pack")}>
      <Play weight="fill" className="size-4" /> Build a scenepack
    </Button>
  ),
  badge: () => (
    <div className="flex flex-wrap gap-2 justify-center">
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
        label="Master Volume"
        value={h?.demoSlider ?? 85}
        onChange={(val: number) => h?.setDemoSlider?.(val)}
        max={100}
        step={1}
      />
    </div>
  ),
  segmented: (h) => (
    <div className="flex flex-col items-center gap-2">
      <Segmented
        aria-label="Navigation Tabs"
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
          { value: "az", label: "Name A-Z" },
          { value: "za", label: "Name Z-A" },
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
  toaster: () => (
    <div className="w-full max-w-[340px] flex items-center justify-center">
      <CleanToastCapsule
        id="home-preview-toaster"
        tone="accent"
        title="Export Completed"
        snippet="ProRes 422 HQ · 2.4 GB"
        actionLabel="Open"
        onAction={() => notify.success("Render queue finished", { snippet: "ProRes 422 HQ" })}
      />
    </div>
  ),
  tooltip: () => (
    <TooltipProvider>
      <Tooltip label="Split playhead at cursor (S)">
        <Button variant="secondary" size="sm">
          Hover for Tooltip
        </Button>
      </Tooltip>
    </TooltipProvider>
  ),
  topbar: () => (
    <div className="w-full max-w-sm rounded-xl border border-white/[0.08] bg-[#0c0c10]/80 p-2.5 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="size-6 rounded-lg bg-accent/20 border border-accent/40 flex items-center justify-center text-accent font-bold text-xs">
          A
        </div>
        <span className="text-xs font-medium text-white">AutoScene</span>
      </div>
      <div className="flex items-center gap-1.5">
        <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-white/[0.04] text-fg-3">v1.0.3</span>
      </div>
    </div>
  ),
  artwork: () => (
    <div className="w-48 aspect-video rounded-xl overflow-hidden border border-white/10 relative group bg-overlay">
      <img
        src="https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=400&fit=crop"
        alt="Timeline footage"
        className="size-full object-cover group-hover:scale-105 transition-transform duration-300"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-2.5">
        <span className="text-[11px] font-medium text-white">Episode_01_Scene_04.mp4</span>
      </div>
    </div>
  ),
  "empty-state": () => (
    <div className="w-full max-w-xs text-center py-4 px-3 rounded-xl border border-dashed border-white/10 bg-white/[0.01]">
      <div className="text-xs font-medium text-fg-2">No Media Imported</div>
      <div className="text-[10px] text-fg-3 mt-1">Drag and drop raw video files here.</div>
    </div>
  ),
  "error-state": () => (
    <div className="w-full max-w-xs text-center py-4 px-3 rounded-xl border border-danger/20 bg-danger/[0.04]">
      <div className="text-xs font-medium text-danger">Codec Mismatch</div>
      <div className="text-[10px] text-fg-3 mt-1">Source requires hardware decoder.</div>
    </div>
  ),
  sheet: () => (
    <div className="flex items-center justify-center">
      <Button variant="secondary" size="sm" onClick={() => toast("Side drawer panel opened")}>
        Open Drawer Sheet
      </Button>
    </div>
  ),
  shelf: () => (
    <div className="flex items-center justify-center">
      <Button variant="secondary" size="sm" onClick={() => toast("Properties shelf toggled")}>
        Toggle Inspector Shelf
      </Button>
    </div>
  ),
  dialog: () => (
    <div className="flex items-center justify-center">
      <Button variant="primary" size="sm" onClick={() => toast("Modal dialog opened")}>
        Open Modal Dialog
      </Button>
    </div>
  ),
  "dropdown-menu": () => (
    <div className="flex items-center justify-center">
      <Button variant="secondary" size="sm" onClick={() => toast("Dropdown options opened")}>
        Dropdown Options
      </Button>
    </div>
  ),
  "context-menu": () => (
    <div className="p-4 rounded-xl border border-dashed border-white/10 text-center text-xs text-fg-3">
      Right-click anywhere to trigger
    </div>
  ),
  "context-area": () => (
    <div className="p-4 rounded-xl border border-white/[0.06] bg-white/[0.02] text-center text-xs text-fg-2">
      Interactive Context Target
    </div>
  ),
  "menu-actions": () => (
    <div className="flex items-center gap-2">
      <Button variant="ghost" size="sm">Edit</Button>
      <Button variant="ghost" size="sm">Duplicate</Button>
      <Button variant="danger" size="sm">Delete</Button>
    </div>
  ),
  hero: () => (
    <div className="w-full max-w-xs p-3 rounded-xl bg-gradient-to-r from-accent/10 to-transparent border border-accent/20 text-left">
      <div className="text-xs font-bold text-white">AutoScene Studio</div>
      <div className="text-[10px] text-fg-3 mt-0.5">High-performance video editing</div>
    </div>
  ),
  page: () => (
    <div className="w-full max-w-xs p-3 rounded-xl border border-white/[0.08] bg-white/[0.02] text-left">
      <div className="text-xs font-medium text-fg-1">Page Layout Container</div>
      <div className="text-[10px] text-fg-3 mt-0.5">With sticky header and scroll physics</div>
    </div>
  ),
  "virtual-grid": () => (
    <div className="grid grid-cols-3 gap-1.5 w-full max-w-[180px]">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div key={i} className="aspect-square rounded-md bg-white/[0.05] border border-white/[0.08] flex items-center justify-center text-[10px] text-fg-3">
          #{i}
        </div>
      ))}
    </div>
  ),
  banner: () => (
    <div className="w-full max-w-md space-y-2.5">
      <Banner
        tone="accent"
        icon={<Warning weight="fill" />}
        title="1 episode is missing"
        actions={<Button size="sm">Locate…</Button>}
        className="flex-nowrap px-4 py-3"
      />
      <Banner
        tone="danger"
        icon={<ShieldWarning weight="fill" />}
        title="Plugin withdrawn"
        actions={
          <Button size="sm" variant="danger">
            Uninstall…
          </Button>
        }
        className="flex-nowrap px-4 py-3"
      />
    </div>
  ),
  checkbox: (h) => (
    <Checkbox
      label="Don't show this again"
      checked={h?.demoCheckbox ?? true}
      onCheckedChange={(v) => h?.setDemoCheckbox?.(v === true)}
    />
  ),
  "settings-group": (h) => (
    <div className="-mb-10 w-full max-w-md">
      <SettingsGroup title="Playback">
        <SettingRow label="Start where you left off">
          <Switch
            aria-label="Start where you left off"
            checked={h?.demoSwitch ?? true}
            onCheckedChange={(c) => h?.setDemoSwitch?.(c)}
          />
        </SettingRow>
        <SettingRow label="Loop the clip">
          <Switch aria-label="Loop the clip" checked={false} onCheckedChange={() => {}} />
        </SettingRow>
      </SettingsGroup>
    </div>
  ),
  "setting-row": (h) => (
    <div className="w-full max-w-md rounded-2xl border border-white/[0.07] bg-white/[0.03]">
      <SettingRow label="Hardware decoding" description="Plays heavy files more smoothly.">
        <Switch
          aria-label="Hardware decoding"
          checked={h?.demoSwitch ?? true}
          onCheckedChange={(c) => h?.setDemoSwitch?.(c)}
        />
      </SettingRow>
    </div>
  ),
  "path-text": () => (
    <div className="w-full max-w-xs space-y-1.5 text-center">
      <PathText path={String.raw`C:\Users\you\Videos\Tears of Steel.autoscene`} />
    </div>
  ),
  ...FEATURE_PREVIEWS,
}
