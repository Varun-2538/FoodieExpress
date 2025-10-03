import { config } from '../config/env';

// Set test environment variables
process.env.NODE_ENV = 'test';
process.env.PORT = '5001';

// Increase timeout for integration tests
jest.setTimeout(30000);

// Suppress console logs during tests (optional)
if (process.env.SUPPRESS_LOGS === 'true') {
  global.console = {
    ...console,
    log: jest.fn(),
    debug: jest.fn(),
    info: jest.fn(),
    warn: jest.fn(),
  };
}
