import { test, expect } from '@playwright/test';

const base = process.env.TEST_PATH || '/';

test('home exposes search identity and a crawlable sitemap', async ({ page, request }) => {
  await page.goto(base);
  await expect(page.locator('meta[property="og:site_name"]')).toHaveAttribute('content', 'Dixios');
  const identity = JSON.parse(await page.locator('script[type="application/ld+json"]').innerText());
  expect(identity['@type']).toBe('WebSite');
  expect(identity.name).toBe('Dixios');
  const robots = await request.get(`${base}robots.txt`);
  expect(robots.status()).toBe(200);
  expect(await robots.text()).toContain('Sitemap:');
  const sitemap = await request.get(`${base}sitemap.xml`);
  expect(sitemap.status()).toBe(200);
  expect(await sitemap.text()).toContain('<loc>');
});

test('system nodes stay opaque and move with their connections', async ({ page }) => {
  await page.goto(`${base}?qa=1`);
  const nodes = page.locator('.visual-0 .cube');
  await expect(nodes).toHaveCount(4);
  for (const node of await nodes.all()) {
    expect(await node.evaluate((el) => getComputedStyle(el).opacity)).toBe('1');
    expect(await node.evaluate((el) => getComputedStyle(el).animationName)).toBe('none');
  }
  await expect(page.locator('.visual-0 .system-assembly')).toHaveCount(1);
});

test('stalled city assets never hide content and loading expires', async ({ page }) => {
  await page.route('**/assets/city/*.glb', () => new Promise(() => {}));
  await page.goto(base, { waitUntil: 'domcontentloaded' });
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  await expect(page.locator('.city-fallback')).toBeVisible();
  await expect(page.locator('[data-city]')).toHaveAttribute('data-city-state', 'fallback', {
    timeout: 16_000,
  });
});
