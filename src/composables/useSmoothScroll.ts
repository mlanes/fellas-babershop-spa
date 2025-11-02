/**
 * Composable for smooth scrolling to page sections
 */
export function useSmoothScroll() {
	const scrollTo = (target: string, offset = 0) => {
		const element = document.querySelector(target)
		if (!element) return

		// Emit custom event to notify that programmatic scroll is starting
		window.dispatchEvent(new CustomEvent('programmatic-scroll-start'))

		const top = element.getBoundingClientRect().top + window.pageYOffset - offset
		window.scrollTo({ top, behavior: 'smooth' })
	}

	return { scrollTo }
}
