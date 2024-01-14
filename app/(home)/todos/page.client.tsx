'use client';

import React, { type ReactElement, useState, useEffect } from 'react';
import { Container, Title, Paper, Space, List, Loader } from '@mantine/core';

import { Todo } from '@prisma/client';
import { Welcome } from '@/components/Welcome/Welcome';
import { ColorSchemeToggle } from '@/components/ColorSchemeToggle/ColorSchemeToggle';
import TodoItem from '@/components/TodoItem/TodoItem';
import NewTodoForm from '@/components/NewTodoForm/NewTodoForm';
import { useGetTodos } from '@/lib/actions/todo';

export function TodoClient(): ReactElement {
  const getTodosQuery = useGetTodos();

  return (
    <>
      <Welcome />
      <ColorSchemeToggle />
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
              {getTodosQuery.data.map((todo) => (
                <TodoItem key={todo.id} todo={todo} />
              ))}
            </List>
          ) : (
            <Loader />
          )}
        </Paper>
      </Container>
    </>
  );
}
