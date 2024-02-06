import React from 'react';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { HeaderMegaMenu } from '@/components/HeaderMegaMenu/HeaderMegaMenu';
import { authOptions } from '../api/auth/[...nextauth]/route';

export default async function HomeLayout({ children }: { children: any }) {
  return (
    <>
      <HeaderMegaMenu />
      {children}
    </>
  );
}
