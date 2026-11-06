import { ShowcasePageHeader } from "../ShowcasePageHeader"
import { ShowcaseSectionStage } from "../ShowcaseSectionStage"

const SURFACES = [
  { name: "--bg-inset", hex: "#050506", label: "Inset / Well" },
  { name: "--bg-canvas", hex: "#09090b", label: "Canvas" },
  { name: "--bg-panel", hex: "#111114", label: "Panel / Card" },
  { name: "--bg-raised", hex: "#18181c", label: "Raised" },
  { name: "--bg-overlay", hex: "#202025", label: "Overlay / Popover" },
]

const ACCENTS = [
  { name: "--accent", hex: "#e0b45c", label: "Brand Accent Gold" },
  { name: "--accent-hover", hex: "#eac375", label: "Accent Hover" },
  { name: "--accent-press", hex: "#c99e48", label: "Accent Press" },
  { name: "--accent-subtle", hex: "rgba(224, 180, 92, 0.14)", label: "Accent Subtle Glow" },
]

const TEXTS = [
  { name: "--fg-1", hex: "#f5f3ef", label: "Primary Warm White" },
  { name: "--fg-2", hex: "#b4b1ac", label: "Secondary Muted" },
  { name: "--fg-3", hex: "#8a8783", label: "Tertiary Subdued" },
  { name: "--fg-disabled", hex: "#4f4d4a", label: "Disabled" },
]

export function TokensShowcase() {
  return (
    <div className="flex flex-col gap-8">
      <ShowcasePageHeader
        title="Colors & Tokens"
        description="Dark background surfaces, gray text hierarchy, and brand gold accents."
        importPath='@import "@/styles/tokens.css";'
      />

      {/* 1. Surfaces */}
      <ShowcaseSectionStage
        title="Surface Hierarchy"
        description="Layered elevation palette designed to create depth without harsh outlines."
        code={`/* CSS Variables */
--bg-inset:   #050506; /* Cutouts and wells */
--bg-canvas:  #09090b; /* Background viewport */
--bg-panel:   #111114; /* Cards and sidebars */
--bg-raised:  #18181c; /* Hovered surfaces */
--bg-overlay: #202025; /* Menus and popovers */`}
      >
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 w-full">
          {SURFACES.map((s) => (
            <div key={s.name} className="rounded-xl border border-white/[0.08] bg-[#0c0c0f] p-3 flex flex-col gap-2.5 items-center text-center">
              <div
                className="h-12 w-full rounded-lg border border-white/[0.08] shadow-inner"
                style={{ backgroundColor: s.hex }}
              />
              <div className="w-full">
                <span className="text-xs font-semibold text-white block">{s.label}</span>
                <span className="text-[10px] font-mono text-fg-3 block truncate">{s.name}</span>
                <span className="text-[10px] font-mono text-accent block">{s.hex}</span>
              </div>
            </div>
          ))}
        </div>
      </ShowcaseSectionStage>

      {/* 2. Brand Accent */}
      <ShowcaseSectionStage
        title="Brand Accent Palette"
        description="Warm gold speculars and glowing state variants."
        code={`/* Gold Accent Variables */
--accent:        #e0b45c;
--accent-hover:  #eac375;
--accent-press:  #c99e48;
--accent-subtle: rgba(224, 180, 92, 0.14);`}
      >
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full">
          {ACCENTS.map((a) => (
            <div key={a.name} className="rounded-xl border border-white/[0.08] bg-[#0c0c0f] p-3 flex flex-col gap-2.5 items-center text-center">
              <div
                className="h-12 w-full rounded-lg border border-white/[0.08] shadow-inner"
                style={{ backgroundColor: a.hex }}
              />
              <div className="w-full">
                <span className="text-xs font-semibold text-white block">{a.label}</span>
                <span className="text-[10px] font-mono text-fg-3 block truncate">{a.name}</span>
                <span className="text-[10px] font-mono text-accent block">{a.hex}</span>
              </div>
            </div>
          ))}
        </div>
      </ShowcaseSectionStage>

      {/* 3. Typography */}
      <ShowcaseSectionStage
        title="Typography & Text Hierarchy"
        description="Warm-tinted grayscale ramp tuned for contrast against dark canvas."
        code={`/* Typography Colors */
--fg-1:        #f5f3ef; /* Primary */
--fg-2:        #b4b1ac; /* Secondary */
--fg-3:        #8a8783; /* Tertiary */
--fg-disabled: #4f4d4a; /* Inactive */`}
      >
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full">
          {TEXTS.map((t) => (
            <div key={t.name} className="rounded-xl border border-white/[0.08] bg-[#0c0c0f] p-3 flex flex-col gap-2.5 items-center text-center">
              <div
                className="h-12 w-full rounded-lg border border-white/[0.08] flex items-center justify-center font-bold text-base"
                style={{ backgroundColor: "#0c0c0f", color: t.hex }}
              >
                Aa
              </div>
              <div className="w-full">
                <span className="text-xs font-semibold text-white block">{t.label}</span>
                <span className="text-[10px] font-mono text-fg-3 block truncate">{t.name}</span>
                <span className="text-[10px] font-mono text-accent block">{t.hex}</span>
              </div>
            </div>
          ))}
        </div>
      </ShowcaseSectionStage>

      {/* 4. Font Families */}
      <ShowcaseSectionStage
        title="Font Families"
        description="Three dedicated typefaces used throughout AutoScene UI for editorial clarity and density."
        code={`/* Font Families in tokens.css */
--font-sans:    "Inter Variable", ui-sans-serif, system-ui, sans-serif;
--font-display: "Instrument Serif", "Iowan Old Style", Georgia, serif;
--font-mono:    "Geist Mono Variable", ui-monospace, Menlo, monospace;`}
      >
        <div className="flex flex-col gap-4 w-full">
          {/* Inter */}
          <div className="p-4 rounded-xl border border-white/[0.08] bg-white/[0.02] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="max-w-xs">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-white">Inter Variable</span>
                <span className="text-[10px] font-mono text-accent px-1.5 py-0.5 rounded bg-accent/15">UI Sans</span>
              </div>
              <p className="text-xs text-fg-3 mt-1">Primary interface font for controls, labels, buttons, and navigation.</p>
            </div>
            <div className="font-sans text-base font-medium text-fg-1 tracking-normal shrink-0">
              AutoScene Video Studio 0123456789
            </div>
          </div>

          {/* Instrument Serif */}
          <div className="p-4 rounded-xl border border-white/[0.08] bg-white/[0.02] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="max-w-xs">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-white">Instrument Serif</span>
                <span className="text-[10px] font-mono text-accent px-1.5 py-0.5 rounded bg-accent/15">Display</span>
              </div>
              <p className="text-xs text-fg-3 mt-1">Cinematic display font for headers, project titles, and hero callouts.</p>
            </div>
            <div className="font-serif italic text-base text-fg-1 tracking-normal shrink-0">
              Tears of Steel: Thom
            </div>
          </div>

          {/* Geist Mono */}
          <div className="p-4 rounded-xl border border-white/[0.08] bg-white/[0.02] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="max-w-xs">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-white">Geist Mono Variable</span>
                <span className="text-[10px] font-mono text-accent px-1.5 py-0.5 rounded bg-accent/15">Monospace</span>
              </div>
              <p className="text-xs text-fg-3 mt-1">Technical font for timecodes, frame counters, metrics, and codeblocks.</p>
            </div>
            <div className="font-mono text-base text-fg-1 shrink-0">
              01:23:45:18 · 24.00 fps · 42 clips
            </div>
          </div>
        </div>
      </ShowcaseSectionStage>
    </div>
  )
}
