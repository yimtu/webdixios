import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const base = process.env.TEST_PATH || '/';
const titles = [
  'Educación universitaria y cambio tecnológico en México',
  'Manual de prompting para principiantes',
  '¿Qué son las humanidades digitales?',
];

test('publications have no dates and link to accessible empty editorial pages', async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(`${base}?qa=1`);
  await expect(page.locator('#publicaciones time')).toHaveCount(0);
  for (const title of titles) {
    const link = page.getByRole('link', { name: title, exact: true });
    await expect(link).toHaveAttribute('href', new RegExp(`^${base}publicaciones/`));
    await link.focus();
    await page.keyboard.press('Enter');
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(title);
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex, follow');
    await expect(page.locator('.article-body')).toBeEmpty();
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
