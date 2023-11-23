import { test, expect } from '@playwright/test';

import { GRAPHQL_ENDPOINT_URL, REGISTER_PER_PAGE } from '../src/constants';

test('Home Page - is showing the countries properly on a map and list', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('heading', { name: 'Countries' })).toBeVisible();
  await expect(page.getByText('Loading...')).toBeVisible();
  await expect(page.locator('canvas').nth(1)).toBeVisible();
  // change to list view
  await page.getByLabel('Show on cards list').click();
  await expect(page.getByLabel('Show on cards list')).toBeChecked();
  await expect(page.getByLabel('Countries list')).toBeVisible();
  await expect(page.locator('canvas').nth(1)).toBeHidden();
  await expect(page.getByRole('listitem')).toHaveCount(REGISTER_PER_PAGE);
});

test('Home Page - country detail info is being shown', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('heading', { name: 'Countries' })).toBeVisible();
  await expect(page.getByText('Loading...')).toBeVisible();
  // change to list view
  await page.getByLabel('Show on cards list').click();

  // select specific country
  const countryItem = await page.getByText('🇦🇷Argentina Capital: Buenos AiresCode AR');
  const countryDetailModal = await page.getByLabel('Country detail');

  await expect(countryDetailModal).toBeHidden();
  await expect(countryItem).toBeVisible();
  
  await countryItem.click();
  await expect(countryDetailModal).toBeVisible();
  await expect(countryDetailModal.getByRole('heading', { name: /Argentina flag emoji/i })).toBeVisible();
  await expect(countryDetailModal.getByRole('heading', { name: 'Capital: Buenos Aires' })).toBeVisible();
  await expect(countryDetailModal.getByRole('heading', { name: 'States' })).toBeVisible();
  await expect(countryDetailModal.getByRole('list', { name: 'States list' })).toBeVisible();
  await expect(countryDetailModal.getByRole('listitem')).toHaveCount(24);
});

test('Home Page - is showing the empty message when there are not data to show', async ({ page }) => {
  // mock data to not call the real API
  await page.route(GRAPHQL_ENDPOINT_URL, async route => {
    const json = { data: [] };
    await route.fulfill({ json });
  });

  await page.goto('/');

  await expect(page.locator('h1')).toHaveText('Countries');
  await expect(page.getByAltText('Man with a green t-shirt opening a purple folder')).toBeVisible();
  await expect(page.locator('h3')).toHaveText('Umm... There are no data to show');
})
