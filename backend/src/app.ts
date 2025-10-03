import express, { Express } from 'express';
import cors from 'cors';
import { config } from './config/env';
import routes from './routes';
import { errorHandler, notFoundHandler } from './middleware/error.middleware';

export const createApp = (): Express => {
  const app = express();

  // CORS configuration - MUST be first middleware
  app.use((req, res, next) => {
    const origin = req.headers.origin || req.headers.referer;

    console.log(`[CORS] ${req.method} ${req.url} - Origin: ${origin}`);

    // Allow all localhost origins in development
    if (origin && origin.includes('localhost')) {
      res.setHeader('Access-Control-Allow-Origin', origin);
    } else {
      res.setHeader('Access-Control-Allow-Origin', config.frontendUrl);
    }

    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Max-Age', '86400'); // 24 hours

    // Handle preflight OPTIONS request
    if (req.method === 'OPTIONS') {
      console.log('[CORS] Preflight request handled');
      res.status(200).end();
      return;
    }

    next();
  });

  // Body parsing middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Request logging middleware (development only)
  if (config.nodeEnv === 'development') {
    app.use((req, res, next) => {
      console.log(`${req.method} ${req.path} - Origin: ${req.headers.origin}`);
      next();
    });
  }

  // API routes
  app.use('/api', routes);

  // Error handling
  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
};