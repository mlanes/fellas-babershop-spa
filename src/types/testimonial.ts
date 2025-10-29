/**
 * Customer testimonial
 */
export interface Testimonial {
  /** Customer's full name */
  customerName: string
  /** URL to customer avatar image */
  avatarUrl: string
  /** Rating from 1 to 5 stars */
  rating: number
  /** Testimonial text (in Portuguese) */
  testimonialText: string
  /** Optional date of testimonial */
  date?: string
}
