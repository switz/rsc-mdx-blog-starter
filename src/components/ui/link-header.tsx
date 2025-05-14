'use client';

import { Link } from 'lucide-react';
import { usePathname } from 'next/navigation';
import * as React from 'react';
import slugify from 'slugify';

const LinkHeader = React.forwardRef<
  HTMLDivElement,
  {
    tag: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
    inline?: boolean;
    children: string;
    slug?: string;
  }
>(({ tag, children, slug, inline, ...props }, ref) => {
  const pathname = usePathname();
  const Tag = tag;

  const id =
    slug ??
    slugify(children, {
      lower: true,
      trim: true,
      // removes non a-z\d\s characters
      remove: /[^A-Za-z\d-\s]/g,
    });

  return (
    <a
      className="group/tag normal relative inline-flex cursor-pointer items-center gap-2 hover:no-underline"
      id={id}
      href={pathname + '#' + id}
    >
      {!inline && <Link size={20} className="absolute -left-8 hidden sm:group-hover/tag:block" />}
      <Tag {...props} ref={ref}>
        {children}
      </Tag>
    </a>
  );
});
LinkHeader.displayName = 'LinkHeader';

export { LinkHeader };
