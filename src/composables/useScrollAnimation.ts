/**
 * Composable for scroll-triggered animations using Intersection Observer
 */
export function useScrollAnimation(threshold = 0.2) {
  const observe = (element: HTMLElement, callback: () => void) => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            callback()
          }
        })
      },
      { threshold }
    )

    observer.observe(element)

    // Return cleanup function
    return () => observer.disconnect()
  }

  return { observe }
}
