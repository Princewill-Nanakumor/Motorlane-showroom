import { expect, test } from '@playwright/test';

test.describe('Car showroom', () => {
  test('homepage loads vehicles', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByRole('heading', { name: 'Motorlane' })).toBeVisible();
    await expect(page.getByRole('searchbox', { name: /search vehicles/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /view details/i }).first()).toBeVisible({
      timeout: 15_000,
    });
  });

  test('search filters the vehicle list', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('link', { name: /view details/i }).first()).toBeVisible({
      timeout: 15_000,
    });

    await page.getByRole('searchbox', { name: /search vehicles/i }).fill('Durango');

    await expect(page.getByRole('heading', { name: 'Durango SXT RWD' })).toBeVisible();
    await expect(page.getByText(/1 vehicle$/)).toBeVisible();
  });

  test('navigates to vehicle details', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: /view details/i }).first().click();

    await expect(page).toHaveURL(/\/vehicles\/\d+/);
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await expect(
      page.getByRole('heading', { name: 'Vehicle information' }),
    ).toBeVisible();
    await expect(
      page.getByRole('heading', { name: 'Leave a comment' }),
    ).toBeVisible();
  });

  test('submits a comment', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: /view details/i }).first().click();

    await page.getByRole('textbox', { name: 'Name' }).fill('Playwright Tester');
    await page
      .getByRole('textbox', { name: 'Comment' })
      .fill('Smooth ride and clean interior.');
    await page.getByRole('button', { name: 'Add comment' }).click();

    await expect(page.getByText('Playwright Tester')).toBeVisible();
    await expect(page.getByText('Smooth ride and clean interior.')).toBeVisible();
    await expect(page.getByText('Yours')).toBeVisible();
  });

  test('comment survives page refresh', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: /view details/i }).first().click();

    const uniqueName = `Persist ${Date.now()}`;
    const uniqueComment = `Persisted comment ${Date.now()}`;

    await page.getByRole('textbox', { name: 'Name' }).fill(uniqueName);
    await page.getByRole('textbox', { name: 'Comment' }).fill(uniqueComment);
    await page.getByRole('button', { name: 'Add comment' }).click();
    await expect(page.getByText(uniqueComment)).toBeVisible();

    await page.reload();

    await expect(page.getByText(uniqueName)).toBeVisible({ timeout: 15_000 });
    await expect(page.getByText(uniqueComment)).toBeVisible();
  });

  test('shows validation errors for empty comment form', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: /view details/i }).first().click();

    await page.getByRole('button', { name: 'Add comment' }).click();

    await expect(page.getByText('Name is required')).toBeVisible();
    await expect(page.getByText('Comment is required')).toBeVisible();
  });
});
