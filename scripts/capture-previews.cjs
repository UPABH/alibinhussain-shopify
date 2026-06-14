const { chromium } = require('playwright')
const fs = require('fs')
const path = require('path')

const websites = require('../src/data/showcase.json')
const outputDir = path.join(__dirname, '../public/showcase')

async function capturePreviews() {
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true })
  }

  const browser = await chromium.launch({ headless: true })
  const context = await browser.newContext({
    viewport: { width: 1200, height: 1800 },
    deviceScaleFactor: 1,
  })

  for (const site of websites) {
    const fileName = `${site.id}.jpg`
    const filePath = path.join(outputDir, fileName)

    // Skip if already captured
    if (fs.existsSync(filePath)) {
      console.log(`Skipping ${site.title} — already exists`)
      continue
    }

    console.log(`Capturing ${site.title}...`)
    const page = await context.newPage()

    try {
      // Use 'load' instead of 'networkidle' because many sites keep analytics /
      // tracking requests alive forever and never hit networkidle.
      await page.goto(site.url, { waitUntil: 'load', timeout: 90000 })
      // Wait for lazy-loaded images, animations and dynamic content to settle
      await page.waitForTimeout(5000)
      await page.screenshot({
        path: filePath,
        type: 'jpeg',
        quality: 85,
        fullPage: false,
      })
      console.log(`Saved ${fileName}`)
    } catch (err) {
      console.error(`Failed to capture ${site.title}:`, err.message)
    } finally {
      await page.close()
    }
  }

  await browser.close()
  console.log('Done.')
}

capturePreviews().catch((err) => {
  console.error(err)
  process.exit(1)
})
