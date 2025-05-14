import React from 'react';
import config from '../config';

export const metadata = {
  title: {
    absolute: `${config.author}`,
  },
  description: 'A personal blog of fun',
  metadataBase: new URL('https://' + config.domain),
};

export const dynamic = 'force-static';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
