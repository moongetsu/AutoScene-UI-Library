import * as React from "react"
import { CaretRight } from "@/components/icons"
import { PreviewPlace } from "@/registry/preview-place"

type Size = { width: number; height: number }

/** The size of the element `ref` gets, 0 by 0 until it has been measured. */
function useSize(): [(el: HTMLElement | null) => (() => void) | undefined, Size] {
  const [size, setSize] = React.useState<Size>({ width: 0, height: 0 })
  const ref = React.useCallback((el: HTMLElement | null) => {
    if (!el || typeof ResizeObserver === "undefined") return undefined
    const read = () => setSize({ width: el.offsetWidth, height: el.offsetHeight })
    read()
    const watch = new ResizeObserver(read)
    watch.observe(el)
    return () => watch.disconnect()
  }, [])
  return [ref, size]
}

/** Whether the element has come near the screen: what is far down the registry doesn't run yet. */
function useSeen(): [(el: HTMLElement | null) => (() => void) | undefined, boolean] {
  const [seen, setSeen] = React.useState(typeof IntersectionObserver === "undefined")
  const ref = React.useCallback((el: HTMLElement | null) => {
    if (!el || typeof IntersectionObserver === "undefined") return undefined
    const watch = new IntersectionObserver(
      (hits) => {
        if (hits.some((h) => h.isIntersecting)) {
          setSeen(true)
          watch.disconnect()
        }
      },
      { rootMargin: "400px" },
    )
    watch.observe(el)
    return () => watch.disconnect()
  }, [])
  return [ref, seen]
}

/** A still's credit: Creative Commons pictures say whose they are wherever they show. */
function Credit({ text }: { text: string }) {
  return <p className="pointer-events-none truncate text-[10px] leading-none text-white/45">{text}</p>
}

/**
 * Shows a feature component at its real size in the showcase, and scaled to
 * fit on a registry card. `card`: a piece of a screen, `width` wide, as high
 * as it needs. `page`: a whole view, drawn `width` by `height`; on a registry
 * card it is a picture of itself that opens the showcase. Narrower than
 * `minWidth` (a phone), either lays out at `minWidth` and scales down, so it
 * keeps the layout it was made for and never pushes the page wider.
 */
export function FeatureFrame({
  id,
  kind = "card",
  width,
  height = 640,
  minWidth = kind === "page" ? 640 : 0,
  credit,
  children,
}: {
  id: string
  kind?: "card" | "page"
  width: number
  height?: number
  minWidth?: number
  credit?: string
  children: React.ReactNode
}) {
  const place = React.useContext(PreviewPlace)
  const [boxRef, box] = useSize()
  const [seenRef, seen] = useSeen()
  const [innerRef, inner] = useSize()
  const outerRef = React.useCallback(
    (el: HTMLDivElement | null) => {
      const stopBox = boxRef(el)
      const stopSeen = seenRef(el)
      return () => {
        stopBox?.()
        stopSeen?.()
      }
    },
    [boxRef, seenRef],
  )

  if (place === "gallery") {
    const fit =
      kind === "page"
        ? box.width / width
        : Math.min(1, (box.width - 40) / width, inner.height > 0 ? (box.height - 44) / inner.height : 1)
    return (
      <div ref={outerRef} className="absolute inset-0 overflow-hidden">
        {seen && box.width > 0 && (
          <div
            ref={innerRef}
            inert={kind === "page"}
            className={kind === "page" ? "absolute top-0 left-0 origin-top-left" : "absolute top-1/2 left-1/2"}
            style={{
              width,
              height: kind === "page" ? box.height / fit : undefined,
              transform: kind === "page" ? `scale(${fit})` : `translate(-50%, -50%) scale(${fit})`,
            }}
          >
            {children}
          </div>
        )}
        {kind === "page" && (
          <a
            href={`#/showcase?section=features&item=${id}`}
            aria-label="Open in the showcase"
            className="group/open absolute inset-0 flex items-end justify-end bg-gradient-to-t from-black/50 via-transparent to-transparent p-3"
          >
            <span className="flex size-8 items-center justify-center rounded-full border border-white/15 bg-black/50 text-white backdrop-blur-md transition-transform group-hover/open:translate-x-0.5">
              <CaretRight className="size-4" />
            </span>
          </a>
        )}
        {credit && (
          <div className="absolute inset-x-3 bottom-2">
            <Credit text={credit} />
          </div>
        )}
      </div>
    )
  }

  if (kind === "card") {
    const scale = box.width > 0 && box.width < minWidth ? box.width / minWidth : 1
    return (
      <div ref={outerRef} className="flex w-full flex-col items-center gap-2.5">
        <div className="w-full" style={{ maxWidth: width, height: scale < 1 ? inner.height * scale : undefined }}>
          <div
            ref={innerRef}
            className="origin-top-left"
            style={scale < 1 ? { width: minWidth, transform: `scale(${scale})` } : undefined}
          >
            {seen && children}
          </div>
        </div>
        {credit && <Credit text={credit} />}
      </div>
    )
  }

  const layout = Math.max(minWidth, Math.min(width, box.width))
  const scale = box.width > 0 ? box.width / layout : 1
  return (
    <div className="w-full">
      <div
        ref={outerRef}
        className="relative w-full overflow-hidden rounded-xl border border-white/[0.08] bg-canvas"
        style={{ height: height * scale }}
      >
        {seen && box.width > 0 && (
          <div className="absolute top-0 left-0 origin-top-left" style={{ width: layout, height, transform: `scale(${scale})` }}>
            {children}
          </div>
        )}
      </div>
      {credit && (
        <div className="mt-2.5">
          <Credit text={credit} />
        </div>
      )}
    </div>
  )
}
