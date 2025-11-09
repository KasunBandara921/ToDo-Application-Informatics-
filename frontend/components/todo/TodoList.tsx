'use client';

import { Todo } from '@/types';
import TodoItem from './TodoItem';

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: number, completed: boolean) => void;
  onEdit: (todo: Todo) => void;
  onDelete: (id: number) => void;
  loading?: boolean;
}

export default function TodoList({
  todos,
  onToggle,
  onEdit,
  onDelete,
  loading,
}: TodoListProps) {
  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <p className="mt-4 text-gray-600 dark:text-gray-400">Loading todos...</p>
      </div>
    );
  }

  if (todos.length === 0) {
    return (
      <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <p className="text-gray-500 dark:text-gray-400 text-lg">
          No todos yet. Create your first todo to get started! 🎉
        </p>
      </div>
    );
  }

  const completedCount = todos.filter((t) => t.completed).length;
  const pendingCount = todos.length - completedCount;

  return (
    <div>
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Your Todos ({todos.length})
        </h2>
        <div className="text-sm text-gray-600 dark:text-gray-400">
          <span className="text-green-600 dark:text-green-400">{completedCount} completed</span>
          {' · '}
          <span className="text-blue-600 dark:text-blue-400">{pendingCount} pending</span>
        </div>
      </div>
      <div className="space-y-3">
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={onToggle}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
}

