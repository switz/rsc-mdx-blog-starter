import 'server-only';

import { allPosts } from 'content-collections';
import { sort } from 'fast-sort';

export default function getPosts(showDrafts?: string) {
  let posts = [...allPosts];

  if (!(showDrafts || process.env.NODE_ENV === 'development')) {
    posts = posts.filter((p) => !p.is_draft);
  }

  if (!posts.length) return [];

  return sort(posts).desc([(p) => (p.is_draft ? p.stats.modified : 0), (p) => p.date]);
}

export function getPost(slug: string, showDrafts?: string) {
  const posts = getPosts(showDrafts);

  if (!posts.length) return null;

  return posts.find((p) => p.slug === slug);
}
