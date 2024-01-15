'use server';

import type { Prisma, Todo } from '@prisma/client';
import { TodoCreateInputSchema, TodoUpdateInputSchema } from '@prisma/zod';
import { z } from 'zod';

import prisma from '@/lib/utils/prisma';

export async function getTodos(): Promise<Todo[]> {
  return prisma.todo.findMany();
}

export async function createTodo(input: Prisma.TodoCreateInput): Promise<void> {
  const data = TodoCreateInputSchema.parse(input);

  await prisma.todo.create({ data });
}

export async function updateTodo(input: Prisma.TodoUpdateInput): Promise<void> {
  const data = TodoUpdateInputSchema.parse(input);
  const id = z.string().parse(data.id);

  await prisma.todo.update({
    where: { id },
    data,
  });
}

export async function removeTodo(todoId: string): Promise<void> {
  const id = z.string().parse(todoId);

  await prisma.todo.delete({ where: { id } });
}
