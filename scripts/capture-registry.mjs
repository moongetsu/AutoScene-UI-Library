import { chromium } from "playwright"
import { spawn } from "child_process"
import path from "path"
import fs from "fs"

const ROOT = path.resolve(import.meta.dirname, "..")
const OUT_DIR = path.join(ROOT, "docs", "previews")

async function run() {
  console.log("Starting Vite dev server on port 5201...")
  const server = spawn("npx", ["vite", "--port", "5201"], {
    cwd: ROOT,
    stdio: "pipe",
    env: { ...process.env, BROWSER: "none" },
  })

  await new Promise((resolve) => {
    server.stdout.on("data", (data) => {
      if (data.toString().includes("5201")) {
        resolve(true)
      }
    })
  })

  console.log("Launching headless browser...")
  const browser = await chromium.launch({
    executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    headless: true,
  })

  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
  })

  const page = await context.newPage()
  console.log("Navigating to Registry Page...")
  await page.goto("http://localhost:5201/#/registry", { waitUntil: "networkidle" })
  await page.waitForTimeout(1000)

  await page.screenshot({
    path: path.join(OUT_DIR, "registry-21st-overview.png"),
    fullPage: false,
  })
  console.log("Saved registry-21st-overview.png")

  await browser.close()
  server.kill()
  console.log("Finished capturing 21st.dev style overview!")
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})

