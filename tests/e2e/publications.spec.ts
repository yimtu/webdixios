import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const base = process.env.TEST_PATH || '/';
const titles = [
  'Educación universitaria y cambio tecnológico en México',
  'Manual de prompting para principiantes',
  '¿Qué son las humanidades digitales?',
];

test('publications have no dates and link to accessible published articles', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(`${base}?qa=1`);
  await expect(page.locator('#publicaciones time')).toHaveCount(0);
  for (const title of titles) {
    const link = page.getByRole('link', { name: title, exact: true });
    await expect(link).toHaveAttribute('href', new RegExp(`^${base}publicaciones/`));
    await link.focus();
    await page.keyboard.press('Enter');
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(title);
    await expect(page.locator('meta[name="robots"][content*="noindex"]')).toHaveCount(0);
    const article = page.locator('.article-body');
    expect((await article.innerText()).trim().split(/\s+/).length).toBeGreaterThan(700);
    expect(await article.locator('h2').count()).toBeGreaterThan(3);
    expect(await article.innerText()).not.toMatch(/\b(Irán|China|Rusia|Guardia Nacional)\b/i);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /\S.{60,}/);
    await expect(page.locator('time')).toHaveCount(0);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
      true,
    );
    expect(
      (await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze())
        .violations,
    ).toEqual([]);
    await page.getByRole('link', { name: 'Volver a publicaciones' }).click();
    await expect(page).toHaveURL(new RegExp(`${base}#publicaciones$`));
  }
});

test('published articles are included in the sitemap', async ({ request }) => {
  const response = await request.get(`${base}sitemap.xml`);
  expect(response.ok()).toBe(true);
  expect((await response.text()).match(/<loc>/g)).toHaveLength(4);
});

for (const width of [390, 430, 768, 1440]) {
  test(`article reading layout at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto(base);
    for (const [i, title] of titles.entries()) {
      await page.getByRole('link', { name: title, exact: true }).click();
      const body = page.locator('.article-body');
      expect(
        await body
          .locator('h2')
          .first()
          .evaluate((el) => parseFloat(getComputedStyle(el).fontSize)),
      ).toBeLessThanOrEqual(34);
      expect(
        await body
          .locator('a')
          .first()
          .evaluate((el) => getComputedStyle(el).textDecorationLine),
      ).toContain('underline');
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
        true,
      );
      await page.evaluate(() => document.fonts.ready);
      await page.screenshot({
        path: `artifacts/visual/article-${i}-${width}.png`,
        fullPage: false,
      });
      await page.getByRole('link', { name: 'Volver a publicaciones' }).click();
    }
  });
}
