import { createI18n } from 'vue-i18n'
import pt from './locales/pt.json'
import en from './locales/en.json'
import es from './locales/es.json'
import fr from './locales/fr.json'

/**
 * Detect the user's preferred language from browser settings
 * Returns one of our supported locales: 'pt', 'en', 'es', or 'fr'
 * Any pt-* variant falls back to 'pt' (Portugal)
 * Any unmapped language falls back to 'en' (English)
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
  if (browserLocale.startsWith('pt')) {
    return 'pt'
  } else if (browserLocale.startsWith('es')) {
    return 'es'
  } else if (browserLocale.startsWith('fr')) {
    return 'fr'
  } else if (browserLocale.startsWith('en')) {
    return 'en'
  }

  // Default to English for any other language
  return 'en'
}

const i18n = createI18n({
  legacy: false,
  locale: detectUserLocale(),
  fallbackLocale: 'en',
  messages: {
    pt,
    en,
    es,
    fr,
  },
})

export default i18n
