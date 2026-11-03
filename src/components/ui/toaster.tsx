import * as React from "react"
import { toast as sonnerToast, Toaster as Sonner } from "sonner"
import { CheckCircle, Info, Warning, XCircle, ArrowSquareOut, X } from "@phosphor-icons/react"

interface CleanToastProps {
  id: string | number
  title: string
  description?: string
  snippet?: string
  tone?: "accent" | "info" | "warning" | "danger"
  actionLabel?: string
  onAction?: () => void
}

export function CleanToastCapsule({
  id,
  title,
  description,
  snippet,
  tone = "accent",
  actionLabel,
  onAction,
}: CleanToastProps) {
  const toneConfig = {
    accent: {
      border: "border-accent/30 hover:border-accent/50",
      glow: "shadow-[0_12px_36px_rgba(0,0,0,0.6),0_0_20px_rgba(224,180,92,0.12),inset_0_1px_0_rgba(255,255,255,0.14)]",
      icon: <CheckCircle weight="fill" className="size-4 text-accent shrink-0" />,
      dot: "bg-accent shadow-[0_0_8px_rgba(224,180,92,0.8)]",
    },
    info: {
      border: "border-sky-500/30 hover:border-sky-500/50",
      glow: "shadow-[0_12px_36px_rgba(0,0,0,0.6),0_0_20px_rgba(56,189,248,0.12),inset_0_1px_0_rgba(255,255,255,0.14)]",
      icon: <Info weight="fill" className="size-4 text-sky-400 shrink-0" />,
      dot: "bg-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.8)]",
    },
    warning: {
      border: "border-amber-500/30 hover:border-amber-500/50",
      glow: "shadow-[0_12px_36px_rgba(0,0,0,0.6),0_0_20px_rgba(251,191,36,0.12),inset_0_1px_0_rgba(255,255,255,0.14)]",
      icon: <Warning weight="fill" className="size-4 text-amber-400 shrink-0" />,
      dot: "bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.8)]",
    },
    danger: {
      border: "border-danger/30 hover:border-danger/50",
      glow: "shadow-[0_12px_36px_rgba(0,0,0,0.6),0_0_20px_rgba(239,68,68,0.12),inset_0_1px_0_rgba(255,255,255,0.14)]",
      icon: <XCircle weight="fill" className="size-4 text-danger shrink-0" />,
      dot: "bg-danger shadow-[0_0_8px_rgba(239,68,68,0.8)]",
    },
  }[tone]

  return (
    <div
      className={`group relative flex items-center gap-3 rounded-full border ${toneConfig.border} bg-[#0e0e13]/90 backdrop-blur-2xl py-2.5 pl-3.5 pr-2.5 text-xs text-white ${toneConfig.glow} transition-all duration-200 select-none max-w-[min(440px,calc(100vw-32px))]`}
    >
      {/* Status Icon */}
      <div className="relative flex items-center justify-center">
        {toneConfig.icon}
      </div>

      {/* Message and optional snippet inline */}
      <div className="flex items-center gap-2 min-w-0 pr-1">
        <span className="font-medium text-white truncate text-xs tracking-tight">
          {title}
        </span>
        {snippet ? (
          <span className="font-mono text-[10px] text-fg-3 px-1.5 py-0.5 rounded bg-white/[0.04] border border-white/[0.06] truncate max-w-[160px]">
            {snippet}
          </span>
        ) : description ? (
          <span className="text-[11px] text-fg-3 truncate max-w-[180px] hidden sm:inline">
            · {description}
          </span>
        ) : null}
      </div>

      {/* Optional Quick Action Pill */}
      {actionLabel && onAction && (
        <button
          type="button"
          onClick={() => {
            onAction()
            sonnerToast.dismiss(id)
          }}
          className="ml-auto flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-accent/15 border border-accent/30 text-[10px] font-semibold text-accent hover:bg-accent/25 transition-colors cursor-pointer shrink-0"
        >
          <span>{actionLabel}</span>
          <ArrowSquareOut className="size-3" />
        </button>
      )}

      {/* Dismiss Button */}
      <button
        type="button"
        onClick={() => sonnerToast.dismiss(id)}
        className="size-5 rounded-full flex items-center justify-center text-fg-3 hover:text-white hover:bg-white/[0.1] transition-colors cursor-pointer shrink-0 ml-auto"
        title="Dismiss"
      >
        <X className="size-3" />
      </button>
    </div>
  )
}

/**
 * Universal Toast Adapter that routes all calls to CleanToastCapsule
 */
type ToastFunction = (message: React.ReactNode, data?: any) => string | number

interface CustomToastAdapter extends ToastFunction {
  success: (message: React.ReactNode, data?: any) => string | number
  error: (message: React.ReactNode, data?: any) => string | number
  info: (message: React.ReactNode, data?: any) => string | number
  warning: (message: React.ReactNode, data?: any) => string | number
  custom: typeof sonnerToast.custom
  dismiss: typeof sonnerToast.dismiss
}

function parseToastArgs(message: React.ReactNode, data?: any) {
  const title = typeof message === "string" ? message : "Notification"
  const description = typeof data?.description === "string" ? data.description : undefined
  const snippet = typeof data?.snippet === "string" ? data.snippet : undefined
  const actionLabel = data?.action?.label
  const onAction = data?.action?.onClick
  return { title, description, snippet, actionLabel, onAction }
}

const customToast: any = (message: React.ReactNode, data?: any) => {
  const { title, description, snippet, actionLabel, onAction } = parseToastArgs(message, data)
  return sonnerToast.custom((id) => (
    <CleanToastCapsule
      id={id}
      title={title}
      description={description}
      snippet={snippet}
      tone="accent"
      actionLabel={actionLabel}
      onAction={onAction}
    />
  ))
}

customToast.success = (message: React.ReactNode, data?: any) => {
  const { title, description, snippet, actionLabel, onAction } = parseToastArgs(message, data)
  return sonnerToast.custom((id) => (
    <CleanToastCapsule
      id={id}
      title={title}
      description={description}
      snippet={snippet}
      tone="accent"
      actionLabel={actionLabel}
      onAction={onAction}
    />
  ))
}

customToast.error = (message: React.ReactNode, data?: any) => {
  const { title, description, snippet, actionLabel, onAction } = parseToastArgs(message, data)
  return sonnerToast.custom((id) => (
    <CleanToastCapsule
      id={id}
      title={title}
      description={description}
      snippet={snippet}
      tone="danger"
      actionLabel={actionLabel}
      onAction={onAction}
    />
  ))
}

customToast.info = (message: React.ReactNode, data?: any) => {
  const { title, description, snippet, actionLabel, onAction } = parseToastArgs(message, data)
  return sonnerToast.custom((id) => (
    <CleanToastCapsule
      id={id}
      title={title}
      description={description}
      snippet={snippet}
      tone="info"
      actionLabel={actionLabel}
      onAction={onAction}
    />
  ))
}

customToast.warning = (message: React.ReactNode, data?: any) => {
  const { title, description, snippet, actionLabel, onAction } = parseToastArgs(message, data)
  return sonnerToast.custom((id) => (
    <CleanToastCapsule
      id={id}
      title={title}
      description={description}
      snippet={snippet}
      tone="warning"
      actionLabel={actionLabel}
      onAction={onAction}
    />
  ))
}

customToast.custom = sonnerToast.custom
customToast.dismiss = sonnerToast.dismiss

export const toast: CustomToastAdapter = customToast
export const notify = customToast

export function Toaster() {
  return (
    <Sonner
      theme="dark"
      position="bottom-right"
      gap={8}
      visibleToasts={4}
      expand={true}
    />
  )
}
