import type * as React from "react"
import { cn } from "@/lib/utils"

export interface SkeletonProps extends React.ComponentProps<"div"> {
  /** Optional specular sweep shimmer effect */
  shimmer?: boolean
}

/**
 * Loading skeleton container with subtle specular sweep animation
 * designed for video cards, character portraits, and metadata rows.
 */
export function Skeleton({ className, shimmer = true, ...props }: SkeletonProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-lg bg-white/[0.04]",
        shimmer && [
          "after:absolute after:inset-0 after:-translate-x-full",
          "after:animate-shimmer after:bg-gradient-to-r",
          "after:from-transparent after:via-white/[0.06] after:to-transparent",
        ],
        className,
      )}
      {...props}
    />
  )
}

