import { test, expect } from '@playwright/test';

import { MAX_MOVEMENTS } from '../src/constants';

test('Flipping Game - data is being shown properly', async ({ page }) => {
  await page.goto('/flipping-game');

  await expect(page.getByRole('heading', { name: 'Flipping Game' })).toBeVisible();
  await expect(page.getByText('The idea of this memory game')).toBeVisible();
  await expect(page.getByText('Loading...')).toBeVisible();

  await expect(page.getByRole('heading', { name: `Movements: ${MAX_MOVEMENTS}` })).toBeVisible();
  await expect(page.getByRole('button')).toHaveCount(25);
  
  const firstCard = await page.getByRole('button').first();
  await firstCard.click();
  await expect(await firstCard.getAttribute('class')).toContain('picked pointer-events-none');
});

test('Flipping Game - is showing the empty message when there are not data to show', async ({ page }) => {
  // mock data to not call the real API
  await page.route('https://countries.trevorblades.com/graphql', async route => {
    const json = { data: [] };
    await route.fulfill({ json });
  });

  await page.goto('/flipping-game');

  await expect(page.getByRole('heading', { name: 'Flipping Game' })).toBeVisible();
  await expect(page.getByRole('button')).toHaveCount(0);
  await expect(page.getByRole('img', { name: 'Man with a green t-shirt' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Umm... There are no data to show' })).toBeVisible();
});

test('Flipping Game - is showing the error message', async ({ page }) => {
  await page.route('https://countries.trevorblades.com/graphql', async route => {
    await route.abort();
  });

  await page.goto('/flipping-game');

  await expect(page.getByRole('heading', { name: 'Flipping Game' })).toBeVisible();
  await expect(page.getByRole('button')).toHaveCount(0);
  await expect(page.getByRole('img', { name: 'Man with a green t-shirt' })).toBeVisible();
});
