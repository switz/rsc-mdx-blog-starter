# RSC Blog Starter

This is a basic blog starter kit extracted out of my blog at https://saewitz.com

You can view this starter kit (hosted on Cloudflare pages) at: https://rsc-mdx-blog.saewitz.com

It is designed to be simple and performant (largely static content), but also flexible. All posts are written in MDX and rendered at build-time (via React Server Components). You could adjust it to render some pages dynamically on the server. And of course, you can embed client components for client-side state/interaction.

It includes powerful Footnotes (sidebar and on mobile touch). Social cards are generated for each post. Posts can be written as drafts and will be hidden from indexing (but visitable). RSS feed is generated for you.

It includes content-collections, tailwind, and a few nice-to-have components. This is intended to be forked and abused, take what you want, throw away what you don't, and add anything.

Posts are written in the posts folder. You can flat-file it or use complex directories. Add `is_draft: true` to mark it as a draft.

If you do end up publishing a fork of this, please drop a link in the Github issues, I'd love to see it!

### TODO

Probably should rip out floating-ui and use an off the shelf radix component. Also doesn't need framer-motion which is 40kb (client) for such a basic use-case.

Globals.css needs a heady cleanup.

Some extra components in ui/ that are probably not necessary.

### License

MIT