<script setup lang="ts">
/**
 * HomeView - Main landing page with all sections
 */
import HeroSection from '@/components/sections/HeroSection.vue'
import AboutSection from '@/components/sections/AboutSection.vue'
import ServicesSection from '@/components/sections/ServicesSection.vue'
import ExpandedServicesSection from '@/components/sections/ExpandedServicesSection.vue'
import GalleryScrollSection from '@/components/sections/GalleryScrollSection.vue'
import BeforeAfterSection from '@/components/sections/BeforeAfterSection.vue'
import TestimonialsSection from '@/components/sections/TestimonialsSection.vue'
import BarbershopsSection from '@/components/sections/BarbershopsSection.vue'
</script>

<template>
  <div class="home">
    <HeroSection />
    <AboutSection />
    <ServicesSection />
    <ExpandedServicesSection />
    <GalleryScrollSection />
    <BeforeAfterSection />
    <TestimonialsSection />
    <BarbershopsSection />
  </div>
</template>

<style scoped lang="scss">
.home {
  min-height: 100vh;
}
</style>
