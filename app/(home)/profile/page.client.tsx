'use client';

import type { ReactElement } from 'react';
import { Box, Center, Container, Space, Title } from '@mantine/core';
import { UserCardImage } from '@/components/UserCardImage/UserCardImage';

export function ProfileClient(): ReactElement {
  return (
    <>
      <Space h="lg" />
      <Container>
        <Title order={1}>Profile</Title>
        <Space h="md" />
        <Box
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          mt={20}
        >
          <Center style={{ width: '100%' }}>
            <UserCardImage />
          </Center>
        </Box>
      </Container>
    </>
  );
}
