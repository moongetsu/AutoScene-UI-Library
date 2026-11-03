import { Toaster as Sonner } from "sonner"

export function Toaster() {
  return (
    <Sonner
      theme="dark"
      position="bottom-right"
      gap={8}
      toastOptions={{
        unstyled: true,
        classNames: {
          toast:
            "z-[9999] flex w-[360px] items-start gap-3 rounded-2xl border border-white/10 bg-[#121216]/95 backdrop-blur-2xl p-4 text-xs text-white shadow-2xl selection:bg-accent/30 selection:text-white",
          title: "font-semibold text-white",
          description: "mt-1 text-fg-3 leading-relaxed",
          content: "min-w-0 flex-1 break-words",
          actionButton:
            "ml-auto shrink-0 self-center whitespace-nowrap rounded-lg bg-accent/15 border border-accent/40 px-3 py-1 text-xs font-semibold text-accent",
          cancelButton:
            "ml-auto shrink-0 self-center whitespace-nowrap rounded-lg bg-white/[0.04] px-3 py-1 text-xs text-fg-2",
          error: "border-danger/30 text-danger [&>[data-icon]]:text-danger",
          success: "border-accent/30 [&>[data-icon]]:text-accent",
        },
      }}
    />
  )
}
