import * as React from "react"
import { Slot } from "radix-ui"
import { cva, type VariantProps } from "class-variance-authority"
import { motion, type HTMLMotionProps } from "motion/react"
import { CircleNotch } from "@/components/icons"
import { cn } from "@/lib/utils"

/**
 * Glass pills. `primary` is the one main action of a screen (bright white
 * glass); `secondary` and `glass` are dark glass that sits back, on the dark
 * and on pictures; `accent` (gold glass) is for what is selected or running.
 * `cta` is the solid warm-white pill with near-black text (DESIGN.md "The main
 * action"), for the answer most people give on a surface that leads with a
 * picture (the first-start notice).
 */
const buttonVariants = cva(
  [
    "inline-flex shrink-0 select-none items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium cursor-pointer",
    "transition-[background-color,border-color,color,box-shadow] duration-200 ease-out",
    "disabled:pointer-events-none disabled:opacity-40",
    "[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  ],
  {
    variants: {
      variant: {
        cta: "bg-cta font-semibold text-on-cta shadow-[0_10px_30px_-12px_rgb(255_255_255/0.5)] hover:bg-cta-hover active:bg-cta/90",
        primary:
          "border border-white/40 bg-white/[0.18] font-semibold text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.3)] backdrop-blur-xl hover:border-white/60 hover:bg-white/[0.26] active:bg-white/[0.22]",
        accent:
          "border border-accent/60 bg-accent/[0.18] font-semibold text-accent shadow-[inset_0_1px_0_rgb(224_180_92/0.4)] backdrop-blur-xl hover:border-accent hover:bg-accent/[0.26] active:bg-accent/[0.22]",
        secondary:
          "border border-white/10 bg-black/40 text-fg-1 backdrop-blur-xl shadow-lg hover:border-white/20 hover:bg-black/60 active:bg-black/70",
        glass:
          "border border-white/10 bg-black/30 text-white backdrop-blur-xl backdrop-saturate-150 hover:border-white/20 hover:bg-black/50 active:bg-black/60",
        ghost: "text-fg-2 hover:bg-hover hover:text-fg-1 active:bg-active",
        danger: "border border-danger/40 bg-danger-subtle text-danger hover:border-danger/70 hover:bg-danger/20",
      },
      size: {
        sm: "h-8 px-3.5 text-sm",
        md: "h-9 px-4 text-md",
        lg: "h-11 px-6 text-md [&_svg]:size-[18px]",
        icon: "size-9",
        "icon-sm": "size-8 [&_svg]:size-[15px]",
        "icon-lg": "size-11 [&_svg]:size-5",
      },
    },
    defaultVariants: { variant: "secondary", size: "md" },
  },
)

// No `title`: the browser's tooltip isn't the app's (wrap in `Tooltip`).
export type ButtonProps = Omit<React.ComponentProps<"button">, "title"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
    /**
     * It is working: it can't be pressed, and a spinner takes the place of
     * its first icon, or stands in front of the label when it has none.
     */
    busy?: boolean
  }

/** An icon among a button's children: a Phosphor icon (a ref-forwarding component) or a plain `svg`. */
function isIcon(node: React.ReactNode): node is React.ReactElement {
  return React.isValidElement(node) && (node.type === "svg" || typeof node.type === "object")
}

/** `children` while busy: the spinner in the first icon's place, or in front of them. */
function withSpinner(children: React.ReactNode) {
  const spinner = <CircleNotch key="busy" className="animate-spin text-current" />
  const parts = React.Children.toArray(children)
  const first = parts.findIndex(isIcon)
  if (first < 0) return [spinner, ...parts]
  return parts.map((part, i) => (i === first ? spinner : part))
}

export function Button({
  className,
  variant,
  size,
  asChild,
  type = "button",
  busy,
  disabled,
  children,
  ...props
}: ButtonProps) {
  if (asChild) {
    return (
      <Slot.Root
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      >
        {children}
      </Slot.Root>
    )
  }

  return (
    <motion.button
      type={type}
      disabled={disabled || busy}
      aria-busy={busy || undefined}
      whileHover={{ scale: 1.025 }}
      whileTap={{ scale: 0.94 }}
      transition={{
        type: "spring",
        stiffness: 550,
        damping: 24,
        mass: 0.6,
      }}
      className={cn(buttonVariants({ variant, size }), className)}
      {...(props as HTMLMotionProps<"button">)}
    >
      {busy ? withSpinner(children) : children}
    </motion.button>
  )
}
