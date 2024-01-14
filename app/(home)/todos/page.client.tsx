'use client';

import React, { type ReactElement, useState, useEffect } from 'react';
import { Container, Title, Paper, Space, List, Loader, Center } from '@mantine/core';

import { Todo } from '@prisma/client';
import TodoItem from '@/components/TodoItem/TodoItem';
import NewTodoForm from '@/components/NewTodoForm/NewTodoForm';
import { useGetTodos } from '@/lib/actions/todo';

export function TodoClient(): ReactElement {
  const [sortedTodos, setSortedTodos] = useState<Todo[]>([]);

  const getTodosQuery = useGetTodos();

  useEffect(() => {
    if (getTodosQuery.status === 'success') {
      const sorted = getTodosQuery.data.sort(
        (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
      setSortedTodos(sorted);
    }
  }, [getTodosQuery.status, getTodosQuery.data]);

  return (
    <>
      <Space h="xl" />
      <Container>
        <Title order={1}>Todos</Title>
        <Space h="md" />
        <NewTodoForm />
        <Title order={2}>Previous todos:</Title>
        <Space h="sm" />
        <Paper withBorder p="md" shadow="sm">
          {getTodosQuery.status === 'success' ? (
            <List>
              {sortedTodos.map((todo) => (
                <TodoItem key={todo.id} todo={todo} />
              ))}
            </List>
          ) : (
            <Center>
              <Loader />
            </Center>
          )}
        </Paper>
      </Container>
    </>
  );
}
