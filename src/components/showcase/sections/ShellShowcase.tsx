import { MagnifyingGlass, GearSix, Play, Clock } from "@/components/icons"
import { AutoSceneMark } from "@/components/brand/AutoSceneMark"
import { ShowcasePageHeader } from "../ShowcasePageHeader"
import { ShowcaseSectionStage } from "../ShowcaseSectionStage"

export function ShellShowcase() {
  return (
    <div className="flex flex-col gap-8">
      <ShowcasePageHeader
        title="Shell & Headers"
        description="Navigation rails, brand logos, and app shell headers."
        importPath='import { AutoSceneMark } from "@/components/brand/AutoSceneMark"'
      />

      {/* 1. Brand Vectors */}
      <ShowcaseSectionStage
        title="Brand Marks"
        description="The AutoScene golden chevron mark with boxed and bare variations."
        code={`import { AutoSceneMark } from "@/components/brand/AutoSceneMark"

{/* Boxed app icon */}
<AutoSceneMark className="size-10" />

{/* Bare geometry only */}
<AutoSceneMark bare className="size-10" />`}
      >
        <div className="flex items-center gap-10 justify-center">
          <div className="flex flex-col items-center gap-2">
            <AutoSceneMark className="size-12" />
            <span className="text-[11px] text-fg-3">App Icon Mark</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <AutoSceneMark bare className="size-12" />
            <span className="text-[11px] text-fg-3">Bare Geometry</span>
          </div>
        </div>
      </ShowcaseSectionStage>

      {/* 2. Navigation Rail */}
      <ShowcaseSectionStage
        title="Vertical Navigation Rail"
        description="Compact sidebar rail with icon actions and active selection states."
        code={`<div className="w-14 rounded-2xl border border-white/[0.08] bg-[#111114] py-5 flex flex-col items-center gap-5">
  <AutoSceneMark className="size-6" />
  <button className="size-9 rounded-xl bg-accent/15 text-accent flex items-center justify-center">
    <Play weight="fill" className="size-4" />
  </button>
  <button className="size-9 rounded-xl text-fg-3 hover:text-white flex items-center justify-center">
    <Clock className="size-4" />
  </button>
  <button className="size-9 rounded-xl text-fg-3 hover:text-white flex items-center justify-center">
    <GearSix className="size-4" />
  </button>
</div>`}
      >
        <div className="w-14 rounded-2xl border border-white/[0.08] bg-[#111114] py-5 flex flex-col items-center gap-5 shadow-2xl">
          <AutoSceneMark className="size-6" />

          <div className="flex flex-col items-center gap-2.5 w-full">
            <button
              type="button"
              className="size-9 rounded-xl bg-accent/15 text-accent flex items-center justify-center transition-all cursor-pointer"
              aria-label="Library"
            >
              <Play weight="fill" className="size-4" />
            </button>
            <button
              type="button"
              className="size-9 rounded-xl text-fg-3 hover:bg-white/[0.04] hover:text-fg-1 flex items-center justify-center transition-all cursor-pointer"
              aria-label="Activity"
            >
              <Clock className="size-4" />
            </button>
            <button
              type="button"
              className="size-9 rounded-xl text-fg-3 hover:bg-white/[0.04] hover:text-fg-1 flex items-center justify-center transition-all cursor-pointer"
              aria-label="Settings"
            >
              <GearSix className="size-4" />
            </button>
          </div>
        </div>
      </ShowcaseSectionStage>
    </div>
  )
}
