import type { Transition } from "motion/react"

/**
 * Spring animation presets inspired by Animate UI and native macOS/iOS physics
 */
export const SPRING_FAST: Transition = {
  type: "spring",
  stiffness: 450,
  damping: 32,
  mass: 0.8,
}

export const SPRING_GENTLE: Transition = {
  type: "spring",
  stiffness: 320,
  damping: 28,
}

export const SPRING_BOUNCE: Transition = {
  type: "spring",
  stiffness: 400,
  damping: 22,
}

export const FADE_TRANSITION: Transition = {
  duration: 0.16,
  ease: [0.16, 1, 0.3, 1],
}
