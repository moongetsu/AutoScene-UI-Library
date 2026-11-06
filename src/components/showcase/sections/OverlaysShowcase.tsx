import { DotsThree, FolderOpen, Play, Trash } from "@/components/icons"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ConfirmDialog } from "@/components/ui/confirm-dialog"
import { Tooltip } from "@/components/ui/tooltip"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu"
import { toast, CleanToastCapsule } from "@/components/ui/toaster"
import { ShowcasePageHeader } from "../ShowcasePageHeader"
import { ShowcaseSectionStage } from "../ShowcaseSectionStage"

export function OverlaysShowcase() {
  const [asking, setAsking] = useState<"done" | "failed" | null>(null)
  const [hinted, setHinted] = useState(true)
  return (
    <div className="flex flex-col gap-8">
      <ShowcasePageHeader
        title="Dropdowns & Overlays"
        description="Floating glass menus, tooltips, and interactive multi-element notification toasts."
        importPath='import { DropdownMenu, Tooltip, Toaster, notify } from "@moongetsu/autoscene-ui"'
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
              <DropdownMenuItem onSelect={() => toast.success("Playing video scene")}>
                <Play /> Watch source
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => toast.info("Opening system folder…")}>
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

      {/* 3. Rich Notification Toasts Matrix */}
      <ShowcaseSectionStage
        title="Rich Notification Toasts (Interactive Types)"
        description="Full-featured notifications with status badges, live countdown progress bar, copyable code snippets, and action buttons."
        code={`import { notify, toast } from "@moongetsu/autoscene-ui"

// 1. Success Toast with interactive copyable snippet
notify.success("CLI Install Command Ready", {
  description: "Run this command to scaffold primitives in your app.",
  snippet: "npx @moongetsu/autoscene-ui add",
  badge: "CLI Installer",
})

// 2. Info / Deep Link Toast
notify.info("Share Link Generated", {
  description: "Direct component preview link copied to clipboard.",
  snippet: "https://moongetsu.github.io/AutoScene-UI-Library/",
  badge: "Deep Link",
})

// 3. Warning Toast with Action Button
toast.warning("Verification Threshold Low", {
  description: "Actor facial landmark confidence dropped to 68%.",
  action: { label: "Re-scan", onClick: () => toast.success("Markers re-aligned") },
})

// 4. Destructive / Error Toast
toast.error("Scene Render Failed", {
  description: "GPU pipeline aborted due to frame timestamp discontinuity.",
})`}
      >
        <div className="flex flex-col items-center gap-3 w-full max-w-xl mx-auto">
          {/* Warning with Action */}
          <CleanToastCapsule
            id="preview-warning"
            tone="warning"
            title="Verification Threshold Low"
            description="Actor facial landmark confidence dropped to 68%."
            actionLabel="Re-scan"
            onAction={() => toast.success("Markers re-aligned")}
          />

          {/* Success with Snippet */}
          <CleanToastCapsule
            id="preview-success"
            tone="accent"
            title="CLI Install Command Ready"
            snippet="npx @moongetsu/autoscene-ui add"
          />

          {/* Destructive Alert */}
          <CleanToastCapsule
            id="preview-danger"
            tone="danger"
            title="Scene Render Failed"
            description="GPU pipeline aborted due to frame timestamp discontinuity."
          />

          {/* Info with Deep Link */}
          <CleanToastCapsule
            id="preview-info"
            tone="info"
            title="Share Link Generated"
            snippet="https://moongetsu.github.io/AutoScene-UI-Library/"
          />
        </div>
      </ShowcaseSectionStage>

      {/* Confirm dialog */}
      <ShowcaseSectionStage
        title="Confirm Dialog"
        description="Asks before something goes. While the answer runs it holds: Esc, a click outside and Cancel do nothing, and the cross is gone. Done, it closes. Failed, it stays open for another try and a toast says why."
        code={`<ConfirmDialog
  open={open}
  onOpenChange={setOpen}
  title="Remove this project?"
  description="Its shots go with it."
  answer="Remove"
  icon={<Trash />}
  failure="Couldn't remove the project"
  onConfirm={remove}
/>`}
      >
        <div className="flex flex-wrap justify-center gap-3">
          <Button variant="danger" onClick={() => setAsking("done")}>
            <Trash /> Remove the project…
          </Button>
          <Button onClick={() => setAsking("failed")}>One that fails…</Button>
        </div>
        <ConfirmDialog
          open={asking !== null}
          onOpenChange={(open) => !open && setAsking(null)}
          title="Remove this project?"
          description="Its shots go with it. The video files stay where they are."
          answer="Remove"
          icon={<Trash />}
          failure="Couldn't remove the project"
          onConfirm={() =>
            new Promise((done, fail) =>
              setTimeout(() => (asking === "failed" ? fail({ code: "io", message: "The disk is full." }) : done(null)), 1200),
            )
          }
        />
      </ShowcaseSectionStage>

      {/* Submenus and hints */}
      <ShowcaseSectionStage
        title="Submenus and Hints"
        description="An entry can open a list of its own, and a choice to tick can say what it does on a line under its name."
        code={`<DropdownMenuCheckboxItem hint="Shots without a face count too.">
  Body matches
</DropdownMenuCheckboxItem>
<DropdownMenuSub>
  <DropdownMenuSubTrigger>Move to</DropdownMenuSubTrigger>
  <DropdownMenuSubContent>...</DropdownMenuSubContent>
</DropdownMenuSub>`}
      >
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button>Options</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-64">
            <DropdownMenuCheckboxItem checked={hinted} onCheckedChange={setHinted} hint="Shots without a face count too.">
              Body matches
            </DropdownMenuCheckboxItem>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>Move to</DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                <DropdownMenuItem>Thom</DropdownMenuItem>
                <DropdownMenuItem>Celia</DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
          </DropdownMenuContent>
        </DropdownMenu>
      </ShowcaseSectionStage>
    </div>
  )
}
