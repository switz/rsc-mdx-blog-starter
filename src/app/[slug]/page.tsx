import 'server-only';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import getPosts, { getPost } from '@/lib/getPosts';
import { format, parseISO } from 'date-fns';
import { notFound } from 'next/navigation';
import FootnotesFooter from '@/components/FootnotesFooter';

export interface PostProps {
  params: Promise<{ slug: string }>;
}

export const revalidate = 3600; // invalidate every hour

export default async function Page(
  props: PostProps & { searchParams?: Promise<Record<string, string>> }
) {
  const params = await props.params;
  const post = getPost(params.slug, 'true');

  if (!post) return notFound();

  const { default: Content } = await import(`../../posts/${post._meta.filePath}`);

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

      {/* <MDXContent code={Content} components={useMDXComponents()} /> */}
    </>
  );
}

export async function generateMetadata(props: PostProps) {
  const params = await props.params;

  const post = getPost(params.slug, 'true');

  if (!post) {
    return {
      robots: {
        index: false,
      },
    };
  }

  return {
    title: post?.title,
    robots: {
      index: !post?.is_draft, // only index if its not a draft
    },
    openGraph: {
      type: 'article',
      publishedTime: parseISO(post.date).toISOString(),
      authors: ['Ernest Hemingway'],
      tags: post.tags,
    },
  };
}

export async function generateStaticParams() {
  return getPosts('true').map((post) => ({
    slug: post.slug,
  }));
}
