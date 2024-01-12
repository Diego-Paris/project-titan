import { Container, Title, Paper, Space, List } from '@mantine/core';

import { Welcome } from '@/components/Welcome/Welcome';
import { ColorSchemeToggle } from '@/components/ColorSchemeToggle/ColorSchemeToggle';
import TodoItem from '@/components/TodoItem/TodoItem';
import NewTodoForm from '@/components/NewTodoForm/NewTodoForm';
import { getTodosAction } from '@/app/_actions';

export default async function HomePage() {
  const { todos } = await getTodosAction();

  // Assuming todos have a 'createdAt' or 'updatedAt' field
  const sortedTodos = todos
    ? todos.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
    : [];

  return (
    <>
      <Welcome />
      <ColorSchemeToggle />
      <Space h="xl" /> {/* Adds vertical space */}
      <Container>
        <Title order={1}>Todos</Title> {/* Title equivalent to h1 */}
        <Space h="md" />
        <NewTodoForm />
        <Title order={2}>Previous todos:</Title> {/* Title equivalent to h2 */}
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
