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
  { id: "features", title: "Features", desc: "Whole parts of the AutoScene app, running here on the mock backend with made-up data." },
  { id: "tokens", title: "Colors & Tokens", desc: "Dark background surfaces, gray text hierarchy, and brand gold accents." },
  { id: "playground", title: "Playground", desc: "Interactive button modifier stage with live preview and generated code." },
]

// One page per catalog entry and per named look of the showcase (src/registry/catalog.json)
const catalog = JSON.parse(fs.readFileSync(path.join(rootDir, "src/registry/catalog.json"), "utf-8"))
const COMPONENTS = [
  ...catalog.showcase.map((c) => ({ id: c.id, title: c.title, desc: c.description })),
  ...catalog.entries.map((c) => ({ id: c.id, title: c.name, desc: c.description })),
]

function renderPage(title, desc, relativeUrl) {
  const fullTitle = `${title} | AutoScene UI`
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

