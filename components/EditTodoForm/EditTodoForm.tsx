'use client';

import { Button, TextInput, Group, Box } from '@mantine/core';
import { Prisma, Todo } from '@prisma/client';
import { useForm } from '@mantine/form';
import { zodResolver } from 'mantine-form-zod-resolver';

import { TodoUpdateInputSchema } from '@prisma/zod';
import { useUpdateTodo } from '@/lib/actions/todo';

type UseUpdateTodoType = ReturnType<typeof useUpdateTodo>;

const EditTodoForm = ({
  todo,
  updateTodoMutation,
  close,
}: {
  todo: Todo;
  updateTodoMutation: UseUpdateTodoType;
  close: () => void;
}) => {
  const form = useForm({
    initialValues: {
      title: todo.title,
    },
    validate: zodResolver(TodoUpdateInputSchema),
  });

  const handleSubmit = async (values: Prisma.TodoUpdateInput) => {
    updateTodoMutation.mutate({ id: todo.id, title: values.title });
    close();
  };

  return (
    <Box component="form" onSubmit={form.onSubmit(handleSubmit)}>
      <Group>
        <TextInput placeholder="Todo title" {...form.getInputProps('title')} />
        <Button type="submit">Update Todo</Button>
      </Group>
    </Box>
  );
};

export default EditTodoForm;
