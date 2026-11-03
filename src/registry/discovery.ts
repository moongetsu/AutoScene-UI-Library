import * as React from "react"

export interface ComponentMeta {
  id: string
  name: string
  category: "Buttons" | "Inputs" | "Toggles" | "Feedback" | "Cards & Media" | "Navigation" | "Overlays"
  description: string
  file: string
}

// Map known component filenames to human-friendly categories and descriptions
const COMPONENT_METADATA: Record<string, { category: ComponentMeta["category"]; description: string; name?: string }> = {
  artwork: { category: "Cards & Media", description: "Artwork thumbnail with aspect ratio presets and gradient overlays." },
  badge: { category: "Feedback", description: "Pill tags for counts, statuses, media flags, and highlights." },
  button: { category: "Buttons", description: "Tactile glassmorphic CTA pills and buttons with spring motion physics." },
  "context-area": { category: "Overlays", description: "Right-click interactive context target area wrapper." },
  "context-menu": { category: "Overlays", description: "Desktop right-click popup menu with keyboard shortcut badges." },
  dialog: { category: "Overlays", description: "Modal dialog with spring backdrop blur and accessible focus trapping." },
  "dropdown-menu": { category: "Overlays", description: "Animated popover menu with radio items, checkboxes, and separators." },
  "empty-state": { category: "Cards & Media", description: "Placeholder card for zero-data views, missing media, or empty searches." },
  "error-state": { category: "Feedback", description: "Error state card with retry action button and status indicator." },
  "filter-bar": { category: "Navigation", description: "Filter, search, and sort toolbar with animated active filter chips." },
  hero: { category: "Cards & Media", description: "Full-width hero header banner with glass title and action slots." },
  input: { category: "Inputs", description: "Clean dark text input, search input, and labelled field wrappers." },
  kbd: { category: "Feedback", description: "Tactile keyboard shortcut caps with drop shadows and accents." },
  "menu-actions": { category: "Overlays", description: "Standardized menu action items with icons and shortcuts." },
  page: { category: "Navigation", description: "Scrollable view layout container with sticky header support." },
  progress: { category: "Feedback", description: "Animated indeterminate and determinate progress bars." },
  segmented: { category: "Toggles", description: "Single-choice segmented switch with sliding spring pill indicator." },
  select: { category: "Inputs", description: "Single-choice select dropdown with popover menu and check indicators." },
  sheet: { category: "Overlays", description: "Side drawer panel that slides smoothly from the screen edge." },
  shelf: { category: "Cards & Media", description: "Collapsible drawer shelf for tools, properties, and auxiliary widgets." },
  skeleton: { category: "Feedback", description: "Shimmering placeholder bones for loading cards and media." },
  slider: { category: "Toggles", description: "Precision scrubber slider for volumes, opacities, and timeline ranges." },
  switch: { category: "Toggles", description: "Binary toggle switch pill with animated sliding knob." },
  toaster: { category: "Feedback", description: "Lightweight dynamic frosted glass notification capsules." },
  tooltip: { category: "Overlays", description: "Instant micro-tooltip that appears on hover with custom offset." },
  topbar: { category: "Navigation", description: "Universal desktop header bar with branding, navigation, and controls." },
  "virtual-grid": { category: "Cards & Media", description: "High-performance virtualized grid for massive media asset libraries." },
}

/**
 * Dynamically scans src/components/ui/*.tsx using Vite import.meta.glob.
 * Completely automatic: adding a new component file immediately registers it.
 */
const uiModules = import.meta.glob("/src/components/ui/*.tsx", { eager: true })

export function getDiscoveredComponents(): ComponentMeta[] {
  const components: ComponentMeta[] = []

  for (const path of Object.keys(uiModules)) {
    // Skip test files
    if (path.endsWith(".test.tsx")) continue

    // Extract filename without path and extension (e.g. "/src/components/ui/filter-bar.tsx" -> "filter-bar")
    const fileName = path.split("/").pop()?.replace(/\.tsx$/, "")
    if (!fileName) continue

    const meta = COMPONENT_METADATA[fileName]
    const formattedName = fileName
      .split("-")
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(" ")

    components.push({
      id: fileName,
      name: meta?.name || formattedName,
      category: meta?.category || "Buttons",
      description: meta?.description || `AutoScene UI ${formattedName} component primitive.`,
      file: path,
    })
  }

  return components.sort((a, b) => a.name.localeCompare(b.name))
}

export const DISCOVERED_COMPONENTS = getDiscoveredComponents()
export const TOTAL_UI_COMPONENTS_COUNT = DISCOVERED_COMPONENTS.length
