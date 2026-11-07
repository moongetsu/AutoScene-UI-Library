import * as React from "react"
import { createMemoryHistory, createRootRoute, createRoute, createRouter, Outlet, RouterProvider, useRouter } from "@tanstack/react-router"
import { toast } from "sonner"
import type { ExportPreset, PluginInfo } from "@/bindings"
import { Copy, Keyboard, PuzzlePiece, Trash } from "@/components/icons"
import { FastScanArt, FastScanNotice } from "@/components/shell/FastScanNotice"
import { FeatureFrame } from "@/components/showcase/FeatureFrame"
import { Button } from "@/components/ui/button"
import { ContextMenuItem } from "@/components/ui/context-menu"
import { Kbd } from "@/components/ui/kbd"
import { Skeleton } from "@/components/ui/skeleton"
import { CharacterCard } from "@/features/cast/CharacterCard"
import { ExportOptionRows, NO_EXPORT_OPTIONS } from "@/features/export/ExportOptionRows"
import { ProjectCard } from "@/features/library/ProjectCard"
import { CastTab } from "@/features/player/panels/CastTab"
import { DetailsPanel } from "@/features/player/panels/DetailsPanel"
import { FileTab } from "@/features/player/panels/FileTab"
import { PlayerKeysDialog } from "@/features/player/panels/PlayerKeysDialog"
import { ShotHeader } from "@/features/player/panels/ShotHeader"
import { TabBody } from "@/features/player/panels/TabBody"
import { BrowseView } from "@/features/plugins/BrowseView"
import { CatalogCard } from "@/features/plugins/CatalogCard"
import { updatesOf } from "@/features/plugins/catalog-items"
import { PluginArt } from "@/features/plugins/PluginArt"
import { PluginCard } from "@/features/plugins/PluginCard"
import { PluginSettingsPage } from "@/features/plugins/PluginSettingsPage"
import { PluginSkeletons } from "@/features/plugins/PluginSkeletons"
import { PluginsPage } from "@/features/plugins/PluginsPage"
import { UninstallDialog } from "@/features/plugins/UninstallDialog"
import { WithdrawnBanner } from "@/features/plugins/WithdrawnBanner"
import { DiscordSection } from "@/features/settings/sections/DiscordSection"
import { HardwareGroup } from "@/features/settings/sections/HardwareGroup"
import { ShotCard } from "@/features/shots/ShotCard"
import { ShotBand, ShotStack } from "@/features/shots/ShotStack"
import { copyText } from "@/lib/os"
import { qk, queryClient, useCatalog, usePlugins, useScanDefaults } from "@/lib/queries"
import { PLAYER_SHORTCUTS, capGroups, useKeymap } from "@/lib/shortcuts"
import { useFastScanNotice } from "@/state/fast-scan-notice"
import {
  DEMO_BANNER,
  DEMO_CHARACTERS,
  DEMO_COMPUTER,
  DEMO_FPS,
  DEMO_FRAMES,
  DEMO_ICON,
  DEMO_LANES,
  DEMO_MEDIA,
  DEMO_PROJECT,
  DEMO_SEGMENTS,
  DEMO_SHOT,
  DEMO_STACK,
  DEMO_WITHDRAWN,
  STILL_CREDIT,
  demoFrameStore,
  demoTimecode,
} from "./demo-data"
import { PreviewPlace } from "./preview-place"

const nothing = () => {}

/** What a preview's Back leads to when something in it wants a place the library doesn't show. */
function LeftThePreview() {
  const router = useRouter()
  return (
    <div className="flex h-full flex-col items-center justify-center gap-3 p-6 text-center">
      <PuzzlePiece className="size-6 text-fg-3" />
      <div>
        <p className="text-md font-medium text-fg-1">That opens in the app</p>
        <p className="text-sm text-fg-2">This preview has only the part it shows.</p>
      </div>
      <Button size="sm" onClick={() => router.history.back()}>
        Back
      </Button>
    </div>
  )
}

/** What a preview's `/` shows: read at render, so what it is given later arrives. */
const PreviewContent = React.createContext<React.ReactNode>(null)

function PreviewIndex() {
  return <>{React.use(PreviewContent)}</>
}

/**
 * A place of its own for a preview: links and tabs in it move in this preview
 * and leave the page around it where it is. `/` shows `children`. With
 * `pages` (a whole view, at full size) Plugins and a plugin's settings are
 * places too; any other link says it opens in the app.
 */
function PreviewRoutes({ start = "/", pages = false, children }: { start?: string; pages?: boolean; children?: React.ReactNode }) {
  const [router] = React.useState(() => {
    const root = createRootRoute({ component: Outlet })
    const index = createRoute({ getParentRoute: () => root, path: "/", component: PreviewIndex })
    const tree = pages
      ? root.addChildren([
          index,
          createRoute({
            getParentRoute: () => root,
            path: "/plugins",
            validateSearch: (s: Record<string, unknown>): { view?: "browse" } => (s.view === "browse" ? { view: "browse" } : {}),
            component: PluginsPage,
          }),
          createRoute({ getParentRoute: () => root, path: "/plugins/$id", component: PluginSettingsPage }),
        ])
      : root.addChildren([index])
    return createRouter({
      routeTree: tree,
      history: createMemoryHistory({ initialEntries: [start] }),
      defaultNotFoundComponent: LeftThePreview,
      // A preview moving must not scroll the page around it back to the top.
      scrollRestoration: () => false,
    })
  })
  return (
    <PreviewContent.Provider value={children}>
      <RouterProvider router={router as never} />
    </PreviewContent.Provider>
  )
}

/** While the mock's plugin list comes, or once every plugin was uninstalled here. */
const Waiting = () => <Skeleton className="aspect-[2/1] rounded-2xl" />

function PluginArtLooks() {
  const art = "aspect-[2/1] rounded-2xl picture-edge"
  return (
    <div className="grid grid-cols-3 gap-4">
      <PluginArt name="Poster Maker" icon={DEMO_ICON} banner={DEMO_BANNER} className={art} />
      <PluginArt name="Shot Notes" icon={DEMO_ICON} className={art} />
      <PluginArt name="Clip List" icon={null} className={art} />
    </div>
  )
}

function PluginCardDemo() {
  const { data: plugins } = usePlugins()
  const { data: catalog } = useCatalog()
  const [removing, setRemoving] = React.useState<PluginInfo | null>(null)
  const p = plugins?.[0]
  if (!p) return <Waiting />
  return (
    <>
      <PluginCard
        p={p}
        update={updatesOf(catalog?.plugins).find((u) => u.id === p.id)}
        onLoadAgain={nothing}
        onUninstall={() => setRemoving(p)}
      />
      <UninstallDialog p={removing} onClose={() => setRemoving(null)} />
    </>
  )
}

function CatalogCardDemo() {
  const { data: catalog } = useCatalog()
  const p = catalog?.plugins[0]
  return p ? <CatalogCard p={p} /> : <Waiting />
}

function UninstallDemo() {
  const { data: plugins } = usePlugins()
  const [removing, setRemoving] = React.useState<PluginInfo | null>(null)
  const p = plugins?.at(-1)
  return (
    <>
      <Button variant="danger" disabled={!p} onClick={() => p && setRemoving(p)}>
        <Trash /> Uninstall {p?.name ?? "a plugin"}…
      </Button>
      <UninstallDialog p={removing} onClose={() => setRemoving(null)} />
    </>
  )
}

function WithdrawnDemo() {
  return <WithdrawnBanner p={DEMO_WITHDRAWN} onUninstall={() => toast("In the app, this asks first: see Uninstall Dialog.")} />
}

/**
 * The notice opens at the app's first start, on a computer it suits. Here a
 * button opens it, with a graphics card it suits in place of the mock's.
 */
function FastScanDemo() {
  const { data } = useScanDefaults()
  React.useEffect(() => {
    useFastScanNotice.setState({ phase: "done" })
  }, [])
  const open = () => {
    if (data) queryClient.setQueryData(qk.scanDefaults, { ...data, computer: DEMO_COMPUTER, notice: true })
    useFastScanNotice.setState({ phase: "open" })
  }
  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/[0.08]">
      <FastScanArt />
      <div className="flex items-center justify-between gap-4 bg-[#0c0c0f] p-4">
        <span className="display text-2xl text-fg-1">Fast Scan is on</span>
        <Button variant="cta" size="sm" onClick={open}>
          Open the notice
        </Button>
      </div>
      <FastScanNotice />
    </div>
  )
}

/** Between a stack's middle and the band's left edge, at the width this preview lays out at. */
const STACK_NOTCH = 156

/** A row of a character's Shots view: a stack with its band open under the row, and a shot on its own. */
function ShotStackDemo() {
  const [open, setOpen] = React.useState(React.use(PreviewPlace) !== "gallery")
  const watch = () => toast("Plays in the app, from the first shot")
  const play = () => toast("Plays in the app")
  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-4 pt-3">
        <ShotStack card={DEMO_STACK} media={DEMO_MEDIA} open={open} onToggle={(_, show) => setOpen(show)} onWatch={watch} />
        <ShotCard shot={DEMO_SHOT} media={DEMO_MEDIA} name="Thom" onOpen={play} />
      </div>
      {open && (
        <ShotBand
          card={DEMO_STACK}
          media={DEMO_MEDIA}
          name="Thom"
          columns={3}
          notch={STACK_NOTCH}
          onOpen={play}
          onWatch={watch}
          onClose={() => setOpen(false)}
        />
      )}
    </div>
  )
}

function CastTabDemo() {
  const [focus, setFocus] = React.useState<string | null>(null)
  const [store] = React.useState(demoFrameStore)
  return (
    <PreviewRoutes>
      <CastTab
        pid={DEMO_PROJECT.id}
        media={DEMO_MEDIA}
        lanes={DEMO_LANES}
        segments={DEMO_SEGMENTS}
        store={store}
        tc={demoTimecode}
        focus={focus}
        onFocus={setFocus}
        onMarkShot={() => toast("Marked the shot as the clip")}
        onSeek={store.set}
        onGo={store.set}
      />
    </PreviewRoutes>
  )
}

function DetailsPanelDemo() {
  const [focus, setFocus] = React.useState<string | null>(null)
  const [keys, setKeys] = React.useState(false)
  const [store] = React.useState(demoFrameStore)
  return (
    <PreviewRoutes>
      <div className="flex h-[460px] justify-center overflow-hidden rounded-2xl border border-white/[0.08] bg-canvas">
        <DetailsPanel
          open
          pid={DEMO_PROJECT.id}
          media={DEMO_MEDIA}
          fps={DEMO_FPS}
          frames={DEMO_FRAMES}
          lanes={DEMO_LANES}
          segments={DEMO_SEGMENTS}
          store={store}
          tc={demoTimecode}
          focus={focus}
          onFocus={setFocus}
          onMarkShot={() => toast("Marked the shot as the clip")}
          onSeek={store.set}
          onGo={store.set}
          onKeys={() => setKeys(true)}
        />
      </div>
      <PlayerKeysDialog open={keys} onOpenChange={setKeys} />
    </PreviewRoutes>
  )
}

function ExportOptionRowsDemo() {
  const [options, setOptions] = React.useState(NO_EXPORT_OPTIONS)
  const preset = { id: "h264-edit", video: { codec: "h264" } } as unknown as ExportPreset
  return <ExportOptionRows preset={preset} options={options} onChange={setOptions} />
}

function ShotHeaderDemo() {
  return (
    <ShotHeader
      seg={DEMO_SEGMENTS[2]}
      number={1}
      total={3}
      tc={demoTimecode}
      onMark={() => toast("Marked the shot as the clip")}
      onPrev={() => toast("The shot before")}
      onNext={() => toast("The shot after")}
    />
  )
}

function TabBodyDemo() {
  return (
    <TabBody
      label="Notes"
      menu={
        <ContextMenuItem onSelect={() => void copyText("Notes", "tab name")}>
          <Copy /> Copy the tab's name
        </ContextMenuItem>
      }
    >
      <p className="text-md font-medium text-fg-1">One tab of the details panel</p>
      <p className="mt-1 text-sm text-fg-2">No card around it: the panel is the surface. A right-click shows the tab's menu.</p>
    </TabBody>
  )
}

function PlayerKeysDemo() {
  const km = useKeymap()
  const [open, setOpen] = React.useState(false)
  return (
    <div className="flex flex-col gap-4">
      <ul className="space-y-2.5 text-sm text-fg-2">
        {PLAYER_SHORTCUTS.slice(0, 3).map((s) => (
          <li key={s.id} className="flex items-center justify-between gap-4">
            <span className="min-w-0 truncate">{s.label}</span>
            <span className="flex shrink-0 items-center gap-2">
              {capGroups(s, km).map((g, i) => (
                <Kbd key={i} keys={g} />
              ))}
            </span>
          </li>
        ))}
      </ul>
      <Button className="self-center" onClick={() => setOpen(true)}>
        <Keyboard /> All player keys
      </Button>
      <PlayerKeysDialog open={open} onOpenChange={setOpen} />
    </div>
  )
}

/** Previews of the feature components (the `Features` entries of the catalog). */
export const FEATURE_PREVIEWS: Record<string, (handlers?: any) => React.ReactNode> = {
  "project-card": () => (
    <FeatureFrame id="project-card" width={420} credit={STILL_CREDIT}>
      <PreviewRoutes>
        <ProjectCard project={DEMO_PROJECT} onRename={nothing} onDelete={nothing} />
      </PreviewRoutes>
    </FeatureFrame>
  ),
  "character-card": () => (
    <FeatureFrame id="character-card" width={220} credit={STILL_CREDIT}>
      <PreviewRoutes>
        <CharacterCard pid={DEMO_PROJECT.id} character={DEMO_CHARACTERS[0]} />
      </PreviewRoutes>
    </FeatureFrame>
  ),
  "plugin-art": () => (
    <FeatureFrame id="plugin-art" width={760} minWidth={640}>
      <PluginArtLooks />
    </FeatureFrame>
  ),
  "plugin-card": () => (
    <FeatureFrame id="plugin-card" width={340}>
      <PreviewRoutes>
        <PluginCardDemo />
      </PreviewRoutes>
    </FeatureFrame>
  ),
  "plugins-page": () => (
    <FeatureFrame id="plugins-page" kind="page" width={1040} height={680}>
      <PreviewRoutes start="/plugins" pages />
    </FeatureFrame>
  ),
  "uninstall-dialog": () => (
    <FeatureFrame id="uninstall-dialog" width={300}>
      <div className="flex justify-center">
        <UninstallDemo />
      </div>
    </FeatureFrame>
  ),
  "withdrawn-banner": () => (
    <FeatureFrame id="withdrawn-banner" width={640}>
      <WithdrawnDemo />
    </FeatureFrame>
  ),
  "plugin-settings-page": () => (
    <FeatureFrame id="plugin-settings-page" kind="page" width={1040} height={680}>
      <PreviewRoutes start="/plugins/dev.autoscene.hello-export" pages />
    </FeatureFrame>
  ),
  "catalog-card": () => (
    <FeatureFrame id="catalog-card" width={340}>
      <PreviewRoutes>
        <CatalogCardDemo />
      </PreviewRoutes>
    </FeatureFrame>
  ),
  "browse-view": () => (
    <FeatureFrame id="browse-view" kind="page" width={1040} height={680}>
      <PreviewRoutes pages>
        <div className="h-full overflow-y-auto p-10">
          <BrowseView query="" onClear={nothing} />
        </div>
      </PreviewRoutes>
    </FeatureFrame>
  ),
  "hardware-group": () => (
    <FeatureFrame id="hardware-group" width={720} minWidth={560}>
      <div className="-mb-10">
        <HardwareGroup />
      </div>
    </FeatureFrame>
  ),
  "discord-section": () => (
    <FeatureFrame id="discord-section" width={720} minWidth={560}>
      <div className="-mb-10">
        <DiscordSection />
      </div>
    </FeatureFrame>
  ),
  "plugin-skeletons": () => (
    <FeatureFrame id="plugin-skeletons" width={760} minWidth={640}>
      <PluginSkeletons />
    </FeatureFrame>
  ),
  "export-option-rows": () => (
    <FeatureFrame id="export-option-rows" width={480}>
      <ExportOptionRowsDemo />
    </FeatureFrame>
  ),
  "shot-stack": () => (
    <FeatureFrame id="shot-stack" width={640} minWidth={640} credit={STILL_CREDIT}>
      <ShotStackDemo />
    </FeatureFrame>
  ),
  "fast-scan-notice": () => (
    <FeatureFrame id="fast-scan-notice" width={460} credit={STILL_CREDIT}>
      <FastScanDemo />
    </FeatureFrame>
  ),
  "cast-tab": () => (
    <FeatureFrame id="cast-tab" width={288} credit={STILL_CREDIT}>
      <CastTabDemo />
    </FeatureFrame>
  ),
  "details-panel": () => (
    <FeatureFrame id="details-panel" width={320} credit={STILL_CREDIT}>
      <DetailsPanelDemo />
    </FeatureFrame>
  ),
  "shot-header": () => (
    <FeatureFrame id="shot-header" width={288}>
      <ShotHeaderDemo />
    </FeatureFrame>
  ),
  "file-tab": () => (
    <FeatureFrame id="file-tab" width={288}>
      <PreviewRoutes>
        <FileTab pid={DEMO_PROJECT.id} media={DEMO_MEDIA} fps={DEMO_FPS} frames={DEMO_FRAMES} tc={demoTimecode} />
      </PreviewRoutes>
    </FeatureFrame>
  ),
  "tab-body": () => (
    <FeatureFrame id="tab-body" width={288}>
      <TabBodyDemo />
    </FeatureFrame>
  ),
  "player-keys-dialog": () => (
    <FeatureFrame id="player-keys-dialog" width={320}>
      <PlayerKeysDemo />
    </FeatureFrame>
  ),
}
