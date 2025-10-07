import { test as base, Page } from '@playwright/test';
import { setupAuthentication } from './auth-helper';
import * as fs from 'fs';
import * as path from 'path';

/**
 * Extended test fixtures with authentication support
 *
 * Usage:
 * import { test, expect } from './fixtures';
 *
 * test('my test', async ({ authenticatedPage }) => {
 *   // authenticatedPage is already logged in
 * });
 *
 * Authentication Methods (in order of priority):
 * 1. Environment variable: PLAYWRIGHT_AUTH_TOKEN
 * 2. Manual token file: tests/.auth/manual-token.json
 * 3. Saved auth state: tests/.auth/user.json (from global-setup)
 */

type TestFixtures = {
  authenticatedPage: Page;
};

/**
 * Performs Google OAuth login for testing
 * This simulates the OAuth flow by directly setting the access token
 */
async function performLogin(page: Page): Promise<{ email: string; name: string }> {
  // Navigate to home page
  await page.goto('/');
  await page.waitForLoadState('networkidle');

  // Check if already logged in
  const isLoggedIn = await page.evaluate(() => {
    return !!localStorage.getItem('access_token');
  });

  if (isLoggedIn) {
    // Already logged in, fetch user info
    const user = await page.evaluate(async () => {
      const token = localStorage.getItem('access_token');
      const response = await fetch('http://localhost:5000/api/auth/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        return data.data;
      }
      return null;
    });

    if (user) {
      return { email: user.email, name: user.name || 'Test User' };
    }
  }

  // Click sign in button (adjust selector based on your UI)
  const signInButton = page.locator('button:has-text("Sign in"), a:has-text("Sign in")').first();

  // Check if sign in button exists
  const signInExists = await signInButton.count() > 0;

  if (signInExists) {
    await signInButton.click();
    await page.waitForTimeout(1000);

    // Wait for Google OAuth redirect or handle the OAuth flow
    // Since we can't automate real Google OAuth in tests, we have two options:

    // Option 1: Wait for the OAuth callback and token to be set
    // This requires you to manually log in the first time or use a test account

    // Option 2: Mock the authentication by directly setting the token
    // For testing purposes, we'll use a mock approach

    // Check if we're on Google's OAuth page
    const currentUrl = page.url();
    if (currentUrl.includes('accounts.google.com')) {
      // For automated testing, you would need to:
      // 1. Use a test Google account with OAuth credentials
      // 2. Or mock the backend to accept a test token
      // 3. Or use the auth state from global-setup

      throw new Error(
        'Google OAuth requires manual intervention. Please use global-setup with stored auth state, ' +
        'or configure your backend to accept test tokens.'
      );
    }
  }

  // Wait for authentication to complete
  await page.waitForFunction(
    () => !!localStorage.getItem('access_token'),
    { timeout: 30000 }
  );

  // Get user information
  const user = await page.evaluate(async () => {
    const token = localStorage.getItem('access_token');
    const response = await fetch('http://localhost:5000/api/auth/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return data.data;
  });

  return {
    email: user.email,
    name: user.name || 'Test User',
  };
}

/**
 * Extended test with authenticated page fixture
 */
export const test = base.extend<TestFixtures>({
  authenticatedPage: async ({ page }, use) => {
    let authenticated = false;
    let authToken: string | null = null;

    // Method 1: Try stored auth state from global-setup
    const storageStatePath = path.join(__dirname, '.auth', 'user.json');

    if (fs.existsSync(storageStatePath)) {
      try {
        // Load stored authentication state
        const state = JSON.parse(fs.readFileSync(storageStatePath, 'utf-8'));

        // Extract access_token from localStorage
        if (state.origins?.[0]?.localStorage) {
          const accessTokenItem = state.origins[0].localStorage.find(
            (item: any) => item.name === 'access_token'
          );
          if (accessTokenItem) {
            authToken = accessTokenItem.value;
            authenticated = true;
            console.log('✓ Using saved authentication state');
          }
        }
      } catch (error) {
        console.log('⚠ Failed to load saved auth state:', error);
      }
    }

    // Method 2: Try environment variable or manual token file
    if (!authenticated) {
      if (await setupAuthentication(page)) {
        authenticated = true;
      }
    }

    if (!authenticated) {
      throw new Error(
        '\n\n' +
        '❌ No authentication found!\n\n' +
        'Please use ONE of these methods:\n\n' +
        '1. EASIEST - Manual Token (Recommended):\n' +
        '   a. Open http://localhost:3000 and log in\n' +
        '   b. Open DevTools Console (F12)\n' +
        '   c. Run: localStorage.getItem("access_token")\n' +
        '   d. Copy the token\n' +
        '   e. Run: export PLAYWRIGHT_AUTH_TOKEN="your-token-here"\n' +
        '   f. Run tests\n\n' +
        '2. Global Setup (uses Chrome):\n' +
        '   - Run: npm run test:e2e:headed\n' +
        '   - Log in when browser opens\n' +
        '   - Auth state saves automatically\n\n'
      );
    }

    // Set up a route handler to inject auth token on every page navigation
    if (authToken) {
      await page.addInitScript((token) => {
        localStorage.setItem('access_token', token);
      }, authToken);
    }

    // Use the authenticated page
    await use(page);

    // Cleanup is automatic
  },
});

export { expect } from '@playwright/test';
