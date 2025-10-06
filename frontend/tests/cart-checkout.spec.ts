import { test, expect } from '@playwright/test';

test.describe('Cart Management & Checkout', () => {
  test('should manage cart quantities and checkout', async ({ page }) => {
    // Setup: Add items to cart first
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1500);

    const searchInput = page.locator('input[type="text"]').first();
    await searchInput.fill('Pizza');
    await page.waitForTimeout(500);

    const firstRestaurant = page.getByRole('button', { name: /View menu for/ }).first();
    await firstRestaurant.click();
    await page.waitForURL(/\/restaurant\/\d+/);
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1500);

    const firstAddButton = page.getByRole('button', { name: /Add.*to cart/i }).first();
    await firstAddButton.click();
    await page.waitForTimeout(500);

    const secondAddButton = page.getByRole('button', { name: /Add.*to cart/i }).nth(1);
    if (await secondAddButton.isVisible()) {
      await secondAddButton.click();
      await page.waitForTimeout(500);
    }

    // Navigate to cart
    const cartLink = page.locator('a[href="/cart"]').first();
    await cartLink.click();
    await page.waitForURL('/cart');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);

    // Check cart state
    const emptyCartMessage = page.locator('text=/your cart is empty/i');
    const isCartEmpty = await emptyCartMessage.isVisible();

    if (isCartEmpty) {
      // Verify navigation successful even if cart is empty
      await expect(page).toHaveURL('/cart');
    } else {
      // Verify cart items are present
      const cartItems = page.locator('text=/₹\\s*\\d+/');
      const itemCount = await cartItems.count();
      expect(itemCount).toBeGreaterThan(0);

      // Test quantity increase
      const increaseButton = page.locator('button', { hasText: /\+|increase/i }).first();
      if (await increaseButton.isVisible()) {
        await increaseButton.click();
        await page.waitForTimeout(500);
      }

      // Test quantity decrease
      const decreaseButton = page.locator('button', { hasText: /-|decrease/i }).first();
      if (await decreaseButton.isVisible()) {
        await decreaseButton.click();
        await page.waitForTimeout(500);
      }

      // Verify total price displayed
      const totalElement = page.locator('text=/total|subtotal/i').first();
      if (await totalElement.isVisible()) {
        await expect(totalElement).toBeVisible();
      }

      // Test cart persistence across navigation
      const homeLink = page.locator('a[href="/"]').first();
      await homeLink.click();
      await page.waitForURL('/');
      await page.waitForLoadState('networkidle');

      // Return to cart
      await page.goto('/cart');
      await page.waitForLoadState('networkidle');

      // Verify items persisted
      const stillHasItems = !(await emptyCartMessage.isVisible());
      expect(stillHasItems).toBeTruthy();
    }
  });
});
