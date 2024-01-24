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
      <Container size={720}>
        <Paper withBorder shadow="md" p={30} mt={0} radius="md">
          <Title className={classes.title} ta="center" order={2}>
            Interdisciplinary Research Network Extension
          </Title>
          <Center>
            <Image src="/irene-fab5-logo.png" alt="Example Image" width={200} height={200} />
          </Center>
          {providers &&
            Object.values(providers).map((provider) => (
              <div key={provider.name}>
                {provider.id === 'google' && (
                  <Center>
                    <Button
                      w="70%"
                      mt="xl"
                      color="#3B7C84"
                      onClick={() => {
                        signIn(provider.id, { callbackUrl: '/' });
                      }}
                    >
                      <Text>Sign in with your UPR account</Text>
                    </Button>
                  </Center>
                )}
              </div>
            ))}
        </Paper>
      </Container>
    </>
  );
}
