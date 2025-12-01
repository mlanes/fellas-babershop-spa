/**
 * Composable for tracking the active section during scroll
 */
export function useScrollSpy(sections: string[]) {
  const activeSection = ref(sections[0])
  let observer: IntersectionObserver | null = null

  const observe = () => {
    if (!import.meta.client) return

    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            activeSection.value = entry.target.id
          }
        })
      },
      { threshold: 0.5 }
    )

    sections.forEach((id) => {
      const element = document.getElementById(id)
      if (element) observer?.observe(element)
    })
  }

  onMounted(() => {
    observe()
  })

  onUnmounted(() => {
    observer?.disconnect()
  })

  return { activeSection }
}
