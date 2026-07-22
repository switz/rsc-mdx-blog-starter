import { defineConfig } from '@timber-js/app';
import { cloudflare } from '@timber-js/app/adapters/cloudflare';
import remarkFrontmatter from 'remark-frontmatter';
import remarkMdxFrontmatter from 'remark-mdx-frontmatter';
import remarkGfm from 'remark-gfm';
import rehypeShiki from '@shikijs/rehype';
import { transformerTitle } from './src/lib/shiki-title-transformer.ts';

export default defineConfig({
  output: 'static',
  adapter: cloudflare(),
  // Home page (app/(home)/page.mdx) and post bodies are MDX.
  pageExtensions: ['tsx', 'ts', 'jsx', 'js', 'md', 'mdx'],
  mdx: {
    // remark-frontmatter must precede remark-mdx-frontmatter.
    remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter, remarkGfm],
    // Shiki highlights code at MDX compile time (build, in Node) and emits static
    // HTML — so the Cloudflare Worker never runs a WASM highlighter at request time.
    rehypePlugins: [
      [
        rehypeShiki,
        {
          theme: 'github-dark',
          defaultLanguage: 'text',
          fallbackLanguage: 'text',
          transformers: [transformerTitle()],
        },
      ],
    ],
  },
});
