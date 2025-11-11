'use client';

import { useAuth } from '@/hooks/useAuth';

export default function Navbar() {
  const { user, logout, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return null;
  }

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              📝 Todo App
            </h1>
          </div>
          <div className="flex items-center gap-4">
            {user && (
              <span className="text-sm text-gray-700 dark:text-gray-300">
                Welcome, <span className="font-semibold">{user.username}</span>
              </span>
            )}
            <button
              onClick={logout}
              className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

