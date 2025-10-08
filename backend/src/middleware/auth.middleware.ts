import { Response, NextFunction } from 'express';
import { supabase } from '../config/supabase';
import { AuthRequest } from '../types';
import { asyncHandler } from '../utils/asyncHandler';
import { createAppError } from './error.middleware';

/**
 * Authentication middleware
 * Verifies the JWT token from Authorization header
 * Attaches user information to request object
 */
export const authMiddleware = asyncHandler(async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  // Extract token from Authorization header
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw createAppError(401, 'No authorization token provided');
  }

  const token = authHeader.substring(7); // Remove 'Bearer ' prefix

  // Verify token with Supabase
  const { data, error } = await supabase.auth.getUser(token);

  if (error || !data.user) {
    throw createAppError(401, 'Invalid or expired token');
  }

  // Attach user to request
  req.user = {
    id: data.user.id,
    email: data.user.email!,
    name: data.user.user_metadata?.name,
    avatar: data.user.user_metadata?.avatar_url,
  };

  next();
});

/**
 * Optional auth middleware
 * Tries to attach user if token is present, but doesn't fail if not
 */
export const optionalAuthMiddleware = asyncHandler(async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.substring(7);

    try {
      const { data } = await supabase.auth.getUser(token);

      if (data.user) {
        req.user = {
          id: data.user.id,
          email: data.user.email!,
          name: data.user.user_metadata?.name,
          avatar: data.user.user_metadata?.avatar_url,
        };
      }
    } catch (error) {
      // Don't fail on error, just continue without user
      console.error('Optional auth middleware error:', error);
    }
  }

  next();
});