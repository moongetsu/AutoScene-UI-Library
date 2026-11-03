import { useState } from "react"
import {
  Play,
  Plus,
  DownloadSimple,
  Trash,
  Check,
  Copy,
  SlidersHorizontal,
  Image,
  SquaresFour,
  Circle,
  TerminalWindow,
} from "@phosphor-icons/react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Segmented } from "@/components/ui/segmented"
import { ShowcasePageHeader } from "../ShowcasePageHeader"
import { cn } from "@/lib/utils"

type ButtonVariant = "primary" | "accent" | "secondary" | "glass" | "ghost" | "danger"
type ButtonSize = "lg" | "md" | "sm"
type IconType = "play" | "plus" | "download" | "trash" | "none"
type BgType = "dark" | "checker" | "media"

const PRESETS: {
  name: string
  variant: ButtonVariant
  size: ButtonSize
  label: string
  icon: IconType
  radius: number
  blur: number
  glow: number
}[] = [
  {
    name: "Primary CTA",
    variant: "primary",
    size: "md",
    label: "Build Scenepack",
    icon: "play",
    radius: 9999,
    blur: 24,
    glow: 35,
  },
  {
    name: "Brand Gold",
    variant: "accent",
    size: "md",
    label: "Filter Vocals",
    icon: "plus",
    radius: 9999,
    blur: 20,
    glow: 40,
  },
  {
    name: "Frosted Glass",
    variant: "glass",
    size: "md",
    label: "Save EDL Timeline",
    icon: "download",
    radius: 9999,
    blur: 32,
    glow: 50,
  },
  {
    name: "Destructive Action",
    variant: "danger",
    size: "md",
    label: "Remove Media",
    icon: "trash",
    radius: 9999,
    blur: 16,
    glow: 25,
  },
]

/**
 * Lightweight syntax highlighter with line numbers matching the rest of the showcase
 */
function highlightTsx(code: string) {
  const lines = code.trim().split("\n")

  return lines.map((line, lineIdx) => {
    const tokens: React.ReactNode[] = []
    let remaining = line
    let keyIdx = 0

    if (remaining.trim().startsWith("//") || remaining.trim().startsWith("{/*")) {
      return (
        <div key={lineIdx} className="table-row">
          <span className="table-cell pr-4 text-right select-none text-white/20 font-mono text-[11px] w-8">
            {lineIdx + 1}
          </span>
          <span className="table-cell text-fg-disabled italic font-mono">{line}</span>
        </div>
      )
    }

    const regex = /(import|from|export|default|const|let|var|function|return|as|type|interface|true|false|<[a-zA-Z0-9_.]+|\/?>|"[\s\S]*?"|'[\s\S]*?'|\b[a-zA-Z_][a-zA-Z0-9_]*(?==))/g
    let match: RegExpExecArray | null
    let lastIdx = 0

    while ((match = regex.exec(remaining)) !== null) {
      if (match.index > lastIdx) {
        tokens.push(
          <span key={keyIdx++} className="text-fg-2">
            {remaining.slice(lastIdx, match.index)}
          </span>
        )
      }

      const matchText = match[0]
      if (matchText.startsWith('"') || matchText.startsWith("'")) {
        tokens.push(<span key={keyIdx++} className="text-[#a5d6a7]">{matchText}</span>)
      } else if (matchText.startsWith("<") || matchText === "/>" || matchText === ">") {
        tokens.push(<span key={keyIdx++} className="text-[#f6c177] font-semibold">{matchText}</span>)
      } else if (match[0].endsWith("=")) {
        tokens.push(<span key={keyIdx++} className="text-[#9ccfd8]">{matchText}</span>)
      } else if (
        ["import", "from", "export", "default", "const", "let", "var", "function", "return", "as", "type", "interface"].includes(
          matchText
        )
      ) {
        tokens.push(<span key={keyIdx++} className="text-[#ea9a97] font-medium">{matchText}</span>)
      } else if (matchText === "true" || matchText === "false") {
        tokens.push(<span key={keyIdx++} className="text-[#ebbcba] font-mono">{matchText}</span>)
      } else {
        tokens.push(<span key={keyIdx++} className="text-fg-1">{matchText}</span>)
      }

      lastIdx = regex.lastIndex
    }

    if (lastIdx < remaining.length) {
      tokens.push(
        <span key={keyIdx++} className="text-fg-2">
          {remaining.slice(lastIdx)}
        </span>
      )
    }

    return (
      <div key={lineIdx} className="table-row group/line hover:bg-white/[0.02]">
        <span className="table-cell pr-5 text-right select-none text-white/20 group-hover/line:text-white/40 font-mono text-[11px] w-9 transition-colors">
          {lineIdx + 1}
        </span>
        <span className="table-cell font-mono text-[12px] whitespace-pre">{tokens}</span>
      </div>
    )
  })
}

export function ButtonPlayground() {
  const [variant, setVariant] = useState<ButtonVariant>("accent")
  const [size, setSize] = useState<ButtonSize>("md")
  const [label, setLabel] = useState("Build Scenepack")
  const [icon, setIcon] = useState<IconType>("plus")
  const [radius, setRadius] = useState(9999)
  const [blurLevel, setBlurLevel] = useState(24)
  const [innerGlow, setInnerGlow] = useState(35)
  const [busy, setBusy] = useState(false)
  const [disabled, setDisabled] = useState(false)
  const [bg, setBg] = useState<BgType>("dark")
  const [copied, setCopied] = useState(false)

  const applyPreset = (p: (typeof PRESETS)[0]) => {
    setVariant(p.variant)
    setSize(p.size)
    setLabel(p.label)
    setIcon(p.icon)
    setRadius(p.radius)
    setBlurLevel(p.blur)
    setInnerGlow(p.glow)
    setBusy(false)
    setDisabled(false)
  }

  // Dynamic code snippet generation
  const iconJsx =
    icon === "play"
      ? '<Play weight="fill" /> '
      : icon === "plus"
      ? '<Plus weight="bold" /> '
      : icon === "download"
      ? "<DownloadSimple /> "
      : icon === "trash"
      ? "<Trash /> "
      : ""

  const radiusStyle = radius !== 9999 ? ` borderRadius: "${radius}px",` : ""
  const blurStyle = blurLevel !== 24 ? ` backdropFilter: "blur(${blurLevel}px)",` : ""
  const glowStyle = innerGlow !== 35 ? ` boxShadow: "inset 0 1px 0 rgba(255,255,255,${innerGlow / 100})",` : ""
  const hasCustomStyles = radiusStyle || blurStyle || glowStyle

  const generatedCode = `import { Button } from "@/components/ui/button"${
    icon !== "none" ? `\nimport { ${icon === "play" ? "Play" : icon === "plus" ? "Plus" : icon === "download" ? "DownloadSimple" : "Trash"} } from "@phosphor-icons/react"` : ""
  }

<Button
  variant="${variant}"
  size="${size}"${busy ? "\n  busy" : ""}${disabled ? "\n  disabled" : ""}${
    hasCustomStyles ? `\n  style={{${radiusStyle}${blurStyle}${glowStyle} }}` : ""
  }
>
  ${iconJsx}${label}
</Button>`

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="flex flex-col gap-8">
      <ShowcasePageHeader
        title="Interactive Studio Playground"
        description="Fine-tune live visual parameters, test against video footage, and copy dynamically generated TSX."
        importPath='import { Button } from "@/components/ui/button"'
      />

      {/* Preset Quick-Buttons - clean phosphor icon */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        <span className="text-xs font-semibold text-fg-3 uppercase tracking-wider pr-2 flex items-center gap-1.5 shrink-0">
          <SlidersHorizontal className="size-4 text-accent" /> Presets:
        </span>
        {PRESETS.map((p) => {
          const isActive =
            variant === p.variant &&
            label === p.label &&
            icon === p.icon &&
            radius === p.radius
          return (
            <button
              key={p.name}
              type="button"
              onClick={() => applyPreset(p)}
              className={cn(
                "px-3.5 py-1.5 rounded-full text-xs font-medium border transition-all shrink-0 cursor-pointer",
                isActive
                  ? "bg-accent/15 border-accent/40 text-accent font-semibold shadow-sm"
                  : "bg-white/[0.04] hover:bg-white/[0.08] hover:text-white border-white/[0.08] text-fg-2"
              )}
            >
              {p.name}
            </button>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Interactive Controls / Knobs */}
        <div className="lg:col-span-5 flex flex-col gap-6 rounded-2xl border border-white/[0.08] bg-[#0c0c0f] p-6 shadow-xl">
          <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
            <h3 className="text-sm font-semibold text-white tracking-tight">Component Modifiers</h3>
            <span className="text-[11px] font-mono text-accent">Live Knobs</span>
          </div>

          {/* Button Text */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-medium text-fg-2">Button Label</label>
            <Input value={label} onChange={(e) => setLabel(e.target.value)} placeholder="Type custom text..." />
          </div>

          {/* Variant Selector */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-medium text-fg-2">Variant</label>
            <div className="grid grid-cols-3 gap-1.5">
              {(["primary", "accent", "secondary", "glass", "ghost", "danger"] as ButtonVariant[]).map((v) => (
                <button
                  key={v}
                  type="button"
                  onClick={() => setVariant(v)}
                  className={cn(
                    "px-2.5 py-1.5 rounded-lg text-xs font-medium capitalize border transition-all cursor-pointer",
                    variant === v
                      ? "bg-accent/15 border-accent/40 text-accent font-semibold shadow-sm"
                      : "bg-white/[0.02] border-white/[0.06] text-fg-3 hover:text-white hover:bg-white/[0.04]"
                  )}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>

          {/* Size & Icon Pickers - separated and styled cleanly */}
          <div className="flex flex-col gap-4">
            {/* Size Selector */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-medium text-fg-2">Size</label>
              <div className="grid grid-cols-3 gap-2 bg-white/[0.02] p-1 rounded-xl border border-white/[0.06]">
                {(["sm", "md", "lg"] as ButtonSize[]).map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSize(s)}
                    className={cn(
                      "h-8 rounded-lg text-xs font-semibold uppercase transition-all cursor-pointer flex items-center justify-center",
                      size === s
                        ? "bg-accent/15 border border-accent/40 text-accent shadow-sm"
                        : "text-fg-3 hover:text-white hover:bg-white/[0.04]"
                    )}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Icon Selector */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-medium text-fg-2">Icon</label>
              <div className="grid grid-cols-5 gap-1.5 bg-white/[0.02] p-1 rounded-xl border border-white/[0.06]">
                {(["plus", "play", "download", "trash", "none"] as IconType[]).map((i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setIcon(i)}
                    className={cn(
                      "h-8 rounded-lg text-xs transition-all cursor-pointer flex items-center justify-center",
                      icon === i
                        ? "bg-accent/15 border border-accent/40 text-accent shadow-sm"
                        : "text-fg-3 hover:text-white hover:bg-white/[0.04]"
                    )}
                    title={i}
                  >
                    {i === "plus" ? (
                      <Plus className="size-3.5" />
                    ) : i === "play" ? (
                      <Play className="size-3.5" />
                    ) : i === "download" ? (
                      <DownloadSimple className="size-3.5" />
                    ) : i === "trash" ? (
                      <Trash className="size-3.5" />
                    ) : (
                      <span className="text-[11px] font-mono">Off</span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Sliders */}
          <div className="flex flex-col gap-4 border-t border-white/[0.06] pt-4">
            {/* Corner Radius */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-between text-xs text-fg-2">
                <span>Corner Radius</span>
                <span className="font-mono text-accent">{radius > 100 ? "Full Pill" : `${radius}px`}</span>
              </div>
              <Slider
                label="Corner Radius"
                value={radius > 100 ? 50 : radius}
                max={50}
                min={4}
                step={2}
                onChange={(val) => setRadius(val === 50 ? 9999 : val)}
              />
            </div>

            {/* Backdrop Blur */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-between text-xs text-fg-2">
                <span>Backdrop Blur Intensity</span>
                <span className="font-mono text-accent">{blurLevel}px</span>
              </div>
              <Slider
                label="Backdrop Blur"
                value={blurLevel}
                max={40}
                min={0}
                step={2}
                onChange={(val) => setBlurLevel(val)}
              />
            </div>

            {/* Inner Glow */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-between text-xs text-fg-2">
                <span>Specular Glow Opacity</span>
                <span className="font-mono text-accent">{innerGlow}%</span>
              </div>
              <Slider
                label="Specular Glow"
                value={innerGlow}
                max={100}
                min={0}
                step={5}
                onChange={(val) => setInnerGlow(val)}
              />
            </div>
          </div>

          {/* Toggles */}
          <div className="flex flex-col gap-2.5 border-t border-white/[0.06] pt-4">
            <label className="flex items-center justify-between p-2 rounded-xl bg-white/[0.02] border border-white/[0.06] cursor-pointer">
              <span className="text-xs font-medium text-fg-2">Busy Loading Spinner</span>
              <Switch checked={busy} onCheckedChange={setBusy} />
            </label>
            <label className="flex items-center justify-between p-2 rounded-xl bg-white/[0.02] border border-white/[0.06] cursor-pointer">
              <span className="text-xs font-medium text-fg-2">Disabled State</span>
              <Switch checked={disabled} onCheckedChange={setDisabled} />
            </label>
          </div>
        </div>

        {/* Right: Stage Canvas & Live Generated Code */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          {/* Live Stage Canvas */}
          <div className="flex flex-col rounded-2xl border border-white/[0.08] bg-[#0c0c0f] overflow-hidden shadow-xl">
            {/* Stage Toolbar */}
            <div className="flex items-center justify-between px-6 py-3 border-b border-white/[0.06] bg-white/[0.015]">
              <span className="text-xs font-semibold text-white">Live Preview Stage</span>

              {/* Background Backdrop Switcher */}
              <div className="flex items-center gap-1 bg-white/[0.03] p-0.5 rounded-lg border border-white/[0.06]">
                <button
                  type="button"
                  onClick={() => setBg("dark")}
                  className={cn(
                    "px-2.5 py-1 rounded text-[11px] font-medium transition-colors cursor-pointer flex items-center gap-1.5",
                    bg === "dark" ? "bg-white/[0.1] text-white shadow-sm font-semibold" : "text-fg-3 hover:text-white"
                  )}
                  title="Dark studio backdrop"
                >
                  <SquaresFour className="size-3.5" /> Canvas
                </button>
                <button
                  type="button"
                  onClick={() => setBg("checker")}
                  className={cn(
                    "px-2.5 py-1 rounded text-[11px] font-medium transition-colors cursor-pointer flex items-center gap-1.5",
                    bg === "checker" ? "bg-white/[0.1] text-white shadow-sm font-semibold" : "text-fg-3 hover:text-white"
                  )}
                  title="Checkerboard transparency"
                >
                  <SquaresFour className="size-3.5" /> Grid
                </button>
                <button
                  type="button"
                  onClick={() => setBg("media")}
                  className={cn(
                    "px-2.5 py-1 rounded text-[11px] font-medium transition-colors cursor-pointer flex items-center gap-1.5",
                    bg === "media" ? "bg-white/[0.1] text-white shadow-sm font-semibold" : "text-fg-3 hover:text-white"
                  )}
                  title="Cinematic footage frame"
                >
                  <Image className="size-3.5" /> Footage
                </button>
              </div>
            </div>

            {/* Visual Canvas Target */}
            <div
              className={cn(
                "relative min-h-[260px] p-12 flex items-center justify-center overflow-hidden transition-all",
                bg === "dark" && "bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/[0.04] via-transparent to-transparent",
                bg === "checker" && "bg-[repeating-conic-gradient(#151518_0%_25%,#0c0c0f_0%_50%)] bg-[length:24px_24px]",
                bg === "media" && "bg-cover bg-center"
              )}
              style={
                bg === "media"
                  ? {
                      backgroundImage:
                        "url('https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=900&auto=format&fit=crop')",
                    }
                  : undefined
              }
            >
              {bg === "media" && <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />}

              <div className="relative z-10">
                <Button
                  variant={variant}
                  size={size}
                  busy={busy}
                  disabled={disabled}
                  style={{
                    borderRadius: radius > 100 ? "9999px" : `${radius}px`,
                    backdropFilter: `blur(${blurLevel}px)`,
                    boxShadow: `inset 0 1px 0 rgba(255, 255, 255, ${innerGlow / 100})`,
                  }}
                >
                  {icon === "play" && <Play weight="fill" />}
                  {icon === "plus" && <Plus weight="bold" />}
                  {icon === "download" && <DownloadSimple />}
                  {icon === "trash" && <Trash />}
                  {label}
                </Button>
              </div>
            </div>
          </div>

          {/* Generated React Code Snippet Box */}
          <div className="flex flex-col rounded-2xl border border-white/[0.08] bg-[#0c0c0f] overflow-hidden shadow-xl">
            {/* Header bar */}
            <div className="flex items-center justify-between px-6 py-3 border-b border-white/[0.06] bg-white/[0.015]">
              <div className="flex items-center gap-2 text-xs font-mono text-fg-3">
                <TerminalWindow className="size-3.5 text-accent" />
                <span>Generated TSX Snippet</span>
              </div>

              <button
                type="button"
                onClick={handleCopy}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all cursor-pointer",
                  copied
                    ? "bg-accent/15 border-accent/40 text-accent shadow-sm"
                    : "bg-white/[0.03] hover:bg-white/[0.07] border-white/[0.08] text-fg-2 hover:text-white"
                )}
              >
                {copied ? (
                  <>
                    <Check className="size-3.5 text-accent shrink-0 animate-pop-in" />
                    <span className="font-semibold text-accent">Copied JSX</span>
                  </>
                ) : (
                  <>
                    <Copy className="size-3.5 text-fg-3 shrink-0" />
                    <span>Copy JSX</span>
                  </>
                )}
              </button>
            </div>

            {/* Syntax-highlighted code table with line numbers */}
            <div className="p-4 bg-[#08080a] overflow-x-auto max-h-[380px] scrollbar-thin scrollbar-thumb-white/10">
              <div className="table w-full border-collapse">
                {highlightTsx(generatedCode)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
