import { defineCollection, defineConfig } from '@content-collections/core';
import fs from 'fs';
import path from 'path';
import slugify from 'slugify';
import z from 'zod/v4';

const posts = defineCollection({
  name: 'posts',
  directory: 'src/posts',
  include: '**/*.mdx',
  schema: z.object({
    title: z.string(),
    subtitle: z.string(),
    date: z.string(),
    description: z.string().optional(),
    slug: z.string().optional(),
    is_draft: z.boolean().optional(),
    tags: z.array(z.string()).optional(),
  }),
  transform: async (doc) => {
    // const mdx = await compileMDX(ctx, doc);
    const stats = await fs.statSync(path.join('src', 'posts', doc._meta.filePath));

    return {
      ...doc,
      stats: {
        modified: stats.mtime,
        created: stats.ctime,
      },
      slug:
        doc.slug ??
        slugify(doc.title, {
          lower: true,
          remove: /'|"/g,
        }),
      // mdx,
    };
  },
});

export default defineConfig({
  collections: [posts],
});
