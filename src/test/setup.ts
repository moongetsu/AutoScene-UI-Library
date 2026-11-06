import { MotionGlobalConfig } from "motion"
import { afterEach } from "vitest"
import { resetHolds } from "@/state/activity"

// The library's menus and dialogs close with motion: in tests that takes no time,
// so what an entry does after its menu has closed happens at once.
MotionGlobalConfig.skipAnimations = true

// The activity store keeps its progress holds outside React state: no test
// leaves one running into the next.
afterEach(resetHolds)

// jsdom lacks a few browser APIs that Radix primitives call while they open
// (pointer capture, scrolling an option into view, measuring their trigger).

if (!Element.prototype.hasPointerCapture) {
  Element.prototype.hasPointerCapture = () => false
  Element.prototype.setPointerCapture = () => {}
  Element.prototype.releasePointerCapture = () => {}
}

if (!Element.prototype.scrollIntoView) {
  Element.prototype.scrollIntoView = () => {}
}

// The library's motion components ask for reduced motion on import.
if (!window.matchMedia) {
  window.matchMedia = (query) =>
    ({
      matches: false,
      media: query,
      onchange: null,
      addEventListener: () => {},
      removeEventListener: () => {},
      addListener: () => {},
      removeListener: () => {},
      dispatchEvent: () => false,
    }) as MediaQueryList
}

// Animate UI's stagger plays its rows with the Web Animations API.
if (!Element.prototype.animate) {
  Element.prototype.animate = () =>
    ({
      finished: Promise.resolve(),
      cancel() {},
      finish() {},
      play() {},
      pause() {},
      addEventListener() {},
      removeEventListener() {},
    }) as unknown as Animation
}

if (!Element.prototype.getAnimations) {
  Element.prototype.getAnimations = () => []
}

// motion checks for it when it animates a menu's check mark.
if (!("SVGGeometryElement" in globalThis)) {
  Object.assign(globalThis, { SVGGeometryElement: SVGElement })
}

if (!("ResizeObserver" in globalThis)) {
  globalThis.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  }
}
