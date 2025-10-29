import type { ContactInfo } from '@/types/contact'

/**
 * Contact information for Fellas Barbershop
 */
export const contactInfo: ContactInfo = {
  phone: '+351 912 345 678',
  email: 'info@fellasbarbershop.pt',
  address: {
    street: 'Rua Barbeiro',
    city: 'Lisboa',
    postalCode: '1000-000',
    country: 'Portugal',
  },
  socialMedia: {
    instagram: 'https://instagram.com/fellasbarbershop',
  },
  businessHours: [
    { day: 'Segunda - Sexta', hours: '09:00 - 20:00' },
    { day: 'Sábado', hours: '09:00 - 18:00' },
    { day: 'Domingo', hours: 'Fechado' },
  ],
}
