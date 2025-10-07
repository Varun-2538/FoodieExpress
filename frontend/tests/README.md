# Playwright E2E Tests - Browse & Order Flow

This test suite covers the complete user journey from authentication to browsing restaurants and managing cart items.

## Features

- ✅ **Authentication Fixtures** - Tests run with pre-authenticated users
- ✅ **Global Setup** - One-time login that's reused across all tests
- ✅ **Google OAuth Support** - Handles real Google OAuth flow
- ✅ **Persistent Auth State** - Login once, test many times

## Test Flow

1. ✅ **Authentication** - User logs in via Google OAuth (automated via fixtures)
2. ✅ Browse restaurants on homepage
3. ✅ Search for "Pizza"
4. ✅ Click on a restaurant
5. ✅ View menu items
6. ✅ Add items to cart
7. ✅ Navigate to cart page
8. ✅ Increase item quantity
9. ✅ Decrease item quantity
10. ✅ Verify cart total
11. ✅ Verify cart persists across navigation

## First-Time Setup

### Method 1: Manual Token (EASIEST - Recommended) ⭐

This avoids Google OAuth security issues in automated browsers:

1. Make sure backend is running: `http://localhost:5000`
2. Open your app in **regular browser**: `http://localhost:3000`
3. **Log in with Google** normally
4. Open **DevTools Console** (press F12)
5. Run this command:
   ```javascript
   localStorage.getItem('access_token')
   ```
6. **Copy the token** (the long string, without quotes)
7. Set it as environment variable:
   ```bash
   export PLAYWRIGHT_AUTH_TOKEN="paste-your-token-here"
   ```
8. Run tests:
   ```bash
   npm run test:e2e
   ```

That's it! Your tests will now run authenticated. Token lasts 24 hours.

### Method 2: Global Setup (Auto-login with Chrome)

If you prefer automated login:

1. Make sure backend and frontend are running
2. Run tests with headed mode:
   ```bash
   npm run test:e2e:headed
   ```
3. **Chrome browser will open** (not Chromium - uses your real Chrome with Google accounts)
4. **Manually log in** when prompted
5. Once logged in, browser closes and saves auth state
6. Future test runs use saved auth (no manual login needed!)

## Running Tests

After the initial setup, run tests normally:

```bash
# Run tests in headless mode
npm run test:e2e

# Run tests with visible browser
npm run test:e2e:headed

# Run tests with UI mode (interactive)
npm run test:e2e:ui

# Debug a specific test
npx playwright test browse-and-order.spec.ts --debug
```

## View Test Results

After running tests:
```bash
npx playwright show-report
```

## How It Works

### Fixtures ([tests/fixtures.ts](tests/fixtures.ts))
- Extends Playwright's base test with `authenticatedPage` fixture
- Automatically loads saved auth state before each test
- All tests get a pre-authenticated page context

### Global Setup ([tests/global-setup.ts](tests/global-setup.ts))
- Runs once before all tests
- Opens a browser for manual Google OAuth login
- Saves authentication state to `tests/.auth/user.json`
- Reuses saved state if it's less than 24 hours old

### Configuration ([playwright.config.ts](../playwright.config.ts))
- Points to global setup script
- Configures storage state path
- All tests automatically use saved authentication

## Troubleshooting

**Authentication expired:**
```bash
# Delete saved auth state to trigger re-authentication
rm -rf tests/.auth/user.json
npm run test:e2e:headed
```

**Tests failing with "not authenticated" errors:**
- Ensure backend is running on port 5000
- Check that the token in `.auth/user.json` is still valid
- Re-authenticate by deleting the auth file and running tests again

**Google OAuth not working:**
- Make sure you're using a valid Google account
- Check that OAuth is properly configured in your backend
- Verify the OAuth callback URL matches your setup

## Notes

- Auth state is saved for 24 hours, then requires re-authentication
- The `.auth/` directory is gitignored (contains sensitive tokens)
- Tests run serially (workers: 1) to avoid conflicts
- Screenshots taken on failure for debugging
- Each test uses the same authenticated user
