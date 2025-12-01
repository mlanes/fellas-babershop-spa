# SEO & Accessibility Audit Report

**Project:** Fellas Barbershop SPA
**Date:** December 1, 2025
**Overall Rating:** SEO 6.5/10 | Accessibility 6/10

---

## Table of Contents

- [SEO Issues](#seo-issues)
  - [High Priority](#seo-high-priority)
  - [Medium Priority](#seo-medium-priority)
  - [Low Priority](#seo-low-priority)
- [Accessibility (WCAG) Issues](#accessibility-wcag-issues)
  - [High Priority](#accessibility-high-priority)
  - [Medium Priority](#accessibility-medium-priority)
  - [Low Priority](#accessibility-low-priority)
- [What's Already Good](#whats-already-good)
- [Implementation Checklist](#implementation-checklist)
- [Testing Tools](#testing-tools)

---

## SEO Issues

### SEO High Priority

#### 1. No Sitemap Configuration
- **Problem:** No `sitemap.xml` generated. `robots.txt` references a non-existent sitemap.
- **Location:** `nuxt.config.ts`
- **Fix:** Install and configure `@nuxtjs/sitemap` module
```bash
npm install @nuxtjs/sitemap
```
```ts
// nuxt.config.ts
modules: [
  '@nuxtjs/sitemap',
],
sitemap: {
  hostname: 'https://fellasbarbershop.pt',
  routes: ['/services', '/gallery', '/contacts', '/score']
}
```

#### 2. No Canonical URLs
- **Problem:** No `rel="canonical"` tags. Critical for preventing duplicate content issues.
- **Location:** All pages
- **Fix:** Add canonical link to each page
```ts
// In each page
useHead({
  link: [
    { rel: 'canonical', href: 'https://fellasbarbershop.pt/services' }
  ]
})
```

#### 3. No Structured Data (JSON-LD)
- **Problem:** Missing Organization, LocalBusiness, and BarberShop schema. Limits rich snippets in search results.
- **Location:** `nuxt.config.ts`
- **Fix:** Add JSON-LD script
```ts
// nuxt.config.ts
script: [
  {
    type: 'application/ld+json',
    innerHTML: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'BarberShop',
      name: 'Fellas Barbers',
      image: 'https://fellasbarbershop.pt/og-image.jpg',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Your Street',
        addressLocality: 'Lisboa',
        addressCountry: 'PT'
      },
      // ... more schema data
    })
  }
]
```

---

### SEO Medium Priority

#### 4. Missing Page-Specific Meta Descriptions
- **Problem:** Only home page has a meta description
- **Locations:**
  - `pages/services.vue`
  - `pages/gallery.vue`
  - `pages/contacts.vue`
  - `pages/score.vue`
- **Fix:** Add unique descriptions to each page
```ts
useHead({
  title: 'Serviços - Fellas Barbers',
  meta: [
    { name: 'description', content: 'Conheça todos os serviços de barbeiro profissional...' }
  ]
})
```

#### 5. Open Graph Image Uses Relative Path
- **Problem:** `og:image` set to `/og-image.jpg` instead of absolute URL
- **Location:** `nuxt.config.ts:50,55`
- **Fix:** Use absolute URLs
```ts
{ property: 'og:image', content: 'https://fellasbarbershop.pt/og-image.jpg' },
{ name: 'twitter:image', content: 'https://fellasbarbershop.pt/og-image.jpg' },
```

#### 6. Missing og:url
- **Problem:** Open Graph configuration missing URL property
- **Location:** `nuxt.config.ts`
- **Fix:** Add og:url
```ts
{ property: 'og:url', content: 'https://fellasbarbershop.pt' },
```

#### 7. No hreflang Tags for Multi-Language
- **Problem:** Site supports pt, en, es, fr but no alternate language links
- **Location:** `nuxt.config.ts`
- **Fix:** Configure i18n to generate hreflang tags or add manually

#### 8. Static Language Attribute
- **Problem:** `lang="pt-PT"` is hardcoded, doesn't update when language changes
- **Location:** `nuxt.config.ts:37`
- **Fix:** Make lang attribute dynamic based on current locale

---

### SEO Low Priority

#### 9. Inconsistent Section IDs
- **Problem:** Some section IDs in Portuguese (`testemunhos`, `antes-depois`), others in English
- **Locations:**
  - `TestimonialsSection.vue:89` - `id="testemunhos"`
  - `BeforeAfterSection.vue:40` - `id="antes-depois"`
- **Fix:** Standardize to English IDs

#### 10. No Responsive Image Optimization
- **Problem:** Images don't use `srcset` or `<picture>` elements
- **Fix:** Consider using Nuxt Image module for automatic optimization

---

## Accessibility (WCAG) Issues

### Accessibility High Priority

#### 1. No Skip Navigation Link
- **Problem:** Users must tab through all navigation to reach main content. WCAG 2.1 AA requirement.
- **Location:** `components/layout/AppHeader.vue`
- **Fix:** Add skip link at top of page
```vue
<!-- In AppHeader.vue, at the very top -->
<a href="#main" class="skip-link">Skip to main content</a>

<!-- In app.vue, wrap content -->
<main id="main">
  <NuxtPage />
</main>
```
```scss
.skip-link {
  position: absolute;
  top: -40px;
  left: 0;
  padding: 8px;
  background: var(--brand-color-primary);
  color: white;
  z-index: 10000;

  &:focus {
    top: 0;
  }
}
```

#### 2. No Focus Trapping in Modal
- **Problem:** Focus can escape the modal dialog. WCAG 2.1 AA violation.
- **Location:** `components/ui/MediaPreviewDialog.vue`
- **Fix:** Implement focus trap
```bash
npm install focus-trap
```
```ts
import { createFocusTrap } from 'focus-trap'

const trap = ref<ReturnType<typeof createFocusTrap> | null>(null)

watch(() => props.isOpen, (isOpen) => {
  if (isOpen) {
    nextTick(() => {
      trap.value = createFocusTrap(dialogRef.value)
      trap.value.activate()
    })
  } else {
    trap.value?.deactivate()
  }
})
```

#### 3. Missing Main Landmark
- **Problem:** No `<main>` element wrapping page content
- **Location:** `app.vue`
- **Fix:** Add main element
```vue
<template>
  <AppLoader />
  <div id="app">
    <AppHeader />
    <main id="main">
      <NuxtPage />
    </main>
    <AppFooter />
  </div>
</template>
```

---

### Accessibility Medium Priority

#### 4. Modal Missing ARIA Attributes
- **Problem:** Modal lacks proper ARIA attributes for screen readers
- **Location:** `components/ui/MediaPreviewDialog.vue`
- **Fix:**
```vue
<div
  role="dialog"
  aria-modal="true"
  aria-labelledby="dialog-title"
>
  <h2 id="dialog-title" class="sr-only">Media Preview</h2>
  <!-- content -->
</div>
```

#### 5. Language Selector Not Keyboard Accessible
- **Problem:** Dropdown doesn't support keyboard navigation (arrows, escape)
- **Location:** `components/ui/FLanguageSelector.vue`
- **Fix:** Add keyboard event handlers
```ts
const handleKeydown = (e: KeyboardEvent) => {
  switch (e.key) {
    case 'Escape':
      closeDropdown()
      break
    case 'ArrowDown':
      e.preventDefault()
      focusNextOption()
      break
    case 'ArrowUp':
      e.preventDefault()
      focusPreviousOption()
      break
  }
}
```

#### 6. SVG Logos Missing Accessibility Labels
- **Problem:** Logo SVGs have no aria-label or title
- **Locations:**
  - `components/ui/FLogo.vue`
  - `components/ui/FLogoFooter.vue`
- **Fix:**
```vue
<svg aria-label="Fellas Barbers" role="img">
  <title>Fellas Barbers</title>
  <!-- paths -->
</svg>
```

#### 7. Inconsistent Heading Hierarchy
- **Problem:** Pages use `<h1 class="text-h2">` - semantic/visual mismatch
- **Locations:**
  - `pages/services.vue:10`
  - `pages/gallery.vue:10`
  - `pages/contacts.vue:10`
  - `pages/score.vue:10`
- **Fix:** Use correct semantic heading level with appropriate visual class

#### 8. Modal Initial Focus
- **Problem:** When modal opens, focus doesn't move to close button
- **Location:** `components/ui/MediaPreviewDialog.vue`
- **Fix:**
```ts
watch(() => props.isOpen, (isOpen) => {
  if (isOpen) {
    nextTick(() => {
      closeButtonRef.value?.focus()
    })
  }
})
```

---

### Accessibility Low Priority

#### 9. Carousel Dot Labels Could Be More Descriptive
- **Problem:** Labels say "Go to image 1" instead of describing the content
- **Location:** `components/sections/BarbershopsSection.vue:210`
- **Fix:** Use more descriptive labels like "View barbershop interior photo 1 of 4"

#### 10. Color Contrast Verification Needed
- **Problem:** Some gradient text and secondary colors need contrast verification
- **Fix:** Run automated contrast checks with WAVE or Axe tools

---

## What's Already Good

### SEO
- Comprehensive default meta tags in `nuxt.config.ts`
- Open Graph and Twitter Card tags configured
- Theme color meta tag
- Viewport correctly configured
- robots.txt exists and allows crawling
- Preconnect to Google Fonts configured
- PWA with workbox caching configured
- Lazy loading on images implemented
- Semantic section tags with IDs

### Accessibility
- Focus indicator mixin defined in `_mixins.scss`
- Global `:focus-visible` styles in `main.scss`
- ARIA labels on most buttons and navigation
- Descriptive alt text on images
- Decorative elements use `aria-hidden="true"`
- Modal handles Escape key to close
- Descriptive button labels (not "click here")
- Background videos marked as decorative

---

## Implementation Checklist

### Week 1 - Critical Fixes
- [ ] Install and configure `@nuxtjs/sitemap`
- [ ] Add skip navigation link
- [ ] Implement focus trapping in modal
- [ ] Add `<main>` landmark to `app.vue`

### Week 2 - SEO Improvements
- [ ] Add canonical URLs to all pages
- [ ] Add structured data (JSON-LD) for LocalBusiness
- [ ] Add page-specific meta descriptions
- [ ] Fix og:image to use absolute URL

### Week 3 - Accessibility Improvements
- [ ] Add ARIA attributes to modal (`role`, `aria-modal`, `aria-labelledby`)
- [ ] Add keyboard navigation to language selector
- [ ] Add aria-label to SVG logos
- [ ] Fix heading semantic hierarchy

### Week 4 - Polish
- [ ] Add hreflang tags for multi-language
- [ ] Make lang attribute dynamic
- [ ] Standardize section IDs to English
- [ ] Run full accessibility audit with automated tools

---

## Testing Tools

| Tool | Purpose | Link |
|------|---------|------|
| Lighthouse | SEO & Accessibility scores | Chrome DevTools |
| WAVE | Accessibility checker | [wave.webaim.org](https://wave.webaim.org) |
| Axe DevTools | Automated accessibility | [deque.com/axe](https://www.deque.com/axe/) |
| Google Search Console | SEO tracking | [search.google.com/search-console](https://search.google.com/search-console) |
| Schema Validator | Structured data | [validator.schema.org](https://validator.schema.org) |
| NVDA | Screen reader testing | [nvaccess.org](https://www.nvaccess.org) |

---

## Manual Testing Checklist

- [ ] Tab through entire site with keyboard only
- [ ] Test with screen reader (NVDA, VoiceOver)
- [ ] Verify lang attribute changes with i18n
- [ ] Check focus states are visible on all interactive elements
- [ ] Test modal focus trapping
- [ ] Verify skip link works correctly
- [ ] Check all images in dark/light modes for contrast
