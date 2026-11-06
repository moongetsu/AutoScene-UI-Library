import { useState } from "react"
import { Copy, Play, DotsThree, FilmStrip } from "@/components/icons"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CardMenuButton } from "@/components/ui/card-menu-button"
import { CardPlayButton } from "@/components/ui/card-play-button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Skeleton } from "@/components/ui/skeleton"
import { Switch } from "@/components/ui/switch"
import { PathText, SettingRow, SettingsGroup } from "@/features/settings/primitives"
import { footageStill } from "@/lib/footage"
import { CARD_GRID } from "@/lib/grid"
import { ShowcasePageHeader } from "../ShowcasePageHeader"
import { ShowcaseSectionStage } from "../ShowcaseSectionStage"

export function CardsShowcase() {
  const [hardware, setHardware] = useState(true)
  return (
    <div className="flex flex-col gap-8">
      <ShowcasePageHeader
        title="Composite Cards"
        description="Cards for character profiles, exports, and video clips."
        importPath='import { Badge, Button } from "@moongetsu/autoscene-ui"'
      />

      {/* 1. Character Profile Card */}
      <ShowcaseSectionStage
        title="Character Profile Card"
        description="Square actor profile card with floating clip count badge and action trigger."
        code={`<div className="w-56 rounded-2xl border border-white/[0.08] bg-[#111114] p-3 flex flex-col gap-3">
  <div className="relative aspect-square w-full rounded-xl overflow-hidden">
    <img src="..." alt="Patrick Jane" className="size-full object-cover" />
    <div className="absolute top-2 right-2">
      <Badge tone="accent">48 clips</Badge>
    </div>
  </div>
  <div className="flex items-center justify-between px-1">
    <div>
      <h4 className="font-semibold text-white text-xs">Patrick Jane</h4>
      <p className="text-[11px] text-fg-3">The Mentalist</p>
    </div>
    <Button variant="ghost" size="icon-sm"><DotsThree weight="bold" /></Button>
  </div>
</div>`}
      >
        <div className="group relative w-56 rounded-2xl border border-white/[0.08] bg-[#111114] p-3 flex flex-col gap-3 transition-all hover:border-white/20 hover:shadow-xl">
          <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-overlay">
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&fit=crop"
              alt="Patrick Jane"
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute top-2 right-2">
              <Badge tone="accent">48 clips</Badge>
            </div>
          </div>
          <div className="flex items-center justify-between px-1">
            <div>
              <h4 className="font-semibold text-white text-xs">Patrick Jane</h4>
              <p className="text-[11px] text-fg-3">The Mentalist</p>
            </div>
            <Button variant="ghost" size="icon-sm" aria-label="More options">
              <DotsThree weight="bold" />
            </Button>
          </div>
        </div>
      </ShowcaseSectionStage>

      {/* 2. Export Summary Card */}
      <ShowcaseSectionStage
        title="Export Summary Row"
        description="Horizontal clip summary row with codec specs, play button, and actions."
        code={`<div className="w-full rounded-2xl border border-white/[0.08] bg-[#111114] p-4 flex items-center justify-between gap-4">
  <div className="flex items-center gap-3">
    <div className="flex size-10 items-center justify-center rounded-xl bg-accent/15 text-accent">
      <FilmStrip className="size-5" />
    </div>
    <div>
      <div className="flex items-center gap-2">
        <h4 className="font-semibold text-white text-xs">Mentalist_Jane_scenepack.mov</h4>
        <Badge tone="accent">Verified</Badge>
      </div>
      <p className="text-[11px] text-fg-3 mt-0.5">ProRes 422 · 42 clips · 2m 14s</p>
    </div>
  </div>
  <Button variant="secondary" size="sm"><Play weight="fill" /> Play</Button>
</div>`}
      >
        <div className="w-full max-w-lg rounded-2xl border border-white/[0.08] bg-[#111114] p-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl bg-accent/15 text-accent shrink-0">
              <FilmStrip className="size-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-semibold text-white text-xs truncate max-w-[200px]">Mentalist_Jane_scenepack.mov</h4>
                <Badge tone="accent">Verified</Badge>
              </div>
              <p className="text-[11px] text-fg-3 mt-0.5">ProRes 422 · 42 clips · 2m 14s</p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <Button variant="secondary" size="sm">
              <Play weight="fill" /> Play
            </Button>
            <Button variant="ghost" size="icon-sm" aria-label="Export options">
              <DotsThree weight="bold" />
            </Button>
          </div>
        </div>
      </ShowcaseSectionStage>

      {/* 3. Settings rows */}
      <ShowcaseSectionStage
        title="Settings Group, Setting Row and Path Text"
        description="Grouped rows: what a setting is on the left, its control on the right. A path stays selectable, and a right-click shows or copies it."
        code={`import { PathText, SettingRow, SettingsGroup } from "@/features/settings/primitives"
import { footageStill } from "@/lib/footage"
import { CARD_GRID } from "@/lib/grid"

<SettingsGroup title="Storage">
  <SettingRow label="Library folder" description="Where new projects are kept.">
    <Button size="sm">Change…</Button>
  </SettingRow>
  <SettingRow label="Hardware decoding" description="Plays heavy files more smoothly.">
    <Switch aria-label="Hardware decoding" checked onCheckedChange={setOn} />
  </SettingRow>
</SettingsGroup>`}
      >
        <div className="-mb-10 w-full max-w-2xl">
          <SettingsGroup title="Storage">
            <SettingRow label="Library folder" description={<PathText path={String.raw`C:\Users\you\Videos\AutoScene`} />}>
              <Button size="sm">Change…</Button>
            </SettingRow>
            <SettingRow label="Hardware decoding" description="Plays heavy files more smoothly.">
              <Switch aria-label="Hardware decoding" checked={hardware} onCheckedChange={setHardware} />
            </SettingRow>
          </SettingsGroup>
        </div>
      </ShowcaseSectionStage>

      {/* On a card's picture */}
      <ShowcaseSectionStage
        title="Card Buttons"
        description="The ⋯ and the play button on a card's picture: out of sight until the pointer is over it or the keyboard reaches them. Move the pointer over the pictures. Still: Tears of Steel, Blender Foundation, CC BY 3.0."
        code={`<div className="group relative">
  <DropdownMenu>
    <CardMenuButton aria-label="More" />
    <DropdownMenuContent>...</DropdownMenuContent>
  </DropdownMenu>
</div>

<div className="group relative">
  <CardPlayButton aria-label="Watch the shot" onClick={watch} />
</div>`}
      >
        <div className="grid w-full max-w-xl grid-cols-2 gap-4">
          <div className="group relative aspect-video overflow-hidden rounded-xl bg-inset picture-edge">
            <img src={footageStill("live-2.webp")} alt="" className="size-full object-cover" />
            <DropdownMenu>
              <CardMenuButton aria-label="More" />
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <Copy /> Copy the name
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="group relative aspect-video overflow-hidden rounded-xl bg-inset picture-edge">
            <img src={footageStill("live-2.webp")} alt="" className="size-full object-cover" />
            <CardPlayButton aria-label="Watch the shot" />
          </div>
        </div>
      </ShowcaseSectionStage>

      {/* The grid of big cards */}
      <ShowcaseSectionStage
        title="Card Grid"
        description="CARD_GRID is the grid of big cards, a library's projects or the plugins: as many columns of at least 300 px as fit."
        code={`import { CARD_GRID } from "@moongetsu/autoscene-ui"

<div className={CARD_GRID}>...</div>`}
      >
        <div className="w-full">
          <div className={CARD_GRID}>
            <Skeleton className="aspect-video rounded-2xl" />
            <Skeleton className="aspect-video rounded-2xl" />
            <Skeleton className="aspect-video rounded-2xl" />
          </div>
        </div>
      </ShowcaseSectionStage>
    </div>
  )
}
