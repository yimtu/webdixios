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
  if (!isMobile) {
    await page.waitForTimeout(3500);
    const status = await page.locator('[data-city-scene]').getAttribute('data-city-status');
    expect(['ready', 'fallback', 'poster']).toContain(status);
  }

  expect(pageErrors).toEqual([]);
  await page.screenshot({
    path: testInfo.outputPath(`hero-${testInfo.project.name}.png`),
    fullPage: false
  });
});
