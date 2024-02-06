import cx from 'clsx';
import { useState } from 'react';
import { Avatar, UnstyledButton, Group, Text, Menu, rem, useMantineTheme } from '@mantine/core';
import {
  IconLogout,
  IconHeart,
  IconStar,
  IconFiles,
  IconUser,
  IconPlayerPause,
  IconTrash,
  IconSwitchHorizontal,
  IconChevronDown,
} from '@tabler/icons-react';
import Link from 'next/link';
import { signIn, signOut, useSession } from 'next-auth/react';

import classes from './UserMenu.module.css';

export function UserMenu() {
  const { data: session } = useSession();
  const theme = useMantineTheme();
  const [userMenuOpened, setUserMenuOpened] = useState(false);

  return (
    <Menu
      width={260}
      position="bottom-end"
      transitionProps={{ transition: 'pop-top-right' }}
      onClose={() => setUserMenuOpened(false)}
      onOpen={() => setUserMenuOpened(true)}
      withinPortal
    >
      <Menu.Target>
        <UnstyledButton className={cx(classes.user, { [classes.userActive]: userMenuOpened })}>
          <Group gap={7}>
            <Avatar
              src={session?.user?.image}
              alt={session?.user?.name || ''}
              radius="xl"
              size={20}
              imageProps={{ referrerPolicy: 'no-referrer' }}
            />
            <Text fw={500} size="sm" lh={1} mr={3}>
              {session?.user?.name}
            </Text>
            <IconChevronDown style={{ width: rem(12), height: rem(12) }} stroke={1.5} />
          </Group>
        </UnstyledButton>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Label>General</Menu.Label>
        <Menu.Item
          leftSection={
            <IconFiles
              style={{ width: rem(16), height: rem(16) }}
              color={theme.colors.blue[6]}
              stroke={1.5}
            />
          }
          component={Link}
          href="/my-documents"
        >
          My Documents
        </Menu.Item>
        <Menu.Divider />
        <Menu.Label>Settings</Menu.Label>
        <Menu.Item
          leftSection={<IconUser style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}
          component={Link}
          href="/profile"
        >
          Profile
        </Menu.Item>

        <Menu.Item
          onClick={() => signOut()}
          leftSection={<IconLogout style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}
        >
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
