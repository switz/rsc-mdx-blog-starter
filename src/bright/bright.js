import { Code } from 'bright';

import { fileIcons } from './fileIcons';
import { SimpleTooltip } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

Code.theme = 'github-dark-dimmed';
Code.lineNumbers = true;

export const extensions = [
  {
    name: 'dontBleed',
    beforeHighlight: (props) => {
      if (props.dontBleed) {
        return {
          ...props,
          className: cn('max-w-full inline-block w-min mx-auto! my-0!', props.className),
        };
      }
      return { ...props, className: cn('quiet-bleed', props.className) };
    },
  },
  {
    name: 'lineNumbers',
    beforeHighlight: (props, annotations) => {
      if (annotations.length > 0) {
        return { ...props, lineNumbers: true };
      }
    },
  },
  {
    name: 'mark',
    InlineAnnotation: ({ children, query }) => (
      <mark style={{ background: query }}>{children}</mark>
    ),
    MultilineAnnotation: ({ children, query }) => (
      <div style={{ background: query }}>{children}</div>
    ),
  },
  {
    name: 'tooltip',
    InlineAnnotation: ({ children, query }) => (
      <SimpleTooltip content={query} className="border-b border-dotted">
        {children}
      </SimpleTooltip>
    ),
  },
  {
    name: 'title',
    beforeHighlight: (props, annotations) => {
      if (annotations.length > 0) {
        return { ...props, title: annotations[0].query };
      }
    },
  },
  fileIcons,
];

Code.extensions = extensions;

export default Code;
