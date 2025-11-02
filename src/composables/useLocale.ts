import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

export type Locale = 'pt' | 'pt-BR' | 'en'

export function useLocale() {
  const { locale, t } = useI18n()

  const currentLocale = computed<Locale>(() => locale.value as Locale)

  const setLocale = (newLocale: Locale) => {
    locale.value = newLocale
    localStorage.setItem('locale', newLocale)
  }

  const toggleLocale = () => {
    const locales: Locale[] = ['pt', 'pt-BR', 'en']
    const currentIndex = locales.indexOf(currentLocale.value)
    const nextIndex = (currentIndex + 1) % locales.length
    setLocale(locales[nextIndex])
  }

  return {
    locale: currentLocale,
    setLocale,
    toggleLocale,
    t,
  }
}
