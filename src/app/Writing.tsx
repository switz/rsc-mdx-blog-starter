import { Dot } from '@/components/ui/dot';
import { Tag } from '@/components/ui/tag';
import { SimpleTooltip } from '@/components/ui/tooltip';
import getPosts from '@/lib/getPosts';
import { cn } from '@/lib/utils';
import { parseISO } from 'date-fns';
import { format } from 'date-fns/format';
import { Rss } from 'lucide-react';
import Link from 'next/link';

export default async function Writing() {
  const posts = getPosts();

  if (!posts.length) return null;

  return (
    <div>
      <h4 className="mb-2 flex items-center gap-2">
        Writing{' '}
        <a href="/rss" aria-label="RSS">
          <Rss size={16} />
        </a>
      </h4>
      <ul className="space-y-2">
        {posts.map((post) => (
          <li key={post.slug}>
            <div className="flex gap-0.5">
              <div>
                <Link
                  href={'/' + post.slug}
                  className={cn('font-semibold', {
                    ['text-blue-100']: post.is_draft,
                  })}
                >
                  {post.title}
                </Link>

                <div className="flex gap-1 font-mono text-sm text-gray-400">
                  <span title={format(parseISO(post.date), 'yyyy-MM-dd')}>
                    {format(parseISO(post.date), 'MMM yyyy')}
                  </span>
                  <span className="text-gray-300">&middot;</span>
                  <span>{post.subtitle}</span>
                </div>
              </div>
              <div className="ml-auto flex items-center justify-center gap-2">
                <div className="flex gap-1">
                  {post.tags?.includes('universal') ? (
                    <SimpleTooltip content="Universal Article">
                      <Dot intent="success" />
                    </SimpleTooltip>
                  ) : (
                    ''
                  )}
                  {post.tags?.includes('technical') ? (
                    <SimpleTooltip content="Technical Article">
                      <Dot intent="primary" />
                    </SimpleTooltip>
                  ) : (
                    ''
                  )}
                </div>
                {post.is_draft && (
                  <Tag intent="destructive" className="mx-1 my-auto ml-auto h-min" size="sm">
                    DRAFT
                  </Tag>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-6 flex justify-end gap-4 font-mono text-xs">
        <SimpleTooltip content="For a Universal Audience">
          <div className="flex items-center gap-1.5">
            <Dot intent="success" /> Universal Article
          </div>
        </SimpleTooltip>
        <SimpleTooltip content="For a Technical Audience">
          <div className="flex items-center gap-1.5">
            <Dot intent="primary" /> Technical Article
          </div>
        </SimpleTooltip>
      </div>
    </div>
  );
}
