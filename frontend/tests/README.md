# Playwright E2E Test - Browse & Order Flow

This test covers the complete user journey from browsing restaurants to managing cart items.

## Test Flow

1. ✅ Browse restaurants on homepage
2. ✅ Search for "Pizza"
3. ✅ Click on a restaurant
4. ✅ View menu items
5. ✅ Add items to cart
6. ✅ Navigate to cart page
7. ✅ Increase item quantity
8. ✅ Decrease item quantity
9. ✅ Verify cart total
10. ✅ Verify cart persists across navigation

## Running the Test

Make sure your backend is running on `http://localhost:5000` first, then:

```bash
# Run test in headless mode
npm run test:e2e

# Run test with visible browser (recommended to see it in action)
npm run test:e2e:headed

# Run test with UI mode (interactive)
npm run test:e2e:ui
```

## View Results

After running tests:
```bash
npx playwright show-report
```

## Notes

- The test automatically starts the dev server
- Uses Chromium browser only for speed
- Includes console logs showing each step completion
- Takes screenshots on failure
- Waits are added for API calls and state updates
