import * as React from "react"
import { Check, Copy, Code, Eye, TerminalWindow } from "@phosphor-icons/react"
import { cn } from "@/lib/utils"

interface ShowcaseSectionStageProps {
  title: string
  description?: string
  code?: string
  children: React.ReactNode
  className?: string
}

/**
 * Lightweight, zero-dependency TSX syntax tokenizer for clean code presentation
 */
function highlightTsx(code: string) {
  const lines = code.trim().split("\n")

  return lines.map((line, lineIdx) => {
    // Regex matches comments, strings, JSX tags, keywords, and punctuation
    const tokens: React.ReactNode[] = []
    let remaining = line
    let keyIdx = 0

    // Handle full line comments
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
        // String
        tokens.push(<span key={keyIdx++} className="text-[#a5d6a7]">{matchText}</span>)
      } else if (matchText.startsWith("<") || matchText === "/>" || matchText === ">") {
        // JSX Tag
        tokens.push(<span key={keyIdx++} className="text-[#f6c177] font-semibold">{matchText}</span>)
      } else if (match[0].endsWith("=")) {
        // Prop attribute
        tokens.push(<span key={keyIdx++} className="text-[#9ccfd8]">{matchText}</span>)
      } else if (
        ["import", "from", "export", "default", "const", "let", "var", "function", "return", "as", "type", "interface"].includes(
          matchText
        )
      ) {
        // Keyword
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
    <div
      className={cn(
        "group relative flex flex-col rounded-2xl border border-white/[0.08] bg-[#0c0c0f] overflow-hidden shadow-xl transition-all",
        className
      )}
    >
      {/* Header bar */}
      <div className="flex items-center justify-between px-6 py-3.5 border-b border-white/[0.06] bg-white/[0.015]">
        <div>
          <h3 className="text-sm font-semibold text-white tracking-tight">{title}</h3>
          {description && <p className="text-xs text-fg-3 mt-0.5">{description}</p>}
        </div>

        <div className="flex items-center gap-3">
          {/* Always-visible permanent Copy button when code exists */}
          {code && (
            <button
              type="button"
              onClick={handleCopy}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all cursor-pointer",
                copied
                  ? "bg-accent/15 border-accent/40 text-accent shadow-sm"
                  : "bg-white/[0.03] hover:bg-white/[0.07] border-white/[0.08] text-fg-2 hover:text-white"
              )}
              title="Copy component code"
            >
              {copied ? (
                <>
                  <Check className="size-3.5 text-accent shrink-0 animate-pop-in" />
                  <span className="font-semibold text-accent">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="size-3.5 text-fg-3 shrink-0" />
                  <span>Copy</span>
                </>
              )}
            </button>
          )}

          {/* Preview / Code Tab Switcher */}
          {code && (
            <div className="flex items-center rounded-lg bg-white/[0.04] p-0.5 border border-white/[0.06]">
              <button
                type="button"
                onClick={() => setTab("preview")}
                className={cn(
                  "flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium transition-all cursor-pointer",
                  tab === "preview"
                    ? "bg-white/[0.1] text-white shadow-sm font-semibold"
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
                  "flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium transition-all cursor-pointer",
                  tab === "code"
                    ? "bg-white/[0.1] text-white shadow-sm font-semibold"
                    : "text-fg-3 hover:text-fg-1"
                )}
              >
                <Code className="size-3.5" />
                <span>Code</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Body Stage */}
      {tab === "preview" ? (
        <div className="relative min-h-[150px] p-8 flex flex-wrap items-center justify-center gap-4 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/[0.03] via-transparent to-transparent">
          {children}
        </div>
      ) : (
        <div className="relative bg-[#08080a] border-t border-white/[0.04]">
          {/* Code Viewer Bar */}
          <div className="flex items-center justify-between px-5 py-2.5 bg-white/[0.015] border-b border-white/[0.04]">
            <div className="flex items-center gap-2 text-[11px] font-mono text-fg-3">
              <TerminalWindow className="size-3.5 text-accent" />
              <span>React TSX</span>
            </div>
            <span className="text-[10px] font-mono text-fg-3">UTF-8</span>
          </div>

          {/* Syntax-highlighted Code Table with Line Numbers */}
          <div className="p-4 overflow-x-auto max-h-[380px] scrollbar-thin scrollbar-thumb-white/10">
            <div className="table w-full border-collapse">
              {code ? highlightTsx(code) : null}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
