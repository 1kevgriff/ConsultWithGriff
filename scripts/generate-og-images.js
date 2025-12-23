import { GoogleGenAI } from "@google/genai";
import matter from "gray-matter";
import * as fs from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const BLOG_DIR = path.resolve(__dirname, "../src/content/blog");
const OG_OUTPUT_DIR = path.resolve(__dirname, "../public/og");
const AUTHOR_IMAGE = path.resolve(__dirname, "../public/kevin_rockon.png");
const MODEL = "gemini-3-pro-image-preview";

// Ensure output directory exists
if (!fs.existsSync(OG_OUTPUT_DIR)) {
  fs.mkdirSync(OG_OUTPUT_DIR, { recursive: true });
}

/**
 * Extract slug from blog post filename or frontmatter permalink
 */
function getSlug(filename, frontmatter) {
  // Use permalink from frontmatter if available
  if (frontmatter.permalink) {
    return frontmatter.permalink;
  }
  // Otherwise, derive from filename (remove date prefix and extension)
  // Format: YYYYMMDD-title.md -> title
  const basename = path.basename(filename, ".md");
  const match = basename.match(/^\d{8}-(.+)$/);
  return match ? match[1] : basename;
}

/**
 * Load author image as base64
 */
function loadAuthorImage() {
  const imageBuffer = fs.readFileSync(AUTHOR_IMAGE);
  return imageBuffer.toString("base64");
}

/**
 * Detect the appropriate background style based on post content
 */
function detectBackgroundStyle(title, tags = [], categories = []) {
  const text = [title, ...tags, ...categories].join(" ").toLowerCase();

  // Cloud / Azure patterns
  if (
    text.includes("azure") ||
    text.includes("cloud") ||
    text.includes("serverless") ||
    text.includes("aws") ||
    text.includes("devops")
  ) {
    return "subtle cloud icons and connected nodes pattern";
  }

  // Database patterns
  if (
    text.includes("database") ||
    text.includes("sql") ||
    text.includes("data")
  ) {
    return "subtle database and data flow diagram patterns";
  }

  // Default to circuit board pattern
  return "subtle circuit board patterns and tech-inspired geometric lines";
}

/**
 * Build the image generation prompt
 */
function buildPrompt(title, tags, categories) {
  const backgroundStyle = detectBackgroundStyle(title, tags, categories);

  return `Create a professional OpenGraph social media preview image (1200x630 pixels).

Design specifications:
- Dark gradient background transitioning from dark navy blue (#1a1a2e) to deep purple (#16213e)
- Add subtle, faded ${backgroundStyle} in the background for a tech aesthetic
- On the RIGHT side, place the provided author photo (the person in the attached image) as a natural headshot
- The author photo should be large, positioned on the right third, and can extend beyond the bottom edge
- On the LEFT two-thirds, display the title in large, bold font
- Title: "${title}"
- Use WHITE for main title text, and CYAN/LIGHT BLUE (#5ce1e6) for key words or phrases to add visual interest
- At the bottom left, include "consultwithgriff.com" in a smaller, subtle white or light gray font
- Professional tech blog aesthetic matching the attached reference style
- Ensure the title text is highly readable and wraps naturally if long
- The overall composition should feel balanced with text on the left and the author headshot on the right`;
}

/**
 * Generate OG image using NanoBanana Pro API
 */
async function generateOgImage(ai, title, tags, categories, authorImageBase64, outputPath) {
  const prompt = buildPrompt(title, tags, categories);

  try {
    const response = await ai.models.generateContent({
      model: MODEL,
      contents: [
        {
          role: "user",
          parts: [
            {
              inlineData: {
                mimeType: "image/png",
                data: authorImageBase64,
              },
            },
            {
              text: prompt,
            },
          ],
        },
      ],
    });

    // Extract image data from response
    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        const buffer = Buffer.from(part.inlineData.data, "base64");
        fs.writeFileSync(outputPath, buffer);
        return true;
      }
    }

    console.error(`  No image data in response for: ${title}`);
    return false;
  } catch (error) {
    console.error(`  API error for "${title}": ${error.message}`);
    return false;
  }
}

/**
 * Main function to process all blog posts
 */
async function main() {
  // Check for API key
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error("Error: GEMINI_API_KEY environment variable is not set.");
    console.error("Set it with: export GEMINI_API_KEY=your_api_key_here");
    process.exit(1);
  }

  // Initialize Google GenAI client
  const ai = new GoogleGenAI({ apiKey });

  // Load author image once
  console.log("Loading author image...");
  const authorImageBase64 = loadAuthorImage();
  console.log("Author image loaded successfully.\n");

  // Get all markdown files
  const files = fs
    .readdirSync(BLOG_DIR)
    .filter((file) => file.endsWith(".md"));

  console.log(`Found ${files.length} blog posts`);
  console.log(`Output directory: ${OG_OUTPUT_DIR}\n`);

  let generated = 0;
  let skipped = 0;
  let failed = 0;

  for (const file of files) {
    const filePath = path.join(BLOG_DIR, file);
    const content = fs.readFileSync(filePath, "utf-8");
    const { data: frontmatter } = matter(content);

    const slug = getSlug(file, frontmatter);
    const outputPath = path.join(OG_OUTPUT_DIR, `${slug}.png`);

    // Check if image already exists
    if (fs.existsSync(outputPath)) {
      console.log(`[SKIP] ${slug} - image already exists`);
      skipped++;
      continue;
    }

    // Generate image
    const tags = frontmatter.tags || [];
    const categories = frontmatter.categories || [];
    console.log(`[GENERATING] ${slug} - "${frontmatter.title}"`);
    const success = await generateOgImage(ai, frontmatter.title, tags, categories, authorImageBase64, outputPath);

    if (success) {
      console.log(`  -> Saved to ${outputPath}`);
      generated++;
    } else {
      failed++;
    }

    // Small delay to avoid rate limiting
    await new Promise((resolve) => setTimeout(resolve, 500));
  }

  // Summary
  console.log("\n=== Summary ===");
  console.log(`Generated: ${generated}`);
  console.log(`Skipped (existing): ${skipped}`);
  console.log(`Failed: ${failed}`);
  console.log(`Total: ${files.length}`);
}

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
