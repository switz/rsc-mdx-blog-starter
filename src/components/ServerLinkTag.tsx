import { cache } from 'react';
import { LinkTag } from './ui/link-tag';
import { TagProps } from './ui/tag';

const map = cache(() => ({}) as Record<string, number>);

export function ServerLinkTag({ id, ...props }: TagProps & { id: string }) {
  const obj = map();
  if (!obj[id]) obj[id] = 0;

  obj[id]++;

  return (
    <LinkTag id={id + obj[id]} {...props}>
      #{id}
      {obj[id]}
    </LinkTag>
  );
}
