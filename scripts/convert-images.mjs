#!/usr/bin/env node

/**
 * Convert large PNG images to WebP format for better performance.
 * Run with: node scripts/convert-images.mjs
 */

import sharp from 'sharp';
import { readdir, stat, unlink, rename } from 'fs/promises';
import { join, extname, basename } from 'path';

const imagesToConvert = [
  { path: 'public/images/about/brigitte.png', quality: 85 },
  { path: 'public/images/about/megan.png', quality: 85 },
  { path: 'public/images/contactus.png', quality: 85 },
];

async function convertImage(inputPath, quality = 85) {
  const ext = extname(inputPath);
  const outputPath = inputPath.replace(ext, '.webp');
  const backupPath = inputPath + '.backup';

  try {
    const stats = await stat(inputPath);
    const originalSize = stats.size;

    console.log(`Converting: ${inputPath}`);
    console.log(`  Original size: ${(originalSize / 1024 / 1024).toFixed(2)} MB`);

    await sharp(inputPath)
      .webp({ quality })
      .toFile(outputPath);

    const newStats = await stat(outputPath);
    const newSize = newStats.size;
    const savings = ((originalSize - newSize) / originalSize * 100).toFixed(1);

    console.log(`  New size: ${(newSize / 1024).toFixed(2)} KB`);
    console.log(`  Savings: ${savings}%`);
    console.log(`  Output: ${outputPath}`);

    // Rename original to backup
    await rename(inputPath, backupPath);
    console.log(`  Backup: ${backupPath}`);

    return { inputPath, outputPath, originalSize, newSize };
  } catch (error) {
    console.error(`Error converting ${inputPath}:`, error.message);
    return null;
  }
}

async function main() {
  console.log('Starting image conversion to WebP...\n');

  const results = [];
  for (const image of imagesToConvert) {
    const result = await convertImage(image.path, image.quality);
    if (result) results.push(result);
    console.log('');
  }

  if (results.length > 0) {
    const totalOriginal = results.reduce((sum, r) => sum + r.originalSize, 0);
    const totalNew = results.reduce((sum, r) => sum + r.newSize, 0);
    const totalSavings = ((totalOriginal - totalNew) / totalOriginal * 100).toFixed(1);

    console.log('=== Summary ===');
    console.log(`Converted: ${results.length} images`);
    console.log(`Original total: ${(totalOriginal / 1024 / 1024).toFixed(2)} MB`);
    console.log(`New total: ${(totalNew / 1024).toFixed(2)} KB`);
    console.log(`Total savings: ${totalSavings}%`);
    console.log('\nRemember to update image references in your code!');
  }
}

main().catch(console.error);
