import type { ReactElement } from 'react';
import { TodoClient } from './page.client';
import { getTodosQuery } from '@/lib/actions/todo';
import { HydrationBoundary } from '@/lib/providers/hydration-boundary';

export default function TodoPage(): ReactElement {
  return (
    <HydrationBoundary queries={[getTodosQuery()]}>
      <TodoClient />
    </HydrationBoundary>
  );
}
