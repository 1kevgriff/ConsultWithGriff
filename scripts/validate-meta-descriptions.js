#!/usr/bin/env node
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const ASTRO_ROOT = path.resolve(__dirname, '..');
const CONTENT_DIR = path.join(ASTRO_ROOT, 'src/content');

// Meta description length thresholds
const MIN_LENGTH = 100; // Error if below this
const RECOMMENDED_MIN = 120; // Warning if below this
const RECOMMENDED_MAX = 160; // Warning if above this

/**
 * Get the effective meta description from frontmatter
 * Priority: description > summary > excerpt (matching [slug].astro logic)
 */
function getMetaDescription(frontmatter) {
  if (frontmatter.description && frontmatter.description.trim() !== '') {
    return frontmatter.description;
  }
  return frontmatter.summary || frontmatter.excerpt || '';
}

/**
 * Validate meta description in a markdown file
 */
async function validateMarkdownFile(filePath) {
  const content = await fs.readFile(filePath, 'utf-8');
  const { data: frontmatter } = matter(content);

  const description = getMetaDescription(frontmatter);
  const length = description.length;
  const permalink = frontmatter.permalink || path.basename(filePath, '.md');

  return {
    file: path.relative(ASTRO_ROOT, filePath),
    permalink,
    description,
    length,
    hasError: length < MIN_LENGTH,
    hasWarning: length >= MIN_LENGTH && length < RECOMMENDED_MIN,
    isTooLong: length > RECOMMENDED_MAX,
  };
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
  console.log('Validating meta descriptions in content files...\n');

  try {
    await fs.access(CONTENT_DIR);
  } catch {
    console.error(`Content directory not found: ${CONTENT_DIR}`);
    process.exit(1);
  }

  const markdownFiles = await findMarkdownFiles(CONTENT_DIR);
  console.log(`Found ${markdownFiles.length} markdown files\n`);

  const errors = [];
  const warnings = [];
  const tooLong = [];
  let validCount = 0;

  for (const file of markdownFiles) {
    const result = await validateMarkdownFile(file);

    if (result.hasError) {
      errors.push(result);
    } else if (result.hasWarning) {
      warnings.push(result);
    } else if (result.isTooLong) {
      tooLong.push(result);
      validCount++; // Too long is still valid, just a warning
    } else {
      validCount++;
    }
  }

  // Report results
  console.log('Validation Results:');
  console.log('===================');
  console.log(`Total files: ${markdownFiles.length}`);
  console.log(`  ✓ Valid (${RECOMMENDED_MIN}-${RECOMMENDED_MAX} chars): ${validCount}`);
  console.log(`  ⚠ Below recommended (${MIN_LENGTH}-${RECOMMENDED_MIN} chars): ${warnings.length}`);
  console.log(`  ⚠ Above recommended (>${RECOMMENDED_MAX} chars): ${tooLong.length}`);
  console.log(`  ✗ Too short (<${MIN_LENGTH} chars): ${errors.length}\n`);

  // Show warnings (below recommended)
  if (warnings.length > 0) {
    console.log(`\nWarnings - Below recommended length (${warnings.length}):`);
    console.log('=============================================');
    for (const w of warnings) {
      console.log(`  ⚠ ${w.permalink} (${w.length} chars)`);
    }
  }

  // Show too long warnings
  if (tooLong.length > 0) {
    console.log(`\nWarnings - Above recommended length (${tooLong.length}):`);
    console.log('=============================================');
    for (const t of tooLong) {
      console.log(`  ⚠ ${t.permalink} (${t.length} chars)`);
    }
  }

  // Show errors (too short)
  if (errors.length > 0) {
    console.log(`\nErrors - Too short (<${MIN_LENGTH} chars) (${errors.length}):`);
    console.log('============================================');
    for (const e of errors) {
      console.log(`  ✗ ${e.permalink} (${e.length} chars)`);
      console.log(`    File: ${e.file}`);
      if (e.description) {
        console.log(`    Current: "${e.description}"`);
      } else {
        console.log(`    Current: (no description)`);
      }
      console.log('');
    }

    console.log(
      `\n✗ Validation failed: ${errors.length} file(s) have meta descriptions that are too short.`
    );
    console.log(`  Minimum required: ${MIN_LENGTH} characters`);
    console.log(`  Recommended: ${RECOMMENDED_MIN}-${RECOMMENDED_MAX} characters\n`);
    process.exit(1);
  }

  console.log('\n✓ All meta descriptions meet minimum requirements!');
}

// Run validation
validate().catch((error) => {
  console.error('Validation failed:', error);
  process.exit(1);
});
