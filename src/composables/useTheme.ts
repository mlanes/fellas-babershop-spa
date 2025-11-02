import { ref, onMounted } from 'vue'

export type Theme = 'light' | 'dark' | 'auto'

const THEME_STORAGE_KEY = 'fellas-theme-preference'

export function useTheme() {
  const currentTheme = ref<Theme>('auto')
  const isDark = ref(false)

  /**
   * Get system preference for dark mode
   */
  const getSystemPreference = (): boolean => {
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  }

  /**
   * Apply theme to document
   */
  const applyTheme = (theme: Theme) => {
    const htmlElement = document.documentElement

    if (theme === 'auto') {
      // Remove explicit theme attribute to allow media query to work
      htmlElement.removeAttribute('data-theme')
      isDark.value = getSystemPreference()
    } else {
      // Set explicit theme
      htmlElement.setAttribute('data-theme', theme)
      isDark.value = theme === 'dark'
    }
  }

  /**
   * Set theme preference
   */
  const setTheme = (theme: Theme) => {
    currentTheme.value = theme
    applyTheme(theme)
    localStorage.setItem(THEME_STORAGE_KEY, theme)
  }

  /**
   * Toggle between light and dark mode
   */
  const toggleTheme = () => {
    const newTheme = isDark.value ? 'light' : 'dark'
    setTheme(newTheme)
  }

  /**
   * Initialize theme from storage or system preference
   */
  const initTheme = () => {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY) as Theme | null

    if (savedTheme && ['light', 'dark', 'auto'].includes(savedTheme)) {
      currentTheme.value = savedTheme
    } else {
      currentTheme.value = 'auto'
    }

    applyTheme(currentTheme.value)
  }

  /**
   * Listen for system theme changes when in auto mode
   */
  const setupSystemThemeListener = () => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

    const handleChange = (e: MediaQueryListEvent) => {
      if (currentTheme.value === 'auto') {
        isDark.value = e.matches
      }
    }

    mediaQuery.addEventListener('change', handleChange)

    return () => {
      mediaQuery.removeEventListener('change', handleChange)
    }
  }

  onMounted(() => {
    initTheme()
    const cleanup = setupSystemThemeListener()

    // Cleanup on unmount
    return cleanup
  })

  return {
    currentTheme,
    isDark,
    setTheme,
    toggleTheme,
  }
}
