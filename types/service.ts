/**
 * Barbershop service offering
 */
export interface Service {
  /** Service identifier/key for translations */
  id: string
  /** Service name (translation key or fallback) */
  name: string
  /** Brief description (translation key or fallback) */
  description: string
  /** Icon identifier */
  icon: 'checkmark'
  /** Detailed description for expanded view (translation key or fallback) */
  detailedDescription?: string
  /** Price as formatted string (e.g., "€25") */
  price?: string
  /** Duration as formatted string (e.g., "30min") */
  duration?: string
}
