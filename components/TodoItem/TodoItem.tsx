'use client';

import React, { useState } from 'react';
import { Checkbox, Text, Group, Paper, Box, useMantineTheme, ActionIcon } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconCheck, IconX, IconTrash } from '@tabler/icons-react';
import { Todo } from '@prisma/client';
import { updateTodoAction, deleteTodoAction } from '@/app/_actions'; // Import your API actions

type TodoItemProps = {
  todo: Todo;
  //onDelete: () => void; // Callback for updating the parent component
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

  const handleDelete = async () => {
    const notificationId = `todo-delete-${todo.id}`;

    // Show deleting notification
    notifications.show({
      id: notificationId,
      loading: true,
      title: 'Deleting Todo',
      message: 'Please wait...',
      autoClose: false,
      withCloseButton: false,
    });

    try {
      // Function to call API for deletion
      await deleteTodoAction(todo.id);
      notifications.update({
        id: notificationId,
        color: 'teal',
        title: 'Todo Deleted',
        message: 'Todo has been successfully deleted.',
        icon: <IconCheck size={theme.fontSizes.md} />,
        loading: false,
        autoClose: 2000,
      });
    } catch (err) {
      // Update with error message
      notifications.update({
        id: notificationId,
        color: 'red',
        title: 'Error',
        message: 'Failed to delete todo. Please try again.',
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
        <ActionIcon
          onClick={handleDelete}
          variant="transparent"
          size="lg" // Adjust the size as needed
          color="red" // This sets the icon color
        >
          <IconTrash size={theme.fontSizes.sm} />
        </ActionIcon>
      </Group>
    </Paper>
  );
};

export default TodoItem;
