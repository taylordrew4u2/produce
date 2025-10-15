#!/usr/bin/env node
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const publicDir = path.join(__dirname, '..', 'public')
const sources = ['logo.png', 'logo.jpg', 'logo.svg']
const src = sources.find((n) => fs.existsSync(path.join(publicDir, n)))

if (!src) {
  console.error('No logo source found in public/. Please add logo.png|logo.jpg|logo.svg first.')
  process.exit(1)
}

const srcPath = path.join(publicDir, src)

const outFiles = [
  { name: 'favicon-16x16.png', size: 16 },
  { name: 'favicon-32x32.png', size: 32 },
  { name: 'favicon-48x48.png', size: 48 },
  { name: 'apple-touch-icon.png', size: 180 },
  { name: 'og-image.png', size: 1200, height: 630 },
]

async function main() {
  console.log(`Generating icons from ${src} ...`)
  for (const o of outFiles) {
    const outPath = path.join(publicDir, o.name)
    const pipeline = sharp(srcPath, { density: 512 })
    if (o.height) {
      await pipeline.resize(o.size, o.height, { fit: 'cover' }).png({ quality: 90 }).toFile(outPath)
    } else {
      await pipeline.resize(o.size, o.size, { fit: 'cover' }).png({ quality: 90 }).toFile(outPath)
    }
    console.log('✓', o.name)
  }
  console.log('All icons generated in public/.')
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
