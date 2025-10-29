/**
 * Navigation item for header and footer links
 */
export interface NavigationItem {
  /** Display label (in Portuguese) */
  label: string
  /** Target section ID or route path */
  target: string
  /** Whether this navigation item is currently active */
  isActive: boolean
}
