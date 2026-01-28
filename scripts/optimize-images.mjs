#!/usr/bin/env node
/**
 * Image optimization script for Tender Touch Clinic
 *
 * Usage: node scripts/optimize-images.mjs
 *
 * Reads from: public/images/originals/
 * Outputs to: public/images/
 *
 * Expected input files:
 * - hero.jpg (or .png) → hero.jpg (1920px wide)
 * - og-image.jpg → og-image.jpg (1200x630)
 * - megan.jpg → about/megan.jpg (600px wide)
 * - clinic-*.jpg → about/clinic-*.jpg (800x800 square)
 */

import sharp from "sharp";
import { readdirSync, mkdirSync, existsSync } from "fs";
import { join, parse } from "path";

const INPUT_DIR = "public/images/originals";
const OUTPUT_DIR = "public/images";

// Ensure output directories exist
mkdirSync(join(OUTPUT_DIR, "about"), { recursive: true });

const configs = {
  hero: { width: 1920, height: 1080, fit: "cover", quality: 80 },
  "og-image": { width: 1200, height: 630, fit: "cover", quality: 85 },
  megan: { width: 600, height: 800, fit: "cover", quality: 85, subdir: "about" },
  "clinic-1": { width: 800, height: 800, fit: "cover", quality: 80, subdir: "about" },
  "clinic-2": { width: 800, height: 800, fit: "cover", quality: 80, subdir: "about" },
  "clinic-3": { width: 800, height: 800, fit: "cover", quality: 80, subdir: "about" },
  "clinic-4": { width: 800, height: 800, fit: "cover", quality: 80, subdir: "about" },
};

async function optimizeImage(inputPath, outputPath, config) {
  const { width, height, fit, quality } = config;

  await sharp(inputPath)
    .resize(width, height, { fit, position: "center" })
    .jpeg({ quality, mozjpeg: true })
    .toFile(outputPath);

  const inputStats = (await sharp(inputPath).metadata());
  const outputStats = (await sharp(outputPath).metadata());

  console.log(`✓ ${parse(inputPath).base} → ${outputPath.replace(OUTPUT_DIR + "/", "")}`);
  console.log(`  ${inputStats.width}x${inputStats.height} → ${outputStats.width}x${outputStats.height}`);
}

async function main() {
  if (!existsSync(INPUT_DIR)) {
    console.log(`\nCreate folder and add images:\n  ${INPUT_DIR}/\n`);
    console.log("Expected files: hero.jpg, og-image.jpg, megan.jpg, clinic-1.jpg, clinic-2.jpg, clinic-3.jpg");
    process.exit(1);
  }

  const files = readdirSync(INPUT_DIR).filter(f => /\.(jpg|jpeg|png|webp)$/i.test(f));

  if (files.length === 0) {
    console.log(`\nNo images found in ${INPUT_DIR}/`);
    console.log("Add your images there and run again.");
    process.exit(1);
  }

  console.log(`\nOptimizing ${files.length} images...\n`);

  for (const file of files) {
    const { name } = parse(file);
    const inputPath = join(INPUT_DIR, file);

    // Check if we have a config for this file
    const config = configs[name];

    if (config) {
      const subdir = config.subdir ? `${config.subdir}/` : "";
      const outputPath = join(OUTPUT_DIR, `${subdir}${name}.jpg`);
      await optimizeImage(inputPath, outputPath, config);
    } else {
      // Default: resize to max 1200px wide, 80% quality
      const outputPath = join(OUTPUT_DIR, `${name}.jpg`);
      await sharp(inputPath)
        .resize(1200, null, { fit: "inside", withoutEnlargement: true })
        .jpeg({ quality: 80, mozjpeg: true })
        .toFile(outputPath);
      console.log(`✓ ${file} → ${name}.jpg (default 1200px)`);
    }
  }

  console.log("\n✅ Done! Images saved to public/images/");
}

main().catch(console.error);
