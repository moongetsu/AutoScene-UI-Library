import { createContext } from "react"

/** Where a preview shows: on a small card of the registry, or in the showcase with room to work. */
export const PreviewPlace = createContext<"gallery" | "showcase">("showcase")
