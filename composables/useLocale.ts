export type Locale = 'pt' | 'en' | 'es' | 'fr'

export function useLocale() {
  const { locale, t, setLocale: i18nSetLocale } = useI18n()

  const currentLocale = computed<Locale>(() => locale.value as Locale)

  const setLocale = (newLocale: Locale) => {
    i18nSetLocale(newLocale)
  }

  const toggleLocale = () => {
    const locales: Locale[] = ['pt', 'en', 'es', 'fr']
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
