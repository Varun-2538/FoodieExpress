'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { handleAuthCallback } from '@/lib/api/auth';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

export default function AuthCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleAuth = async () => {
      // Check for error in params
      const errorParam = searchParams.get('error');
      if (errorParam) {
        setError('Authentication was cancelled or failed');
        setTimeout(() => router.push('/'), 3000);
        return;
      }

      // Check for access token in URL hash (Supabase implicit flow)
      const hash = window.location.hash;
      if (hash && hash.includes('access_token')) {
        const params = new URLSearchParams(hash.substring(1));
        const accessToken = params.get('access_token');
        const refreshToken = params.get('refresh_token');

        if (accessToken) {
          // Store tokens
          localStorage.setItem('access_token', accessToken);
          if (refreshToken) {
            localStorage.setItem('refresh_token', refreshToken);
          }

          console.log('Authentication successful, redirecting...');

          // Redirect to home and force page reload to refresh auth context
          window.location.href = '/';
          return;
        }
      }

      // Check for authorization code (PKCE flow)
      const code = searchParams.get('code');
      if (code) {
        try {
          await handleAuthCallback(code);
          router.push('/');
        } catch (err) {
          console.error('Auth callback error:', err);
          setError(err instanceof Error ? err.message : 'Authentication failed');
          setTimeout(() => router.push('/'), 3000);
        }
        return;
      }

      // No valid auth data found
      setError('No authentication data received');
      setTimeout(() => router.push('/'), 3000);
    };

    handleAuth();
  }, [searchParams, router]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 mb-4">{error}</div>
          <div className="text-sm text-gray-500">
            Redirecting to home page...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <LoadingSpinner />
        <div className="mt-4 text-gray-600">
          Completing sign in...
        </div>
      </div>
    </div>
  );
}