import { createI18n } from 'vue-i18n'
import pt from './locales/pt.json'
import ptBR from './locales/pt-BR.json'
import en from './locales/en.json'
import es from './locales/es.json'

/**
 * Detect the user's preferred language from browser settings
 * Returns one of our supported locales: 'pt', 'pt-BR', 'en', or 'es'
 */
function detectUserLocale(): string {
  // Check if user has previously selected a language
  const savedLocale = localStorage.getItem('locale')
  if (savedLocale) {
    return savedLocale
  }

  // Get browser language
  const browserLocale = navigator.language || (navigator as any).userLanguage

  // Map browser locale to our supported locales
  if (browserLocale.startsWith('pt-BR') || browserLocale === 'pt_BR') {
    return 'pt-BR'
  } else if (browserLocale.startsWith('pt')) {
    return 'pt'
  } else if (browserLocale.startsWith('es')) {
    return 'es'
  } else if (browserLocale.startsWith('en')) {
    return 'en'
  }

  // Default to Portuguese (Portugal)
  return 'pt'
}

const i18n = createI18n({
  legacy: false,
  locale: detectUserLocale(),
  fallbackLocale: 'pt',
  messages: {
    pt,
    'pt-BR': ptBR,
    en,
    es,
  },
})

export default i18n
