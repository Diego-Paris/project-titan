import { Card, Avatar, Text, Group, Button, Space } from '@mantine/core';
import { signIn, signOut, useSession } from 'next-auth/react';

import classes from './UserCardImage.module.css';

const stats = [
  { value: '34K', label: 'Followers' },
  { value: '187', label: 'Follows' },
  { value: '1.6K', label: 'Posts' },
];

export function UserCardImage() {
  const { data: session } = useSession();

  const items = stats.map((stat) => (
    <div key={stat.label}>
      <Text ta="center" fz="lg" fw={500}>
        {stat.value}
      </Text>
      <Text ta="center" fz="sm" c="dimmed" lh={1}>
        {stat.label}
      </Text>
    </div>
  ));

  return (
    <Card withBorder padding="xl" radius="md" className={classes.card} w="70%">
      <Card.Section
        h={140}
        style={{
          backgroundImage:
            'url(https://images.unsplash.com/photo-1466611653911-95081537e5b7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=150&crop=faces)',
        }}
      />
      <Avatar
        src={session?.user?.image}
        size={80}
        radius={80}
        mx="auto"
        mt={-30}
        variant="filled"
        className={classes.avatar}
        imageProps={{ referrerPolicy: 'no-referrer' }}
      />
      <Text ta="center" fz="lg" fw={500} mt="sm">
        {session?.user?.name}
      </Text>
      <Text ta="center" fz="sm" c="dimmed">
        {session?.user?.email}
      </Text>
      <Space h="lg" />
    </Card>
  );
}
