import { Welcome } from '../components/Welcome/Welcome';
import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';
import { getTodos } from '@/lib/todos';
import TodoItem from '@/components/TodoItem/TodoItem';
import NewTodoForm from '@/components/NewTodoForm/NewTodoForm';

export default async function HomePage() {
  const { todos } = await getTodos();

  // Assuming todos have a 'createdAt' or 'updatedAt' field
  const sortedTodos = todos
    ? todos.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
    : [];

  return (
    <>
      <Welcome />
      <ColorSchemeToggle />
      <section className="py-20">
        <div className="container">
          <h1 className="mb-10 w-fit bg-slate-100 px-2 text-3xl font-bold text-slate-800">Todos</h1>

          <NewTodoForm />

          <h2 className="mt-10 border-b pb-2 text-xl font-semibold">Previous todos:</h2>
          <ul className="mt-4 flex flex-col gap-1">
            {sortedTodos.map((todo) => (
              <TodoItem key={todo.id} todo={todo} />
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
