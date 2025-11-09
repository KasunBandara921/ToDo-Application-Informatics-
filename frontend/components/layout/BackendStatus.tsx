'use client';

import { useState, useEffect } from 'react';

export default function BackendStatus() {
  const [status, setStatus] = useState<'checking' | 'online' | 'offline'>('checking');
  const [apiUrl, setApiUrl] = useState('');

  useEffect(() => {
    // Get API URL (remove /api to check base backend)
    const fullUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';
    const baseUrl = fullUrl.replace('/api', '');
    setApiUrl(fullUrl);

    // Check backend status by trying to connect to the base URL
    const checkStatus = async () => {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 3000);
        
        try {
          const response = await fetch(`${baseUrl}/actuator/health`, {
            method: 'GET',
            signal: controller.signal,
            mode: 'cors',
          });
          
          // If we get any response (even 404), backend is reachable
          setStatus('online');
        } catch (fetchErr: any) {
          if (fetchErr.name === 'AbortError') {
            // Timeout - backend might be offline
            setStatus('offline');
          } else if (fetchErr.message?.includes('Failed to fetch') || fetchErr.message?.includes('NetworkError')) {
            // Network error - backend is offline
            setStatus('offline');
          } else {
            // Other errors (like CORS) might mean backend is running but blocking
            // For now, assume it's reachable if we got any error other than network
            setStatus('online');
          }
        } finally {
          clearTimeout(timeoutId);
        }
      } catch (err: any) {
        // Any other error means backend is likely offline
        setStatus('offline');
      }
    };

    // Initial check
    checkStatus();
    
    // Check every 15 seconds
    const interval = setInterval(checkStatus, 15000);
    return () => clearInterval(interval);
  }, []);

  if (status === 'checking') {
    return null;
  }

  if (status === 'offline') {
    return (
      <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-4 mb-4 rounded">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-red-700 dark:text-red-300">
              <strong>Backend server is offline</strong>
            </p>
            <p className="text-xs text-red-600 dark:text-red-400 mt-1">
              Cannot connect to: {apiUrl}
            </p>
            <p className="text-xs text-red-600 dark:text-red-400 mt-1">
              Please make sure your Spring Boot backend is running on port 8080.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return null;
}

