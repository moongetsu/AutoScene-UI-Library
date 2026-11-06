import { createContext } from "react"

/** How `ErrorState` opens the logs: main.tsx gives the app's way. Without one it offers no button. */
export const OpenLogs = createContext<(() => void) | null>(null)
