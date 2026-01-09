import * as readline from 'readline';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BLOG_DIR = path.join(__dirname, '../src/content/blog');

const CATEGORIES = ['Development', 'Business', 'Speaking', 'Personal'];

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function question(prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, resolve);
  });
}

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function getDateString() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}${month}${day}`;
}

function getISODate() {
  const now = new Date();
  return now.toISOString().split('T')[0] + 'T00:00:00Z';
}

async function main() {
  console.log('\n📝 Create New Blog Post\n');
  console.log('─'.repeat(40));

  // Get title
  const title = await question('Title: ');
  if (!title.trim()) {
    console.log('❌ Title is required');
    rl.close();
    process.exit(1);
  }

  // Suggest slug based on title
  const suggestedSlug = slugify(title);
  const slugInput = await question(`Permalink slug [${suggestedSlug}]: `);
  const slug = slugInput.trim() || suggestedSlug;

  // Select category
  console.log('\nCategories:');
  CATEGORIES.forEach((cat, i) => console.log(`  ${i + 1}. ${cat}`));
  const catInput = await question('Select category (1-4): ');
  const catIndex = parseInt(catInput) - 1;
  const category =
    catIndex >= 0 && catIndex < CATEGORIES.length
      ? CATEGORIES[catIndex]
      : 'Development';

  // Get tags
  const tagsInput = await question('Tags (comma-separated): ');
  const tags = tagsInput
    .split(',')
    .map((t) => t.trim())
    .filter((t) => t.length > 0);

  // Build frontmatter
  const dateStr = getDateString();
  const isoDate = getISODate();
  const filename = `${dateStr}-${slug}.md`;
  const filepath = path.join(BLOG_DIR, filename);

  const frontmatter = `---
title: "${title}"
date: ${isoDate}
permalink: ${slug}
description: "TODO: Write a brief description for SEO and social sharing"
summary: "TODO: Write a 1-2 sentence summary of the post"
excerpt: "TODO: Write a brief excerpt (can be same as description)"
tags:
${tags.length > 0 ? tags.map((t) => `  - ${t}`).join('\n') : '  - TODO'}
categories:
  - ${category}
---

<!-- TODO: Write your blog post content here -->

## Introduction

TODO: Start with a hook that draws readers in.

## Main Content

TODO: Add your main content sections here.

## Conclusion

TODO: Wrap up with key takeaways.
`;

  // Check if file exists
  if (fs.existsSync(filepath)) {
    const overwrite = await question(
      `\n⚠️  File ${filename} already exists. Overwrite? (y/N): `
    );
    if (overwrite.toLowerCase() !== 'y') {
      console.log('Aborted.');
      rl.close();
      process.exit(0);
    }
  }

  // Write the file
  fs.writeFileSync(filepath, frontmatter);

  console.log('\n' + '─'.repeat(40));
  console.log(`✅ Created: src/content/blog/${filename}`);
  console.log('\nNext steps:');
  console.log('  1. Fill in the TODO sections');
  console.log('  2. Run: npm run dev');
  console.log(`  3. Preview at: http://localhost:4321/blog/${slug}`);
  console.log('');

  rl.close();
}

main().catch((err) => {
  console.error('Error:', err);
  rl.close();
  process.exit(1);
});
