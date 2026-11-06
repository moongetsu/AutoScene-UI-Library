import type * as React from "react"
import { use } from "react"
import { Link, useNavigate } from "@tanstack/react-router"
import { CaretLeft, SidebarSimple } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { ContextArea } from "@/components/ui/context-area"
import { ContextMenuItem } from "@/components/ui/context-menu"
import { usePageScrolled } from "@/components/ui/page-scroll"
import { Tooltip } from "@/components/ui/tooltip"
import { TopBarRail } from "@/lib/top-bar-rail"
import { cn } from "@/lib/utils"

/**
 * A view's top bar: back and title on the left, the view's sections in the
 * middle, its actions on the right. In the app it is also the window's
 * caption; here it is only the bar. Show the rail comes from `TopBarRail`, so
 * a page without a rail has no such button.
 *
 * `overlay`: the bar floats over a hero, clear until the page scrolls, and
 * shows its title only then (the hero shows it big).
 */
export function TopBar({
  back,
  title,
  nav,
  overlay,
  className,
  children,
}: {
  back?: { label: string; to: string }
  title?: React.ReactNode
  nav?: React.ReactNode
  overlay?: boolean
  className?: string
  children?: React.ReactNode
}) {
  const rail = use(TopBarRail)
  const railHidden = rail?.hidden === true
  const scrolled = usePageScrolled()
  const glass = !overlay || scrolled
  const navigate = useNavigate()
  return (
    <header
      className={cn(
        "sticky top-0 z-20 grid h-[var(--topbar-h)] grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-4 pr-[calc(var(--caption-inset)+16px)]",
        // Without the rail the macOS traffic lights sit over the bar's left end.
        railHidden ? "pl-[calc(var(--traffic-x)+16px)]" : "pl-6",
        "border-b transition-[background-color,border-color,backdrop-filter] duration-[var(--dur-slow)]",
        overlay && "mb-[calc(var(--topbar-h)*-1)]",
        glass ? "border-hairline bg-canvas/70 backdrop-blur-2xl backdrop-saturate-150" : "border-transparent",
        className,
      )}
    >
      <div className="flex h-full min-w-0 items-center gap-3">
        {railHidden && (
          <Tooltip label="Show the rail" shortcut={rail?.shortcut}>
            <Button variant="glass" size="icon-sm" aria-label="Show the rail" onClick={rail?.show}>
              <SidebarSimple />
            </Button>
          </Tooltip>
        )}
        {back && (
          <Tooltip label={`Back to ${back.label}`}>
            <ContextArea
              menu={
                <ContextMenuItem onSelect={() => void navigate({ to: back.to })}>
                  <CaretLeft /> Back to {back.label}
                </ContextMenuItem>
              }
            >
              <Button variant="glass" size="icon-sm" asChild>
                <Link to={back.to} aria-label={`Back to ${back.label}`}>
                  <CaretLeft weight="bold" />
                </Link>
              </Button>
            </ContextArea>
          </Tooltip>
        )}
        {title != null && (
          <h1
            className={cn(
              "min-w-0 truncate text-lg font-semibold tracking-tight text-fg-1 transition-opacity duration-[var(--dur-med)]",
              overlay && !scrolled && "opacity-0",
            )}
          >
            {title}
          </h1>
        )}
      </div>
      <div className="flex justify-center">{nav}</div>
      <div className="flex h-full min-w-0 items-center justify-end gap-2">
        {children}
      </div>
    </header>
  )
}
