import { test, expect } from '@playwright/test';

test.describe('Restaurant Menu & Add to Cart', () => {
  test('should select restaurant, browse menu and add items to cart', async ({ page }) => {
    // Navigate to homepage
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1500);

    // Search for restaurants
    const searchInput = page.locator('input[type="text"]').first();
    await searchInput.fill('Pizza');
    await page.waitForTimeout(500);

    // Select first restaurant
    const firstRestaurant = page.getByRole('button', { name: /View menu for/ }).first();
    await firstRestaurant.click();

    // Wait for restaurant page to load
    await page.waitForURL(/\/restaurant\/\d+/);
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1500);

    // Verify restaurant details loaded
    const restaurantHeading = page.locator('h1').first();
    await expect(restaurantHeading).toBeVisible();

    // Add first menu item to cart
    const firstAddButton = page.getByRole('button', { name: /Add.*to cart/i }).first();
    await expect(firstAddButton).toBeVisible();
    await firstAddButton.click();
    await page.waitForTimeout(500);

    // Add second menu item if available
    const secondAddButton = page.getByRole('button', { name: /Add.*to cart/i }).nth(1);
    if (await secondAddButton.isVisible()) {
      await secondAddButton.click();
      await page.waitForTimeout(500);
    }
  });
});
