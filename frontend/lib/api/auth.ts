/**
 * Authentication API functions
 * Convenience wrappers around the API client
 */

import { apiClient } from './client';

/**
 * Initiate Google OAuth sign-in
 * Returns the URL to redirect the user to
 */
export async function initiateGoogleSignIn(redirectUrl?: string): Promise<string> {
  const response = await apiClient.signInWithGoogle(redirectUrl);

  if (!response.success || !response.data?.url) {
    throw new Error(response.error || 'Failed to initiate sign in');
  }

  return response.data.url;
}

/**
 * Handle OAuth callback
 * Exchange authorization code for session
 */
export async function handleAuthCallback(code: string) {
  const response = await apiClient.exchangeCodeForSession(code);

  if (!response.success) {
    throw new Error(response.error || 'Authentication failed');
  }

  return {
    user: response.data?.user,
    session: response.data?.session,
  };
}

/**
 * Get current authenticated user
 */
export async function getCurrentUser() {
  const response = await apiClient.getCurrentUser();

  if (!response.success) {
    return null;
  }

  return response.data;
}

/**
 * Sign out current user
 */
export async function signOut() {
  await apiClient.signOut();
}

/**
 * Check if user is authenticated
 */
export function isAuthenticated(): boolean {
  return apiClient.isAuthenticated();
}