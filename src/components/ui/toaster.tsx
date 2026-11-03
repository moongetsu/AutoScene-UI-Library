import * as React from "react"
import { toast as sonnerToast, Toaster as Sonner } from "sonner"
import {
  CheckCircle,
  Copy,
  Check,
  X,
  Code,
  Sparkle,
  ArrowSquareOut,
  Info,
  WarningCircle,
  XCircle,
} from "@phosphor-icons/react"

interface RichToastProps {
  id: string | number
  title: string
  description?: string
  snippet?: string
  badge?: string
  tone?: "accent" | "info" | "warning" | "danger"
  actionLabel?: string
  onAction?: () => void
  duration?: number
}

function RichToastCard({
  id,
  title,
  description,
  snippet,
  badge = "AutoScene UI",
  tone = "accent",
  actionLabel,
  onAction,
  duration = 4500,
}: RichToastProps) {
  const [copied, setCopied] = React.useState(false)
  const [progress, setProgress] = React.useState(100)

  // Live timer bar countdown
  React.useEffect(() => {
    const startTime = Date.now()
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime
      const remaining = Math.max(0, 100 - (elapsed / duration) * 100)
      setProgress(remaining)
      if (remaining === 0) clearInterval(interval)
    }, 20)
    return () => clearInterval(interval)
  }, [duration])

  const copySnippet = () => {
    if (!snippet) return
    navigator.clipboard.writeText(snippet)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const toneConfig = {
    accent: {
      border: "border-accent/40",
      glow: "from-accent/15",
      badgeBg: "bg-accent/15 text-accent border-accent/30",
      bar: "bg-accent",
      icon: <CheckCircle weight="fill" className="size-4 text-accent shrink-0" />,
    },
    info: {
      border: "border-sky-500/40",
      glow: "from-sky-500/15",
      badgeBg: "bg-sky-500/15 text-sky-400 border-sky-500/30",
      bar: "bg-sky-400",
      icon: <Info weight="fill" className="size-4 text-sky-400 shrink-0" />,
    },
    warning: {
      border: "border-amber-500/40",
      glow: "from-amber-500/15",
      badgeBg: "bg-amber-500/15 text-amber-400 border-amber-500/30",
      bar: "bg-amber-400",
      icon: <WarningCircle weight="fill" className="size-4 text-amber-400 shrink-0" />,
    },
    danger: {
      border: "border-danger/40",
      glow: "from-danger/15",
      badgeBg: "bg-danger/15 text-danger border-danger/30",
      bar: "bg-danger",
      icon: <XCircle weight="fill" className="size-4 text-danger shrink-0" />,
    },
  }[tone]

  return (
    <div
      className={`group relative flex w-[min(400px,calc(100vw-32px))] flex-col rounded-2xl border ${toneConfig.border} bg-[#0c0c11]/95 backdrop-blur-2xl p-4 text-white shadow-[0_20px_50px_rgba(0,0,0,0.7),0_0_0_1px_rgba(255,255,255,0.06),inset_0_1px_0_rgba(255,255,255,0.2)] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] ${toneConfig.glow} via-transparent to-transparent overflow-hidden`}
    >
      {/* Top Header Bar: Status Badge + Live Tag + Close Button */}
      <div className="flex items-center justify-between pb-2">
        <div className="flex items-center gap-2">
          {toneConfig.icon}
          <span
            className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-medium border ${toneConfig.badgeBg}`}
          >
            {badge}
          </span>
          <span className="flex items-center gap-1 text-[10px] font-mono text-fg-3">
            <Sparkle weight="fill" className="size-2.5 text-accent" />
            <span>Ready</span>
          </span>
        </div>

        <button
          type="button"
          onClick={() => sonnerToast.dismiss(id)}
          className="size-5 rounded-full flex items-center justify-center text-fg-3 hover:text-white hover:bg-white/[0.1] transition-colors cursor-pointer"
          title="Dismiss notification"
        >
          <X className="size-3" />
        </button>
      </div>

      {/* Main Title & Description */}
      <div className="flex flex-col gap-1 py-1">
        <span className="text-sm font-semibold tracking-tight text-white">{title}</span>
        {description && (
          <span className="text-xs text-fg-2 leading-relaxed">{description}</span>
        )}
      </div>

      {/* Interactive Code Snippet Box (when code is present) */}
      {snippet && (
        <div
          onClick={copySnippet}
          className="group/code relative mt-2 flex items-center justify-between rounded-xl border border-white/[0.08] bg-white/[0.03] p-2.5 font-mono text-[11px] text-fg-2 hover:border-white/20 hover:bg-white/[0.06] transition-all cursor-pointer"
          title="Click to copy snippet"
        >
          <div className="flex items-center gap-2 min-w-0 pr-2">
            <Code className="size-3.5 text-accent shrink-0" />
            <span className="truncate text-white/90">{snippet}</span>
          </div>
          <button
            type="button"
            className="flex items-center gap-1 px-2 py-0.5 rounded bg-white/[0.06] text-[10px] font-mono text-fg-2 group-hover/code:text-white group-hover/code:bg-white/[0.12] transition-colors shrink-0"
          >
            {copied ? (
              <>
                <Check className="size-3 text-accent" />
                <span className="text-accent font-semibold">Copied</span>
              </>
            ) : (
              <>
                <Copy className="size-3 text-fg-3" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      )}

      {/* Bottom Actions Row */}
      {actionLabel && onAction && (
        <div className="mt-3 pt-2.5 flex items-center justify-between border-t border-white/[0.06]">
          <span className="text-[10px] font-mono text-fg-3">Action required</span>
          <button
            type="button"
            onClick={() => {
              onAction()
              sonnerToast.dismiss(id)
            }}
            className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-accent/20 border border-accent/40 text-xs font-semibold text-accent hover:bg-accent/30 transition-colors cursor-pointer"
          >
            <span>{actionLabel}</span>
            <ArrowSquareOut className="size-3.5" />
          </button>
        </div>
      )}

      {/* Countdown Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/[0.06]">
        <div
          className={`h-full ${toneConfig.bar} transition-[width] linear duration-75`}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  )
}

/**
 * Universal Rich Toast Dispatcher
 */
export const notify = {
  success(title: string, opts?: { description?: string; snippet?: string; badge?: string; actionLabel?: string; onAction?: () => void }) {
    sonnerToast.custom((id) => (
      <RichToastCard
        id={id}
        title={title}
        description={opts?.description}
        snippet={opts?.snippet}
        badge={opts?.badge || "Success"}
        tone="accent"
        actionLabel={opts?.actionLabel}
        onAction={opts?.onAction}
      />
    ))
  },
  info(title: string, opts?: { description?: string; snippet?: string; badge?: string; actionLabel?: string; onAction?: () => void }) {
    sonnerToast.custom((id) => (
      <RichToastCard
        id={id}
        title={title}
        description={opts?.description}
        snippet={opts?.snippet}
        badge={opts?.badge || "Info"}
        tone="info"
        actionLabel={opts?.actionLabel}
        onAction={opts?.onAction}
      />
    ))
  },
  error(title: string, opts?: { description?: string; snippet?: string; badge?: string; actionLabel?: string; onAction?: () => void }) {
    sonnerToast.custom((id) => (
      <RichToastCard
        id={id}
        title={title}
        description={opts?.description}
        snippet={opts?.snippet}
        badge={opts?.badge || "Alert"}
        tone="danger"
        actionLabel={opts?.actionLabel}
        onAction={opts?.onAction}
      />
    ))
  },
}

export function Toaster() {
  return (
    <Sonner
      theme="dark"
      position="bottom-right"
      gap={10}
      visibleToasts={5}
      expand={true}
      toastOptions={{
        unstyled: true,
        classNames: {
          toast:
            "group relative flex w-[min(400px,calc(100vw-32px))] items-start gap-3 rounded-2xl border border-white/10 bg-[#0c0c10]/95 backdrop-blur-2xl p-4 text-xs text-white shadow-[0_20px_50px_rgba(0,0,0,0.6),0_0_0_1px_rgba(255,255,255,0.06),inset_0_1px_0_rgba(255,255,255,0.18)] transition-all duration-200",
          title: "font-semibold text-white tracking-tight text-[13px]",
          description: "mt-1.5 text-fg-3 leading-relaxed font-mono text-[11px] bg-white/[0.03] p-1.5 rounded-lg border border-white/[0.06] select-all",
          content: "min-w-0 flex-1 break-words",
          actionButton:
            "ml-auto shrink-0 self-center whitespace-nowrap rounded-lg bg-accent/20 border border-accent/40 px-3 py-1.5 text-xs font-semibold text-accent hover:bg-accent/30 transition-colors cursor-pointer",
          cancelButton:
            "ml-auto shrink-0 self-center whitespace-nowrap rounded-lg bg-white/[0.06] border border-white/[0.08] px-3 py-1.5 text-xs text-fg-2 hover:bg-white/[0.1] hover:text-white transition-colors cursor-pointer",
          closeButton:
            "absolute -top-1.5 -right-1.5 size-5 rounded-full bg-[#18181e] border border-white/10 text-fg-3 hover:text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-md",
          error:
            "border-danger/40 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-danger/10 via-transparent to-transparent shadow-[0_0_25px_rgba(239,68,68,0.15)]",
          success:
            "border-accent/40 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-accent/10 via-transparent to-transparent shadow-[0_0_25px_rgba(224,180,92,0.15)]",
          info:
            "border-sky-500/40 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-500/10 via-transparent to-transparent",
          warning:
            "border-amber-500/40 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent",
        },
      }}
    />
  )
}
