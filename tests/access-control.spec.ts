import { test, expect } from '@playwright/test';

[
    { name: 'logged-out user visiting /inventory.html', url: '/inventory.html', expected: "'/inventory.html' when you are logged in" },
    { name: 'logged-out user visiting /dynamic-catalog-lazy-load.html', url: '/dynamic-catalog-lazy-load.html', expected: "'/dynamic-catalog-lazy-load.html' when you are logged in" },
    { name: 'logged-out user visiting /dynamic-catalog-spinner.html', url: '/dynamic-catalog-spinner.html', expected: "'/dynamic-catalog-spinner.html' when you are logged in" },
    { name: 'logged-out user visiting /dynamic-catalog-slider.html', url: '/dynamic-catalog-slider.html', expected: "'/dynamic-catalog-slider.html' when you are logged in" },
    { name: 'logged-out user visiting /cart.html', url: '/cart.html', expected: "'/cart.html' when you are logged in" },
    { name: 'logged-out user visiting /checkout-step-one.html', url: '/checkout-step-one.html', expected: "'/checkout-step-one.html' when you are logged in" },
    { name: 'logged-out user visiting /checkout-step-two.html', url: '/checkout-step-two.html', expected: "'/checkout-step-two.html' when you are logged in" },
    { name: 'logged-out user visiting /checkout-complete.html', url: '/checkout-complete.html', expected:"'/checkout-complete.html' when you are logged in" },
].forEach(({ name, url, expected }) => {
  test.describe('access control', () => {
      test(`${name}`, async ({ page }) => {

          await page.goto(`${url}`)

          await expect(page).toHaveURL('/')
          await expect(page.getByRole('alert')).toBeVisible()
          await expect(page.getByRole('alert')).toContainText(`${expected}`)
      })
  });

  })
