import { chromium } from "playwright"
import { spawn } from "child_process"
import path from "path"
import fs from "fs"

const ROOT = path.resolve(import.meta.dirname, "..")
const OUT_DIR = path.join(ROOT, "docs", "previews")
const PUBLIC_DIR = path.join(ROOT, "public")
const PORT = 5218

async function run() {
  if (!fs.existsSync(OUT_DIR)) {
    fs.mkdirSync(OUT_DIR, { recursive: true })
  }

  console.log(`Starting preview static server on port ${PORT}...`)
  const server = spawn("npx", ["vite", "preview", "--port", String(PORT), "--base", "/AutoScene-UI-Library/"], {
    cwd: ROOT,
    stdio: "pipe",
    env: { ...process.env, BROWSER: "none" },
  })

  await new Promise((resolve, reject) => {
    const timer = setTimeout(() => resolve(true), 4000)
    server.stdout.on("data", (data) => {
      const msg = data.toString()
      if (msg.includes(String(PORT))) {
        clearTimeout(timer)
        resolve(true)
      }
    })
    server.stderr.on("data", (data) => {
      console.error(data.toString())
    })
    server.on("error", reject)
  })

  console.log("Launching headless browser...")
  // In CI or environments without system Chrome, launch default Chromium; otherwise try system Chrome if available
  let browser
  const chromePath = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
  if (fs.existsSync(chromePath)) {
    browser = await chromium.launch({
      executablePath: chromePath,
      headless: true,
    })
  } else {
    browser = await chromium.launch({
      headless: true,
    })
  }

  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
  })

  const page = await context.newPage()
  console.log("Navigating to Registry Page...")
  await page.goto(`http://localhost:${PORT}/AutoScene-UI-Library/#/`, { waitUntil: "networkidle" })
  await page.waitForTimeout(2000)

  const previewPath = path.join(OUT_DIR, "registry-21st-overview.png")
  await page.screenshot({
    path: previewPath,
    fullPage: false,
  })
  console.log(`Saved screenshot to ${previewPath}`)

  const ogPath = path.join(PUBLIC_DIR, "og-image.png")
  fs.copyFileSync(previewPath, ogPath)
  console.log(`Copied screenshot to ${ogPath}`)

  await browser.close()
  server.kill()
  console.log("Screenshot capture complete!")
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
