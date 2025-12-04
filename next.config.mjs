/** @type {import('next').NextConfig} */
import { withContentCollections } from '@content-collections/next';
import withMDX from '@next/mdx';

const nextConfig = {
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  output: 'standalone',
  images: {
    unoptimized: true,
  },
};

const mdxConfig = withMDX({
  options: {
    remarkPlugins: ['remark-frontmatter', 'remark-mdx-frontmatter'],
    rehypePlugins: [],
  },
});

export default withContentCollections(mdxConfig(nextConfig));
