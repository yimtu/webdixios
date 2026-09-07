import { test, expect } from '@playwright/test';

test('hero contract', async ({ page }, testInfo) => {
  const pageErrors = [];
  page.on('pageerror', (error) => pageErrors.push(error.message));

  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1, name: 'El encuentro de la tecnología con lo humano' })).toBeVisible();
  await expect(page.getByText('Dixios es una firma de inteligencia, transformación y tecnología institucional.', { exact: false })).toBeVisible();
  await expect(page.locator('[data-city-scene]')).toBeVisible();
  await expect(page.locator('.hero-city__poster')).toBeVisible();

  const isMobile = testInfo.project.name.includes('mobile');
  if (isMobile) {
    await expect(page.locator('[data-city-scene]')).toHaveAttribute('data-city-status', 'fallback');
  } else {
    await expect(page.locator('[data-city-scene]')).toHaveAttribute('data-city-status', 'ready', { timeout: 15_000 });
  }

  expect(pageErrors).toEqual([]);
  await page.screenshot({
    path: testInfo.outputPath(`hero-${testInfo.project.name}.png`),
    fullPage: false
  });
});
