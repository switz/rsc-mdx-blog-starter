import 'server-only';

import { allPosts } from 'content-collections';
import { sort } from 'fast-sort';
import { cache } from 'react';

const getPosts = cache(function getPosts(showDrafts?: boolean) {
  let posts = [...allPosts];

  if (!(showDrafts || process.env.NODE_ENV === 'development')) {
    posts = posts.filter((p) => !p.is_draft);
  }

  if (!posts.length) return [];

  return sort(posts).desc([(p) => (p.is_draft ? p.stats.modified : 0), (p) => p.date]);
});

export default getPosts;

export const getPost = cache(function getPost(slug: string, showDrafts?: boolean) {
  const posts = getPosts(showDrafts);

  if (!posts.length) return null;

  return posts.find((p) => p.slug === slug);
});
