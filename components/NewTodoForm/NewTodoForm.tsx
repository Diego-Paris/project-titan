'use client';

import { useRef } from 'react';
import { Button, TextInput, Group, Title, Box, useMantineTheme } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconCheck, IconX } from '@tabler/icons-react';
import { createTodoAction } from '@/app/_actions';

const NewTodoForm = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const theme = useMantineTheme();

  async function action(data: FormData) {
    const title = data.get('title');
    if (typeof title !== 'string' || !title) return;

    // Show loading notification
    const notificationId = 'todo-create';
    notifications.show({
      id: notificationId,
      loading: true,
      title: 'Creating Todo',
      message: 'Please wait...',
      autoClose: false,
      withCloseButton: false,
    });

    try {
      await createTodoAction(title);
      formRef.current?.reset();

      // Show success notification
      notifications.update({
        id: notificationId,
        color: 'teal',
        title: 'Todo Created',
        message: 'The new todo has been added successfully.',
        icon: <IconCheck size={theme.fontSizes.md} />,
        loading: false,
        autoClose: 2000,
      });
    } catch (err) {
      // Show error notification
      notifications.update({
        id: notificationId,
        color: 'red',
        title: 'Failed to Create Todo',
        message: 'An error occurred. Please try again.',
        icon: <IconX size={theme.fontSizes.md} />,
        loading: false,
        autoClose: 2000,
      });
    }
  }

  return (
    <Box component="form" ref={formRef} onSubmit={(e) => e.preventDefault()}>
      <Title order={3} mb="xs">
        Create a New Todo
      </Title>
      <Group>
        <TextInput name="title" placeholder="Todo title" required />
        <Button type="submit" onClick={() => formRef.current && action(new FormData(formRef.current))}>
          Add Todo
        </Button>
      </Group>
    </Box>
  );
};

export default NewTodoForm;
