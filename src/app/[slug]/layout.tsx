import { PropsWithChildren } from 'react';
import Footer from './Footer';
import { PostProps } from './page';

export default function Layout({ children, params }: PostProps & PropsWithChildren) {
  return (
    <>
      {children}
      <Footer params={params} />
    </>
  );
}
