'use client';

import { useState } from 'react';
import { apiClient } from '@/lib/api/client';

export default function TestApiPage() {
  const [result, setResult] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const testHealth = async () => {
    setLoading(true);
    setResult('Testing...');
    try {
      const response = await apiClient.checkHealth();
      setResult(JSON.stringify(response, null, 2));
    } catch (error) {
      setResult(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  const testRestaurants = async () => {
    setLoading(true);
    setResult('Testing...');
    try {
      const response = await apiClient.getRestaurants();
      setResult(JSON.stringify(response, null, 2));
    } catch (error) {
      setResult(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  const testDirectFetch = async () => {
    setLoading(true);
    setResult('Testing direct fetch...');
    try {
      const response = await fetch('http://localhost:5000/api/health');
      const data = await response.json();
      setResult(`Direct fetch success:\n${JSON.stringify(data, null, 2)}`);
    } catch (error) {
      setResult(`Direct fetch error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-8">API Connection Test</h1>

      <div className="space-y-4 mb-8">
        <div>
          <p className="text-sm text-gray-600 mb-2">
            Backend URL: {process.env.NEXT_PUBLIC_API_URL || 'NOT SET'}
          </p>
        </div>

        <div className="flex gap-4">
          <button
            onClick={testHealth}
            disabled={loading}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
          >
            Test Health Endpoint
          </button>

          <button
            onClick={testRestaurants}
            disabled={loading}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:bg-gray-400"
          >
            Test Restaurants Endpoint
          </button>

          <button
            onClick={testDirectFetch}
            disabled={loading}
            className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 disabled:bg-gray-400"
          >
            Test Direct Fetch
          </button>
        </div>
      </div>

      <div className="bg-gray-100 p-4 rounded">
        <h2 className="font-bold mb-2">Result:</h2>
        <pre className="whitespace-pre-wrap text-sm">{result || 'Click a button to test'}</pre>
      </div>

      <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded">
        <h3 className="font-bold mb-2">Troubleshooting:</h3>
        <ol className="list-decimal list-inside space-y-1 text-sm">
          <li>Make sure backend is running: <code className="bg-gray-200 px-1">cd backend && npm run dev</code></li>
          <li>Check backend responds: <code className="bg-gray-200 px-1">curl http://localhost:5000/api/health</code></li>
          <li>Check .env.local has: <code className="bg-gray-200 px-1">NEXT_PUBLIC_API_URL=http://localhost:5000/api</code></li>
          <li>Open browser console (F12) to see detailed logs</li>
        </ol>
      </div>
    </div>
  );
}