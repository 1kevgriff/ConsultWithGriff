#!/usr/bin/env node
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const ASTRO_ROOT = path.resolve(__dirname, '..');
const CONTENT_DIR = path.join(ASTRO_ROOT, 'src/content');
const PUBLIC_DIR = path.join(ASTRO_ROOT, 'public');

// Regex to match markdown image syntax: ![alt](path)
const IMAGE_REGEX = /!\[([^\]]*)\]\(([^)]+)\)/g;

/**
 * Extract image paths from markdown content
 */
function extractImagePaths(content) {
  const images = [];
  let match;
  while ((match = IMAGE_REGEX.exec(content)) !== null) {
    images.push({
      alt: match[1],
      path: match[2],
    });
  }
  return images;
}

/**
 * Check if an image path exists
 */
async function imageExists(imagePath) {
  // Handle external URLs
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return { exists: true, type: 'external' };
  }

  // Handle relative paths
  const fullPath = path.join(PUBLIC_DIR, imagePath.startsWith('/') ? imagePath.slice(1) : imagePath);

  try {
    await fs.access(fullPath);
    return { exists: true, type: 'local', fullPath };
  } catch {
    return { exists: false, type: 'local', fullPath };
  }
}

/**
 * Validate images in a markdown file
 */
async function validateMarkdownFile(filePath) {
  const content = await fs.readFile(filePath, 'utf-8');
  const images = extractImagePaths(content);
  const results = {
    file: path.relative(ASTRO_ROOT, filePath),
    totalImages: images.length,
    valid: [],
    invalid: [],
    external: [],
  };

  for (const image of images) {
    const result = await imageExists(image.path);

    if (result.type === 'external') {
      results.external.push(image.path);
    } else if (result.exists) {
      results.valid.push(image.path);
    } else {
      results.invalid.push({
        path: image.path,
        expectedPath: result.fullPath,
      });
    }
  }

  return results;
}

/**
 * Recursively find all markdown files
 */
async function findMarkdownFiles(dir) {
  const files = [];
  const entries = await fs.readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await findMarkdownFiles(fullPath)));
    } else if (entry.name.endsWith('.md')) {
      files.push(fullPath);
    }
  }

  return files;
}

/**
 * Main validation function
 */
async function validate() {
  console.log('Validating image references in markdown files...\n');

  try {
    await fs.access(CONTENT_DIR);
  } catch {
    console.error(`Content directory not found: ${CONTENT_DIR}`);
    process.exit(1);
  }

  const markdownFiles = await findMarkdownFiles(CONTENT_DIR);
  console.log(`Found ${markdownFiles.length} markdown files\n`);

  let totalImages = 0;
  let totalValid = 0;
  let totalInvalid = 0;
  let totalExternal = 0;
  const filesWithIssues = [];

  for (const file of markdownFiles) {
    const results = await validateMarkdownFile(file);
    totalImages += results.totalImages;
    totalValid += results.valid.length;
    totalInvalid += results.invalid.length;
    totalExternal += results.external.length;

    if (results.invalid.length > 0) {
      filesWithIssues.push(results);
    }
  }

  // Report results
  console.log('Validation Results:');
  console.log('===================');
  console.log(`Total images found: ${totalImages}`);
  console.log(`  ✓ Valid local images: ${totalValid}`);
  console.log(`  → External URLs: ${totalExternal}`);
  console.log(`  ✗ Invalid/missing: ${totalInvalid}\n`);

  if (filesWithIssues.length > 0) {
    console.log(`Files with missing images (${filesWithIssues.length}):`);
    console.log('=====================================\n');

    for (const file of filesWithIssues) {
      console.log(`File: ${file.file}`);
      for (const invalid of file.invalid) {
        console.log(`  ✗ Missing: ${invalid.path}`);
        console.log(`    Expected at: ${invalid.expectedPath}`);
      }
      console.log('');
    }

    process.exit(1);
  } else {
    console.log('✓ All image references are valid!');
  }
}

// Run validation
validate().catch((error) => {
  console.error('Validation failed:', error);
  process.exit(1);
});
