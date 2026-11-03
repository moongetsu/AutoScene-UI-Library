import { Outlet } from "@tanstack/react-router"

/**
 * Pure Web Shell for the Standalone UI Library Website.
 * No desktop app rail, no window controls, no Tauri chrome.
 */
export function StandaloneShell() {
  return (
    <div className="min-h-screen w-full bg-[#070709] text-fg-1 antialiased selection:bg-accent/30 selection:text-white">
      <Outlet />
    </div>
  )
}

