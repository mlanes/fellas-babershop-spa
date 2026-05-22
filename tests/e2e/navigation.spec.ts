import { expect, test } from '@playwright/test'
import { gotoAndReady } from './helpers'

// Titles on the coming-soon pages are localized, so match either the
// Portuguese or English form depending on the test browser's locale.
const routes = [
  { path: '/', title: /Fellas Barbers/i },
  { path: '/services', title: /(Serviços|Services)/i },
  { path: '/gallery', title: /(Galeria|Gallery)/i },
  { path: '/contacts', title: /(Contactos|Contacts)/i },
  { path: '/score', title: /Score/i },
]

test.describe('Navigation', () => {
  for (const { path, title } of routes) {
    test(`${path} responds 200, renders title, and shows header`, async ({ page }) => {
      const response = await page.goto(path)
      expect(response?.status()).toBe(200)
      await expect(page).toHaveTitle(title)
      await expect(page.locator('header.header')).toBeVisible()
    })
  }

  test('html element has a lang attribute', async ({ page }) => {
    await gotoAndReady(page, '/')
    await expect(page.locator('html')).toHaveAttribute('lang', /^(pt|en|es|fr)/, {
      timeout: 20_000,
    })
  })
})
