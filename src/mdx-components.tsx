import React, { PropsWithChildren } from 'react';

import clsx from 'clsx';
import Code from './bright/bright';
import Footnote from './components/Footnote';
import { ServerLinkTag } from './components/ServerLinkTag';
import { Button } from './components/ui/button';
import { LinkHeader } from './components/ui/link-header';
import { cn } from './lib/utils';

export type PropsWithCN = PropsWithChildren & { className?: string };

export { Code };

// This file is required to use MDX in `app` directory.
export function useMDXComponents(components: React.ReactNode[]) {
  return {
    // Allows customizing built-in components, e.g. to add styling.
    // h1: ({ children }) => <h1 style={{ fontSize: "100px" }}>{children}</h1>,
    ...components,
    pre: Code,
    Code,
    Footnote,
    ServerLinkTag,
    Button,
    Center: ({ className, ...props }: PropsWithCN) => (
      <div className={clsx('mx-auto text-center', className)} {...props} />
    ),
    Bleed: (props: PropsWithCN) => <div {...props} className={cn('bleed', props.className)} />,
    FullBleed: (props: PropsWithCN) => <div className="full-bleed" {...props} />,
    Byline: (props: PropsWithCN) => <div className="byline" {...props} />,
    Hide: () => null,
    LinkHeader,
  };
}
