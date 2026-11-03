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
        title="Overlays & Menus"
        description="Tooltips, dropdown menus, and toast notifications."
        importPath='import { Tooltip, DropdownMenu } from "@moongetsu/autoscene-ui"'
      />

      {/* 1. Tooltips */}
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

      {/* 2. Dropdown Menus */}
      <ShowcaseSectionStage
        title="Dropdown Menus"
        description="Frosted glass menus with icons, destructive items, and subtle separator hairlines."
        code={`import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@moongetsu/autoscene-ui"

<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="secondary">Actions Menu <DotsThree weight="bold" /></Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem><Play /> Watch source</DropdownMenuItem>
    <DropdownMenuItem><FolderOpen /> Reveal in Folder</DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem className="text-danger"><Trash /> Delete Export</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`}
      >
        <div className="flex items-center justify-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary">
                Actions Menu <DotsThree weight="bold" />
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
