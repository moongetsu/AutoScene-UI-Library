import "@fontsource-variable/inter/opsz.css"
import "@fontsource/instrument-serif/400.css"
import "@fontsource/instrument-serif/400-italic.css"
import "@fontsource-variable/geist-mono"
import "./styles/index.css"

import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { QueryClientProvider } from "@tanstack/react-query"
import { RouterProvider } from "@tanstack/react-router"
import { Toaster } from "@/components/ui/toaster"
import { TooltipProvider } from "@/components/ui/tooltip"
import { commands } from "@/lib/ipc"
import { OpenLogs } from "@/lib/open-logs"
import { detectMaterial, isMac, isTauri, isWindows } from "@/lib/platform"
import { queryClient } from "@/lib/queries"
import { hashForPath } from "@/registry/deep-link"

async function boot() {
  // A static page's address (components/banner/) stands for a route of the site.
  const linked = window.location.hash ? null : hashForPath(window.location.pathname, import.meta.env.BASE_URL)
  if (linked) window.history.replaceState(null, "", `${import.meta.env.BASE_URL}${linked}`)
  // Room for the window's own buttons, and the native material behind the
  // rail where the system has one (see tokens.css).
  if (isTauri) document.documentElement.dataset.chrome = isWindows ? "windows" : isMac ? "macos" : "linux"
  void detectMaterial().then((m) => {
    if (m) document.documentElement.dataset.material = m
  })
  // Outside Tauri (plain browser, tests) answer IPC from the mock backend.
  if (!isTauri) {
    const { installMockBackend } = await import("@/mocks/backend")
    installMockBackend()
  }
  const { router } = await import("./router")

  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider delayDuration={400} skipDelayDuration={150}>
          <OpenLogs.Provider value={() => void commands.openLogsDir().catch(() => {})}>
            <RouterProvider router={router} />
          </OpenLogs.Provider>
          <Toaster />
        </TooltipProvider>
      </QueryClientProvider>
    </StrictMode>,
  )

  // Fade the pre-JS splash once React has painted.
  requestAnimationFrame(() => {
    const boot = document.getElementById("boot")
    boot?.setAttribute("data-hide", "")
    window.setTimeout(() => boot?.remove(), 400)
  })
}

void boot()
