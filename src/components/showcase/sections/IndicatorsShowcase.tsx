import { ShieldWarning, Warning } from "@/components/icons"
import { Banner } from "@/components/ui/banner"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { EmptyState } from "@/components/ui/empty-state"
import { Kbd } from "@/components/ui/kbd"
import { Skeleton } from "@/components/ui/skeleton"
import { ShowcasePageHeader } from "../ShowcasePageHeader"
import { ShowcaseSectionStage } from "../ShowcaseSectionStage"

export function IndicatorsShowcase() {
  return (
    <div className="flex flex-col gap-8">
      <ShowcasePageHeader
        title="Status & Progress"
        description="Progress bars, keyboard shortcuts, and empty states."
        importPath='import { Progress, Skeleton, Kbd, EmptyState } from "@moongetsu/autoscene-ui"'
      />

      {/* 1. Progress */}
      <ShowcaseSectionStage
        title="Progress Indicators"
        description="Determinate percentage track and indeterminate scanning beam."
        code={`import { Progress } from "@moongetsu/autoscene-ui"

{/* Percentage */}
<Progress value={65} />

{/* Indeterminate beam */}
<Progress />`}
      >
        <div className="flex flex-col gap-6 w-full max-w-md">
          <div className="flex flex-col gap-2">
            <div className="flex justify-between text-xs text-fg-2">
              <span>Exporting scene clips…</span>
              <span className="font-mono text-accent">65%</span>
            </div>
            <Progress value={65} />
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex justify-between text-xs text-fg-2">
              <span>Indeterminate Loading</span>
            </div>
            <Progress />
          </div>
        </div>
      </ShowcaseSectionStage>

      {/* 2. Keyboard Shortcuts */}
      <ShowcaseSectionStage
        title="Keyboard Shortcuts (Kbd)"
        description="Specular shortcut caps formatted for hotkey guides and tooltip prompts."
        code={`import { Kbd } from "@moongetsu/autoscene-ui"

<Kbd keys={["⌘", "K"]} />
<Kbd keys={["Space"]} />
<Kbd keys={["I"]} />
<Kbd keys={["O"]} />`}
      >
        <div className="flex flex-wrap gap-6 items-center justify-center">
          <div className="flex items-center gap-2 text-xs text-fg-2">
            <span>Palette:</span>
            <Kbd keys={["⌘", "K"]} />
          </div>
          <div className="flex items-center gap-2 text-xs text-fg-2">
            <span>Play/Pause:</span>
            <Kbd keys={["Space"]} />
          </div>
          <div className="flex items-center gap-2 text-xs text-fg-2">
            <span>Mark In:</span>
            <Kbd keys={["I"]} />
          </div>
          <div className="flex items-center gap-2 text-xs text-fg-2">
            <span>Mark Out:</span>
            <Kbd keys={["O"]} />
          </div>
        </div>
      </ShowcaseSectionStage>

      {/* 3. Empty & Error States */}
      <ShowcaseSectionStage
        title="Empty & Error States"
        description="Informative fallback graphics with direct resolution actions."
        code={`import { EmptyState } from "@moongetsu/autoscene-ui"

<EmptyState
  title="No scenes detected"
  description="Drop an MP4 video or select an episode file to begin."
/>`}
      >
        <div className="w-full max-w-md">
          <EmptyState
            title="No scenes detected"
            description="Drop an MP4 video or select an episode file to begin cutting."
          />
        </div>
      </ShowcaseSectionStage>

      {/* 4. Skeleton Shimmer Loaders */}
      <ShowcaseSectionStage
        title="Shimmer Skeletons"
        description="Specular sweep loading placeholders for media grids, actor profiles, and timeline feeds."
        code={`import { Skeleton } from "@moongetsu/autoscene-ui"

{/* Media Card Placeholder */}
<div className="w-64 rounded-xl border border-white/[0.08] bg-panel p-3.5 flex flex-col gap-3">
  <Skeleton className="aspect-video w-full rounded-lg" />
  <div className="flex flex-col gap-1.5">
    <Skeleton className="h-4 w-3/4" />
    <Skeleton className="h-3 w-1/2" />
  </div>
</div>`}
      >
        <div className="flex flex-wrap gap-6 items-center justify-center">
          {/* Card skeleton */}
          <div className="w-56 rounded-xl border border-white/[0.08] bg-[#0c0c0f] p-3 flex flex-col gap-3">
            <Skeleton className="aspect-video w-full rounded-lg" />
            <div className="flex flex-col gap-1.5">
              <Skeleton className="h-3.5 w-3/4" />
              <Skeleton className="h-2.5 w-1/2" />
            </div>
          </div>

          {/* Avatar row skeleton */}
          <div className="flex items-center gap-3 p-3 rounded-xl border border-white/[0.08] bg-[#0c0c0f]">
            <Skeleton className="size-10 rounded-full" />
            <div className="flex flex-col gap-1.5">
              <Skeleton className="h-3.5 w-24" />
              <Skeleton className="h-2.5 w-16" />
            </div>
          </div>
        </div>
      </ShowcaseSectionStage>

      {/* Banner */}
      <ShowcaseSectionStage
        title="Banner"
        description="Something the person has to know, at the top of the view it is about. Gold asks for an action, red says something is wrong."
        code={`<Banner
  tone="accent"
  icon={<Warning weight="fill" />}
  title="1 episode can't be found"
  description="Moved, renamed, or on a drive that isn't connected."
  actions={<Button>Locate folder…</Button>}
/>`}
      >
        <div className="flex w-full max-w-2xl flex-col gap-3">
          <Banner
            tone="accent"
            icon={<Warning weight="fill" />}
            title="1 episode can't be found"
            description="Moved, renamed, or on a drive that isn't connected."
            actions={<Button>Locate folder…</Button>}
          />
          <Banner
            tone="danger"
            icon={<ShieldWarning weight="fill" />}
            title="AutoScene withdrew this plugin"
            description="It doesn't run any more. You can uninstall it."
            actions={<Button variant="danger">Uninstall…</Button>}
          />
        </div>
      </ShowcaseSectionStage>
    </div>
  )
}
