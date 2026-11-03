import { Progress } from "@/components/ui/progress"
import { EmptyState } from "@/components/ui/empty-state"
import { ErrorState } from "@/components/ui/error-state"
import { Kbd } from "@/components/ui/kbd"
import { ShowcasePageHeader } from "../ShowcasePageHeader"
import { ShowcaseSectionStage } from "../ShowcaseSectionStage"

export function IndicatorsShowcase() {
  return (
    <div className="flex flex-col gap-8">
      <ShowcasePageHeader
        title="Indicators & System States"
        description="Linear progress bars, shortcut keycaps, empty placeholders, and fault states designed for background pipelines."
        importPath='import { Progress, Kbd, EmptyState } from "@/components/ui/..."'
      />

      {/* 1. Progress */}
      <ShowcaseSectionStage
        title="Progress Indicators"
        description="Determinate percentage track and indeterminate scanning beam."
        code={`import { Progress } from "@/components/ui/progress"

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
        code={`import { Kbd } from "@/components/ui/kbd"

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
        code={`import { EmptyState } from "@/components/ui/empty-state"

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
    </div>
  )
}
