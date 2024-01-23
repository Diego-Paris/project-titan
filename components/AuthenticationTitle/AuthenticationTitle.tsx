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
} from '@mantine/core';
import { ClientSafeProvider, signIn } from 'next-auth/react';

import classes from './AuthenticationTitle.module.css';

interface LoginClientProps {
  providers: Record<string, ClientSafeProvider> | null;
}

export function AuthenticationTitle({ providers }: LoginClientProps) {
  return (
    <Container size={420} my={40}>
      <Title ta="center" className={classes.title}>
        Welcome back!
      </Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        Do not have an account yet?{' '}
        <Anchor size="sm" component="button">
          Create account
        </Anchor>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <TextInput label="Email" placeholder="you@mantine.dev" required />
        <PasswordInput label="Password" placeholder="Your password" required mt="md" />
        <Group justify="space-between" mt="lg">
          <Checkbox label="Remember me" />
          <Anchor component="button" size="sm">
            Forgot password?
          </Anchor>
        </Group>
        <Button fullWidth mt="xl">
          Sign in
        </Button>
        {providers &&
          Object.values(providers).map((provider) => (
            <div key={provider.name}>
              {/* <button onClick={() => signIn(provider.id)}>
                    Sign in with {provider.name}
                  </button> */}
              {provider.id === 'google' && (
                <Button
                  w="full"
                  variant="outline"
                  color="gray"
                  onClick={() => {
                    signIn(provider.id, { callbackUrl: '/' });
                  }}
                >
                  <Text>Sign in with Google</Text>
                </Button>
              )}
            </div>
          ))}
      </Paper>
    </Container>
  );
}
