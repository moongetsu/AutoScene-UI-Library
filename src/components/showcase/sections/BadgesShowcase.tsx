import { Badge } from "@/components/ui/badge"
import { ShowcasePageHeader } from "../ShowcasePageHeader"
import { ShowcaseSectionStage } from "../ShowcaseSectionStage"

export function BadgesShowcase() {
  return (
    <div className="flex flex-col gap-8">
      <ShowcasePageHeader
        title="Badges & Tags"
        description="Tags and status badges for clips, episodes, and export states."
        importPath='import { Badge } from "@moongetsu/autoscene-ui"'
      />

      {/* 1. Tones */}
      <ShowcaseSectionStage
        title="Tones"
        description="Semantic badge styles designed to communicate priority and operational state."
        code={`import { Badge } from "@moongetsu/autoscene-ui"

<Badge tone="neutral">Default Neutral</Badge>
<Badge tone="accent">Accent Gold</Badge>
<Badge tone="danger">Danger Red</Badge>
<Badge tone="outline">Outline</Badge>
<Badge tone="media">Media Frost</Badge>`}
      >
        <Badge tone="neutral">Default Neutral</Badge>
        <Badge tone="accent">Accent Gold</Badge>
        <Badge tone="danger">Danger Red</Badge>
        <Badge tone="outline">Outline</Badge>
        <Badge tone="media">Media Frost</Badge>
      </ShowcaseSectionStage>

      {/* 2. Real-world Use Cases */}
      <ShowcaseSectionStage
        title="Use Case Samples"
        description="Contextual examples used in the scene editor and timeline."
        code={`<div className="flex items-center gap-2">
  <span className="text-sm text-fg-2">Export Status:</span>
  <Badge tone="accent">Done</Badge>
</div>
<div className="flex items-center gap-2">
  <span className="text-sm text-fg-2">Activity:</span>
  <Badge tone="accent">Exporting</Badge>
</div>
<div className="flex items-center gap-2">
  <span className="text-sm text-fg-2">Cut Verification:</span>
  <Badge tone="danger">3 Unverified</Badge>
</div>`}
      >
        <div className="flex flex-wrap gap-6 items-center">
          <div className="flex items-center gap-2">
            <span className="text-sm text-fg-2">Export Status:</span>
            <Badge tone="accent">Done</Badge>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-fg-2">Activity:</span>
            <Badge tone="accent">Exporting</Badge>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-fg-2">Cut Verification:</span>
            <Badge tone="danger">3 Unverified</Badge>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-fg-2">Clip Counter:</span>
            <Badge tone="neutral">42 clips</Badge>
          </div>
        </div>
      </ShowcaseSectionStage>
    </div>
  )
}
