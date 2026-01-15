#!/usr/bin/env node

import sharp from 'sharp';
import { readdir, stat } from 'fs/promises';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, '..');
const ogDir = join(projectRoot, 'public/og');

/**
 * Optimize OG image to target size
 * Target: 150-200KB per image
 */
async function optimizeOGImage(imagePath) {
  try {
    const stats = await stat(imagePath);
    const fileSizeKB = stats.size / 1024;

    // Skip if already optimized (under 250KB)
    if (stats.size < 250 * 1024) {
      return { path: imagePath, skipped: true, reason: 'already-optimized' };
    }

    console.log(`Optimizing: ${imagePath.split('\\').pop()} (${fileSizeKB.toFixed(0)}KB)`);

    // Try different quality levels to hit target
    let quality = 75;
    let optimized = false;
    let outputPath = imagePath.replace('.png', '_opt.png');

    while (quality >= 50 && !optimized) {
      await sharp(imagePath)
        .png({ quality, compressionLevel: 9, effort: 10 })
        .toFile(outputPath);

      const optimizedStats = await stat(outputPath);
      const optimizedSizeKB = optimizedStats.size / 1024;

      if (optimizedSizeKB <= 200 || quality === 50) {
        // Replace original
        await sharp(outputPath).toFile(imagePath);

        const finalStats = await stat(imagePath);
        const finalSizeKB = finalStats.size / 1024;
        const savingsPercent = ((stats.size - finalStats.size) / stats.size * 100).toFixed(1);

        console.log(`✅ ${fileSizeKB.toFixed(0)}KB → ${finalSizeKB.toFixed(0)}KB (${savingsPercent}% smaller, quality: ${quality})`);
        optimized = true;
        return { path: imagePath, before: stats.size, after: finalStats.size, quality };
      }

      quality -= 5;
    }
  } catch (error) {
    console.error(`❌ Failed: ${imagePath.split('\\').pop()}:`, error.message);
    return { path: imagePath, error: error.message };
  }
}

/**
 * Main execution
 */
async function main() {
  console.log('🖼️  OG Image Optimization');
  console.log('========================\n');

  const images = await readdir(ogDir);
  const pngImages = images.filter(f => f.endsWith('.png') && !f.includes('_opt'));

  console.log(`Found ${pngImages.length} OG images to optimize\n`);

  let totalBefore = 0;
  let totalAfter = 0;
  let optimized = 0;
  let skipped = 0;
  let errors = 0;

  for (const image of pngImages) {
    const imagePath = join(ogDir, image);
    const result = await optimizeOGImage(imagePath);

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
  console.log(`   ⏭️  Already optimized: ${skipped}`);
  if (errors > 0) {
    console.log(`   ❌ Errors: ${errors}`);
  }

  if (optimized > 0) {
    const totalSavedMB = (totalBefore - totalAfter) / (1024 * 1024);
    const totalSavedPercent = ((totalBefore - totalAfter) / totalBefore * 100).toFixed(1);
    console.log(`\n💾 Total saved: ${totalSavedMB.toFixed(2)}MB (${totalSavedPercent}%)`);
    console.log(`   Before: ${(totalBefore / (1024 * 1024)).toFixed(2)}MB`);
    console.log(`   After: ${(totalAfter / (1024 * 1024)).toFixed(2)}MB`);
  }
}

main().catch(console.error);
