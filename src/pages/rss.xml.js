import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const posts = await getCollection('blog');
  const sortedPosts = posts.sort(
    (a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime()
  );

  return rss({
    title: 'Kevin W. Griffin - Azure & .NET Architect',
    description:
      'Articles on ASP.NET Core, Microsoft Azure, SignalR, and modern web development from a 16-time Microsoft MVP.',
    site: context.site,
    items: sortedPosts.map((post) => ({
      title: post.data.title,
      pubDate: new Date(post.data.date),
      description: post.data.excerpt || post.data.summary || post.data.description || '',
      link: `/${post.data.permalink || post.slug}/`,
    })),
    customData: `<language>en-us</language>`,
  });
}
