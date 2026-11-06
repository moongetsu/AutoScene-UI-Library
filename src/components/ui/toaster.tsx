import * as React from "react"
import { toast as sonnerToast, Toaster as Sonner } from "sonner"
import { Check, Info, Warning, XCircle, ArrowSquareOut, X } from "@/components/icons"

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
      border: "border-accent/25 hover:border-accent/40",
      glow: "shadow-[0_16px_40px_rgba(0,0,0,0.7),0_0_24px_rgba(224,180,92,0.12),inset_0_1px_0_rgba(255,255,255,0.14)]",
      badgeBg: "bg-accent/[0.14] border-accent/35 text-accent shadow-[inset_0_1px_0_rgba(224,180,92,0.3)]",
      icon: <Check weight="bold" className="size-4 text-accent" />,
    },
    info: {
      border: "border-sky-500/25 hover:border-sky-500/40",
      glow: "shadow-[0_16px_40px_rgba(0,0,0,0.7),0_0_24px_rgba(56,189,248,0.12),inset_0_1px_0_rgba(255,255,255,0.14)]",
      badgeBg: "bg-sky-500/[0.14] border-sky-500/35 text-sky-400 shadow-[inset_0_1px_0_rgba(56,189,248,0.3)]",
      icon: <Info weight="bold" className="size-4 text-sky-400" />,
    },
    warning: {
      border: "border-amber-500/25 hover:border-amber-500/40",
      glow: "shadow-[0_16px_40px_rgba(0,0,0,0.7),0_0_24px_rgba(251,191,36,0.12),inset_0_1px_0_rgba(255,255,255,0.14)]",
      badgeBg: "bg-amber-500/[0.14] border-amber-500/35 text-amber-400 shadow-[inset_0_1px_0_rgba(251,191,36,0.3)]",
      icon: <Warning weight="bold" className="size-4 text-amber-400" />,
    },
    danger: {
      border: "border-danger/25 hover:border-danger/40",
      glow: "shadow-[0_16px_40px_rgba(0,0,0,0.7),0_0_24px_rgba(239,68,68,0.12),inset_0_1px_0_rgba(255,255,255,0.14)]",
      badgeBg: "bg-danger/[0.14] border-danger/35 text-danger shadow-[inset_0_1px_0_rgba(239,68,68,0.3)]",
      icon: <XCircle weight="bold" className="size-4 text-danger" />,
    },
  }[tone]

  return (
    <div
      className={`group relative flex items-center justify-between gap-3 rounded-full border ${toneConfig.border} bg-[#0c0c11]/92 backdrop-blur-2xl p-2 pr-3 text-xs text-white ${toneConfig.glow} transition-all duration-200 select-none w-[390px] max-w-[calc(100vw-32px)]`}
    >
      {/* Left section: Prominent Darker Frosted Icon Avatar Orb + Title & Subtitle */}
      <div className="flex items-center gap-3 min-w-0 flex-1">
        {/* Dark Frosted Circular Icon Orb (similar to reference design) */}
        <div
          className={`size-9 rounded-full flex items-center justify-center shrink-0 border ${toneConfig.badgeBg}`}
        >
          {toneConfig.icon}
        </div>

        {/* Text Container with hierarchy */}
        <div className="flex flex-col min-w-0 flex-1 overflow-hidden">
          <span className="font-semibold text-white tracking-tight text-xs truncate">
            {title}
          </span>
          {snippet ? (
            <span className="font-mono text-[10px] text-fg-3 truncate mt-0.5">
              {snippet}
            </span>
          ) : description ? (
            <span className="text-[11px] text-fg-3 truncate mt-0.5">
              {description}
            </span>
          ) : null}
        </div>
      </div>

      {/* Right section: Action Pill + Dismiss Button */}
      <div className="flex items-center gap-2 shrink-0 pl-1">
        {actionLabel && onAction && (
          <button
            type="button"
            onClick={() => {
              onAction()
              sonnerToast.dismiss(id)
            }}
            className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-accent/15 border border-accent/30 text-[10px] font-semibold text-accent hover:bg-accent/25 transition-colors cursor-pointer"
          >
            <span>{actionLabel}</span>
            <ArrowSquareOut className="size-3" />
          </button>
        )}

        <button
          type="button"
          onClick={() => sonnerToast.dismiss(id)}
          className="size-6 rounded-full flex items-center justify-center text-fg-3 hover:text-white hover:bg-white/[0.1] transition-colors cursor-pointer"
          aria-label="Dismiss"
        >
          <X className="size-3.5" />
        </button>
      </div>
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
