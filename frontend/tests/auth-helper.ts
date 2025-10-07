/**
 * Authentication Helper for Playwright Tests
 *
 * This provides an alternative, simpler way to authenticate tests
 * by manually copying your auth token from the browser.
 */

import { Page } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

/**
 * Method 1: Set auth token manually
 *
 * How to use:
 * 1. Open your app in browser: http://localhost:3000
 * 2. Log in with Google
 * 3. Open DevTools (F12)
 * 4. Go to Console tab
 * 5. Type: localStorage.getItem('access_token')
 * 6. Copy the token (without quotes)
 * 7. Set it as environment variable:
 *    export PLAYWRIGHT_AUTH_TOKEN="your-token-here"
 * 8. Run tests
 */
export async function setAuthTokenFromEnv(page: Page): Promise<boolean> {
  const token = process.env.PLAYWRIGHT_AUTH_TOKEN;

  if (!token) {
    console.log('❌ No auth token found in environment variable PLAYWRIGHT_AUTH_TOKEN');
    return false;
  }

  await page.goto('/');
  await page.evaluate((token) => {
    localStorage.setItem('access_token', token);
  }, token);

  console.log('✓ Auth token set from environment variable');
  return true;
}

/**
 * Method 2: Save your current browser's auth state
 *
 * How to use:
 * 1. Open your app in browser: http://localhost:3000
 * 2. Log in with Google
 * 3. Open DevTools Console (F12)
 * 4. Run this command:
 *
 * copy(JSON.stringify({
 *   access_token: localStorage.getItem('access_token')
 * }))
 *
 * 5. Save to tests/.auth/manual-token.json
 * 6. Tests will automatically use it
 */
export async function setAuthTokenFromFile(page: Page): Promise<boolean> {
  const tokenFile = path.join(__dirname, '.auth', 'manual-token.json');

  if (!fs.existsSync(tokenFile)) {
    return false;
  }

  const data = JSON.parse(fs.readFileSync(tokenFile, 'utf-8'));

  if (!data.access_token) {
    console.log('❌ No access_token found in manual-token.json');
    return false;
  }

  await page.goto('/');
  await page.evaluate((token) => {
    localStorage.setItem('access_token', token);
  }, data.access_token);

  console.log('✓ Auth token loaded from manual-token.json');
  return true;
}

/**
 * Method 3: Interactive token input
 * Prompts you to paste the token when running tests
 */
export async function setAuthTokenInteractive(page: Page): Promise<boolean> {
  // This won't work in automated runs, but helpful for local development
  if (process.env.CI) {
    return false;
  }

  console.log('');
  console.log('='.repeat(60));
  console.log('MANUAL AUTH TOKEN REQUIRED');
  console.log('='.repeat(60));
  console.log('');
  console.log('Steps:');
  console.log('1. Open http://localhost:3000 in your browser');
  console.log('2. Log in with Google');
  console.log('3. Open DevTools Console (F12)');
  console.log('4. Run: localStorage.getItem("access_token")');
  console.log('5. Copy the token (without quotes)');
  console.log('6. Paste it here or save to .env file');
  console.log('');
  console.log('Alternative: Set environment variable:');
  console.log('  export PLAYWRIGHT_AUTH_TOKEN="your-token"');
  console.log('');
  console.log('='.repeat(60));
  console.log('');

  return false;
}

/**
 * Try all methods to set auth token
 */
export async function setupAuthentication(page: Page): Promise<boolean> {
  // Try environment variable first
  if (await setAuthTokenFromEnv(page)) {
    return true;
  }

  // Try manual token file
  if (await setAuthTokenFromFile(page)) {
    return true;
  }

  // Show instructions
  await setAuthTokenInteractive(page);
  return false;
}
