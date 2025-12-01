/**
 * Navigation item for header and footer links
 */
export interface NavigationItem {
  /** Display label (i18n key) */
  label: string
  /** Anchor link or route path */
  href: string
  /** Whether this navigation item is currently active */
  isActive?: boolean
}
