#!/usr/bin/env node

import { readFile, writeFile, rename } from 'fs/promises';
import { readFileSync, existsSync } from 'fs';
import { join, dirname, basename, extname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, '..');

// Load the image migration map
const mappingPath = join(projectRoot, 'image-migration-map.json');
const imageMap = existsSync(mappingPath) ? JSON.parse(readFileSync(mappingPath, 'utf-8')) : {};

/**
 * Blog posts with images that need conversion to MDX
 * These were identified during codebase exploration
 */
const postsToConvert = [
  '20170526-shedquarters.md',
  '20200525-adding-recaptcha-to-static-sites-with-azure-functions.md',
  '20221118-fewer-buzzwords-better-teams.md',
  '20221123-reconsidering-vanity-metrics.md',
  '20230621-five-reasons-why-i-love-hangfire.md',
  '20210112-launched-today-signalr-mastery.md',
  '20150828-enable-signalr-logging-with-one-simple-line.md',
  '20170608-revolutionconf-2017-event-recap.md',
  '20200515-what-is-dapper-and-why-you-should-consider-it-for-your-net-projects.md',
  '20200518-building-a-twitch-badge-for-my-site.md',
  '20200804-i-love-azure-static-web-apps.md',
  '20200810-how-to-redirect-with-azure-static-web-apps.md',
  '20200914-crazy-web-performance-with-azure-static-web-apps-and-azure-functions.md',
  '20211208-rapid-project-upgrades-with-the-net-upgrade-assistant.md',
  '20221206-building-windows-services-in-net-7.md',
  '20230403-building-background-services-with-hangfire-course-launch.md',
  '20240624-hampton-roads-devfest-2024-retrospective.md',
  '20241030-azure-functions-no-bindings-were-found-in-the-function-func.md',
  '20241210-my-8000-serverless-mistake.md',
];

/**
 * Convert markdown image syntax to Astro Image component
 */
function convertImageSyntax(content, mapping) {
  let hasImages = false;
  let needsImageImport = false;
  let needsOptimizedImageImport = false;

  // Replace markdown image syntax: ![alt](url)
  const imageRegex = /!\[([^\]]*)\]\(([^)]+)\)/g;

  content = content.replace(imageRegex, (match, alt, url) => {
    hasImages = true;

    // Check if URL is in migration map (external -> local)
    if (mapping[url]) {
      const localPath = mapping[url];
      needsImageImport = true;

      // Import the image as a module
      const imageName = basename(localPath, extname(localPath))
        .replace(/[^a-zA-Z0-9]/g, '_')
        .replace(/^(\d)/, '_$1'); // Ensure variable name doesn't start with number

      return `<Image src={${imageName}} alt="${alt}" quality={80} format="webp" loading="lazy" />`;
    }

    // Check if URL is relative (local image)
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      needsImageImport = true;
      return `<Image src="${url}" alt="${alt}" quality={80} format="webp" loading="lazy" />`;
    }

    // External URL - keep as regular img tag
    return `<img src="${url}" alt="${alt}" loading="lazy" />`;
  });

  return { content, hasImages, needsImageImport, needsOptimizedImageImport };
}

/**
 * Add import statements at the top of frontmatter
 */
function addImports(content, needsImageImport, imageImports) {
  const frontmatterEnd = content.indexOf('---', 3);
  if (frontmatterEnd === -1) {
    console.warn('Warning: No frontmatter found');
    return content;
  }

  let imports = '';
  if (needsImageImport) {
    imports += `import { Image } from 'astro:assets';\n`;
  }

  // Add image asset imports
  if (imageImports.length > 0) {
    imports += imageImports.join('\n') + '\n';
  }

  if (imports) {
    imports += '\n';
  }

  return content.slice(0, frontmatterEnd + 4) + imports + content.slice(frontmatterEnd + 4);
}

/**
 * Extract image imports from markdown content
 */
function extractImageImports(content, mapping) {
  const imports = [];
  const imageRegex = /!\[([^\]]*)\]\(([^)]+)\)/g;

  let match;
  while ((match = imageRegex.exec(content)) !== null) {
    const url = match[2];

    // Check if URL is in migration map
    if (mapping[url]) {
      const localPath = mapping[url];
      const imageName = basename(localPath, extname(localPath))
        .replace(/[^a-zA-Z0-9]/g, '_')
        .replace(/^(\d)/, '_$1');

      imports.push(`import ${imageName} from '../../assets/blog/${localPath.split('/').slice(-2).join('/')}';`);
    }
  }

  return imports;
}

/**
 * Convert a single markdown file to MDX
 */
async function convertFileToMDX(filename) {
  const mdPath = join(projectRoot, 'src/content/blog', filename);
  const mdxPath = mdPath.replace(/\.md$/, '.mdx');

  try {
    console.log(`Converting: ${filename}...`);

    // Read the markdown file
    let content = await readFile(mdPath, 'utf-8');

    // Extract image imports
    const imageImports = extractImageImports(content, imageMap);

    // Convert image syntax
    const result = convertImageSyntax(content, imageMap);

    // Add imports if needed
    if (result.needsImageImport || imageImports.length > 0) {
      result.content = addImports(result.content, result.needsImageImport, imageImports);
    }

    // Write MDX file
    await writeFile(mdxPath, result.content, 'utf-8');

    // Remove old .md file
    await rename(mdPath, mdPath + '.backup');

    console.log(`✅ Converted: ${filename} -> ${filename.replace('.md', '.mdx')}`);
    return { filename, success: true, hasImages: result.hasImages };
  } catch (error) {
    console.error(`❌ Failed to convert ${filename}:`, error.message);
    return { filename, success: false, error: error.message };
  }
}

/**
 * Main execution
 */
async function main() {
  console.log('📝 MDX Conversion Script');
  console.log('========================\n');
  console.log(`Converting ${postsToConvert.length} blog posts to MDX format...\n`);

  if (Object.keys(imageMap).length === 0) {
    console.warn('⚠️  Warning: No image migration map found (image-migration-map.json)');
    console.warn('   External image URLs will not be replaced with local paths.\n');
  } else {
    console.log(`📸 Using image migration map with ${Object.keys(imageMap).length} mappings\n`);
  }

  // Convert all posts
  const results = [];
  for (const filename of postsToConvert) {
    const result = await convertFileToMDX(filename);
    results.push(result);
  }

  // Summary
  const successful = results.filter((r) => r.success).length;
  const failed = results.filter((r) => !r.success).length;
  const withImages = results.filter((r) => r.hasImages).length;

  console.log('\n📊 Summary:');
  console.log(`   ✅ Successfully converted: ${successful}`);
  console.log(`   🖼️  Posts with images: ${withImages}`);
  if (failed > 0) {
    console.log(`   ❌ Failed: ${failed}`);
  }

  console.log('\n💡 Next steps:');
  console.log('   1. Review converted .mdx files in src/content/blog/');
  console.log('   2. Delete .backup files if conversion looks good');
  console.log('   3. Run build to test: npm run build');

  if (failed > 0) {
    console.log('\n⚠️  Some conversions failed. Please review and fix manually.');
    process.exit(1);
  }
}

main().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});
