'use client';

import React, { useState, useEffect } from 'react';
import { Container, Title, Paper, Space, List } from '@mantine/core';

import { Todo } from '@prisma/client';
import { Welcome } from '@/components/Welcome/Welcome';
import { ColorSchemeToggle } from '@/components/ColorSchemeToggle/ColorSchemeToggle';
import TodoItem from '@/components/TodoItem/TodoItem';
import NewTodoForm from '@/components/NewTodoForm/NewTodoForm';
import { getTodosAction } from '@/app/_actions';

export default function HomePage() {
  const [todos, setTodos] = useState<Todo[]>([]);

  const fetchTodos = async () => {
    try {
      const response = await getTodosAction();
      setTodos(response.todos || []);
    } catch (error) {
      console.error('Failed to load todos', error);
    }
  };

  useEffect(() => {
    fetchTodos(); // Fetch immediately on component mount
    const interval = setInterval(fetchTodos, 2000); // Fetch every 2 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  const sortedTodos = todos.sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  );

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
          <List>
            {sortedTodos.map((todo) => (
              <TodoItem key={todo.id} todo={todo} />
            ))}
          </List>
        </Paper>
      </Container>
    </>
  );
}
