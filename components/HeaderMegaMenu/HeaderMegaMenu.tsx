'use client';

import {
  HoverCard,
  Group,
  Button,
  UnstyledButton,
  Text,
  SimpleGrid,
  ThemeIcon,
  Anchor,
  Divider,
  Center,
  Box,
  Burger,
  Drawer,
  Collapse,
  ScrollArea,
  rem,
  useMantineTheme,
} from '@mantine/core';
import { MantineLogo } from '@mantinex/mantine-logo';
import { useDisclosure } from '@mantine/hooks';
import {
  IconNotification,
  IconCode,
  IconBook,
  IconChartPie3,
  IconFingerprint,
  IconCoin,
  IconChevronDown,
  IconChartDots3,
} from '@tabler/icons-react';
import Link from 'next/link';
import { signIn, signOut, useSession } from 'next-auth/react';

import classes from './HeaderMegaMenu.module.css';
import { UserMenu } from '@/components/UserMenu/UserMenu';

const mockdata = [
  {
    icon: IconCode,
    title: 'Open source',
    description: 'This Pokémon’s cry is very loud and distracting',
  },
  {
    icon: IconCoin,
    title: 'Free for everyone',
    description: 'The fluid of Smeargle’s tail secretions changes',
  },
  {
    icon: IconBook,
    title: 'Documentation',
    description: 'Yanma is capable of seeing 360 degrees without',
  },
  {
    icon: IconFingerprint,
    title: 'Security',
    description: 'The shell’s rounded shape and the grooves on its.',
  },
  {
    icon: IconChartPie3,
    title: 'Analytics',
    description: 'This Pokémon uses its flying ability to quickly chase',
  },
  {
    icon: IconNotification,
    title: 'Notifications',
    description: 'Combusken battles with the intensely hot flames it spews',
  },
];

export function HeaderMegaMenu() {
  const { data: session } = useSession();

  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
  const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
  const theme = useMantineTheme();

  const links = mockdata.map((item) => (
    <UnstyledButton className={classes.subLink} key={item.title}>
      <Group wrap="nowrap" align="flex-start">
        <ThemeIcon size={34} variant="default" radius="md">
          <item.icon style={{ width: rem(22), height: rem(22) }} color={theme.colors.blue[6]} />
        </ThemeIcon>
        <div>
          <Text size="sm" fw={500}>
            {item.title}
          </Text>
          <Text size="xs" c="dimmed">
            {item.description}
          </Text>
        </div>
      </Group>
    </UnstyledButton>
  ));

  return (
    <Box pb={12}>
      <header className={classes.header}>
        <Group justify="space-between" h="100%">
          <Anchor href="/" component={Link} className={classes.linklogo}>
            <Group h="100%" gap={10}>
              <IconChartDots3 size={30} color={theme.colors.orange[5]} stroke={2.5} />
              <Text size="xl" fw={650}>
                IReNE
              </Text>
            </Group>
          </Anchor>
          <Group h="100%" gap={0} visibleFrom="sm">
            <Anchor href="/" component={Link} className={classes.link}>
              Home
            </Anchor>
            <Anchor href="/browse" component={Link} className={classes.link}>
              Browse
            </Anchor>
            <Anchor href="/timeline" component={Link} className={classes.link}>
              Timeline
            </Anchor>
            <Anchor href="/plots" component={Link} className={classes.link}>
              Plots
            </Anchor>
            <Anchor href="/map" component={Link} className={classes.link}>
              Map
            </Anchor>
          </Group>

          <Group visibleFrom="sm">
            {!session && <Button onClick={() => signIn()}>Sign in</Button>}
            {session && (
              <Group>
                <UserMenu />
              </Group>
            )}
          </Group>

          <Burger opened={drawerOpened} onClick={toggleDrawer} hiddenFrom="sm" />
        </Group>
      </header>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title="Navigation"
        hiddenFrom="sm"
        zIndex={1000000}
      >
        <ScrollArea h={`calc(100vh - ${rem(80)})`} mx="-md">
          <Divider my="sm" />

          <a href="#" className={classes.link}>
            Home
          </a>
          <UnstyledButton className={classes.link} onClick={toggleLinks}>
            <Center inline>
              <Box component="span" mr={5}>
                Features
              </Box>
              <IconChevronDown
                style={{ width: rem(16), height: rem(16) }}
                color={theme.colors.blue[6]}
              />
            </Center>
          </UnstyledButton>
          <Collapse in={linksOpened}>{links}</Collapse>
          <a href="#" className={classes.link}>
            Learn
          </a>
          <a href="#" className={classes.link}>
            Academy
          </a>

          <Divider my="sm" />

          <Group justify="center" grow pb="xl" px="md">
            <Button onClick={() => signIn()}>Sign in</Button>
          </Group>
        </ScrollArea>
      </Drawer>
    </Box>
  );
}
