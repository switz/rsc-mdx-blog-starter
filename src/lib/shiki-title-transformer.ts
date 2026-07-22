import type { ShikiTransformer } from 'shiki';

// Matches a leading `// title <name>` line (the convention the blog's code blocks use)
// and lifts it into a title bar above the highlighted <pre>.
const TITLE_RE = /^[ \t]*\/\/[ \t]*title[ \t]+(.+?)[ \t]*\r?\n/;

// Tailwind classes (scanned from this file by @tailwindcss/vite at build time).
const FIGURE_CLASS =
  'code-block col-[1/-1] mx-auto my-4 w-[620px] max-w-full overflow-hidden rounded-md ring-1 ring-white/10';
const TITLE_CLASS =
  'flex items-center gap-2 border-b border-white/10 bg-white/[0.04] px-4 py-2 font-mono text-xs text-white/55';
const PRE_RESET = 'my-0! rounded-none! shadow-none! ring-0!';

export function transformerTitle(): ShikiTransformer {
  let title: string | undefined;

  return {
    name: 'blog:code-title',
    // Runs at build time (in Node) — strip the title line out of the code.
    preprocess(code) {
      title = undefined;
      const match = code.match(TITLE_RE);
      if (match) {
        title = match[1];
        return code.slice(match[0].length);
      }
    },
    // Wrap the highlighted <pre> in a card <figure> with a <figcaption> title bar.
    root(root) {
      if (!title) return;

      const pre = root.children[0];
      if (pre && pre.type === 'element') {
        const existing = pre.properties.class;
        pre.properties.class = `${typeof existing === 'string' ? `${existing} ` : ''}${PRE_RESET}`;
      }

      const figure = {
        type: 'element' as const,
        tagName: 'figure',
        properties: { class: FIGURE_CLASS },
        children: [
          {
            type: 'element' as const,
            tagName: 'figcaption',
            properties: { class: TITLE_CLASS },
            children: [{ type: 'text' as const, value: title }],
          },
          pre,
        ],
      };

      root.children = [figure as unknown as (typeof root.children)[number]];
    },
  };
}
