import { test, expect } from '@playwright/test';

test('About Page - form data is shown when all fields are ok', async ({ page }) => {
  await page.goto('/about');

  await expect(page.getByRole('heading', { name: 'About' })).toBeVisible();

  // inputs
  await page.locator('#fullName').fill('test');
  await page.locator('#email').fill('jane@email.io');
  await page.locator('#countriesVisited').fill('5');
  await page.locator('#countriesThisYear').fill('2');
  await page.locator('#password').fill('qwerty123');
  await page.locator('#randomContent').fill('Random test');

  // selects
  await page.locator('#favoriteCountry').selectOption('AR');
  await page.locator('#leastFavoriteCountry').selectOption('VE');

  // checkboxes and radio
  await page.locator('label').filter({ hasText: /Mexican/i }).check();
  await page.locator('label').filter({ hasText: /Argentina/i }).check();
  await page.locator('label').filter({ hasText: /Bolivia/i }).check();
  await page.locator('label').filter({ hasText: /Chile/i }).check();
  await page.locator('label').filter({ hasText: /Ecuador/i }).check();

  // check if everything is ok
  await page.getByRole('button', { name: 'Let\'s Go' }).click();
  await expect(page.getByRole('heading', { name: 'Form is Valid 🥳' })).toBeVisible();
  await expect(page.getByTestId('form-result')).toBeVisible();
});
