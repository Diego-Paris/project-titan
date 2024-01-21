import React from 'react';
import { HeaderMegaMenu } from '@/components/HeaderMegaMenu/HeaderMegaMenu';

export default function HomeLayout({ children }: { children: any }) {
  return (
    <>
      <HeaderMegaMenu />
      {children}
    </>
  );
}
