import * as React from "react"
import { Check, Copy } from "@phosphor-icons/react"

interface ShowcasePageHeaderProps {
  title: string
  description: string
  importPath?: string
}

export function ShowcasePageHeader({
  title,
  description,
  importPath,
}: ShowcasePageHeaderProps) {
  const [copied, setCopied] = React.useState(false)

  const handleCopy = () => {
    if (!importPath) return
    navigator.clipboard.writeText(importPath)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="flex flex-col gap-3 pb-2 border-b border-white/[0.06]">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-2xl font-bold text-white tracking-tight">{title}</h2>
        {importPath && (
          <button
            type="button"
            onClick={handleCopy}
            className="flex items-center gap-2 px-3 py-1 rounded-lg text-xs font-mono bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.08] text-fg-2 hover:text-white transition-all cursor-pointer"
            title="Click to copy import statement"
          >
            <span className="truncate max-w-xs">{importPath}</span>
            {copied ? (
              <Check className="size-3.5 text-accent shrink-0" />
            ) : (
              <Copy className="size-3.5 text-fg-3 shrink-0" />
            )}
          </button>
        )}
      </div>
      <p className="text-sm text-fg-2 leading-relaxed max-w-3xl">{description}</p>
    </div>
  )
}

