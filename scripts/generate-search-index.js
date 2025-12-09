#!/usr/bin/env node
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const ASTRO_ROOT = path.resolve(__dirname, '..');
const CONTENT_DIR = path.join(ASTRO_ROOT, 'src/content');
const OUTPUT_FILE = path.join(ASTRO_ROOT, 'public/search-index.json');

/**
 * Parse frontmatter from markdown content
 */
function parseFrontmatter(content) {
  const frontmatterRegex = /^---\n([\s\S]+?)\n---/;
  const match = content.match(frontmatterRegex);

  if (!match) {
    return { frontmatter: {}, content: content };
  }

  const frontmatterText = match[1];
  const remainingContent = content.slice(match[0].length).trim();

  // Simple YAML parsing (supports strings and arrays)
  const frontmatter = {};
  const lines = frontmatterText.split('\n');

  let currentKey = null;
  let currentArray = null;

  for (const line of lines) {
    const trimmedLine = line.trim();

    // Skip empty lines and comments
    if (!trimmedLine || trimmedLine.startsWith('#')) continue;

    // Handle array items
    if (trimmedLine.startsWith('- ')) {
      if (currentArray) {
        currentArray.push(trimmedLine.slice(2).trim());
      }
      continue;
    }

    // Handle key-value pairs
    const colonIndex = trimmedLine.indexOf(':');
    if (colonIndex > 0) {
      currentKey = trimmedLine.slice(0, colonIndex).trim();
      const value = trimmedLine.slice(colonIndex + 1).trim();

      if (value === '') {
        // Empty value, might be start of array
        currentArray = [];
        frontmatter[currentKey] = currentArray;
      } else {
        // Has value, parse it
        frontmatter[currentKey] = value.replace(/^["']|["']$/g, '');
        currentArray = null;
      }
    }
  }

  return { frontmatter, content: remainingContent };
}

/**
 * Extract text content from markdown (remove markdown syntax)
 */
function extractTextContent(markdown) {
  return (
    markdown
      // Remove code blocks
      .replace(/```[\s\S]*?```/g, '')
      // Remove inline code
      .replace(/`[^`]+`/g, '')
      // Remove images
      .replace(/!\[([^\]]*)\]\([^)]+\)/g, '$1')
      // Remove links but keep text
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
      // Remove headers
      .replace(/#{1,6}\s+/g, '')
      // Remove emphasis
      .replace(/[*_]{1,2}([^*_]+)[*_]{1,2}/g, '$1')
      // Remove blockquotes
      .replace(/^>\s+/gm, '')
      // Clean up whitespace
      .replace(/\s+/g, ' ')
      .trim()
  );
}

/**
 * Generate excerpt from content
 */
function generateExcerpt(content, maxLength = 200) {
  const text = extractTextContent(content);
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '...';
}

/**
 * Process a markdown file and create search index entry
 */
async function processMarkdownFile(filePath, collection) {
  const content = await fs.readFile(filePath, 'utf-8');
  const { frontmatter, content: bodyContent } = parseFrontmatter(content);

  // Generate slug from filename (remove date prefix if present)
  const filename = path.basename(filePath, '.md');
  const slug = filename.replace(/^\d{8}-/, '');

  return {
    id: `${collection}/${slug}`,
    collection,
    slug,
    title: frontmatter.title || slug,
    description: frontmatter.description || frontmatter.summary || '',
    excerpt: frontmatter.excerpt || generateExcerpt(bodyContent),
    date: frontmatter.date || '',
    tags: Array.isArray(frontmatter.tags) ? frontmatter.tags : [],
    categories: Array.isArray(frontmatter.categories) ? frontmatter.categories : [],
    content: extractTextContent(bodyContent).slice(0, 1000), // First 1000 chars for search
  };
}

/**
 * Recursively find and process all markdown files
 */
async function processCollection(collectionDir, collectionName) {
  const entries = [];

  try {
    const files = await fs.readdir(collectionDir, { withFileTypes: true });

    for (const file of files) {
      const fullPath = path.join(collectionDir, file.name);

      if (file.isDirectory()) {
        const subEntries = await processCollection(fullPath, collectionName);
        entries.push(...subEntries);
      } else if (file.name.endsWith('.md')) {
        const entry = await processMarkdownFile(fullPath, collectionName);
        entries.push(entry);
      }
    }
  } catch (error) {
    if (error.code !== 'ENOENT') {
      console.error(`Error processing ${collectionDir}:`, error.message);
    }
  }

  return entries;
}

/**
 * Main function to generate search index
 */
async function generateIndex() {
  console.log('Generating search index...\n');

  const searchIndex = {
    generated: new Date().toISOString(),
    entries: [],
  };

  // Process blog collection
  console.log('Processing blog posts...');
  const blogEntries = await processCollection(path.join(CONTENT_DIR, 'blog'), 'blog');
  console.log(`  ✓ Processed ${blogEntries.length} blog posts`);
  searchIndex.entries.push(...blogEntries);

  // Process docs collection
  console.log('Processing documentation...');
  const docsEntries = await processCollection(path.join(CONTENT_DIR, 'docs'), 'docs');
  console.log(`  ✓ Processed ${docsEntries.length} documentation files`);
  searchIndex.entries.push(...docsEntries);

  // Write search index to public directory
  await fs.mkdir(path.dirname(OUTPUT_FILE), { recursive: true });
  await fs.writeFile(OUTPUT_FILE, JSON.stringify(searchIndex, null, 2));

  console.log(`\n✓ Search index generated with ${searchIndex.entries.length} entries`);
  console.log(`  Output: ${OUTPUT_FILE}`);
}

// Run generation
generateIndex().catch((error) => {
  console.error('Search index generation failed:', error);
  process.exit(1);
});
