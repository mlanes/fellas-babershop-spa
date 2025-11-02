import { computed } from 'vue'
import { services } from '@/data/services'
import { useLocale } from '@/composables/useLocale'
import type { Service } from '@/types/service'
import { useI18n } from 'vue-i18n'

/**
 * Composable to get translated services
 * Falls back to original Portuguese text if translation key doesn't exist
 */
export function useTranslatedServices() {
  const { locale } = useLocale()
  const { t, te } = useI18n() // te = translation exists

  const translatedServices = computed<Service[]>(() => {
    return services.map((service) => {
      // If service has an ID, try to get translation
      if (service.id) {
        const nameKey = `servicesList.${service.id}.name`
        const descKey = `servicesList.${service.id}.description`
        const detailKey = `servicesList.${service.id}.detailedDescription`

        return {
          ...service,
          name: te(nameKey) ? t(nameKey) : service.name,
          description: te(descKey) ? t(descKey) : service.description,
          detailedDescription: service.detailedDescription
            ? te(detailKey)
              ? t(detailKey)
              : service.detailedDescription
            : undefined,
        }
      }

      // No ID, return original Portuguese
      return service
    })
  })

  return {
    services: translatedServices,
    locale,
  }
}
