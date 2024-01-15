'use client';

import { Button, TextInput, Group, Title, Box, useMantineTheme } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useForm } from '@mantine/form';
import { zodResolver } from 'mantine-form-zod-resolver';
import { IconCheck, IconX } from '@tabler/icons-react';
import type { Prisma } from '@prisma/client';

import { TodoCreateInputSchema } from '@prisma/zod';
import { useCreateTodo } from '@/lib/actions/todo';

const NewTodoForm = () => {
  const theme = useMantineTheme();

  const form = useForm({
    initialValues: {
      title: '',
    },
    validate: zodResolver(TodoCreateInputSchema),
  });

  const createTodoMutation = useCreateTodo(
    // onSuccess callback
    () => {
      form.reset();
      notifications.update({
        id: 'todo-create',
        color: 'teal',
        title: 'Todo Created',
        message: 'The new todo has been added successfully.',
        icon: <IconCheck size={theme.fontSizes.md} />,
        loading: false,
        autoClose: 2000,
      });
    },
    // onError callback
    () => {
      notifications.update({
        id: 'todo-create',
        color: 'red',
        title: 'Failed to Create Todo',
        message: 'An error occurred. Please try again.',
        icon: <IconX size={theme.fontSizes.md} />,
        loading: false,
        autoClose: 2000,
      });
    }
  );

  const handleSubmit = async (values: Prisma.TodoCreateInput) => {
    // Show loading notification
    notifications.show({
      id: 'todo-create',
      loading: true,
      title: 'Creating Todo',
      message: 'Please wait...',
      autoClose: false,
      withCloseButton: false,
    });

    createTodoMutation.mutate(values.title);
  };

  return (
    <Box component="form" onSubmit={form.onSubmit(handleSubmit)}>
      <Title order={3} mb="xs">
        Create a New Todo
      </Title>
      <Group>
        <TextInput placeholder="Todo title" {...form.getInputProps('title')} />
        <Button type="submit">Add Todo</Button>
      </Group>
    </Box>
  );
};

export default NewTodoForm;
