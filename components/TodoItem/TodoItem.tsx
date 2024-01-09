'use client';

import React, { useState } from 'react';
import { Checkbox, Text, Group, Paper, Box, Alert } from '@mantine/core';
import { Todo } from '@prisma/client';
import { updateTodoAction } from '@/app/_actions';

type TodoItemProps = {
  todo: Todo;
};

const TodoItem = ({ todo }: TodoItemProps) => {
  const [isCompleted, setIsCompleted] = useState(todo.isCompleted);
  const [error, setError] = useState('');

  const handleCheckboxChange = async (checked: boolean) => {
    // Optimistically update the UI
    setIsCompleted(checked);

    try {
      // Send the update to the server
      await updateTodoAction(todo.id, checked);
    } catch (err) {
      // On error, revert the UI change and show an error message
      setIsCompleted(!checked);
      setError('Failed to update todo. Please try again.');
    }
  };

  return (
    <Paper withBorder shadow="xs" p="sm" radius="md" my="xs">
      {error && <Alert color="red">{error}</Alert>}
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
        <Text size="sm" color="dimmed">
          {todo.updatedAt.toUTCString()}
        </Text>
      </Group>
    </Paper>
  );
};

export default TodoItem;
