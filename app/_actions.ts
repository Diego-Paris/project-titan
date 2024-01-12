'use server';

import { revalidatePath, unstable_noStore as noStore } from 'next/cache';
import { createTodo, deleteTodo, getTodos, updateTodo } from '@/lib/todos';

export async function getTodosAction() {
  //revalidatePath('/'); // does not work for gets,
  // but works for posts, puts, and deletes
  noStore(); // required for gets apparently...
  const { todos } = await getTodos();
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
