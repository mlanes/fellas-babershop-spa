import { expect, test } from '@playwright/test'
import { gotoAndReady } from './helpers'

test.describe('Home page', () => {
  test('loads with the expected title', async ({ page }) => {
    await page.goto('/')
    await expect(page).toHaveTitle(/Fellas/i)
  })

  test('renders the hero and key sections', async ({ page }) => {
    await gotoAndReady(page, '/')

    await expect(page.locator('header')).toBeVisible()
    await expect(page.locator('footer')).toBeVisible()

    const sections = ['#about', '#services', '#gallery', '#barbershops']
    for (const id of sections) {
      await expect(page.locator(id)).toHaveCount(1)
    }
  })

  test('has at least one external booking link', async ({ page }) => {
    await gotoAndReady(page, '/')
    const bookingLinks = page.locator('a[href*="appbarber"], a[href*="booking"]')
    await expect(bookingLinks.first()).toBeVisible()
  })
})
