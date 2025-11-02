<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { storeToRefs } from 'pinia'
import FLogo from '@/components/ui/FLogo.vue'
import FIcon from '@/components/ui/FIcon.vue'
import FButton from '@/components/ui/FButton.vue'
import FLanguageSelector from '@/components/ui/FLanguageSelector.vue'
import { navigationItems } from '@/data/navigation'
import { useUIStore } from '@/stores/ui'
import { useSmoothScroll } from '@/composables/useSmoothScroll'
import { useTheme } from '@/composables/useTheme'
import { useLocale } from '@/composables/useLocale'

/**
 * AppHeader - Main navigation header
 */
const uiStore = useUIStore()
const { isMobileMenuOpen, activeSection } = storeToRefs(uiStore)
const { scrollTo } = useSmoothScroll()
const { isDark, toggleTheme } = useTheme()
const { t } = useLocale()

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
      <!-- Logo and Navigation grouped together -->
      <div class="header__left">
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
            :data-text="t(item.label)"
            @click.prevent="handleNavClick(item.href)"
          >
            {{ t(item.label) }}
          </a>
        </nav>
      </div>

      <!-- Booking Button (Desktop) -->
      <div class="header__actions">
        <FLanguageSelector />

        <button
          class="header__theme-toggle"
          :aria-label="isDark ? t('common.lightMode') : t('common.darkMode')"
          @click="toggleTheme"
        >
          <FIcon :name="isDark ? 'sun' : 'moon'" :size="20" />
        </button>

        <FButton variant="primary" size="md" @click="handleBookingClick">
          {{ t('common.book') }}
        </FButton>
      </div>

      <!-- Mobile Actions (Language, Theme, Menu) -->
      <div class="header__mobile-actions-bar">
        <FLanguageSelector />

        <button
          class="header__theme-toggle header__theme-toggle--mobile-bar"
          :aria-label="isDark ? t('common.lightMode') : t('common.darkMode')"
          @click="toggleTheme"
        >
          <FIcon :name="isDark ? 'sun' : 'moon'" :size="20" />
        </button>

        <button
          class="header__mobile-toggle"
          :aria-label="isMobileMenuOpen ? t('common.closeMenu') : t('common.openMenu')"
          @click="uiStore.toggleMobileMenu"
        >
          <FIcon :name="isMobileMenuOpen ? 'close' : 'menu'" :size="24" />
        </button>
      </div>
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
            {{ t(item.label) }}
          </a>
        </nav>

        <div class="header__mobile-actions">
          <FButton variant="primary" size="md" full-width @click="handleBookingClick">
            {{ t('common.book') }}
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
  background-color: color-mix(in srgb, var(--page-background) 30%, transparent);
  backdrop-filter: blur(10px);
  transition: all $transition-base;

  &--scrolled {
    background-color: color-mix(in srgb, var(--header-background-scrolled) 85%, transparent);
    backdrop-filter: blur(10px);
    box-shadow: 0 2px 10px var(--surface-shadow);
  }

  &--menu-open {
    background-color: var(--page-background);
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

  @include element('left') {
    display: flex;
    align-items: center;
    gap: $spacing-2xl;
  }

  @include element('logo') {
    color: var(--text-color-primary);
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
      align-items: center;
    }
  }

  @include element('nav-link') {
    text-decoration: none;
    font-size: 14px;
    font-weight: 600;
    letter-spacing: 1px;
    text-transform: uppercase;
    position: relative;
    padding: 10px;
    color: var(--text-color-primary);
    transition: color 0.3s ease;

    // Gradient text overlay (starts hidden)
    &::before {
      content: attr(data-text);
      position: absolute;
      top: 0;
      left: 0;
      padding: 10px;
      background: $gradient-brand-dark-red;
      background-clip: text;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      opacity: 0;
      transition: opacity 0.3s ease;
    }

    // Vertical gradient line
    &::after {
      content: '';
      position: absolute;
      top: -100%;
      left: 50%;
      width: 2px;
      height: 0;
      background: $gradient-brand-dark-red;
      transition: height 0.7s ease;
    }

    &:hover {
      color: $brand-red-dark;

      &::before {
        opacity: 0;
      }

      &::after {
        height: 40px;
      }
    }

    @include modifier('active') {
      color: $brand-red-dark;

      &::before {
        opacity: 0;
      }

      &::after {
        height: 40px;
      }
    }
  }

  @include element('actions') {
    display: none;

    @include desktop {
      display: flex;
      align-items: center;
      gap: $spacing-lg;
    }
  }

  @include element('mobile-actions-bar') {
    display: flex;
    align-items: center;
    gap: $spacing-md;

    @include desktop {
      display: none;
    }
  }

  @include element('theme-toggle') {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: $spacing-sm;
    width: 40px;
    height: 40px;
    background: none;
    border: 1px solid var(--surface-border);
    border-radius: $radius-full;
    color: var(--text-color-primary);
    cursor: pointer;
    transition: all $transition-base;

    &:hover {
      background-color: color-mix(in srgb, var(--text-color-primary) 10%, transparent);
      border-color: $brand-red-dark;
      color: $brand-red-dark;
    }

    @include modifier('mobile') {
      width: 100%;
      height: auto;
      padding: $spacing-md $spacing-lg;
      border-radius: $radius-md;
      justify-content: flex-start;
      margin-bottom: $spacing-lg;

      span {
        font-size: 16px;
        font-weight: 600;
        letter-spacing: 0.5px;
      }
    }

    @include modifier('mobile-bar') {
      // Keep the circular button style for mobile bar
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
    color: var(--text-color-primary);
    cursor: pointer;
    transition: color $transition-base;

    &:hover {
      color: $brand-red-dark;
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
			background-color: color-mix(in srgb, var(--page-background) 95%, transparent);
			backdrop-filter: blur(10px);
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
    color: var(--text-color-primary);
    text-decoration: none;
    font-size: 18px;
    font-weight: 600;
    letter-spacing: 1px;
    text-transform: uppercase;
    padding: $spacing-md 0;
    border-bottom: 1px solid var(--surface-border);
    transition: color $transition-base;

    &:hover {
      color: $brand-red-dark;
    }

    @include modifier('active') {
      color: $brand-red-dark;
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
