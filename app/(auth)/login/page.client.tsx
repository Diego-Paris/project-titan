'use client';

import { ClientSafeProvider } from 'next-auth/react';
import { useMantineTheme, Box, Center } from '@mantine/core';
import type { ReactElement } from 'react';

import { AuthenticationTitle } from '@/components/AuthenticationTitle/AuthenticationTitle';

interface LoginClientProps {
  providers: Record<string, ClientSafeProvider> | null;
}

export function LoginClient({ providers }: LoginClientProps): ReactElement {
  const theme = useMantineTheme(); // Access the theme

  return (
    <Box style={{ backgroundColor: theme.colors.indigo[2], minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Center style={{ width: '100%' }}>
        <AuthenticationTitle providers={providers} />
      </Center>
    </Box>
  );
}
