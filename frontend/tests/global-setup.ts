import { chromium, FullConfig } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

/**
 * Global setup for Playwright tests
 * Handles authentication before running tests
 *
 * This setup:
 * 1. Opens a browser
 * 2. Navigates to the login page
 * 3. Waits for manual Google OAuth login (you need to log in once)
 * 4. Saves the authentication state to a file
 * 5. All subsequent tests use this saved state
 *
 * To use: Run tests and log in manually when prompted.
 * The auth state will be saved and reused for future test runs.
 */

async function globalSetup(config: FullConfig) {
  const authDir = path.join(__dirname, '.auth');
  const authFile = path.join(authDir, 'user.json');

  // Create auth directory if it doesn't exist
  if (!fs.existsSync(authDir)) {
    fs.mkdirSync(authDir, { recursive: true });
  }

  // Check if auth file already exists and is recent (less than 24 hours old)
  if (fs.existsSync(authFile)) {
    const stats = fs.statSync(authFile);
    const fileAge = Date.now() - stats.mtimeMs;
    const twentyFourHours = 24 * 60 * 60 * 1000;

    if (fileAge < twentyFourHours) {
      console.log('✓ Using existing authentication state');
      return;
    } else {
      console.log('⚠ Authentication state is old, re-authenticating...');
    }
  }

  console.log('Setting up authentication...');
  console.log('');
  console.log('INSTRUCTIONS:');
  console.log('1. A browser will open');
  console.log('2. Click "Sign in" and complete Google OAuth login');
  console.log('3. Once logged in and redirected to home page, the browser will close');
  console.log('4. Your auth state will be saved for future tests');
  console.log('');

  // Get the baseURL from config
  const baseURL = config.projects[0].use.baseURL || 'http://localhost:3000';

  // Launch browser with your system Chrome (not Chromium)
  // This allows you to use your existing Google accounts and avoid OAuth security errors
  const browser = await chromium.launch({
    headless: false,
    channel: 'chrome', // Use your installed Chrome browser with your Google accounts
    args: [
      '--disable-blink-features=AutomationControlled', // Avoid automation detection
      '--no-first-run',
      '--no-default-browser-check',
    ],
  });

  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    // Navigate to home page
    await page.goto(baseURL);
    await page.waitForLoadState('networkidle');

    // Check if already logged in
    const hasToken = await page.evaluate(() => {
      return !!localStorage.getItem('access_token');
    });

    if (!hasToken) {
      console.log('Please log in using Google OAuth in the opened browser...');
      console.log('Waiting for authentication...');

      // Wait for the user to complete OAuth and be redirected back
      // The token will be set in localStorage after successful auth
      await page.waitForFunction(
        () => !!localStorage.getItem('access_token'),
        { timeout: 120000 } // 2 minutes to complete login
      );

      console.log('✓ Authentication successful!');
    } else {
      console.log('✓ Already authenticated');
    }

    // Wait a bit for any redirects to settle
    await page.waitForTimeout(1000);

    // Verify authentication by checking user data
    try {
      // Make sure we're on the right page
      await page.goto(baseURL, { waitUntil: 'networkidle' });

      const user = await page.evaluate(async () => {
        const token = localStorage.getItem('access_token');
        try {
          const response = await fetch('http://localhost:5000/api/auth/me', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (response.ok) {
            const data = await response.json();
            return data.data;
          }
        } catch (error) {
          console.error('Failed to fetch user:', error);
        }
        return null;
      });

      if (user) {
        console.log(`✓ Logged in as: ${user.email}`);
      }
    } catch (error) {
      console.log('⚠ Could not verify user details, but token exists');
    }

    // Save authentication state
    await context.storageState({ path: authFile });
    console.log('✓ Authentication state saved');

  } catch (error) {
    console.error('Authentication setup failed:', error);
    throw error;
  } finally {
    await browser.close();
  }
}

export default globalSetup;
