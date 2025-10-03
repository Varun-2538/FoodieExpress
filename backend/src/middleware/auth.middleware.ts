import { Response, NextFunction } from 'express';
import { supabase } from '../config/supabase';
import { AuthRequest } from '../types';

/**
 * Authentication middleware
 * Verifies the JWT token from Authorization header
 * Attaches user information to request object
 */
export const authMiddleware = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // Extract token from Authorization header
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({
        success: false,
        error: 'No authorization token provided',
      });
      return;
    }

    const token = authHeader.substring(7); // Remove 'Bearer ' prefix

    // Verify token with Supabase
    const { data, error } = await supabase.auth.getUser(token);

    if (error || !data.user) {
      res.status(401).json({
        success: false,
        error: 'Invalid or expired token',
      });
      return;
    }

    // Attach user to request
    req.user = {
      id: data.user.id,
      email: data.user.email!,
      name: data.user.user_metadata?.name,
      avatar: data.user.user_metadata?.avatar_url,
    };

    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error during authentication',
    });
  }
};

/**
 * Optional auth middleware
 * Tries to attach user if token is present, but doesn't fail if not
 */
export const optionalAuthMiddleware = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7);
      const { data } = await supabase.auth.getUser(token);

      if (data.user) {
        req.user = {
          id: data.user.id,
          email: data.user.email!,
          name: data.user.user_metadata?.name,
          avatar: data.user.user_metadata?.avatar_url,
        };
      }
    }

    next();
  } catch (error) {
    // Don't fail on error, just continue without user
    console.error('Optional auth middleware error:', error);
    next();
  }
};