# RSC Blog Starter

This is a basic blog starter kit extracted out of my blog at https://saewitz.com

You can view this starter kit (hosted on Cloudflare workers) at: https://rsc-mdx-blog.saewitz.com

It is designed to be simple and performant, but also flexible. All posts are written in MDX and rendered via React Server Components. It runs on [timber.js](https://timberjs.com) (a Vite-native RSC framework) and deploys to Cloudflare Workers. And of course, you can embed client components for client-side state/interaction.

It includes powerful Footnotes (sidebar and on mobile touch). Social cards are generated for each post. Posts can be written as drafts and will be hidden from indexing (but visitable). RSS feed is generated for you.

It includes content-collections, tailwind, and a few nice-to-have components. This is intended to be forked and abused, take what you want, throw away what you don't, and add anything.

Posts are written in the posts folder. You can flat-file it or use complex directories. Add `is_draft: true` to mark it as a draft.

### Commands

```bash
pnpm dev        # Start the dev server (http://localhost:3000)
pnpm build      # Production build (Cloudflare Workers, output: 'server')
pnpm preview    # Preview the production build locally
pnpm deploy     # Build and deploy to Cloudflare Workers (wrangler deploy)
```

Output mode and adapter are configured in `timber.config.ts`. To target Node.js, Vercel,
Netlify, etc. instead of Cloudflare, swap the adapter (see the timber.js deploying docs).

If you do end up publishing a fork of this, please drop a link in the Github issues, I'd love to see it!

### TODO

Probably should rip out floating-ui and use an off the shelf radix component. Also doesn't need framer-motion which is 40kb (client) for such a basic use-case.

Globals.css needs a heady cleanup.

Some extra components in ui/ that are probably not necessary.

### License

MIT

.
