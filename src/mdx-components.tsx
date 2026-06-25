import { PropsWithChildren } from 'react';
import type { MDXComponents } from 'mdx/types';

import clsx from 'clsx';
import Footnote from './components/Footnote';
import { ServerLinkTag } from './components/ServerLinkTag';
import { Button } from './components/ui/button';
import { LinkHeader } from './components/ui/link-header';
import { cn } from './lib/utils';

export type PropsWithCN = PropsWithChildren & { className?: string };

// This file customizes how MDX elements/components render across all MDX files.
// Fenced code blocks are highlighted at build time by rehype-shiki (see timber.config.ts),
// so there is no `pre`/`Code` override here.
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Allows customizing built-in components, e.g. to add styling.
    // h1: ({ children }) => <h1 style={{ fontSize: "100px" }}>{children}</h1>,
    ...components,
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
