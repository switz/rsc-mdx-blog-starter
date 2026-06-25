import { PropsWithChildren } from 'react';
import Footer from './Footer';

export default function Layout({ children }: PropsWithChildren) {
  return (
    <>
      {children}
      <Footer />
    </>
  );
}
