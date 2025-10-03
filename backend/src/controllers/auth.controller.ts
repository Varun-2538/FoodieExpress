import { Request, Response } from 'express';
import { supabase } from '../config/supabase';
import { AuthRequest } from '../types';

export class AuthController {
  /**
   * Sign in with Google OAuth
   * Returns the OAuth URL for frontend to redirect to
   */
  async signInWithGoogle(req: Request, res: Response): Promise<void> {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: req.body.redirectUrl || 'http://localhost:3000/auth/callback',
        },
      });

      if (error) {
        res.status(400).json({
          success: false,
          error: error.message,
        });
        return;
      }

      res.json({
        success: true,
        data: {
          url: data.url,
        },
      });
    } catch (error) {
      console.error('Google sign in error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to initiate Google sign in',
      });
    }
  }

  /**
   * Sign out
   * Invalidates the user's session
   */
  async signOut(req: AuthRequest, res: Response): Promise<void> {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader) {
        res.status(401).json({
          success: false,
          error: 'No authorization token provided',
        });
        return;
      }

      const token = authHeader.substring(7);
      const { error } = await supabase.auth.admin.signOut(token);

      if (error) {
        res.status(400).json({
          success: false,
          error: error.message,
        });
        return;
      }

      res.json({
        success: true,
        message: 'Signed out successfully',
      });
    } catch (error) {
      console.error('Sign out error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to sign out',
      });
    }
  }

  /**
   * Get current user
   * Returns the authenticated user's information
   */
  async getCurrentUser(req: AuthRequest, res: Response): Promise<void> {
    try {
      if (!req.user) {
        res.status(401).json({
          success: false,
          error: 'Not authenticated',
        });
        return;
      }

      res.json({
        success: true,
        data: req.user,
      });
    } catch (error) {
      console.error('Get current user error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to get user information',
      });
    }
  }

  /**
   * Exchange OAuth code for session
   * Used after Google OAuth callback
   */
  async exchangeCodeForSession(req: Request, res: Response): Promise<void> {
    try {
      const { code } = req.body;

      if (!code) {
        res.status(400).json({
          success: false,
          error: 'Authorization code is required',
        });
        return;
      }

      const { data, error } = await supabase.auth.exchangeCodeForSession(code);

      if (error) {
        res.status(400).json({
          success: false,
          error: error.message,
        });
        return;
      }

      res.json({
        success: true,
        data: {
          session: data.session,
          user: data.user,
        },
      });
    } catch (error) {
      console.error('Exchange code error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to exchange code for session',
      });
    }
  }
}