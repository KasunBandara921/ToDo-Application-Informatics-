'use client';

import { useState, useEffect } from 'react';
import api from '@/lib/api';
import { Todo, TodoRequest } from '@/types';

export const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTodos = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get<Todo[]>('/todos');
      setTodos(response.data);
    } catch (err: any) {
      let errorMessage = 'Failed to fetch todos';
      
      if (err.code === 'ECONNREFUSED' || err.message?.includes('Network Error') || err.code === 'ERR_NETWORK') {
        errorMessage = 'Cannot connect to the backend server. Please make sure:\n1. The backend is running on http://localhost:8080\n2. CORS is properly configured\n3. The API URL in .env.local is correct';
      } else if (err.code === 'ECONNABORTED') {
        errorMessage = 'Request timeout. The backend server is not responding.';
      } else if (err.response) {
        // Server responded with error status
        errorMessage = err.response?.data?.message || `Server error: ${err.response.status}`;
      } else if (err.request) {
        // Request was made but no response received
        errorMessage = 'No response from server. Please check if the backend is running.';
      }
      
      setError(errorMessage);
      console.error('Error fetching todos:', {
        message: err.message,
        code: err.code,
        response: err.response,
        config: err.config,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const createTodo = async (todo: TodoRequest): Promise<Todo> => {
    try {
      setError(null);
      const response = await api.post<Todo>('/todos', todo);
      setTodos((prev) => [response.data, ...prev]);
      return response.data;
    } catch (err: any) {
      let errorMessage = 'Failed to create todo';
      if (err.code === 'ECONNREFUSED' || err.message?.includes('Network Error')) {
        errorMessage = 'Cannot connect to the backend server. Please make sure the backend is running.';
      } else {
        errorMessage = err.response?.data?.message || errorMessage;
      }
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  const updateTodo = async (id: number, todo: Partial<TodoRequest>): Promise<Todo> => {
    try {
      setError(null);
      const response = await api.put<Todo>(`/todos/${id}`, todo);
      setTodos((prev) =>
        prev.map((t) => (t.id === id ? response.data : t))
      );
      return response.data;
    } catch (err: any) {
      let errorMessage = 'Failed to update todo';
      if (err.code === 'ECONNREFUSED' || err.message?.includes('Network Error')) {
        errorMessage = 'Cannot connect to the backend server. Please make sure the backend is running.';
      } else {
        errorMessage = err.response?.data?.message || errorMessage;
      }
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  const deleteTodo = async (id: number): Promise<void> => {
    try {
      setError(null);
      await api.delete(`/todos/${id}`);
      setTodos((prev) => prev.filter((t) => t.id !== id));
    } catch (err: any) {
      let errorMessage = 'Failed to delete todo';
      if (err.code === 'ECONNREFUSED' || err.message?.includes('Network Error')) {
        errorMessage = 'Cannot connect to the backend server. Please make sure the backend is running.';
      } else {
        errorMessage = err.response?.data?.message || errorMessage;
      }
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  const toggleTodo = async (id: number, completed: boolean): Promise<void> => {
    try {
      await updateTodo(id, { completed });
    } catch (err) {
      console.error('Error toggling todo:', err);
    }
  };

  return {
    todos,
    loading,
    error,
    createTodo,
    updateTodo,
    deleteTodo,
    toggleTodo,
    refetch: fetchTodos,
  };
};

