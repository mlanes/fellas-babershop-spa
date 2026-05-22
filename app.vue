<script setup lang="ts">
import AppHeader from '~/components/layout/AppHeader.vue'
import AppFooter from '~/components/layout/AppFooter.vue'
import AppLoader from '~/components/ui/AppLoader.vue'

const { locale } = useI18n()

const localeToLang: Record<string, string> = {
  pt: 'pt-PT',
  en: 'en-US',
  es: 'es-ES',
  fr: 'fr-FR',
}

useHead({
  htmlAttrs: {
    lang: computed(() => localeToLang[locale.value] ?? locale.value),
  },
})
</script>

<template>
  <AppLoader />
  <div id="app">
    <AppHeader />
    <NuxtPage />
    <AppFooter />
  </div>
</template>

<style scoped lang="scss">
#app {
  min-height: 100vh;
}
</style>
