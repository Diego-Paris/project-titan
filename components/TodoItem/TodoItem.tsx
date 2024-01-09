'use client';

import { useTransition } from 'react';
import { Checkbox, Text, Group, Paper, Box } from '@mantine/core';
import { Todo } from '@prisma/client';
import { updateTodoAction } from '@/app/_actions';

type TodoItemProps = {
  todo: Todo;
};

const TodoItem = ({ todo }: TodoItemProps) => {
  const [isPending, startTransition] = useTransition();

  return (
    <Paper withBorder shadow="xs" p="sm" radius="md" my="xs">
      <Group wrap="nowrap">
        <Checkbox
          id={todo.id}
          checked={todo.isCompleted}
          onChange={(e) => startTransition(() => updateTodoAction(todo.id, e.target.checked))}
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
              color: todo.isCompleted ? '#718096' : 'inherit', // slate-500
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
