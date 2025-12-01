<script setup lang="ts">
import AppHeader from '~/components/layout/AppHeader.vue'
import AppFooter from '~/components/layout/AppFooter.vue'
import AppLoader from '~/components/ui/AppLoader.vue'
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
