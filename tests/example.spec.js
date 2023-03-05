// @ts-check
const { test, expect } = require('@playwright/test');

test('has title Home', async ({ page }) => {
  await page.goto('http://localhost:3000/');

  await expect(page).toHaveTitle(/NodeAuth - Home/);
});

test('can go to Login', async ({ page }) => {
  await page.goto('http://localhost:3000/');

  await page.getByTestId('tLoginLink').click();

  await expect(page).toHaveURL(/.*login/);
});

test('can go to Signup', async ({ page }) => {
  await page.goto('http://localhost:3000/');

  await page.getByTestId('tSignUpLink').click();

  await expect(page).toHaveURL(/.*signup/);
});
