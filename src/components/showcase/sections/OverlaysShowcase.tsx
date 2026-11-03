import { DotsThree, FolderOpen, Play, Trash } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { Tooltip } from "@/components/ui/tooltip"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { toast } from "sonner"
import { ShowcasePageHeader } from "../ShowcasePageHeader"
import { ShowcaseSectionStage } from "../ShowcaseSectionStage"

export function OverlaysShowcase() {
  return (
    <div className="flex flex-col gap-8">
      <ShowcasePageHeader
        title="Dropdowns & Overlays"
        description="Floating dropdown menus, tooltips, and toast notifications."
        importPath='import { DropdownMenu, Tooltip } from "@moongetsu/autoscene-ui"'
      />

      {/* 1. Dropdown Menus */}
      <ShowcaseSectionStage
        title="Dropdown Menus"
        description="Frosted glass menus with icons, destructive items, and subtle separator hairlines."
        code={`import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  Button,
} from "@moongetsu/autoscene-ui"
import { DotsThree, Play, FolderOpen, Trash } from "@phosphor-icons/react"

<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="secondary">
      Actions Menu <DotsThree weight="bold" />
    </Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem onSelect={() => {}}><Play /> Watch source</DropdownMenuItem>
    <DropdownMenuItem onSelect={() => {}}><FolderOpen /> Reveal in Folder</DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem onSelect={() => {}} className="text-danger"><Trash /> Delete Export</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`}
      >
        <div className="flex items-center justify-center py-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" className="gap-2">
                Actions Menu <DotsThree weight="bold" className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onSelect={() => toast("Opening source…")}>
                <Play /> Watch source
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => toast("Revealing in folder…")}>
                <FolderOpen /> Reveal in Folder
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onSelect={() => toast.error("Clip removed")} className="text-danger">
                <Trash /> Delete Export
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </ShowcaseSectionStage>

      {/* 2. Tooltips */}
      <ShowcaseSectionStage
        title="Tooltips"
        description="Delicate hovering hints with directional auto-alignment."
        code={`import { Tooltip, Button } from "@moongetsu/autoscene-ui"

<Tooltip label="Plays the source video at full resolution">
  <Button variant="secondary">Hover for Tooltip</Button>
</Tooltip>

<Tooltip label="Accent-styled highlight information">
  <Button variant="accent">Accent Button Tooltip</Button>
</Tooltip>`}
      >
        <div className="flex flex-wrap gap-6 items-center justify-center">
          <Tooltip label="Plays the source video at full resolution">
            <Button variant="secondary">Hover for Tooltip</Button>
          </Tooltip>

          <Tooltip label="Accent-styled highlight information">
            <Button variant="accent">Accent Button Tooltip</Button>
          </Tooltip>
        </div>
      </ShowcaseSectionStage>

      {/* 3. Toasts */}
      <ShowcaseSectionStage
        title="Toasts (Sonner)"
        description="Lightweight glass notifications for success, status updates, and errors."
        code={`import { toast } from "sonner"

toast("Project saved", { description: "AutoScene project saved locally." })
toast.success("Export finished", { description: "Filtered 42 vocal scenes." })
toast.error("Export failed", { description: "Frame dropped during verification." })`}
      >
        <div className="flex flex-wrap gap-4 items-center justify-center">
          <Button
            variant="secondary"
            onClick={() => toast("Project saved", { description: "AutoScene project saved locally." })}
          >
            Trigger Standard Toast
          </Button>
          <Button
            variant="accent"
            onClick={() => toast.success("Export finished", { description: "Filtered 42 vocal scenes." })}
          >
            Trigger Success Toast
          </Button>
          <Button
            variant="danger"
            onClick={() => toast.error("Export failed", { description: "Frame dropped during verification." })}
          >
            Trigger Error Toast
          </Button>
        </div>
      </ShowcaseSectionStage>
    </div>
  )
}
