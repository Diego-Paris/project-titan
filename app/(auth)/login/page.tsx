import type { ReactElement } from 'react';
import { getProviders } from 'next-auth/react';

import { LoginClient } from './page.client';

export default async function LoginPage() {
  const providers = await getProviders();
  return <LoginClient providers={providers} />;
}
