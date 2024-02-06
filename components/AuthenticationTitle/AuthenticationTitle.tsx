'use client';

import {
  useMantineTheme,
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
  Space,
} from '@mantine/core';
import { ClientSafeProvider, signIn } from 'next-auth/react';
import Image from 'next/image';
import { IconPigMoney } from '@tabler/icons-react';
import classes from './AuthenticationTitle.module.css';

interface LoginClientProps {
  providers: Record<string, ClientSafeProvider> | null;
}

export function AuthenticationTitle({ providers }: LoginClientProps) {
  const theme = useMantineTheme(); // Access the theme

  return (
    <>
      <Container size={720}>
        <Paper withBorder shadow="md" p={30} mt={0} radius="md">
          <Title className={classes.title} ta="center" order={2}>
            Finovatek Solutions Dashboard
          </Title>
          <Space h="md" />
          <Center>
            {/* Replace Image with IconPiggyBank */}
            <IconPigMoney size={200} stroke={1.5} color={theme.colors.lime[6]} />
          </Center>
          {providers &&
            Object.values(providers).map((provider) => (
              <div key={provider.name}>
                {provider.id === 'google' && (
                  <Center>
                    <Button
                      w="70%"
                      mt="xl"
                      color={theme.colors.teal[6]}
                      onClick={() => {
                        signIn(provider.id, { callbackUrl: '/' });
                      }}
                    >
                      Sign in with your Google Account
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
