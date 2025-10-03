'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { getCurrentUser, signOut as apiSignOut, isAuthenticated } from '../api/auth';

interface User {
  id: string;
  email: string;
  name?: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  signOut: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Load user on mount and when storage changes
  useEffect(() => {
    loadUser();

    // Listen for storage changes (e.g., when token is set in callback page)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'access_token') {
        loadUser();
      }
    };

    window.addEventListener('storage', handleStorageChange);

    // Also check periodically in case storage event doesn't fire
    const interval = setInterval(() => {
      const hasToken = isAuthenticated();
      const hasUser = !!user;

      if (hasToken && !hasUser) {
        // Token exists but no user loaded yet
        loadUser();
      } else if (!hasToken && hasUser) {
        // Token removed but user still in state
        setUser(null);
      }
    }, 1000);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, [user]);

  const loadUser = async () => {
    try {
      if (!isAuthenticated()) {
        setUser(null);
        setLoading(false);
        return;
      }

      const userData = await getCurrentUser();
      setUser(userData);
    } catch (error: any) {
      // Only log non-auth errors (401 is expected when token expires)
      if (error?.status !== 401) {
        console.error('Failed to load user:', error);
      }
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await apiSignOut();
      setUser(null);
    } catch (error) {
      console.error('Sign out error:', error);
      // Clear user anyway
      setUser(null);
    }
  };

  const refreshUser = async () => {
    setLoading(true);
    await loadUser();
  };

  const value: AuthContextType = {
    user,
    loading,
    isAuthenticated: !!user,
    signOut: handleSignOut,
    refreshUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}