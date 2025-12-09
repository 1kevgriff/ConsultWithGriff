#!/usr/bin/env node
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const GRIDSOME_ROOT = path.resolve(__dirname, '../../kevgriffin.v4');
const ASTRO_ROOT = path.resolve(__dirname, '..');
const GRIDSOME_BLOG_DIR = path.join(GRIDSOME_ROOT, 'blog');
const GRIDSOME_DOCS_DIR = path.join(GRIDSOME_ROOT, 'docs');
const ASTRO_BLOG_DIR = path.join(ASTRO_ROOT, 'src/content/blog');
const ASTRO_DOCS_DIR = path.join(ASTRO_ROOT, 'src/content/docs');

/**
 * Recursively copy files from source to destination
 */
async function copyDirectory(src, dest) {
  try {
    await fs.mkdir(dest, { recursive: true });
    const entries = await fs.readdir(src, { withFileTypes: true });

    let fileCount = 0;
    for (const entry of entries) {
      const srcPath = path.join(src, entry.name);
      const destPath = path.join(dest, entry.name);

      if (entry.isDirectory()) {
        fileCount += await copyDirectory(srcPath, destPath);
      } else if (entry.name.endsWith('.md')) {
        await fs.copyFile(srcPath, destPath);
        fileCount++;
        console.log(`  ✓ Copied: ${entry.name}`);
      }
    }
    return fileCount;
  } catch (error) {
    console.error(`Error copying directory ${src}:`, error.message);
    return 0;
  }
}

/**
 * Main migration function
 */
async function migrate() {
  console.log('Starting content migration from Gridsome to Astro...\n');

  // Check if Gridsome directories exist
  try {
    await fs.access(GRIDSOME_ROOT);
  } catch {
    console.error(`Error: Gridsome project not found at ${GRIDSOME_ROOT}`);
    console.error('Please ensure the Gridsome project is in the correct location.');
    process.exit(1);
  }

  // Migrate blog posts
  console.log('Migrating blog posts...');
  try {
    const blogCount = await copyDirectory(GRIDSOME_BLOG_DIR, ASTRO_BLOG_DIR);
    console.log(`✓ Migrated ${blogCount} blog posts\n`);
  } catch (error) {
    console.error('Error migrating blog posts:', error.message);
  }

  // Migrate documentation
  console.log('Migrating documentation...');
  try {
    const docsCount = await copyDirectory(GRIDSOME_DOCS_DIR, ASTRO_DOCS_DIR);
    console.log(`✓ Migrated ${docsCount} documentation files\n`);
  } catch (error) {
    console.error('Error migrating documentation:', error.message);
  }

  console.log('Migration complete!');
  console.log(
    '\nNext steps:',
    '\n1. Run: npm run type-check',
    '\n2. Run: npm run build',
    '\n3. Fix any validation errors in the migrated content'
  );
}

// Run migration
migrate().catch((error) => {
  console.error('Migration failed:', error);
  process.exit(1);
});
