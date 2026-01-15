#!/usr/bin/env node

import { readFile, writeFile } from 'fs/promises';
import { join, dirname, basename, extname } from 'path';
import { fileURLToPath } from 'url';
import { readdirSync } from 'fs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, '..');
const blogDir = join(projectRoot, 'src/content/blog');

/**
 * Fix MDX files with relative Image src paths
 */
async function fixMDXFile(filename) {
  const filePath = join(blogDir, filename);
  let content = await readFile(filePath, 'utf-8');

  // Find all relative Image src paths
  const imageRegex = /<Image src="(\.\/images\/[^"]+)"/g;
  const matches = [...content.matchAll(imageRegex)];

  if (matches.length === 0) {
    return { filename, fixed: 0 };
  }

  const imports = [];
  const replacements = [];

  for (const match of matches) {
    const relativePath = match[1]; // e.g., "./images/logging_preview.png"
    const imagePath = relativePath.replace('./images/', '');
    const imageName = basename(imagePath, extname(imagePath))
      .replace(/[^a-zA-Z0-9]/g, '_')
      .replace(/^(\d)/, '_$1');

    // Add import
    imports.push(`import ${imageName} from '../../assets/blog/local/${imagePath}';`);

    // Store replacement
    replacements.push({
      old: `<Image src="${relativePath}"`,
      new: `<Image src={${imageName}}`
    });
  }

  // Apply imports (after existing imports)
  const importLine = content.indexOf("import { Image } from 'astro:assets';");
  if (importLine !== -1) {
    const endOfImports = content.indexOf('\n\n', importLine);
    if (endOfImports !== -1) {
      content = content.slice(0, endOfImports) + '\n' + imports.join('\n') + content.slice(endOfImports);
    }
  }

  // Apply replacements
  for (const { old, new: newStr } of replacements) {
    content = content.replace(old, newStr);
  }

  await writeFile(filePath, content, 'utf-8');

  return { filename, fixed: matches.length };
}

/**
 * Main execution
 */
async function main() {
  console.log('🔧 Fixing MDX Image paths\n');

  const mdxFiles = readdirSync(blogDir).filter(f => f.endsWith('.mdx'));

  let totalFixed = 0;
  for (const file of mdxFiles) {
    const result = await fixMDXFile(file);
    if (result.fixed > 0) {
      console.log(`✅ Fixed ${result.fixed} images in ${result.filename}`);
      totalFixed += result.fixed;
    }
  }

  console.log(`\n📊 Total: ${totalFixed} image references fixed across ${mdxFiles.length} MDX files`);
}

main().catch(console.error);
