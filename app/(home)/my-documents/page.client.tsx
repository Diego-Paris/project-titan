'use client';

import { Box, Tabs, Center, Container, Space, Title, Text } from '@mantine/core';
import type { ReactElement } from 'react';
import { PersonalDocuments } from '@/components/PersonalDocuments/PersonalDocuments';
import { SharedDocuments } from '@/components/SharedDocuments/SharedDocuments';

export function MyDocumentsClient(): ReactElement {
  return (
    <>
      <Space h="lg" />
      <Container>
        <Title order={1}>My Documents</Title>
        <Space h="sm" />
        <Box mt={0}>
          <Tabs defaultValue="first">
            <Tabs.List style={{ width: '100%' }}>
              <Tabs.Tab value="first" style={{ fontSize: '1.25rem' }}>
                Personal Documents
              </Tabs.Tab>
              <Tabs.Tab value="second" style={{ fontSize: '1.25rem' }}>
                Shared Documents
              </Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="first">
              <PersonalDocuments />
            </Tabs.Panel>

            <Tabs.Panel value="second">
              <SharedDocuments />
            </Tabs.Panel>
          </Tabs>
        </Box>
      </Container>
    </>
  );
}
