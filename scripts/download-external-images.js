#!/usr/bin/env node

import { createWriteStream } from 'fs';
import { writeFile, mkdir } from 'fs/promises';
import { pipeline } from 'stream/promises';
import { dirname, basename, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, '..');

/**
 * Images to download based on CSV analysis
 * These are images over 1MB that need to be migrated locally
 */
const imagesToDownload = [
  // Shedquarters images from Azure CDN
  {
    url: 'https://griffcdn.blob.core.windows.net/kevgriffinpublic/shedquarters/PouredAndReady.jpg',
    localPath: 'src/assets/blog/shedquarters/PouredAndReady.jpg',
    size: '2.2MB',
  },
  {
    url: 'https://griffcdn.blob.core.windows.net/kevgriffinpublic/shedquarters/ShedPlotBefore.jpg',
    localPath: 'src/assets/blog/shedquarters/ShedPlotBefore.jpg',
    size: '1.9MB',
  },
  {
    url: 'https://griffcdn.blob.core.windows.net/kevgriffinpublic/shedquarters/ShedPlotMarkedOut.jpg',
    localPath: 'src/assets/blog/shedquarters/ShedPlotMarkedOut.jpg',
    size: '1.9MB',
  },
  {
    url: 'https://griffcdn.blob.core.windows.net/kevgriffinpublic/shedquarters/AllHolesDug.jpg',
    localPath: 'src/assets/blog/shedquarters/AllHolesDug.jpg',
    size: '1.8MB',
  },
  {
    url: 'https://griffcdn.blob.core.windows.net/kevgriffinpublic/shedquarters/TowableAuger.jpg',
    localPath: 'src/assets/blog/shedquarters/TowableAuger.jpg',
    size: '1.7MB',
  },
  {
    url: 'https://griffcdn.blob.core.windows.net/kevgriffinpublic/shedquarters/ShedDelivery.jpg',
    localPath: 'src/assets/blog/shedquarters/ShedDelivery.jpg',
    size: '1.4MB',
  },
  {
    url: 'https://griffcdn.blob.core.windows.net/kevgriffinpublic/shedquarters/model_1.jpg',
    localPath: 'src/assets/blog/shedquarters/model_1.jpg',
    size: '1.2MB',
  },
  // Giphy GIF (will be converted to MP4 if FFmpeg is available)
  {
    url: 'https://media.giphy.com/media/U4DswrBiaz0p67ZweH/giphy.gif',
    localPath: 'src/assets/blog/misc/giphy-U4DswrBiaz0p67ZweH.gif',
    size: '1.4MB',
  },
];

/**
 * Download a single image from URL to local path
 */
async function downloadImage(url, localPath) {
  try {
    const fullPath = join(projectRoot, localPath);
    const dir = dirname(fullPath);

    // Create directory if it doesn't exist
    await mkdir(dir, { recursive: true });

    console.log(`Downloading: ${basename(localPath)}...`);

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const fileStream = createWriteStream(fullPath);
    await pipeline(response.body, fileStream);

    console.log(`✅ Downloaded: ${localPath}`);
    return { url, localPath, success: true };
  } catch (error) {
    console.error(`❌ Failed to download ${url}:`, error.message);
    return { url, localPath, success: false, error: error.message };
  }
}

/**
 * Generate a mapping file for URL migration
 */
async function generateMappingFile(results) {
  const mapping = {};

  for (const result of results) {
    if (result.success) {
      mapping[result.url] = result.localPath;
    }
  }

  const mappingPath = join(projectRoot, 'image-migration-map.json');
  await writeFile(mappingPath, JSON.stringify(mapping, null, 2));

  console.log(`\n✅ Generated mapping file: image-migration-map.json`);
  return mapping;
}

/**
 * Main execution
 */
async function main() {
  console.log('🖼️  Image Download Script');
  console.log('========================\n');
  console.log(`Downloading ${imagesToDownload.length} images from external CDNs...\n`);

  // Download all images
  const results = [];
  for (const image of imagesToDownload) {
    const result = await downloadImage(image.url, image.localPath);
    results.push(result);
  }

  // Generate mapping file
  await generateMappingFile(results);

  // Summary
  const successful = results.filter((r) => r.success).length;
  const failed = results.filter((r) => !r.success).length;

  console.log('\n📊 Summary:');
  console.log(`   ✅ Successfully downloaded: ${successful}`);
  if (failed > 0) {
    console.log(`   ❌ Failed: ${failed}`);
  }

  console.log('\n📁 Images saved to:');
  console.log('   - src/assets/blog/shedquarters/ (7 images)');
  console.log('   - src/assets/blog/misc/ (1 GIF)');

  console.log('\n💡 Next steps:');
  console.log('   1. Convert GIFs to MP4: npm run convert:gif-to-mp4');
  console.log('   2. Convert blog posts to MDX: npm run convert:mdx');
  console.log('   3. Update image references: npm run update:image-refs');

  if (failed > 0) {
    console.log('\n⚠️  Some images failed to download. Please retry or download manually.');
    process.exit(1);
  }
}

main().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});
