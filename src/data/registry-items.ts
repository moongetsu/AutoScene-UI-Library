export interface RegistryComponentItem {
  id: string
  title: string
  category: "Buttons" | "Toggles" | "Inputs" | "Cards" | "Feedback" | "Media"
  description: string
  importStatement: string
  showcaseSection: string
}

export const REGISTRY_COMPONENTS: RegistryComponentItem[] = [
  {
    id: "primary-action-pill",
    title: "Primary Action Pill",
    category: "Buttons",
    description: "White glassmorphic CTA pill with inner specular glow and spring press state.",
    importStatement: 'import { Button } from "@moongetsu/autoscene-ui"',
    showcaseSection: "buttons",
  },
  {
    id: "accent-gold-button",
    title: "Accent Gold Button",
    category: "Buttons",
    description: "AutoScene brand gold with subtle backdrop glow for focal actions.",
    importStatement: 'import { Button } from "@moongetsu/autoscene-ui"',
    showcaseSection: "buttons",
  },
  {
    id: "frosted-glass-pill",
    title: "Frosted Glass Pill",
    category: "Buttons",
    description: "Translucent backdrop pill designed to float over media footage.",
    importStatement: 'import { Button } from "@moongetsu/autoscene-ui"',
    showcaseSection: "buttons",
  },
  {
    id: "danger-destructive-pill",
    title: "Danger Destructive Pill",
    category: "Buttons",
    description: "Muted crimson border with red glow hover for irreversible deletes.",
    importStatement: 'import { Button } from "@moongetsu/autoscene-ui"',
    showcaseSection: "buttons",
  },
  {
    id: "segmented-sliding-tabs",
    title: "Segmented Sliding Tabs",
    category: "Toggles",
    description: "Spring-animated sliding tab switcher with zero layout shift.",
    importStatement: 'import { Segmented } from "@moongetsu/autoscene-ui"',
    showcaseSection: "toggles",
  },
  {
    id: "hardware-switch",
    title: "Hardware Switch",
    category: "Toggles",
    description: "High-contrast boolean switch with fluid thumb glide.",
    importStatement: 'import { Switch } from "@moongetsu/autoscene-ui"',
    showcaseSection: "toggles",
  },
  {
    id: "confidence-slider",
    title: "Confidence Slider",
    category: "Toggles",
    description: "Continuous drag threshold slider with live numeric chip feedback.",
    importStatement: 'import { Slider } from "@moongetsu/autoscene-ui"',
    showcaseSection: "toggles",
  },
  {
    id: "text-field-input",
    title: "Glass Form Input",
    category: "Inputs",
    description: "Controlled text input with border focus states and placeholder styling.",
    importStatement: 'import { Input } from "@moongetsu/autoscene-ui"',
    showcaseSection: "inputs",
  },
  {
    id: "search-bar-input",
    title: "Search Bar with Icon",
    category: "Inputs",
    description: "Search bar with embedded magnifying glass icon and keyboard shortcut.",
    importStatement: 'import { Input } from "@moongetsu/autoscene-ui"',
    showcaseSection: "inputs",
  },
  {
    id: "character-profile-card",
    title: "Character Profile Card",
    category: "Cards",
    description: "Square actor profile card with clip badge and action menu trigger.",
    importStatement: 'import { Badge, Button } from "@moongetsu/autoscene-ui"',
    showcaseSection: "cards",
  },
  {
    id: "export-summary-card",
    title: "Export Summary Card",
    category: "Cards",
    description: "Export summary card with playback trigger and video format details.",
    importStatement: 'import { Badge, Button } from "@moongetsu/autoscene-ui"',
    showcaseSection: "cards",
  },
  {
    id: "status-badges",
    title: "Status Badges & Tags",
    category: "Feedback",
    description: "Semantic badge pills designed for status updates and timeline verification.",
    importStatement: 'import { Badge } from "@moongetsu/autoscene-ui"',
    showcaseSection: "badges",
  },
  {
    id: "linear-progress-bar",
    title: "Progress Bar",
    category: "Feedback",
    description: "Determinate percentage progress bar and indeterminate scanning beam.",
    importStatement: 'import { Progress } from "@moongetsu/autoscene-ui"',
    showcaseSection: "indicators",
  },
  {
    id: "keyboard-shortcuts-kbd",
    title: "Keyboard Shortcut Caps",
    category: "Feedback",
    description: "Physical specular keyboard shortcut caps for keybinding references.",
    importStatement: 'import { Kbd } from "@moongetsu/autoscene-ui"',
    showcaseSection: "indicators",
  },
  {
    id: "dropdown-action-menu",
    title: "Dropdown Action Menu",
    category: "Feedback",
    description: "Glass floating context menu with item icons and destructive action separator.",
    importStatement: 'import { DropdownMenu } from "@moongetsu/autoscene-ui"',
    showcaseSection: "overlays",
  },
  {
    id: "hero-display-header",
    title: "Hero Display Header",
    category: "Media",
    description: "Backdrop header designed for project and episode hero banners.",
    importStatement: 'import { Hero } from "@moongetsu/autoscene-ui"',
    showcaseSection: "media",
  },
]

