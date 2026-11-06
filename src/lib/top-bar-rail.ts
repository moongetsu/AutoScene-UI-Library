import { createContext } from "react"

/**
 * The rail beside a `TopBar`, given by the shell that has one: whether it is
 * hidden, how to show it, and the keys that do it. Without one the bar offers
 * no Show the rail, so `TopBar` asks nothing of the app.
 */
export const TopBarRail = createContext<{ hidden: boolean; show: () => void; shortcut?: string[] } | null>(null)
