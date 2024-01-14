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
