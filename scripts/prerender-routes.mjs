import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(__dirname, "..")
const distDir = path.resolve(rootDir, "dist")

// Read the base built template
const indexHtmlPath = path.join(distDir, "index.html")
if (!fs.existsSync(indexHtmlPath)) {
  console.error("dist/index.html does not exist. Run build first.")
  process.exit(1)
}

const baseHtml = fs.readFileSync(indexHtmlPath, "utf-8")

// Registry categories & components
const CATEGORIES = [
  { id: "buttons", title: "Buttons & Pills", desc: "Glassmorphic pill buttons crafted with backdrop-blur and spring states." },
  { id: "toggles", title: "Toggles & Sliders", desc: "Switches, range sliders, and sliding tab buttons." },
  { id: "inputs", title: "Inputs & Search", desc: "Text inputs and search bars with focus borders." },
  { id: "badges", title: "Badges & Tags", desc: "Tags and status badges for clips, episodes, and export states." },
  { id: "indicators", title: "Status & Progress", desc: "Progress bars, keyboard shortcuts, and empty states." },
  { id: "overlays", title: "Overlays & Menus", desc: "Tooltips, dropdown menus, and toast notifications." },
  { id: "media", title: "Media & Artwork", desc: "Image containers, aspect ratio frames, and hero headers." },
  { id: "cards", title: "Composite Cards", desc: "Cards for character profiles, exports, and video clips." },
  { id: "shell", title: "Shell & Headers", desc: "Navigation rails, brand logos, and app shell headers." },
  { id: "tokens", title: "Colors & Tokens", desc: "Dark background surfaces, gray text hierarchy, and brand gold accents." },
  { id: "playground", title: "Playground", desc: "Interactive button modifier stage with live preview and generated code." },
]

const COMPONENTS = [
  { id: "primary-action-pill", title: "Primary Action Pill", desc: "White glass CTA pill with inner specular glow and spring press state." },
  { id: "accent-gold-button", title: "Accent Gold Button", desc: "AutoScene brand gold with subtle backdrop glow for focal actions." },
  { id: "frosted-glass-pill", title: "Frosted Glass Pill", desc: "Translucent backdrop pill designed to float over media footage." },
  { id: "danger-destructive-pill", title: "Danger Destructive Pill", desc: "Muted crimson border with red glow hover for irreversible deletes." },
  { id: "segmented-sliding-tabs", title: "Segmented Sliding Tabs", desc: "Spring-animated sliding tab switcher with zero layout shift." },
  { id: "hardware-switch", title: "Hardware Switch", desc: "High-contrast boolean switch with fluid thumb glide." },
  { id: "confidence-slider", title: "Confidence Slider", desc: "Continuous drag threshold slider with live numeric chip feedback." },
  { id: "text-field-input", title: "Glass Form Input", desc: "Controlled text input with border focus states and placeholder styling." },
  { id: "search-bar-input", title: "Search Bar with Icon", desc: "Search bar with embedded magnifying glass icon and keyboard shortcut." },
  { id: "character-profile-card", title: "Character Profile Card", desc: "Square actor profile card with clip badge and action menu trigger." },
  { id: "export-summary-card", title: "Export Summary Card", desc: "Export summary card with playback trigger and video format details." },
  { id: "status-badges", title: "Status Badges & Tags", desc: "Semantic badge pills designed for status updates and timeline verification." },
  { id: "linear-progress-bar", title: "Progress Bar", desc: "Determinate percentage progress bar and indeterminate scanning beam." },
  { id: "keyboard-shortcuts-kbd", title: "Keyboard Shortcut Caps", desc: "Physical specular keyboard shortcut caps for keybinding references." },
  { id: "dropdown-action-menu", title: "Dropdown Action Menu", desc: "Glass floating context menu with item icons and destructive action separator." },
  { id: "hero-display-header", title: "Hero Display Header", desc: "Backdrop header designed for project and episode hero banners." },
]

function renderPage(title, desc, relativeUrl) {
  const fullTitle = `${title} — AutoScene UI`
  const canonical = `https://moongetsu.github.io/AutoScene-UI-Library/${relativeUrl}`

  let html = baseHtml
    .replace(/<title>.*?<\/title>/, `<title>${fullTitle}</title>`)
    .replace(/<meta property="og:title" content=".*?" \/>/, `<meta property="og:title" content="${fullTitle}" />`)
    .replace(/<meta property="og:description" content=".*?" \/>/, `<meta property="og:description" content="${desc}" />`)
    .replace(/<meta property="og:url" content=".*?" \/>/, `<meta property="og:url" content="${canonical}" />`)
    .replace(/<meta name="twitter:title" content=".*?" \/>/, `<meta name="twitter:title" content="${fullTitle}" />`)
    .replace(/<meta name="twitter:description" content=".*?" \/>/, `<meta name="twitter:description" content="${desc}" />`)
    .replace(/<link rel="canonical" href=".*?" \/>/, `<link rel="canonical" href="${canonical}" />`)

  return html
}

function writeStaticRoute(routePath, html) {
  const targetDir = path.join(distDir, routePath)
  fs.mkdirSync(targetDir, { recursive: true })
  fs.writeFileSync(path.join(targetDir, "index.html"), html, "utf-8")
}

console.log("Generating static prerendered Open Graph routes...")

// 1. Showcase categories
for (const cat of CATEGORIES) {
  const html = renderPage(cat.title, cat.desc, `showcase/${cat.id}/`)
  writeStaticRoute(`showcase/${cat.id}`, html)
}

// 2. Individual components
for (const comp of COMPONENTS) {
  const html = renderPage(comp.title, comp.desc, `components/${comp.id}/`)
  writeStaticRoute(`components/${comp.id}`, html)
}

console.log(`Prerendered ${CATEGORIES.length} showcase routes and ${COMPONENTS.length} component routes successfully.`)

