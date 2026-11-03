import { Hero } from "@/components/ui/hero"
import { Badge } from "@/components/ui/badge"
import { ShowcasePageHeader } from "../ShowcasePageHeader"
import { ShowcaseSectionStage } from "../ShowcaseSectionStage"

export function MediaShowcase() {
  return (
    <div className="flex flex-col gap-8">
      <ShowcasePageHeader
        title="Media & Artwork"
        description="Image containers, aspect ratio frames, and hero headers."
        importPath='import { Hero, Badge } from "@moongetsu/autoscene-ui"'
      />

      {/* 1. Hero */}
      <ShowcaseSectionStage
        title="Hero Display Header"
        description="Backdrop header designed for project and episode hero banners."
        code={`import { Hero, Badge } from "@moongetsu/autoscene-ui"

<Hero path={null}>
  <div className="p-8 flex flex-col gap-2">
    <h1 className="text-3xl font-bold text-fg-1">The Mentalist</h1>
    <div className="flex items-center gap-2">
      <Badge tone="accent">Season 1</Badge>
      <span className="text-xs text-fg-3">23 Episodes · 1,420 Cast Faces</span>
    </div>
  </div>
</Hero>`}
      >
        <div className="w-full max-w-xl rounded-xl overflow-hidden border border-white/[0.08] bg-[#0c0c0f]">
          <Hero path={null}>
            <div className="p-6 flex flex-col gap-2">
              <h1 className="text-2xl font-bold text-white">The Mentalist</h1>
              <div className="flex items-center gap-2">
                <Badge tone="accent">Season 1</Badge>
                <span className="text-xs text-fg-3">23 Episodes · 1,420 Cast Faces</span>
              </div>
            </div>
          </Hero>
        </div>
      </ShowcaseSectionStage>

      {/* 2. Artwork Containers */}
      <ShowcaseSectionStage
        title="Artwork Containers & Aspect Ratios"
        description="Fixed-ratio media containers with specular border treatments."
        code={`{/* Poster Portrait */}
<div className="w-40 h-56 rounded-xl overflow-hidden border border-white/[0.08]">
  <img src="..." alt="Poster" className="size-full object-cover" />
</div>

{/* 16:9 Video Still */}
<div className="w-64 aspect-video rounded-xl overflow-hidden border border-white/[0.08]">
  <img src="..." alt="Video Still" className="size-full object-cover" />
</div>`}
      >
        <div className="flex flex-wrap gap-6 items-center justify-center">
          <div className="w-36 flex flex-col gap-1.5">
            <span className="text-[11px] text-fg-3 font-medium">Portrait Aspect (Poster)</span>
            <div className="h-48 rounded-xl overflow-hidden border border-white/[0.08] bg-panel">
              <img
                src="https://images.unsplash.com/photo-1534447677768-be436bb09401?w=500"
                alt="Poster sample"
                className="size-full object-cover"
              />
            </div>
          </div>

          <div className="w-56 flex flex-col gap-1.5">
            <span className="text-[11px] text-fg-3 font-medium">16:9 Video Still</span>
            <div className="aspect-video rounded-xl overflow-hidden border border-white/[0.08] bg-panel">
              <img
                src="https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=500"
                alt="Video still sample"
                className="size-full object-cover"
              />
            </div>
          </div>
        </div>
      </ShowcaseSectionStage>
    </div>
  )
}
