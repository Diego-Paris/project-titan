'use client';

import React, { useState } from 'react';
import { Checkbox, Text, Group, Paper, Box, useMantineTheme } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconCheck, IconX } from '@tabler/icons-react';
import { Todo } from '@prisma/client';
import { updateTodoAction } from '@/app/_actions';

type TodoItemProps = {
  todo: Todo;
};

const TodoItem = ({ todo }: TodoItemProps) => {
  const [isCompleted, setIsCompleted] = useState(todo.isCompleted);
  const theme = useMantineTheme();

  const handleCheckboxChange = async (checked: boolean) => {
    // Optimistically update the UI
    setIsCompleted(checked);

    const notificationId = `todo-update-${todo.id}`;

    // Show loading notification
    notifications.show({
      id: notificationId,
      loading: true,
      title: 'Updating Todo',
      message: 'Please wait...',
      autoClose: false,
      withCloseButton: false,
    });

    try {
      // Send the update to the server
      await updateTodoAction(todo.id, checked);
      notifications.update({
        id: notificationId,
        color: 'teal',
        title: 'Todo Updated',
        message: 'Todo has been updated successfully.',
        icon: <IconCheck size={theme.fontSizes.md} />,
        loading: false,
        autoClose: 2000,
      });
    } catch (err) {
      // On error, revert the UI change and show an error message
      setIsCompleted(!checked);
      notifications.update({
        id: notificationId,
        color: 'red',
        title: 'Failed to Update Todo',
        message: 'An error occurred. Please try again.',
        icon: <IconX size={theme.fontSizes.md} />,
        loading: false,
        autoClose: 2000,
      });
    }
  };

  return (
    <Paper withBorder shadow="xs" p="sm" radius="md" my="xs">
      <Group wrap="nowrap">
        <Checkbox
          id={todo.id}
          checked={isCompleted}
          onChange={(e) => handleCheckboxChange(e.target.checked)}
          size="md"
        />
        <Box flex={1}>
          <Text
            component="label"
            htmlFor={todo.id}
            size="md"
            lineClamp={1}
            style={{
              textDecoration: isCompleted ? 'line-through' : 'none',
              color: isCompleted ? '#718096' : 'inherit',
            }}
          >
            {todo.title}
          </Text>
        </Box>
        <Text size="sm" c="dimmed">
          {todo.updatedAt.toUTCString()}
        </Text>
      </Group>
    </Paper>
  );
};

export default TodoItem;
