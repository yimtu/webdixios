import { test, expect } from '@playwright/test';

const base = process.env.TEST_PATH || '/';

test('brand icons load at stable URLs in browser and Apple formats', async ({ page, request }) => {
  await page.goto(base);
  await expect(page.locator('link[rel="icon"][type="image/png"]')).toHaveAttribute(
    'href',
    `${base}favicon.png`,
  );
  await expect(page.locator('link[rel="apple-touch-icon"]')).toHaveAttribute(
    'href',
    `${base}apple-touch-icon.png`,
  );
  for (const [name, size] of [
    ['favicon.png', 96],
    ['apple-touch-icon.png', 180],
  ] as const) {
    const response = await request.get(`${base}${name}`);
    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toContain('image/png');
    const dimensions = await page.evaluate(async (url) => {
      const image = new Image();
      image.src = url;
      await image.decode();
      return [image.naturalWidth, image.naturalHeight];
    }, `${base}${name}`);
    expect(dimensions).toEqual([size, size]);
  }
});

test('missing-page document offers useful navigation without being indexed', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(`${base}404.html`);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('No encontramos esta página');
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex, follow');
  await expect(page.getByRole('link', { name: 'Volver al inicio', exact: true })).toHaveAttribute(
    'href',
    base,
  );
  await expect(page.getByRole('link', { name: 'Ver publicaciones' })).toHaveAttribute(
    'href',
    `${base}#publicaciones`,
  );
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.screenshot({ path: 'artifacts/visual/missing-page-mobile.png' });
});
