import * as React from "react"
import { MagnifyingGlass } from "@phosphor-icons/react"
import { Input } from "@/components/ui/input"
import { ShowcasePageHeader } from "../ShowcasePageHeader"
import { ShowcaseSectionStage } from "../ShowcaseSectionStage"

export function InputsShowcase() {
  const [val, setVal] = React.useState("The Mentalist")

  return (
    <div className="flex flex-col gap-8">
      <ShowcasePageHeader
        title="Inputs & Search"
        description="Text inputs and search bars with focus borders."
        importPath='import { Input } from "@/components/ui/input"'
      />

      {/* 1. Standard Fields */}
      <ShowcaseSectionStage
        title="Standard Text Inputs"
        description="Controlled text fields with labels and active states."
        code={`import { Input } from "@/components/ui/input"

<div className="flex flex-col gap-1.5">
  <label className="text-xs font-medium text-fg-2">Project Name</label>
  <Input value={val} onChange={(e) => setVal(e.target.value)} placeholder="Enter project name..." />
</div>`}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-xl">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-medium text-fg-2">Project Name</label>
            <Input value={val} onChange={(e) => setVal(e.target.value)} placeholder="Enter project name..." />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-medium text-fg-2">Empty with Placeholder</label>
            <Input placeholder="Type something here…" />
          </div>
        </div>
      </ShowcaseSectionStage>

      {/* 2. States & Variants */}
      <ShowcaseSectionStage
        title="Search & Disabled States"
        description="Search inputs with integrated icons and non-editable read-only views."
        code={`import { MagnifyingGlass } from "@phosphor-icons/react"

{/* Search with icon */}
<div className="relative">
  <MagnifyingGlass className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-fg-3" />
  <Input className="pl-10" placeholder="Search cast or episodes…" />
</div>

{/* Disabled field */}
<Input disabled value="Read-only system path" />`}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-xl">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-medium text-fg-2">Search Input with Icon</label>
            <div className="relative">
              <MagnifyingGlass className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-fg-3" />
              <Input className="pl-10" placeholder="Search cast or episodes…" />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-medium text-fg-2">Disabled Input</label>
            <Input disabled value="/Volumes/Archive/AutoScene/Projects" />
          </div>
        </div>
      </ShowcaseSectionStage>
    </div>
  )
}
