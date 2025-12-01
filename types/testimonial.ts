/**
 * Customer testimonial with multi-language support
 */
export interface Testimonial {
  /** Customer's full name */
  customerName: string
  /** Rating from 1 to 5 stars */
  rating: number
  /** Testimonial text in original language */
  testimonialText: string
  /** Optional date of testimonial */
  date?: string
  /** Optional URL to customer avatar image (if not provided, initials will be shown) */
  avatarUrl?: string
  /** Translations of the testimonial text */
  translations?: {
    /** English translation */
    en?: string
    /** Portuguese translation */
    pt?: string
    /** Spanish translation */
    es?: string
  }
}
