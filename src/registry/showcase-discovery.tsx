import * as React from "react"
import {
  CursorClick,
  Tag,
  Square,
  ToggleLeft,
  CircleNotch,
  ChatCircle,
  Image,
  Cards,
  Sidebar,
  Palette,
  SquaresFour,
} from "@phosphor-icons/react"
import { DISCOVERED_COMPONENTS } from "./discovery"

export interface ShowcaseSectionMeta {
  id: string
  label: string
  group: "Components" | "Feedback" | "Layout & Media" | "Features" | "Tokens" | "Tools"
  icon: React.ReactNode
  Component: React.ComponentType
  count?: number
}

// How many catalog entries show in a section
const componentsIn = (section: string) => DISCOVERED_COMPONENTS.filter((c) => c.section === section).length

// Map section filenames or ids to clean metadata
const SECTION_CONFIG: Record<
  string,
  { label: string; group: ShowcaseSectionMeta["group"]; icon: React.ReactNode; order: number; overrideCount?: number }
> = {
  buttons: { label: "Buttons & Pills", group: "Components", icon: <CursorClick className="size-4" />, order: 1 },
  badges: { label: "Badges & Tags", group: "Components", icon: <Tag className="size-4" />, order: 2 },
  inputs: { label: "Inputs & Search", group: "Components", icon: <Square className="size-4" />, order: 3 },
  toggles: { label: "Toggles & Sliders", group: "Components", icon: <ToggleLeft className="size-4" />, order: 4 },
  indicators: { label: "Status & Progress", group: "Feedback", icon: <CircleNotch className="size-4" />, order: 5 },
  overlays: { label: "Dropdowns & Overlays", group: "Feedback", icon: <ChatCircle className="size-4" />, order: 6 },
  media: { label: "Media & Artwork", group: "Layout & Media", icon: <Image className="size-4" />, order: 7 },
  cards: { label: "Composite Cards", group: "Layout & Media", icon: <Cards className="size-4" />, order: 8 },
  shell: { label: "Shell & Headers", group: "Layout & Media", icon: <Sidebar className="size-4" />, order: 9 },
  features: { label: "Features", group: "Features", icon: <SquaresFour className="size-4" />, order: 10 },
  tokens: { label: "Colors & Tokens", group: "Tokens", icon: <Palette className="size-4" />, order: 11 },
  icons: { label: "Icons (80+)", group: "Tokens", icon: <Image className="size-4" />, overrideCount: 88, order: 12 },
}

/**
 * Dynamically discover all showcase sections using Vite import.meta.glob
 */
const sectionModules = import.meta.glob<{ [key: string]: React.ComponentType }>(
  "/src/components/showcase/sections/*Showcase.tsx",
  { eager: true }
)

export function getDiscoveredSections(): ShowcaseSectionMeta[] {
  const sections: ShowcaseSectionMeta[] = []

  for (const [path, mod] of Object.entries(sectionModules)) {
    // Extract base name: "/src/components/showcase/sections/ButtonsShowcase.tsx" -> "buttons"
    const fileName = path.split("/").pop()?.replace(/Showcase\.tsx$/, "").toLowerCase()
    if (!fileName) continue

    // Find the exported component (either default export or named *Showcase)
    const Component =
      mod.default ||
      Object.values(mod).find((val) => typeof val === "function" || (typeof val === "object" && val !== null))

    if (!Component) continue

    const config = SECTION_CONFIG[fileName]
    const label = config?.label || `${fileName.charAt(0).toUpperCase() + fileName.slice(1)}`
    const group = config?.group || "Components"
    const icon = config?.icon || <Square className="size-4" />

    const count =
      typeof config?.overrideCount === "number"
        ? config.overrideCount
        : componentsIn(fileName) || undefined

    sections.push({
      id: fileName,
      label,
      group,
      icon,
      Component: Component as React.ComponentType,
      count,
    })
  }

  // Sort by order config or label
  return sections.sort((a, b) => {
    const orderA = SECTION_CONFIG[a.id]?.order ?? 99
    const orderB = SECTION_CONFIG[b.id]?.order ?? 99
    return orderA - orderB
  })
}

export const DISCOVERED_SECTIONS = getDiscoveredSections()

export const SECTION_MAP: Record<string, ShowcaseSectionMeta> = Object.fromEntries(
  DISCOVERED_SECTIONS.map((s) => [s.id, s])
)

