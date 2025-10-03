# Backend API Tests

Integration tests for FoodieExpress backend API endpoints.

## Test Structure

```
__tests__/
├── order-flow.test.ts    # Restaurant & menu API tests
├── auth.test.ts          # Authentication & authorization tests
└── setup.ts              # Test configuration
```

## Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

## Test Coverage

### Order Flow Tests
- Restaurant listing and details
- Menu item retrieval and filtering
- Search functionality
- Data validation

### Authentication Tests
- Protected endpoint access
- OAuth flow initiation
- Token validation
- Health check endpoint

## Notes

- Tests run against the actual application instance
- No database modifications are made
- Authentication tests verify endpoint protection
- All tests use Supertest for HTTP assertions
