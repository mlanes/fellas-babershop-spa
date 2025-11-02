<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { storeToRefs } from 'pinia'
import FLogo from '@/components/ui/FLogo.vue'
import FIcon from '@/components/ui/FIcon.vue'
import FButton from '@/components/ui/FButton.vue'
import { navigationItems } from '@/data/navigation'
import { useUIStore } from '@/stores/ui'
import { useSmoothScroll } from '@/composables/useSmoothScroll'

/**
 * AppHeader - Main navigation header
 */
const uiStore = useUIStore()
const { isMobileMenuOpen, activeSection } = storeToRefs(uiStore)
const { scrollTo } = useSmoothScroll()

const headerRef = ref<HTMLElement | null>(null)
const isScrolled = ref(false)

/**
 * Handle scroll to update header background and active section
 */
const handleScroll = () => {
  isScrolled.value = window.scrollY > 20

  // Simple scroll spy - check which section is in view
  const sections = ['home', 'sobre', 'services', 'galeria', 'contactos']
  for (const sectionId of sections) {
    const element = document.getElementById(sectionId)
    if (element) {
      const rect = element.getBoundingClientRect()
      if (rect.top <= 100 && rect.bottom >= 100) {
        uiStore.setActiveSection(sectionId)
        break
      }
    }
  }
}

/**
 * Handle navigation click
 */
const handleNavClick = (href: string) => {
  scrollTo(href)
  uiStore.closeMobileMenu()
}

/**
 * Handle booking button click
 */
const handleBookingClick = () => {
  // TODO: Implement booking functionality
  console.log('Booking clicked')
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  handleScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <header
    ref="headerRef"
    class="header"
    :class="{ 'header--scrolled': isScrolled, 'header--menu-open': isMobileMenuOpen }"
  >
    <div class="header__container container">
      <!-- Logo -->
      <a href="#home" class="header__logo" @click.prevent="handleNavClick('#home')">
        <FLogo size="md" />
      </a>

      <!-- Desktop Navigation -->
      <nav class="header__nav">
        <a
          v-for="item in navigationItems"
          :key="item.href"
          :href="item.href"
          class="header__nav-link"
          :class="{ 'header__nav-link--active': activeSection === item.href.slice(1) }"
          @click.prevent="handleNavClick(item.href)"
        >
          {{ item.label }}
        </a>
      </nav>

      <!-- Booking Button (Desktop) -->
      <div class="header__actions">
        <FButton variant="gradient" size="md" @click="handleBookingClick">
          AGENDAR
        </FButton>
      </div>

      <!-- Mobile Menu Toggle -->
      <button
        class="header__mobile-toggle"
        :aria-label="isMobileMenuOpen ? 'Fechar menu' : 'Abrir menu'"
        @click="uiStore.toggleMobileMenu"
      >
        <FIcon :name="isMobileMenuOpen ? 'close' : 'menu'" :size="24" />
      </button>
    </div>

    <!-- Mobile Menu -->
    <transition name="mobile-menu">
      <div v-if="isMobileMenuOpen" class="header__mobile-menu">
        <nav class="header__mobile-nav">
          <a
            v-for="item in navigationItems"
            :key="item.href"
            :href="item.href"
            class="header__mobile-nav-link"
            :class="{ 'header__mobile-nav-link--active': activeSection === item.href.slice(1) }"
            @click.prevent="handleNavClick(item.href)"
          >
            {{ item.label }}
          </a>
        </nav>

        <div class="header__mobile-actions">
          <FButton variant="gradient" size="md" full-width @click="handleBookingClick">
            AGENDAR
          </FButton>
        </div>
      </div>
    </transition>
  </header>
</template>

<style scoped lang="scss">
@use '@/assets/styles/variables' as *;
@use '@/assets/styles/mixins' as *;

.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background-color: rgba($gray-1, 0.3);
  backdrop-filter: blur(10px);
  transition: all $transition-base;

  &--scrolled {
    background-color: rgba($gray-1, 0.7);
    backdrop-filter: blur(10px);
    box-shadow: 0 2px 10px rgba($black, 0.3);
  }

  &--menu-open {
    background-color: $gray-1;
    backdrop-filter: none;
  }

  @include element('container') {
    @include container;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: $spacing-lg;
    padding-bottom: $spacing-lg;
  }

  @include element('logo') {
    color: $white;
    text-decoration: none;
    transition: opacity $transition-base;

    &:hover {
      opacity: 0.8;
    }
  }

  @include element('nav') {
    display: none;
    gap: $spacing-2xl;

    @include desktop {
      display: flex;
    }
  }

  @include element('nav-link') {
    color: $white;
    text-decoration: none;
    font-size: 14px;
    font-weight: 600;
    letter-spacing: 1px;
    transition: color $transition-base;
    position: relative;

    &::after {
      content: '';
      position: absolute;
      bottom: -4px;
      left: 0;
      right: 0;
      height: 2px;
      background-color: $brand-red;
      transform: scaleX(0);
      transition: transform $transition-base;
    }

    &:hover {
      color: $brand-red;

      &::after {
        transform: scaleX(1);
      }
    }

    @include modifier('active') {
      color: $brand-red;

      &::after {
        transform: scaleX(1);
      }
    }
  }

  @include element('actions') {
    display: none;

    @include desktop {
      display: block;
    }
  }

  @include element('mobile-toggle') {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 48px;
    height: 48px;
    background: none;
    border: none;
    color: $white;
    cursor: pointer;
    transition: color $transition-base;

    &:hover {
      color: $brand-red;
    }

    @include desktop {
      display: none;
    }
  }

  @include element('mobile-menu') {
		  position: fixed;
			top: $header-height;
			left: 0;
			right: 0;
			z-index: 999;
			background-color: rgba($gray-1, 0.95);
			padding: $spacing-2xl;
			transition: all $transition-base;
			height: calc(100vh - $header-height);
			overflow-y: auto;

    @include desktop {
      display: none;
    }
  }

  @include element('mobile-nav') {
    display: flex;
    flex-direction: column;
    gap: $spacing-xl;
    margin-bottom: $spacing-3xl;
  }

  @include element('mobile-nav-link') {
    color: $white;
    text-decoration: none;
    font-size: 18px;
    font-weight: 600;
    letter-spacing: 1px;
    padding: $spacing-md 0;
    border-bottom: 1px solid rgba($white, 0.1);
    transition: color $transition-base;

    &:hover {
      color: $brand-red;
    }

    @include modifier('active') {
      color: $brand-red;
    }
  }

  @include element('mobile-actions') {
    margin-top: $spacing-xl;
  }
}

// Mobile menu transitions
.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition: transform $transition-base, opacity $transition-base;
}

.mobile-menu-enter-from {
  transform: translateY(-20px);
  opacity: 0;
}

.mobile-menu-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}
</style>
