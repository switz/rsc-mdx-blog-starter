import 'server-only';

import type { ComponentType } from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import getPosts, { getPost } from '@/lib/getPosts';
import { format, parseISO } from 'date-fns';
import { deny } from '@timber-js/app/server';
import type { Metadata } from '@timber-js/app/server';
import FootnotesFooter from '@/components/FootnotesFooter';
import config from '../config';
import { segmentParams } from './params';

// Post bodies live in src/posts/**/*.mdx. import.meta.glob resolves each one to a
// real ES module at build time (compiled by @mdx-js/rollup) — no runtime eval.
const mdxModules = import.meta.glob<{ default: ComponentType }>('../../posts/**/*.mdx');

export default async function Page() {
  const { slug } = await segmentParams.get();
  const post = getPost(slug, true);

  if (!post) deny(404);

  const key = `../../posts/${post._meta.filePath}`;
  const loader = mdxModules[key];
  if (!loader) deny(404);

  const { default: Content } = await loader();

  return (
    <>
      {post.is_draft && (
        <Alert intent="primary" className="draft-alert">
          <AlertTitle>This is a Draft Post</AlertTitle>
          <AlertDescription>If you found it, please don't share it publicly.</AlertDescription>
        </Alert>
      )}
      <div>
        <h1>{post.title}</h1>
        <h2 className="byline flex flex-col justify-center font-mono text-sm md:flex-row">
          {post.subtitle}
          <span className="mx-1 hidden md:block">&middot;</span>
          <span title={format(parseISO(post.date), 'yyyy-MM-dd')}>
            {post.is_draft ? 'drafted' : 'published'} {format(parseISO(post.date), 'MMMM yyyy')}
          </span>
        </h2>
      </div>
      <Content />
      <FootnotesFooter />
    </>
  );
}

export async function generateStaticSegmentParams() {
  const posts = getPosts(false);

  return posts.map((post) => ({ slug: post.slug }));
}

export async function metadata(): Promise<Metadata> {
  const { slug } = await segmentParams.get();

  const post = getPost(slug, true);

  if (!post) {
    return {
      robots: {
        index: false,
      },
    };
  }

  return {
    title: post.title,
    robots: {
      index: !post.is_draft, // only index if it's not a draft
    },
    openGraph: {
      type: 'article',
      publishedTime: parseISO(post.date).toISOString(),
      authors: [config.author],
    },
  };
}
