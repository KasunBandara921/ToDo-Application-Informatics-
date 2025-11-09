'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';
import { setToken, removeToken, getToken, isTokenValid, getCurrentUser } from '@/lib/auth';
import { AuthResponse, LoginRequest, RegisterRequest, User } from '@/types';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = () => {
    if (typeof window === 'undefined') {
      setLoading(false);
      return;
    }

    const token = getToken();
    if (token && isTokenValid()) {
      const decoded = getCurrentUser() as any;
      if (decoded) {
        setUser({
          id: decoded.userId || decoded.id,
          username: decoded.username || decoded.sub,
          email: decoded.email || decoded.sub,
        });
      }
    }
    setLoading(false);
  };

  const login = async (credentials: LoginRequest): Promise<void> => {
    try {
      const response = await api.post<AuthResponse>('/auth/login', credentials);
      setToken(response.data.token);
      setUser(response.data.user);
      router.push('/');
    } catch (error: any) {
      let errorMessage = 'Login failed';
      if (error.code === 'ECONNREFUSED' || error.message?.includes('Network Error')) {
        errorMessage = 'Cannot connect to the backend server. Please make sure the backend is running.';
      } else {
        errorMessage = error.response?.data?.message || errorMessage;
      }
      throw new Error(errorMessage);
    }
  };

  const register = async (data: RegisterRequest): Promise<void> => {
    try {
      const response = await api.post<AuthResponse>('/auth/register', data);
      setToken(response.data.token);
      setUser(response.data.user);
      router.push('/');
    } catch (error: any) {
      let errorMessage = 'Registration failed';
      if (error.code === 'ECONNREFUSED' || error.message?.includes('Network Error')) {
        errorMessage = 'Cannot connect to the backend server. Please make sure the backend is running.';
      } else {
        errorMessage = error.response?.data?.message || errorMessage;
      }
      throw new Error(errorMessage);
    }
  };

  const logout = () => {
    removeToken();
    setUser(null);
    router.push('/login');
  };

  return {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user && isTokenValid(),
  };
};

