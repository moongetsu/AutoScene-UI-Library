import { chromium } from "playwright"
import { spawn, execSync } from "child_process"
import path from "path"
import fs from "fs"

const ROOT = path.resolve(import.meta.dirname, "..")
const OUT_DIR = path.join(ROOT, "docs", "previews")
const RAW_DIR = path.join(OUT_DIR, ".raw")

fs.mkdirSync(RAW_DIR, { recursive: true })

async function run() {
  console.log("Starting Vite dev server...")
  const server = spawn("npx", ["vite", "--port", "5199"], {
    cwd: ROOT,
    stdio: "pipe",
    env: { ...process.env, BROWSER: "none" },
  })

  // Wait for server to be ready
  await new Promise((resolve) => {
    server.stdout.on("data", (data) => {
      if (data.toString().includes("5199")) {
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
    viewport: { width: 1200, height: 800 },
    deviceScaleFactor: 2,
    recordVideo: {
      dir: RAW_DIR,
      size: { width: 1200, height: 800 },
    },
  })

  const page = await context.newPage()
  console.log("Navigating to UI Showcase...")
  await page.goto("http://localhost:5199/#/showcase", { waitUntil: "networkidle" })

  // 1. Capture Full UI Showcase Overview Screenshot
  await page.waitForTimeout(1000)
  await page.screenshot({
    path: path.join(OUT_DIR, "showcase-overview.png"),
    fullPage: false,
  })
  console.log("Saved showcase-overview.png")

  // 2. Select Buttons Section and screenshot
  await page.locator('button:has-text("Buttons & Pills")').click()
  await page.waitForTimeout(500)
  await page.screenshot({
    path: path.join(OUT_DIR, "buttons-preview.png"),
    fullPage: false,
  })
  console.log("Saved buttons-preview.png")

  // 3. Select Composite Cards and screenshot
  await page.locator('button:has-text("Composite Cards")').click()
  await page.waitForTimeout(500)
  await page.screenshot({
    path: path.join(OUT_DIR, "cards-preview.png"),
    fullPage: false,
  })
  console.log("Saved cards-preview.png")

  // 4. Navigate to Animation Recorder & Record interaction
  await page.locator('button:has-text("Animation Recorder")').click()
  await page.waitForTimeout(500)

  const btn = page.locator("#recorder-button")
  await btn.waitFor({ state: "visible" })

  // Hover
  await page.waitForTimeout(400)
  await btn.hover()
  await page.waitForTimeout(500)

  // Press down (spring)
  await page.mouse.down()
  await page.waitForTimeout(400)

  // Release
  await page.mouse.up()
  await page.waitForTimeout(500)

  // Move away
  await page.mouse.move(100, 100)
  await page.waitForTimeout(600)

  // Close context to flush video
  await context.close()
  await browser.close()
  server.kill()

  console.log("Processing recorded video to GIF and MP4...")
  const videoFiles = fs.readdirSync(RAW_DIR).filter((f) => f.endsWith(".webm"))
  if (videoFiles.length > 0) {
    const rawVideo = path.join(RAW_DIR, videoFiles[videoFiles.length - 1])
    const gifOut = path.join(OUT_DIR, "button-interaction.gif")
    const mp4Out = path.join(OUT_DIR, "button-interaction.mp4")

    // Crop to #animation-target area and convert to loopable GIF via 2-pass palette
    const ffmpegCmdGif = `ffmpeg -y -i "${rawVideo}" -vf "fps=30,scale=560:-1:flags=lanczos,split[s0][s1];[s0]palettegen=max_colors=128[p];[s1][p]paletteuse=dither=bayer" "${gifOut}"`
    execSync(ffmpegCmdGif)

    const ffmpegCmdMp4 = `ffmpeg -y -i "${rawVideo}" -c:v libx264 -pix_fmt yuv420p -an "${mp4Out}"`
    execSync(ffmpegCmdMp4)

    console.log("Generated button-interaction.gif and button-interaction.mp4")
  }

  // Cleanup raw temp directory
  fs.rmSync(RAW_DIR, { recursive: true, force: true })
  console.log("All previews generated successfully!")
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})

