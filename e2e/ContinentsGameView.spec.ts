import { test, expect } from '@playwright/test';

import { COUNTRIES_TO_DRAG, GRAPHQL_ENDPOINT_URL } from '../src/constants';
import { MOCK_CONTINENTS, MOCK_CONTINENTS_COUNTRIES } from '../src/mocks/data';

test('Continents Game - is rendering the UI properly', async ({ page }) => {
  await page.goto('/continents-game');

  await expect(page.getByRole('heading', { name: 'Continents Game' })).toBeVisible();
  await expect(page.getByText('Loading...')).toBeVisible();
  await expect(page.getByText('The idea of this game is: you')).toBeVisible();
  await expect(page.getByLabel('Hard Mode')).toBeChecked();
  await expect(page.getByLabel('Africa drop area')).toBeVisible();
  await expect(page.getByLabel('Europe drop area')).toBeVisible();
  await expect(page.getByLabel('Asia drop area')).toBeVisible();
  await expect(page.getByLabel('South America drop area')).toBeVisible();
  await expect(page.getByLabel('Drag country item')).toHaveCount(COUNTRIES_TO_DRAG);
});

test('Continents Game - when I click the check button it shows me the quantity of countries bad positioned', async ({ page }) => {
  // mock data to not call the real API
  await page.route(GRAPHQL_ENDPOINT_URL, async route => {
    const json = { data: { continents: MOCK_CONTINENTS.slice(-2), countries: MOCK_CONTINENTS_COUNTRIES.slice(0, 2) }};
    await route.fulfill({ json });
  });

  await page.goto('/continents-game');

  await expect(page.getByRole('heading', { name: 'Continents Game' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Let\'s Check 🤞' })).toBeDisabled();

  const countriesCards = await page.getByLabel('Drag country item');
  const dropArea = await page.getByLabel('Oceania drop area');

  await expect(countriesCards).toHaveCount(2);
  await expect(dropArea).toBeVisible();

  await countriesCards.first().dragTo(dropArea);
  await countriesCards.last().dragTo(dropArea);
  await page.getByRole('button', { name: 'Let\'s Check 🤞' }).click();
  
  await expect(page.getByRole('heading', { name: 'There are 2 countries that' })).toBeVisible();
});

test('Continents Game - when I click the check button it shows me the win button message', async ({ page }) => {
  // mock data to not call the real API
  await page.route(GRAPHQL_ENDPOINT_URL, async route => {
    const json = { data: { continents: MOCK_CONTINENTS.slice(-2), countries: MOCK_CONTINENTS_COUNTRIES.slice(0, 3) }};
    await route.fulfill({ json });
  });

  await page.goto('/continents-game');

  await expect(page.getByRole('heading', { name: 'Continents Game' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Let\'s Check 🤞' })).toBeDisabled();

  const countriesCards = await page.getByLabel('Drag country item').all();
  const dropArea = await page.getByLabel('South America drop area');

  await expect(countriesCards.length).toBe(3);
  await expect(dropArea).toBeVisible();

  await countriesCards[0].dragTo(dropArea);
  await countriesCards[1].dragTo(dropArea);
  await countriesCards[2].dragTo(dropArea);
  await page.getByRole('button', { name: 'Let\'s Check 🤞' }).click();
  
  await expect(page.getByRole('button', { name: '¡Yay you won 🥳! Play Again' })).toBeVisible();
});

test('Continents Game - is showing the empty message when there are not data to show', async ({ page }) => {
  // mock data to not call the real API
  await page.route(GRAPHQL_ENDPOINT_URL, async route => {
    const json = { data: [] };
    await route.fulfill({ json });
  });

  await page.goto('/continents-game');

  await expect(page.getByRole('heading', { name: 'Continents Game' })).toBeVisible();
  await expect(page.getByAltText('Man with a green t-shirt opening a purple folder')).toBeVisible();
  await expect(page.locator('h3')).toHaveText('Umm... There are no data to show');
});
