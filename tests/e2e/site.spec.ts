import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const path = process.env.TEST_PATH || '/';
const artifactPrefix = path === '/' ? 'final' : 'pages';
for (const width of [390, 430, 768, 1440]) {
  test(`${width}px: real city, content, assets, overflow and accessibility`, async ({ page }) => {
    const errors: string[] = [];
    const failures: string[] = [];
    page.on('pageerror', (error) => errors.push(error.message));
    page.on('console', (message) => {
      if (message.type() === 'error') errors.push(message.text());
    });
    page.on('response', (response) => {
      if (response.status() >= 400) failures.push(`${response.status()} ${response.url()}`);
    });
    await page.setViewportSize({ width, height: 1000 });
    await page.goto(`${path}?qa=1`);
    await page.evaluate(() => document.fonts.ready);
    await expect(page.locator('[data-city]')).toHaveAttribute('data-city-state', 'ready');
    await expect(page.locator('.service')).toHaveCount(5);
    await expect(page.locator('.publication')).toHaveCount(3);
    await expect(page.locator('.team-visual:visible')).toHaveCount(1);
    expect(await page.locator('.service a, .service button').count()).toBe(0);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
      true,
    );
    await page.screenshot({
      path: `artifacts/visual/${artifactPrefix}-${width}.png`,
      fullPage: true,
    });
    expect(
      (await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze())
        .violations,
    ).toEqual([]);
    expect(failures).toEqual([]);
    expect(errors).toEqual([]);
  });
}

test('mobile navigation works by keyboard, closes with Escape and anchors', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(path);
  const menu = page.getByRole('button', { name: 'Menú' });
  await menu.focus();
  await page.keyboard.press('Enter');
  await expect(menu).toHaveAttribute('aria-expanded', 'true');
  await page.keyboard.press('Tab');
  await expect(
    page
      .getByRole('navigation', { name: 'Navegación principal' })
      .getByRole('link', { name: 'Nosotros' }),
  ).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(menu).toBeFocused();
  await expect(menu).toHaveAttribute('aria-expanded', 'false');
  await menu.click();
  await page
    .getByRole('navigation', { name: 'Navegación principal' })
    .getByRole('link', { name: 'Servicios' })
    .click();
  await expect(menu).toHaveAttribute('aria-expanded', 'false');
  await expect(page).toHaveURL(/#servicios$/);
});

test('contact validates inputs and prepares an honest email draft', async ({ page }) => {
  await page.goto(path);
  await page.getByRole('button', { name: 'Preparar mensaje' }).click();
  expect(
    await page.locator('#contact-form').evaluate((form: HTMLFormElement) => form.checkValidity()),
  ).toBe(false);
  await page.getByRole('textbox', { name: 'Nombre', exact: true }).fill('Ana Pérez');
  await page.getByRole('textbox', { name: 'Email', exact: true }).fill('ana@example.com');
  await page.getByRole('textbox', { name: 'Tema', exact: true }).fill('Desarrollo de sistemas');
  await page.getByRole('button', { name: 'Preparar mensaje' }).click();
  await expect(page.getByRole('status')).toContainText('Tu borrador está listo');
  await expect(page.getByRole('status')).not.toContainText('enviado');
});

test('reduced motion keeps the real city and freezes decorative animation', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto(path);
  await expect(page.locator('[data-city]')).toHaveAttribute('data-city-state', 'ready');
  const running = await page.evaluate(
    () => document.getAnimations().filter((a) => a.playState === 'running').length,
  );
  expect(running).toBe(0);
  await page.screenshot({ path: 'artifacts/visual/reduced-motion.png', fullPage: true });
});

test('WebGL fallback is designed and nonempty', async ({ page }) => {
  await page.goto(`${path}?qa=1&webgl=off`);
  await expect(page.locator('[data-city]')).toHaveAttribute('data-city-state', 'fallback');
  await expect(page.locator('.city-fallback')).toBeVisible();
  expect(await page.locator('.city-fallback path').count()).toBeGreaterThan(20);
  await page.screenshot({ path: 'artifacts/visual/fallback.png', fullPage: true });
});

test('no JavaScript leaves content and email accessible', async ({ browser }) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 390, height: 844 },
  });
  const page = await context.newPage();
  await page.goto(`${process.env.TEST_URL || 'http://127.0.0.1:4321'}${path}`);
  await expect(page.getByRole('heading', { level: 1 })).toContainText('El encuentro');
  await expect(page.locator('.city-fallback')).toBeVisible();
  await expect(page.locator('.email-link')).toHaveAttribute('href', 'mailto:contacto@dixios.com');
  await expect(page.getByRole('navigation', { name: 'Navegación principal' })).toBeVisible();
  await context.close();
});

test('failed 3D asset request reveals a usable fallback', async ({ page }) => {
  await page.route('**/assets/city/*.glb', (route) => route.abort());
  await page.goto(`${path}?qa=1`);
  await expect(page.locator('[data-city]')).toHaveAttribute('data-city-state', 'fallback');
  await expect(page.locator('.city-fallback')).toBeVisible();
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
});

test('city adapts geometry and signal counts when viewport changes', async ({ page }) => {
  await page.goto(`${path}?qa=1`);
  const city = page.locator('[data-city]');
  await expect(city).toHaveAttribute('data-city-state', 'ready');
  await expect(city).toHaveAttribute('data-city-buildings', '30');
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(city).toHaveAttribute('data-city-buildings', '24');
  await expect(city).toHaveAttribute('data-city-signals', '3');
  await page.setViewportSize({ width: 1440, height: 1000 });
  await expect(city).toHaveAttribute('data-city-buildings', '30');
  await expect(city).toHaveAttribute('data-city-signals', '6');
});
