import type { UseQueryOptions } from '@tanstack/react-query';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createTodo, getTodos, removeTodo } from '@/lib/actions/todo/todo.action';
import { onSuccessCallback, onErrorCallback } from '@/lib/utils/types';

const getTodosQueryKey = 'getTodos';

// Queries:
export function getTodosQuery() {
  return { queryKey: [getTodosQueryKey], queryFn: () => getTodos() } satisfies UseQueryOptions;
}

export function useGetTodos() {
  return useQuery(getTodosQuery());
}

// Mutations:
export function useCreateTodo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (content: string) => createTodo({ title: content }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [getTodosQueryKey] }),
  });
}

export function useRemoveTodo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (todoId: string) => removeTodo(todoId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [getTodosQueryKey] }),
  });
}
