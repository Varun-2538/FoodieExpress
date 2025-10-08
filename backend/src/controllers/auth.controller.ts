import { Request, Response } from 'express';
import { supabase } from '../config/supabase';
import { AuthRequest } from '../types';
import { asyncHandler } from '../utils/asyncHandler';
import { createAppError } from '../middleware/error.middleware';

/**
 * Sign in with Google OAuth
 * Returns the OAuth URL for frontend to redirect to
 */
export const signInWithGoogle = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: req.body.redirectUrl || 'http://localhost:3000/auth/callback',
    },
  });

  if (error) {
    throw createAppError(400, error.message);
  }

  res.json({
    success: true,
    data: {
      url: data.url,
    },
  });
});

/**
 * Sign out
 * Invalidates the user's session
 */
export const signOut = asyncHandler(async (req: AuthRequest, res: Response): Promise<void> => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    throw createAppError(401, 'No authorization token provided');
  }

  const token = authHeader.substring(7);
  const { error } = await supabase.auth.admin.signOut(token);

  if (error) {
    throw createAppError(400, error.message);
  }

  res.json({
    success: true,
    message: 'Signed out successfully',
  });
});

/**
 * Get current user
 * Returns the authenticated user's information
 */
export const getCurrentUser = asyncHandler(async (req: AuthRequest, res: Response): Promise<void> => {
  if (!req.user) {
    throw createAppError(401, 'Not authenticated');
  }

  res.json({
    success: true,
    data: req.user,
  });
});

/**
 * Exchange OAuth code for session
 * Used after Google OAuth callback
 */
export const exchangeCodeForSession = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { code } = req.body;

  if (!code) {
    throw createAppError(400, 'Authorization code is required');
  }

  const { data, error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    throw createAppError(400, error.message);
  }

  res.json({
    success: true,
    data: {
      session: data.session,
      user: data.user,
    },
  });
});