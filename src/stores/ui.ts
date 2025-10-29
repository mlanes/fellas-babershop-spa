import { defineStore } from 'pinia'
import { ref } from 'vue'

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
    document.body.style.overflow = isMobileMenuOpen.value ? 'hidden' : ''
  }

  function closeMobileMenu() {
    isMobileMenuOpen.value = false
    document.body.style.overflow = ''
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
