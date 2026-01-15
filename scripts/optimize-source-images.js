#!/usr/bin/env node

import sharp from 'sharp';
import { readdir, stat } from 'fs/promises';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, '..');

/**
 * Optimize large source images to reduce file size
 * Target: Max 1200px width, quality 75, convert to WebP where beneficial
 */
async function optimizeImage(imagePath) {
  try {
    const stats = await stat(imagePath);
    const fileSizeMB = stats.size / (1024 * 1024);

    // Only optimize images over 500KB
    if (stats.size < 500 * 1024) {
      return { path: imagePath, skipped: true, reason: 'small' };
    }

    const image = sharp(imagePath);
    const metadata = await image.metadata();

    // Skip if already optimized (under 1200px wide)
    if (metadata.width <= 1200) {
      return { path: imagePath, skipped: true, reason: 'optimized' };
    }

    console.log(`Optimizing: ${imagePath.split('/').pop()} (${fileSizeMB.toFixed(2)}MB, ${metadata.width}x${metadata.height})`);

    // Resize to max 1200px wide, maintain aspect ratio
    await image
      .resize(1200, null, {
        withoutEnlargement: true,
        fit: 'inside'
      })
      .jpeg({ quality: 75, mozjpeg: true })
      .toFile(imagePath + '.optimized');

    // Replace original with optimized version
    const optimizedStats = await stat(imagePath + '.optimized');
    const optimizedSizeMB = optimizedStats.size / (1024 * 1024);
    const savingsPercent = ((stats.size - optimizedStats.size) / stats.size * 100).toFixed(1);

    // Only replace if we saved space
    if (optimizedStats.size < stats.size) {
      await sharp(imagePath + '.optimized').toFile(imagePath);
      console.log(`✅ Optimized: ${fileSizeMB.toFixed(2)}MB → ${optimizedSizeMB.toFixed(2)}MB (${savingsPercent}% smaller)`);
      return { path: imagePath, before: stats.size, after: optimizedStats.size, saved: savingsPercent };
    } else {
      console.log(`⏭️  Skipped: optimization didn't reduce size`);
      return { path: imagePath, skipped: true, reason: 'no-savings' };
    }
  } catch (error) {
    console.error(`❌ Failed to optimize ${imagePath}:`, error.message);
    return { path: imagePath, error: error.message };
  }
}

/**
 * Recursively find all images in a directory
 */
async function findImages(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const images = [];

  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      images.push(...await findImages(fullPath));
    } else if (/\.(jpg|jpeg|png)$/i.test(entry.name) && !entry.name.includes('.optimized')) {
      images.push(fullPath);
    }
  }

  return images;
}

/**
 * Main execution
 */
async function main() {
  console.log('🖼️  Image Optimization Script');
  console.log('============================\n');

  const assetsDir = join(projectRoot, 'src/assets/blog');
  console.log(`Scanning: ${assetsDir}\n`);

  const images = await findImages(assetsDir);
  console.log(`Found ${images.length} images\n`);

  let totalBefore = 0;
  let totalAfter = 0;
  let optimized = 0;
  let skipped = 0;
  let errors = 0;

  for (const imagePath of images) {
    const result = await optimizeImage(imagePath);
    if (result.error) {
      errors++;
    } else if (result.skipped) {
      skipped++;
    } else {
      optimized++;
      totalBefore += result.before;
      totalAfter += result.after;
    }
  }

  console.log('\n📊 Summary:');
  console.log(`   ✅ Optimized: ${optimized}`);
  console.log(`   ⏭️  Skipped: ${skipped}`);
  if (errors > 0) {
    console.log(`   ❌ Errors: ${errors}`);
  }

  if (optimized > 0) {
    const totalSavedMB = (totalBefore - totalAfter) / (1024 * 1024);
    const totalSavedPercent = ((totalBefore - totalAfter) / totalBefore * 100).toFixed(1);
    console.log(`\n💾 Total saved: ${totalSavedMB.toFixed(2)}MB (${totalSavedPercent}%)`);
  }
}

main().catch(console.error);
