import type { APIContext, GetStaticPaths } from 'astro';
import { getCollection, type CollectionEntry } from 'astro:content';

type BlogEntry = CollectionEntry<'blog'>;
type DocsEntry = CollectionEntry<'docs'>;

type EntryProps = { entry: BlogEntry; type: 'blog' } | { entry: DocsEntry; type: 'docs' };

export const getStaticPaths: GetStaticPaths = async () => {
  const blogEntries = await getCollection('blog');
  const docsEntries = await getCollection('docs');

  const blogPaths = blogEntries.map((entry) => ({
    params: { slug: entry.data.permalink || entry.id.replace(/^\d{8}-/, '') },
    props: { entry, type: 'blog' as const },
  }));

  const docsPaths = docsEntries.map((entry) => ({
    params: { slug: entry.data.permalink || entry.id },
    props: { entry, type: 'docs' as const },
  }));

  return [...blogPaths, ...docsPaths];
};

export async function GET(context: APIContext) {
  const { entry, type } = context.props as EntryProps;

  const slug =
    entry.data.permalink || (type === 'blog' ? entry.id.replace(/^\d{8}-/, '') : entry.id);
  const canonical = `https://consultwithgriff.com/${slug}`;

  const date =
    entry.data.date instanceof Date
      ? entry.data.date.toISOString().split('T')[0]
      : String(entry.data.date ?? '');

  const rawBody = (entry as { body?: string }).body ?? '';

  const frontmatter = [
    '---',
    `title: ${JSON.stringify(entry.data.title)}`,
    `date: ${date}`,
    `canonical: ${canonical}`,
    '---',
    '',
  ].join('\n');

  const body = `# ${entry.data.title}\n\n${rawBody}\n`;

  return new Response(frontmatter + '\n' + body, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
    },
  });
}
