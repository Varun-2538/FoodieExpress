import { createApp } from './app';
import { config } from './config/env';

const app = createApp();

const startServer = async () => {
  try {
    const server = app.listen(config.port, '0.0.0.0', () => {
      console.log('=================================');
      console.log('🚀 FoodieExpress Backend Server');
      console.log('=================================');
      console.log(`Environment: ${config.nodeEnv}`);
      console.log(`Port: ${config.port}`);
      console.log(`Frontend URL: ${config.frontendUrl}`);
      console.log(`Server running at: http://localhost:${config.port}`);
      console.log(`Health check: http://localhost:${config.port}/api/health`);
      console.log('=================================');
    });

    server.on('error', (error: any) => {
      if (error.code === 'EADDRINUSE') {
        console.error(`Port ${config.port} is already in use`);
        process.exit(1);
      } else {
        console.error('Server error:', error);
        process.exit(1);
      }
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully...');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down gracefully...');
  process.exit(0);
});

startServer();