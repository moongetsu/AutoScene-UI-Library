import { useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Segmented } from "@/components/ui/segmented"
import { ShowcasePageHeader } from "../ShowcasePageHeader"
import { ShowcaseSectionStage } from "../ShowcaseSectionStage"

export function TogglesShowcase() {
  const [never, setNever] = useState(true)
  const [toggleState, setToggleState] = useState(true)
  const [sliderVal, setSliderVal] = useState(75)
  const [tab, setTab] = useState<"episodes" | "cast" | "packs">("cast")

  return (
    <div className="flex flex-col gap-8">
      <ShowcasePageHeader
        title="Toggles & Sliders"
        description="Switches, range sliders, and sliding tab buttons."
        importPath='import { Switch, Segmented, Slider } from "@moongetsu/autoscene-ui"'
      />

      {/* 1. Segmented */}
      <ShowcaseSectionStage
        title="Segmented Sliding Tabs"
        description="Fluid indicator bar slides underneath active tabs using spring physics."
        code={`import { Segmented } from "@moongetsu/autoscene-ui"

<Segmented
  value={tab}
  onChange={(v) => setTab(v)}
  options={[
    { value: "episodes", label: "Episodes" },
    { value: "cast", label: "Cast" },
    { value: "packs", label: "Scenepacks" },
  ]}
/>`}
      >
        <div className="flex flex-col items-center gap-4 w-full max-w-sm">
          <Segmented
            aria-label="View tabs"
            value={tab}
            onChange={(v) => setTab(v)}
            options={[
              { value: "episodes", label: "Episodes" },
              { value: "cast", label: "Cast" },
              { value: "packs", label: "Scenepacks" },
            ]}
          />
          <span className="text-xs text-center text-fg-3">
            Selected tab: <span className="text-accent font-mono">{tab}</span>
          </span>
        </div>
      </ShowcaseSectionStage>

      {/* 2. Switches */}
      <ShowcaseSectionStage
        title="Toggle Switches"
        description="High-contrast boolean toggles with smooth glow transitions."
        code={`import { Switch } from "@moongetsu/autoscene-ui"

<label className="flex items-center justify-between gap-4">
  <span className="text-sm font-medium text-fg-1">Hardware Acceleration</span>
  <Switch checked={toggleState} onCheckedChange={setToggleState} />
</label>`}
      >
        <div className="flex flex-col gap-4 w-full max-w-sm">
          <label className="flex items-center justify-between gap-4 p-2 rounded-xl bg-white/[0.02] border border-white/[0.06] cursor-pointer">
            <span className="text-sm font-medium text-fg-1">Hardware Acceleration</span>
            <Switch checked={toggleState} onCheckedChange={setToggleState} />
          </label>
          <label className="flex items-center justify-between gap-4 p-2 rounded-xl bg-white/[0.02] border border-white/[0.06] cursor-pointer">
            <span className="text-sm font-medium text-fg-1">Auto-verify every cut</span>
            <Switch checked={false} onCheckedChange={() => {}} />
          </label>
        </div>
      </ShowcaseSectionStage>

      {/* 3. Sliders */}
      <ShowcaseSectionStage
        title="Sliders & Range Controls"
        description="Continuous track sliders with numeric readout indicators."
        code={`import { Slider } from "@moongetsu/autoscene-ui"

<Slider
  value={sliderVal}
  min={0}
  max={100}
  step={1}
  label="Confidence"
  format={(val) => \`\${val}%\`}
  onChange={(val) => setSliderVal(val)}
/>`}
      >
        <div className="flex flex-col gap-4 w-full max-w-sm">
          <div className="flex justify-between text-xs text-fg-2">
            <span>Detection Confidence Threshold</span>
            <span className="font-mono text-accent">{sliderVal}%</span>
          </div>
          <Slider
            value={sliderVal}
            min={0}
            max={100}
            step={1}
            label="Detection Confidence"
            format={(val) => `${val}%`}
            onChange={(val) => setSliderVal(val)}
          />
        </div>
      </ShowcaseSectionStage>

      {/* Checkbox */}
      <ShowcaseSectionStage
        title="Checkbox"
        description="A tick box with its label, only for an option that matters once. Settings use a switch."
        code={`<Checkbox label="Don't show this again" checked={never} onCheckedChange={(v) => setNever(v === true)} />`}
      >
        <Checkbox label="Don't show this again" checked={never} onCheckedChange={(v) => setNever(v === true)} />
      </ShowcaseSectionStage>
    </div>
  )
}
