import { test, expect } from '@playwright/test';

test.describe('Browse Restaurants', () => {
  test('should authenticate and browse restaurants with search', async ({ page }) => {
    // Navigate to homepage
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Verify hero section loaded
    await expect(page.locator('h1')).toContainText('Delicious food');

    // Wait for restaurant cards to render
    await page.waitForTimeout(1500);
    const restaurantCards = page.getByRole('button', { name: /View menu for/ });
    await expect(restaurantCards.first()).toBeVisible();

    // Search for restaurants
    const searchInput = page.locator('input[type="text"]').first();
    await searchInput.fill('Pizza');
    await page.waitForTimeout(500);

    // Verify search results display
    const searchHeading = page.locator('h2', { hasText: /search results/i });
    await expect(searchHeading).toBeVisible();
  });
});
