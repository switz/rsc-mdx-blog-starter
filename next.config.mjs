/** @type {import('next').NextConfig} */
import { withContentCollections } from '@content-collections/next';
import withMDX from '@next/mdx';
import remarkFrontmatter from 'remark-frontmatter';
import remarkMdxFrontmatter from 'remark-mdx-frontmatter';

// Define MDX plugin options
const mdxPluginOptions = {
  options: {
    remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter],
    rehypePlugins: [],
  },
};

// Define the core Next.js configuration object
const nextConfig = {
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  output: 'export', // Uncomment if static export is needed
  // turbopack: {}, // Turbopack specific options can be added here if necessary
  experimental: {
    mdxRs: false,
  },

  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  images: {
    // domains: ['pbs.twimg.com', 'abs.twimg.com'], // Example domains
    unoptimized: true, // Useful for static exports or when image optimization is handled elsewhere
  },
};

// Compose the configurations by wrapping them with the HOCs (Higher Order Components/Functions)
// The order of wrapping can be important. Bundle analyzer is often one of the outermost wrappers.
export default withContentCollections(withMDX(mdxPluginOptions)(nextConfig));
