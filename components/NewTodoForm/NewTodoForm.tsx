'use client';

import { useRef } from 'react';
import { Button, TextInput, Group, Title, Box } from '@mantine/core';
import { createTodoAction } from '@/app/_actions';

const NewTodoForm = () => {
  const formRef = useRef<HTMLFormElement>(null);

  async function action(data: FormData) {
    const title = data.get('title');
    if (typeof title !== 'string' || !title) return;

    await createTodoAction(title);
    formRef.current?.reset();
  }

  return (
    <Box component="form" ref={formRef} onSubmit={(e) => e.preventDefault()}>
      <Title order={3} mb="xs">
        Create a New Todo
      </Title>
      <Group>
        <TextInput name="title" placeholder="Todo title" required />
        <Button type="submit" onClick={() => formRef.current && action(new FormData(formRef.current))}>
          Add Todo
        </Button>
      </Group>
    </Box>
  );
};

export default NewTodoForm;
