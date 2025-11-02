/**
 * Physical address information
 */
export interface Address {
  /** Street name and number */
  street: string
  /** City name */
  city: string
  /** Postal code */
  postalCode: string
  /** Country name */
  country: string
}

/**
 * Business hours for a specific day or range
 */
export interface BusinessHours {
  /** Day or day range (e.g., "Segunda - Sexta") */
  day: string
  /** Operating hours (e.g., "09:00 - 20:00") */
  hours: string
}

/**
 * Social media links
 */
export interface SocialMedia {
  /** Instagram profile URL */
  instagram?: string
  /** Facebook profile URL */
  facebook?: string
  /** Twitter profile URL */
  twitter?: string
}

/**
 * Contact information for the barbershop
 */
export interface ContactInfo {
  /** Phone number */
  phone: string
  /** Email address */
  email: string
  /** Physical address */
  address: Address
  /** Social media links */
  socialMedia: SocialMedia
  /** Business hours */
  businessHours: BusinessHours[]
}
