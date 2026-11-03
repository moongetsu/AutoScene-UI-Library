import { Play, DownloadSimple, Trash, Plus } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { ShowcasePageHeader } from "../ShowcasePageHeader"
import { ShowcaseSectionStage } from "../ShowcaseSectionStage"

const SIZES = ["lg", "md", "sm"] as const
const ICON_SIZES = ["icon-lg", "icon", "icon-sm"] as const

export function ButtonsShowcase() {
  return (
    <div className="flex flex-col gap-8">
      <ShowcasePageHeader
        title="Buttons & Pills"
        description="Glassmorphic pill buttons crafted with CVA, backdrop-blur, subtle inner specular borders, and spring press states."
        importPath='import { Button } from "@/components/ui/button"'
      />

      {/* 1. Variants Matrix */}
      <ShowcaseSectionStage
        title="Variants"
        description="Six tailored visual styles designed for hierarchy and focal actions."
        code={`import { Button } from "@/components/ui/button"
import { Play, Plus, DownloadSimple, Trash } from "@phosphor-icons/react"

<Button variant="primary"><Play weight="fill" /> Primary Action</Button>
<Button variant="accent"><Plus weight="bold" /> Accent Gold</Button>
<Button variant="secondary"><DownloadSimple /> Secondary Dark</Button>
<Button variant="glass"><DownloadSimple /> Frosted Glass</Button>
<Button variant="ghost">Ghost Neutral</Button>
<Button variant="danger"><Trash /> Danger Red</Button>`}
      >
        <Button variant="primary">
          <Play weight="fill" /> Primary Action
        </Button>
        <Button variant="accent">
          <Plus weight="bold" /> Accent Gold
        </Button>
        <Button variant="secondary">
          <DownloadSimple /> Secondary Dark
        </Button>
        <Button variant="glass">
          <DownloadSimple /> Frosted Glass
        </Button>
        <Button variant="ghost">Ghost Neutral</Button>
        <Button variant="danger">
          <Trash /> Danger Red
        </Button>
      </ShowcaseSectionStage>

      {/* 2. Sizes Matrix */}
      <ShowcaseSectionStage
        title="Sizes (Standard & Icon)"
        description="Compact sizes scale from 28px toolbars to 44px primary modals."
        code={`<Button variant="accent" size="lg">Size LG</Button>
<Button variant="accent" size="md">Size MD</Button>
<Button variant="accent" size="sm">Size SM</Button>

{/* Square icon buttons */}
<Button variant="secondary" size="icon-lg"><Plus weight="bold" /></Button>
<Button variant="secondary" size="icon"><Plus weight="bold" /></Button>
<Button variant="secondary" size="icon-sm"><Plus weight="bold" /></Button>`}
      >
        <div className="flex flex-col gap-6 items-center">
          <div className="flex flex-wrap items-center gap-4">
            {SIZES.map((size) => (
              <Button key={size} variant="accent" size={size}>
                Size {size.toUpperCase()}
              </Button>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-4">
            {ICON_SIZES.map((size) => (
              <Button key={size} variant="secondary" size={size} aria-label={`Icon button ${size}`}>
                <Plus weight="bold" />
              </Button>
            ))}
          </div>
        </div>
      </ShowcaseSectionStage>

      {/* 3. States */}
      <ShowcaseSectionStage
        title="Interactive States"
        description="Built-in busy spinner states and accessible disabled styles."
        code={`<Button variant="primary" busy>Saving...</Button>
<Button variant="secondary" busy>Processing</Button>
<Button variant="accent" disabled>Disabled Accent</Button>`}
      >
        <Button variant="primary" busy>
          Saving...
        </Button>
        <Button variant="secondary" busy>
          Processing
        </Button>
        <Button variant="accent" disabled>
          Disabled Accent
        </Button>
      </ShowcaseSectionStage>
    </div>
  )
}
