import 'server-only';
import { cache } from 'react';
import Footnote, { Props } from './ClientFootnote';

const map = cache(() => ({ idx: 0 }));

export const footnotes = cache(() => [] as Props[]);

export default function ServerFootnote(props: Omit<Props, 'index'>) {
  const idx = ++map().idx;

  footnotes().push({ ...props, index: idx });

  return <Footnote {...props} index={idx} />;
}
