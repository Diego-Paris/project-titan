import type { UseQueryOptions } from '@tanstack/react-query';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { Prisma, Todo } from '@prisma/client';

import { createTodo, getTodos, updateTodo, removeTodo } from '@/lib/actions/todo/todo.action';
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
export function useCreateTodo(onSuccessCb?: onSuccessCallback, onErrorCb?: onErrorCallback) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (content: string) => createTodo({ title: content }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [getTodosQueryKey] });
      if (onSuccessCb) {
        onSuccessCb(data);
      }
    },
    onError: (error) => {
      if (onErrorCb) {
        onErrorCb(error);
      }
    },
  });
}

export function useUpdateTodo(onSuccessCb?: onSuccessCallback, onErrorCb?: onErrorCallback) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: Prisma.TodoUpdateInput) => updateTodo(input),
    onMutate: async (updatedTodo) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: [getTodosQueryKey] });

      // Snapshot the previous value
      const previousTodos = queryClient.getQueryData([getTodosQueryKey]);

      // Optimistically update to the new value
      queryClient.setQueryData([getTodosQueryKey], (old: Todo[]) =>
        old.map((todo) => (todo.id === updatedTodo.id ? { ...todo, ...updatedTodo } : todo))
      );

      return { previousTodos };
    },
    onError: (error, updatedTodo, context) => {
      // Rollback on error
      queryClient.setQueryData([getTodosQueryKey], context?.previousTodos);
      if (onErrorCb) {
        onErrorCb(error);
      }
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [getTodosQueryKey] });
      if (onSuccessCb) {
        onSuccessCb(data);
      }
    },
  });
}

export function useRemoveTodo(onSuccessCb?: onSuccessCallback, onErrorCb?: onErrorCallback) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (todoId: string) => removeTodo(todoId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [getTodosQueryKey] });
      if (onSuccessCb) {
        onSuccessCb();
      }
    },
    onError: (error) => {
      if (onErrorCb) {
        onErrorCb(error);
      }
    },
  });
}
