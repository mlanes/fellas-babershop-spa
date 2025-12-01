import { defineStore } from 'pinia'

/**
 * UI state store for managing global UI state
 */
export const useUIStore = defineStore('ui', () => {
  // State
  const isMobileMenuOpen = ref(false)
  const activeSection = ref('home')

  // Actions
  function toggleMobileMenu() {
    isMobileMenuOpen.value = !isMobileMenuOpen.value
    // Prevent body scroll when menu is open
    if (import.meta.client) {
      document.body.style.overflow = isMobileMenuOpen.value ? 'hidden' : ''
    }
  }

  function closeMobileMenu() {
    isMobileMenuOpen.value = false
    if (import.meta.client) {
      document.body.style.overflow = ''
    }
  }

  function setActiveSection(section: string) {
    activeSection.value = section
  }

  return {
    isMobileMenuOpen,
    activeSection,
    toggleMobileMenu,
    closeMobileMenu,
    setActiveSection,
  }
})
