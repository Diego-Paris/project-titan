'use client';

import React from 'react';
import {
  Checkbox,
  Text,
  Group,
  Paper,
  Box,
  useMantineTheme,
  ActionIcon,
  Modal,
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useDisclosure } from '@mantine/hooks';
import { IconCheck, IconX, IconTrash, IconEdit } from '@tabler/icons-react';
import { Todo } from '@prisma/client';
import { useUpdateTodo, useRemoveTodo } from '@/lib/actions/todo';
import EditTodoForm from '@/components/EditTodoForm/EditTodoForm';

const TodoItem = ({ todo }: { todo: Todo }) => {
  const theme = useMantineTheme();
  const [opened, { open, close }] = useDisclosure(false);

  const updateTodoMutation = useUpdateTodo(
    // onSuccess callback
    () => {
      notifications.show({
        color: 'teal',
        title: 'Todo Updated',
        message: 'Todo has been updated successfully.',
        icon: <IconCheck size={theme.fontSizes.md} />,
        autoClose: 2000,
      });
    },
    // onError callback
    () => {
      notifications.show({
        color: 'red',
        title: 'Failed to Update Todo',
        message: 'An error occurred. Please try again.',
        icon: <IconX size={theme.fontSizes.md} />,
        autoClose: 2000,
      });
    }
  );

  const removeTodoMutation = useRemoveTodo(
    // onSuccess callback
    () => {
      notifications.show({
        color: 'teal',
        title: 'Todo Deleted',
        message: 'Todo has been successfully deleted.',
        icon: <IconCheck size={theme.fontSizes.md} />,
        autoClose: 2000,
      });
    },
    // onError callback
    () => {
      notifications.show({
        color: 'red',
        title: 'Error',
        message: 'Failed to delete todo. Please try again.',
        icon: <IconX size={theme.fontSizes.md} />,
        autoClose: 2000,
      });
    }
  );

  const handleCheckboxChange = async (checked: boolean) => {
    updateTodoMutation.mutate({ id: todo.id, isCompleted: checked });
  };

  const handleDelete = () => {
    removeTodoMutation.mutate(todo.id);
  };

  return (
    <Paper withBorder shadow="xs" p="sm" radius="md" my="xs">
      <Group wrap="nowrap">
        <Checkbox
          id={todo.id}
          checked={todo.isCompleted}
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
              textDecoration: todo.isCompleted ? 'line-through' : 'none',
              color: todo.isCompleted ? '#718096' : 'inherit',
            }}
          >
            {todo.title}
          </Text>
        </Box>
        <Text size="sm" c="dimmed">
          {new Date(todo.updatedAt).toUTCString()}
        </Text>
        <ActionIcon onClick={open} variant="transparent" size="lg" color="gray">
          <IconEdit />
        </ActionIcon>
        <ActionIcon onClick={handleDelete} variant="transparent" size="lg" color="red">
          <IconTrash />
        </ActionIcon>
        <Modal opened={opened} onClose={close} title="Edit Todo" centered>
          {/* Modal content */}
          <EditTodoForm todo={todo} updateTodoMutation={updateTodoMutation} close={close} />
        </Modal>
      </Group>
    </Paper>
  );
};

export default TodoItem;
