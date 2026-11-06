import type * as React from "react"
import { useId, useState } from "react"
import { Link } from "@tanstack/react-router"
import { HoverCard, ToggleGroup } from "radix-ui"
import { motion } from "motion/react"
import { cn } from "@/lib/utils"
import { SPRING_FAST } from "@/lib/motion"

const track = "relative inline-flex h-9 w-fit items-center gap-0.5 rounded-full border border-white/10 bg-white/[0.06] p-1 backdrop-blur-xl"
const item = cn(
  "relative z-10 inline-flex h-full items-center justify-center gap-2 rounded-full px-4 whitespace-nowrap text-sm font-medium transition-colors duration-[var(--dur-fast)] [&_svg]:size-4 cursor-pointer select-none",
  "hover:text-fg-1",
  "disabled:pointer-events-none disabled:opacity-40",
)

type Option<T extends string> = {
  value: T
  label: React.ReactNode
  /** Shown in a card while the pointer rests on the option (examples). */
  preview?: React.ReactNode
  disabled?: boolean
}

/** Single-choice pill switch with Animate UI layoutId sliding indicator. */
export function Segmented<T extends string>({
  value,
  onChange,
  options,
  disabled,
  className,
  "aria-label": ariaLabel,
}: {
  value: T
  onChange: (v: T) => void
  options: Option<T>[]
  disabled?: boolean
  className?: string
  "aria-label": string
}) {
  const [peek, setPeek] = useState<T | null>(null)
  const layoutId = useId()

  return (
    <ToggleGroup.Root
      type="single"
      value={value}
      aria-label={ariaLabel}
      disabled={disabled}
      onValueChange={(v) => v && onChange(v as T)}
      className={cn(track, className)}
    >
      {options.map((o) => {
        const isSelected = value === o.value
        const button = (
          <ToggleGroup.Item
            key={o.value}
            value={o.value}
            disabled={o.disabled}
            className={cn(item, isSelected ? "text-fg-1 font-semibold" : "text-fg-2")}
          >
            {isSelected && (
              <motion.div
                layoutId={`segmented-active-${layoutId}`}
                transition={SPRING_FAST}
                className="absolute inset-0 rounded-full bg-white/[0.14] shadow-1 -z-10"
              />
            )}
            {o.label}
          </ToggleGroup.Item>
        )
        if (!o.preview) return button
        return (
          <Preview
            key={o.value}
            content={o.preview}
            open={peek === o.value}
            onOpenChange={(open) => setPeek((p) => (open ? o.value : p === o.value ? null : p))}
          >
            {button}
          </Preview>
        )
      })}
    </ToggleGroup.Root>
  )
}

/**
 * A card under an option while the pointer rests on it. Disabled options
 * show theirs too (it says why), through a wrapper that takes the hover.
 * Only to look at: it never takes a click or the focus from what it covers
 * (in a dialog, Radix would otherwise let it take the pointer).
 */
function Preview({
  content,
  open,
  onOpenChange,
  children,
}: {
  content: React.ReactNode
  open: boolean
  onOpenChange: (open: boolean) => void
  children: React.ReactElement
}) {
  return (
    <HoverCard.Root openDelay={250} closeDelay={80} open={open} onOpenChange={onOpenChange}>
      <HoverCard.Trigger asChild>
        <span className="inline-flex h-full">{children}</span>
      </HoverCard.Trigger>
      <HoverCard.Portal>
        <HoverCard.Content
          side="bottom"
          sideOffset={10}
          collisionPadding={12}
          style={{ pointerEvents: "none" }}
          className="glass-strong z-50 w-[360px] max-w-[calc(100vw-24px)] rounded-2xl p-3 data-[state=open]:animate-fade-in"
        >
          {content}
        </HoverCard.Content>
      </HoverCard.Portal>
    </HoverCard.Root>
  )
}

/** A link or button of the nav: no sliding pill there, so the place it is on draws its own. */
const navItem = cn(item, "text-fg-2 data-[state=on]:bg-white/[0.14] data-[state=on]:text-fg-1 data-[state=on]:shadow-1")

/** The same pill for moving between a view's sections (links), and after them `children` (a menu of more). */
export function SegmentedNav({
  items,
  children,
  className,
  "aria-label": ariaLabel,
}: {
  items: { to: string; label: React.ReactNode; icon?: React.ReactNode; active: boolean }[]
  children?: React.ReactNode
  className?: string
  "aria-label": string
}) {
  return (
    <nav aria-label={ariaLabel} className={cn(track, className)}>
      {items.map((i) => (
        <Link
          key={i.to}
          to={i.to}
          aria-current={i.active ? "page" : undefined}
          data-state={i.active ? "on" : "off"}
          className={navItem}
        >
          {i.icon}
          {i.label}
        </Link>
      ))}
      {children}
    </nav>
  )
}

/** A control at the end of the nav's pill (a menu of more places), on while one of them is open. */
export function SegmentedNavButton({ active, className, ...props }: React.ComponentProps<"button"> & { active: boolean }) {
  return (
    <button
      type="button"
      {...props}
      aria-current={active ? "page" : undefined}
      data-state={active ? "on" : "off"}
      className={cn(navItem, className)}
    />
  )
}
