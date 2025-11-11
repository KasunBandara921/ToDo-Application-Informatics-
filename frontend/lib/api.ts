import axios from 'axios';

// Get the API URL from environment or use default
const getApiUrl = () => {
  if (typeof window !== 'undefined') {
    // Client-side: use environment variable
    return process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';
  }
  // Server-side: use environment variable
  return process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';
};

const api = axios.create({
  baseURL: getApiUrl(),
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 second timeout
});

// Log API URL for debugging (only in development)
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  console.log('API Base URL:', getApiUrl());
}

// Helper to safely access localStorage (client-side only)
const getToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('token');
  }
  return null;
};

const removeToken = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('token');
  }
};

api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Enhanced error logging for debugging
    if (process.env.NODE_ENV === 'development') {
      console.error('API Error:', {
        message: error.message,
        code: error.code,
        status: error.response?.status,
        url: error.config?.url,
        baseURL: error.config?.baseURL,
        fullURL: error.config?.baseURL + error.config?.url,
      });
    }

    if (error.response?.status === 401) {
      removeToken();
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;