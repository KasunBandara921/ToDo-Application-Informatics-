'use client';

import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useTodos } from '@/hooks/useTodos';
import ProtectedRoute from '@/components/layout/ProtectedRoute';
import Navbar from '@/components/layout/Navbar';
import BackendStatus from '@/components/layout/BackendStatus';
import TodoList from '@/components/todo/TodoList';
import TodoForm from '@/components/todo/TodoForm';
import { Todo, TodoRequest } from '@/types';

export default function Home() {
  const { isAuthenticated, loading: authLoading } = useAuth();
  const { todos, loading: todosLoading, createTodo, updateTodo, deleteTodo, toggleTodo, error } =
    useTodos();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);

  const handleCreateTodo = async (todo: TodoRequest) => {
    await createTodo(todo);
    setIsFormOpen(false);
  };

  const handleUpdateTodo = async (todo: TodoRequest) => {
    if (editingTodo) {
      await updateTodo(editingTodo.id, todo);
      setEditingTodo(null);
      setIsFormOpen(false);
    }
  };

  const handleEditTodo = (todo: Todo) => {
    setEditingTodo(todo);
    setIsFormOpen(true);
  };

  const handleDeleteTodo = async (id: number) => {
    if (confirm('Are you sure you want to delete this todo?')) {
      await deleteTodo(id);
    }
  };

  const handleToggleTodo = async (id: number, completed: boolean) => {
    await toggleTodo(id, completed);
  };

  const handleCancelForm = () => {
    setIsFormOpen(false);
    setEditingTodo(null);
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navbar />
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <BackendStatus />
          <div className="mb-6 flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">My Todos</h1>
            <button
              onClick={() => {
                setEditingTodo(null);
                setIsFormOpen(true);
              }}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              + New Todo
            </button>
          </div>

          {error && (
            <div className="mb-4 p-4 bg-red-100 dark:bg-red-900/20 border border-red-400 dark:border-red-600 text-red-700 dark:text-red-300 rounded-lg">
              <div className="flex items-start">
                <svg className="h-5 w-5 text-red-500 mt-0.5 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <div className="flex-1">
                  <p className="font-semibold mb-1">Error</p>
                  <pre className="whitespace-pre-wrap text-sm">{error}</pre>
                </div>
              </div>
            </div>
          )}

          {isFormOpen && (
            <div className="mb-6">
              <TodoForm
                onSubmit={editingTodo ? handleUpdateTodo : handleCreateTodo}
                initialData={editingTodo || undefined}
                onCancel={handleCancelForm}
              />
            </div>
          )}

          <TodoList
            todos={todos}
            onToggle={handleToggleTodo}
            onEdit={handleEditTodo}
            onDelete={handleDeleteTodo}
            loading={todosLoading}
          />
        </main>
      </div>
    </ProtectedRoute>
  );
}
