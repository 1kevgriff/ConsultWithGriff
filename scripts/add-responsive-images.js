#!/usr/bin/env node

import { readFile, writeFile } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { readdirSync } from 'fs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, '..');
const blogDir = join(projectRoot, 'src/content/blog');

/**
 * Add responsive image attributes to Image components
 */
async function addResponsiveAttributes(filename) {
  const filePath = join(blogDir, filename);
  let content = await readFile(filePath, 'utf-8');

  // Find all Image components without widths attribute
  const imageRegex = /<Image\s+src=\{[^}]+\}\s+alt="[^"]*"\s+quality=\{?\d+\}?\s+format="webp"\s+loading="lazy"\s*\/>/g;
  const matches = [...content.matchAll(imageRegex)];

  if (matches.length === 0) {
    return { filename, updated: 0 };
  }

  let updated = 0;

  // Replace each Image component with responsive version
  for (const match of matches) {
    const original = match[0];

    // Add widths and sizes attributes before the closing />
    const responsive = original
      .replace(' />', '')
      + ' widths={[400, 800, 1200]} sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px" />';

    content = content.replace(original, responsive);
    updated++;
  }

  if (updated > 0) {
    await writeFile(filePath, content, 'utf-8');
  }

  return { filename, updated };
}

/**
 * Main execution
 */
async function main() {
  console.log('📱 Adding Responsive Image Sizes');
  console.log('=================================\n');

  const mdxFiles = readdirSync(blogDir).filter(f => f.endsWith('.mdx'));
  console.log(`Scanning ${mdxFiles.length} MDX files...\n`);

  let totalUpdated = 0;
  let filesChanged = 0;

  for (const file of mdxFiles) {
    const result = await addResponsiveAttributes(file);
    if (result.updated > 0) {
      console.log(`✅ Updated ${result.updated} images in ${result.filename}`);
      totalUpdated += result.updated;
      filesChanged++;
    }
  }

  console.log(`\n📊 Summary:`);
  console.log(`   ✅ Files updated: ${filesChanged}`);
  console.log(`   🖼️  Images made responsive: ${totalUpdated}`);
  console.log(`\n💡 Images now generate 3 sizes: 400px, 800px, 1200px`);
  console.log(`   Smaller devices get smaller images automatically!`);
}

main().catch(console.error);
