import React from 'react';

import { Header } from '../components/Header';
import Providers from './Providers';

import '../styles/globals.css';
import { goo } from './fonts';
import config from './config';

export const metadata = {
  title: {
    template: `%s | ${config.author}`,
    default: `${config.author}`, // a default is required when creating a template
  },
  metadataBase: new URL('https://' + config.domain),
};

// export const runtime = 'edge'; // 'nodejs' (default) | 'edge'
export const revalidate = 3600; // invalidate every hour

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="dark">
      <head>
        <link rel="alternate" type="application/rss+xml" title="RSS Feed" href="/feed.xml" />
        <meta name="template" content="switz/rsc-mdx-blog-starter" />
      </head>
      <body className={goo.className}>
        <main className="content mx-5 flex flex-col gap-y-6 md:mx-0 md:grid md:grid-cols-[1fr_min(58ch,100vw)_1fr]">
          <Providers>
            <Header />

            {children}
          </Providers>
        </main>
      </body>
    </html>
  );
}
