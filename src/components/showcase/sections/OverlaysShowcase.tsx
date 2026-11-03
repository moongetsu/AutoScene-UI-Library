import { DotsThree, FolderOpen, Play, Trash, CheckCircle, WarningCircle, Info, XCircle } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { Tooltip } from "@/components/ui/tooltip"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { toast, notify } from "@/components/ui/toaster"
import { ShowcasePageHeader } from "../ShowcasePageHeader"
import { ShowcaseSectionStage } from "../ShowcaseSectionStage"

export function OverlaysShowcase() {
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
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-xl mx-auto">
          {/* Success Rich Toast Trigger */}
          <Button
            variant="accent"
            onClick={() =>
              notify.success("CLI Install Command Ready", {
                description: "Run this command to scaffold primitives in your app.",
                snippet: "npx @moongetsu/autoscene-ui add",
                badge: "CLI Installer",
              })
            }
            className="w-full justify-start gap-2.5 h-11 px-3.5"
          >
            <CheckCircle weight="fill" className="size-4 text-accent shrink-0" />
            <div className="flex flex-col items-start min-w-0">
              <span className="text-xs font-semibold">Success with Snippet</span>
              <span className="text-[10px] text-accent/80 font-mono">With interactive copy box</span>
            </div>
          </Button>

          {/* Info Rich Toast Trigger */}
          <Button
            variant="secondary"
            onClick={() =>
              notify.info("Share Link Generated", {
                description: "Direct component preview link copied to clipboard.",
                snippet: "https://moongetsu.github.io/AutoScene-UI-Library/",
                badge: "Deep Link",
              })
            }
            className="w-full justify-start gap-2.5 h-11 px-3.5"
          >
            <Info weight="fill" className="size-4 text-sky-400 shrink-0" />
            <div className="flex flex-col items-start min-w-0">
              <span className="text-xs font-semibold">Info with Deep Link</span>
              <span className="text-[10px] text-fg-3 font-mono">With shareable URL</span>
            </div>
          </Button>

          {/* Warning Rich Toast Trigger */}
          <Button
            variant="secondary"
            onClick={() =>
              toast.warning("Verification Threshold Low", {
                description: "Actor facial landmark confidence dropped to 68%.",
                action: { label: "Re-scan", onClick: () => toast.success("Markers re-aligned") },
              })
            }
            className="w-full justify-start gap-2.5 h-11 px-3.5"
          >
            <WarningCircle weight="fill" className="size-4 text-amber-400 shrink-0" />
            <div className="flex flex-col items-start min-w-0">
              <span className="text-xs font-semibold">Warning with Action</span>
              <span className="text-[10px] text-amber-300/80 font-mono">Includes interactive action button</span>
            </div>
          </Button>

          {/* Error Rich Toast Trigger */}
          <Button
            variant="danger"
            onClick={() =>
              toast.error("Scene Render Failed", {
                description: "GPU pipeline aborted due to frame timestamp discontinuity.",
              })
            }
            className="w-full justify-start gap-2.5 h-11 px-3.5"
          >
            <XCircle weight="fill" className="size-4 text-danger shrink-0" />
            <div className="flex flex-col items-start min-w-0">
              <span className="text-xs font-semibold">Destructive Alert</span>
              <span className="text-[10px] text-danger/80 font-mono">Error status radiance</span>
            </div>
          </Button>
        </div>
      </ShowcaseSectionStage>
    </div>
  )
}
