'use server';

import { revalidatePath } from 'next/cache';
import { createTodo, deleteTodo, getTodos, updateTodo } from '@/lib/todos';

export const revalidate = 0;
export async function getTodosAction() {
  const { todos } = await getTodos();
  revalidatePath('/');
  return { todos };
}

export async function createTodoAction(title: string) {
  await createTodo(title);
  revalidatePath('/');
}

export async function updateTodoAction(id: string, isCompleted: boolean) {
  await updateTodo(id, isCompleted);
  revalidatePath('/');
}

export async function deleteTodoAction(id: string) {
  await deleteTodo(id);
  revalidatePath('/');
}
