'use client';

import { ClientSafeProvider } from 'next-auth/react';
import { Box } from '@mantine/core';
import type { ReactElement } from 'react';

import { AuthenticationTitle } from '@/components/AuthenticationTitle/AuthenticationTitle';

interface LoginClientProps {
  providers: Record<string, ClientSafeProvider> | null;
}

export function LoginClient({ providers }: LoginClientProps): ReactElement {
  return (
    <Box style={{ backgroundColor: '#445963', minHeight: '100vh' }}>
      <AuthenticationTitle providers={providers} />
    </Box>
  );
}
