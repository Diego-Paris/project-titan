import type { ReactElement } from 'react';
import { getProviders } from 'next-auth/react';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

import { LoginClient } from './page.client';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export default async function LoginPage() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect('/');
  }

  const providers = await getProviders();
  return <LoginClient providers={providers} />;
}
