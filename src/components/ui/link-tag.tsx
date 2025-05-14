'use client';

import { Link } from 'lucide-react';
import { usePathname } from 'next/navigation';
import * as React from 'react';
import { Tag, TagProps } from './tag';

const LinkTag = React.forwardRef<HTMLDivElement, TagProps & { inline?: boolean }>(
  ({ id, inline, ...props }, ref) => {
    const pathname = usePathname();

    return (
      <a
        className="group/tag relative inline-flex cursor-pointer items-center gap-2 text-white hover:no-underline"
        id={id}
        href={pathname + '#' + id}
      >
        {!inline && <Link size={10} className="absolute -left-4 hidden group-hover/tag:block" />}
        <Tag {...props} ref={ref} />
      </a>
    );
  }
);
LinkTag.displayName = 'LinkTag';

export { LinkTag };
