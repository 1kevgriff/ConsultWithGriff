import type { APIContext } from 'astro';
import { getCollection } from 'astro:content';

export async function GET(_context: APIContext) {
  const posts = await getCollection('blog');
  const recent = posts
    .sort((a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime())
    .slice(0, 10);

  const recentList = recent
    .map((post) => {
      const slug = post.data.permalink || post.id.replace(/^\d{8}-/, '');
      const date = new Date(post.data.date).toISOString().split('T')[0];
      return `- [${post.data.title}](https://consultwithgriff.com/${slug}) — ${date}`;
    })
    .join('\n');

  const body = `---
title: "Kevin W. Griffin — Azure & .NET Architect"
canonical: https://consultwithgriff.com
---

# Kevin W. Griffin

Independent software consultant specializing in ASP.NET Core, Microsoft Azure, and modern web development. 16-time Microsoft MVP.

## Navigation

- [About](https://consultwithgriff.com/about)
- [Consulting](https://consultwithgriff.com/consulting)
- [Articles](https://consultwithgriff.com/articles)
- [Courses](https://consultwithgriff.com/courses)
- [Contact](https://consultwithgriff.com/contact)

## Agent-friendly resources

- [llms.txt](https://consultwithgriff.com/llms.txt) — site summary for LLMs
- [RSS feed](https://consultwithgriff.com/rss.xml)
- [Sitemap](https://consultwithgriff.com/sitemap-index.xml)
- Request \`Accept: text/markdown\` on any article URL, or append \`.md\` to the slug, to receive the markdown version.

## Recent articles

${recentList}

See [/articles](https://consultwithgriff.com/articles) for the full archive.
`;

  return new Response(body, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
    },
  });
}
