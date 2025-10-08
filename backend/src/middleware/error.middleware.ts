import { Request, Response, NextFunction } from 'express';

export interface AppErrorType extends Error {
  statusCode: number;
  isOperational: boolean;
}

export const createAppError = (
  statusCode: number,
  message: string,
  isOperational: boolean = true
): AppErrorType => {
  const error = new Error(message) as AppErrorType;
  error.statusCode = statusCode;
  error.isOperational = isOperational;
  return error;
};

export const isAppError = (error: any): error is AppErrorType => {
  return error && typeof error.statusCode === 'number' && typeof error.isOperational === 'boolean';
};

export const errorHandler = (
  err: Error | AppErrorType,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (isAppError(err)) {
    res.status(err.statusCode).json({
      success: false,
      error: err.message,
    });
    return;
  }

  // Log unexpected errors
  console.error('Unexpected error:', err);

  res.status(500).json({
    success: false,
    error: 'Internal server error',
  });
};

export const notFoundHandler = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  res.status(404).json({
    success: false,
    error: `Route ${req.originalUrl} not found`,
  });
};