/**
 * Barbershop service offering
 */
export interface Service {
  /** Service name (in Portuguese) */
  name: string
  /** Brief description (in Portuguese) */
  description: string
  /** Icon identifier */
  icon: 'checkmark'
  /** Detailed description for expanded view (in Portuguese) */
  detailedDescription?: string
  /** Price as formatted string (e.g., "€25") */
  price?: string
  /** Duration as formatted string (e.g., "30min") */
  duration?: string
}
