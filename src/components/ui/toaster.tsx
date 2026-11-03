import { Toaster as Sonner } from "sonner"
import { CheckCircle, Info, WarningCircle, XCircle } from "@phosphor-icons/react"

export function Toaster() {
  return (
    <Sonner
      theme="dark"
      position="bottom-right"
      gap={10}
      visibleToasts={5}
      expand={true}
      icons={{
        success: <CheckCircle weight="fill" className="size-4 text-accent" />,
        info: <Info weight="fill" className="size-4 text-sky-400" />,
        warning: <WarningCircle weight="fill" className="size-4 text-amber-400" />,
        error: <XCircle weight="fill" className="size-4 text-danger" />,
      }}
      toastOptions={{
        unstyled: true,
        classNames: {
          toast:
            "group relative flex w-[min(380px,calc(100vw-32px))] items-start gap-3 rounded-2xl border border-white/10 bg-[#0c0c10]/95 backdrop-blur-2xl p-4 text-xs text-white shadow-[0_20px_50px_rgba(0,0,0,0.6),0_0_0_1px_rgba(255,255,255,0.06),inset_0_1px_0_rgba(255,255,255,0.18)] selection:bg-accent/30 selection:text-white transition-all duration-200",
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
