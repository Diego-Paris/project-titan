'use client';

import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
  Center,
} from '@mantine/core';
import { ClientSafeProvider, signIn } from 'next-auth/react';
import Image from 'next/image';

import classes from './AuthenticationTitle.module.css';

interface LoginClientProps {
  providers: Record<string, ClientSafeProvider> | null;
}

export function AuthenticationTitle({ providers }: LoginClientProps) {
  return (
    <>
      <Container size={920} my={40}>
        <Title className={classes.title} ta="center" order={2}>
          Interdisciplinary Research Network Extension
        </Title>
      </Container>
      <Container size={420}>
        <Paper withBorder shadow="md" p={30} mt={0} radius="md">
          <Center>
            <Image src="/irene-fab5-logo.png" alt="Example Image" width={200} height={200} />
          </Center>
          {providers &&
            Object.values(providers).map((provider) => (
              <div key={provider.name}>
                {provider.id === 'google' && (
                  <Button
                    fullWidth
                    mt="xl"
                    onClick={() => {
                      signIn(provider.id, { callbackUrl: '/' });
                    }}
                  >
                    <Text>Sign in with your UPR account</Text>
                  </Button>
                )}
              </div>
            ))}
        </Paper>
      </Container>
    </>
  );
}
