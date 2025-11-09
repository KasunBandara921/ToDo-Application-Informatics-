'use client';

import { Todo } from '@/types';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: number, completed: boolean) => void;
  onEdit: (todo: Todo) => void;
  onDelete: (id: number) => void;
}

export default function TodoItem({ todo, onToggle, onEdit, onDelete }: TodoItemProps) {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'HIGH':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'MEDIUM':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'LOW':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return null;
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const isOverdue = todo.dueDate && new Date(todo.dueDate) < new Date() && !todo.completed;

  return (
    <div
      className={`bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 border-l-4 ${
        todo.completed
          ? 'border-gray-400 opacity-60'
          : isOverdue
          ? 'border-red-500'
          : 'border-blue-500'
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3 flex-1">
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={(e) => onToggle(todo.id, e.target.checked)}
            className="mt-1 h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded cursor-pointer"
          />
          <div className="flex-1">
            <h3
              className={`text-lg font-semibold ${
                todo.completed
                  ? 'line-through text-gray-500 dark:text-gray-400'
                  : 'text-gray-900 dark:text-white'
              }`}
            >
              {todo.title}
            </h3>
            {todo.description && (
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                {todo.description}
              </p>
            )}
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <span
                className={`px-2 py-1 text-xs font-medium rounded ${getPriorityColor(
                  todo.priority
                )}`}
              >
                {todo.priority}
              </span>
              {todo.dueDate && (
                <span
                  className={`text-xs ${
                    isOverdue
                      ? 'text-red-600 dark:text-red-400 font-semibold'
                      : 'text-gray-500 dark:text-gray-400'
                  }`}
                >
                  📅 {formatDate(todo.dueDate)}
                  {isOverdue && ' (Overdue)'}
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="flex gap-2 ml-4">
          <button
            onClick={() => onEdit(todo)}
            className="px-3 py-1 text-sm bg-blue-100 hover:bg-blue-200 text-blue-700 dark:bg-blue-900 dark:hover:bg-blue-800 dark:text-blue-200 rounded transition-colors"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(todo.id)}
            className="px-3 py-1 text-sm bg-red-100 hover:bg-red-200 text-red-700 dark:bg-red-900 dark:hover:bg-red-800 dark:text-red-200 rounded transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

