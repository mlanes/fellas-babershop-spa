<script setup lang="ts">
import { RouterView } from 'vue-router'
import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
</script>

<template>
  <div id="app">
    <AppHeader />
    <RouterView />
    <AppFooter />
  </div>
</template>

<style scoped lang="scss">
#app {
  min-height: 100vh;
}
</style>
