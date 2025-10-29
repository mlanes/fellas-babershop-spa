import type { Service } from '@/types/service'

/**
 * Placeholder service data for Fellas Barbershop
 * This data will be replaced with real service information
 */
export const services: Service[] = [
  {
    name: 'Corte de Cabelo',
    description: 'Corte profissional adaptado ao seu estilo',
    icon: 'checkmark',
    detailedDescription:
      'Corte de cabelo masculino personalizado com técnicas modernas e clássicas. Inclui lavagem, corte, styling e acabamento profissional.',
    price: '€25',
    duration: '45min',
  },
  {
    name: 'Barba & Bigode',
    description: 'Modelagem e cuidado completo da barba',
    icon: 'checkmark',
    detailedDescription:
      'Serviço completo de barbear incluindo preparação da pele, modelagem de barba e bigode, acabamento e hidratação.',
    price: '€20',
    duration: '30min',
  },
  {
    name: 'Corte + Barba',
    description: 'Pacote completo de grooming masculino',
    icon: 'checkmark',
    detailedDescription:
      'Combinação perfeita de corte de cabelo e barba. Serviço completo para um visual impecável.',
    price: '€40',
    duration: '75min',
  },
  {
    name: 'Tratamento Capilar',
    description: 'Cuidados especiais para o cabelo',
    icon: 'checkmark',
    detailedDescription:
      'Tratamento profissional para hidratação, fortalecimento e revitalização do cabelo.',
    price: '€30',
    duration: '40min',
  },
]
