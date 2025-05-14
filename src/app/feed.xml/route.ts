import getPosts from '@/lib/getPosts';
import { Feed } from 'feed';
import config from '../config';

const DOMAIN = `https://${config.domain}`;

const posts = getPosts();
const latestPost = new Date(posts[0].date);

const year = new Date().getFullYear();

const feed = new Feed({
  title: config.author,
  description: `${config.author}'s Blog`,
  id: DOMAIN,
  link: DOMAIN,
  language: 'en', // optional, used only in RSS 2.0, possible values: http://www.w3.org/TR/REC-html40/struct/dirlang.html#langcodes
  favicon: DOMAIN + '/favicon.ico',
  copyright: `All Rights Reserved 2024-${year}, ${config.author}`,
  updated: latestPost,
  // updated: new Date(2013, 6, 14), // optional, default = today
  generator: 'Feed', // optional, default = 'Feed for Node.js'
  feedLinks: {
    rss: DOMAIN + '/feed.xml',
  },
  author: {
    name: config.author,
    email: 'blog@' + config.domain,
    link: DOMAIN,
  },
});

posts.forEach((post) => {
  feed.addItem({
    title: post.title,
    id: DOMAIN + '/' + post.slug,
    link: DOMAIN + '/' + post.slug,
    description: post.description ?? post.subtitle,
    content: post.description ?? post.subtitle,
    author: [
      {
        name: config.author,
        email: 'blog@' + config.domain,
        link: DOMAIN,
      },
    ],
    date: new Date(post.date),
    image: {
      url: DOMAIN + '/' + post.slug + '/' + 'opengraph-image',
      type: 'image/png',
    },
  });
});

export const dynamic = 'force-static';
export const runtime = 'nodejs';

export async function GET() {
  return new Response(feed.rss2(), {
    headers: {
      'Content-Type': 'text/xml; charset=utf-8',
    },
  });
}
