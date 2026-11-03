import * as React from "react"
import { Check, Copy, Code, Eye } from "@phosphor-icons/react"
import { cn } from "@/lib/utils"

interface ShowcaseSectionStageProps {
  title: string
  description?: string
  code?: string
  children: React.ReactNode
  className?: string
}

export function ShowcaseSectionStage({
  title,
  description,
  code,
  children,
  className,
}: ShowcaseSectionStageProps) {
  const [tab, setTab] = React.useState<"preview" | "code">("preview")
  const [copied, setCopied] = React.useState(false)

  const handleCopy = () => {
    if (!code) return
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className={cn("flex flex-col rounded-2xl border border-white/[0.08] bg-[#0c0c0f] overflow-hidden shadow-xl", className)}>
      {/* Header bar */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.06] bg-white/[0.01]">
        <div>
          <h3 className="text-sm font-semibold text-white tracking-tight">{title}</h3>
          {description && <p className="text-xs text-fg-3 mt-0.5">{description}</p>}
        </div>

        <div className="flex items-center gap-2">
          {code && (
            <div className="flex items-center rounded-lg bg-white/[0.04] p-0.5 border border-white/[0.06]">
              <button
                type="button"
                onClick={() => setTab("preview")}
                className={cn(
                  "flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium transition-colors",
                  tab === "preview"
                    ? "bg-white/[0.1] text-white shadow-sm"
                    : "text-fg-3 hover:text-fg-1"
                )}
              >
                <Eye className="size-3.5" />
                <span>Preview</span>
              </button>
              <button
                type="button"
                onClick={() => setTab("code")}
                className={cn(
                  "flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium transition-colors",
                  tab === "code"
                    ? "bg-white/[0.1] text-white shadow-sm"
                    : "text-fg-3 hover:text-fg-1"
                )}
              >
                <Code className="size-3.5" />
                <span>Code</span>
              </button>
            </div>
          )}

          {code && tab === "code" && (
            <button
              type="button"
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium bg-white/[0.04] hover:bg-white/[0.08] text-fg-2 hover:text-white border border-white/[0.06] transition-colors"
            >
              {copied ? (
                <>
                  <Check className="size-3.5 text-accent" />
                  <span className="text-accent">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="size-3.5" />
                  <span>Copy</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>

      {/* Body Stage */}
      {tab === "preview" ? (
        <div className="relative min-h-[140px] p-8 flex flex-wrap items-center justify-center gap-4 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/[0.03] via-transparent to-transparent">
          {children}
        </div>
      ) : (
        <div className="relative p-5 bg-[#08080a] overflow-x-auto">
          <pre className="text-xs font-mono text-fg-2 leading-relaxed selection:bg-accent/30 selection:text-white">
            <code>{code?.trim()}</code>
          </pre>
        </div>
      )}
    </div>
  )
}

