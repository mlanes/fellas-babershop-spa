/**
 * Composable for smooth scrolling to page sections
 */
export function useSmoothScroll() {
	const scrollTo = (target: string, offset = 0) => {
		const element = document.querySelector(target)
		if (!element) return

		const top = element.getBoundingClientRect().top + window.pageYOffset - offset
		window.scrollTo({ top, behavior: 'smooth' })
	}

	return { scrollTo }
}
