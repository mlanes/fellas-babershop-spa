# Fellas Barbershop

A modern, responsive web application for Fellas Barbers - a premium barbershop in Lisboa, Portugal. Built with Nuxt 3, TypeScript, and deployed on Netlify with SSR.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Development](#development)
- [Deployment](#deployment)
- [Internationalization](#internationalization)
- [Design](#design)
- [Contributing](#contributing)

## Overview

Fellas Barbershop is a professionally crafted web application showcasing barbershop services with a focus on user experience, performance, and modern web standards. The application features smooth animations, responsive design, multi-language support, PWA capabilities, and server-side rendering for optimal SEO.

**Live Site:** [fellasbarbershop.pt](https://fellasbarbershop.pt)

## Features

### Core Features

- **Server-Side Rendering (SSR)**: Nuxt 3 with Nitro for optimal SEO and performance
- **Responsive Design**: Fully optimized for mobile, tablet, and desktop devices
- **Dark/Light Theme**: Automatic and manual theme switching with smooth transitions
- **Internationalization (i18n)**: Multi-language support (Portuguese, English, Spanish, French)
- **Progressive Web App (PWA)**: Installable with offline support via Workbox
- **Smooth Animations**: Scroll-triggered animations and transitions

### UI Components

- **Hero Section**: Full-screen video background with animated logo
- **Services Showcase**: Interactive service cards with pricing
- **Infinite Scroll Gallery**: Three-row gallery with media preview dialog
- **Barbershop Locations**: Carousel showcasing multiple locations
- **Testimonials**: Customer reviews with navigation
- **Before/After Gallery**: Transformation showcases

### Performance Features

- **Lazy Loading**: Images and videos load on demand
- **Asset Caching**: PWA with intelligent caching strategies
- **Optimized Fonts**: Preconnected Google Fonts
- **SSR Prerendering**: Static pages prerendered at build time

## Tech Stack

### Core

| Technology | Purpose |
|------------|---------|
| **Nuxt 3** | Vue meta-framework with SSR |
| **Vue 3** | Progressive JavaScript framework |
| **TypeScript** | Type-safe development |
| **Nitro** | Server engine (Netlify preset) |

### Styling & UI

| Technology | Purpose |
|------------|---------|
| **SCSS** | Enhanced CSS with variables, mixins, nesting |
| **CSS Custom Properties** | Dynamic theming system |
| **nuxt-svgo** | Optimized SVG component loading |

### State & Data

| Technology | Purpose |
|------------|---------|
| **Pinia** | State management |
| **@nuxtjs/i18n** | Internationalization |
| **@vite-pwa/nuxt** | PWA functionality |

### Development

| Technology | Purpose |
|------------|---------|
| **ESLint** | Code linting |
| **Prettier** | Code formatting |
| **Sass** | SCSS compilation |

## Project Structure

```
fellas-babershop-spa/
├── assets/
│   ├── img/                 # Images and SVGs
│   ├── styles/
│   │   ├── _variables.scss  # SCSS variables
│   │   ├── _mixins.scss     # SCSS mixins
│   │   ├── _themes.scss     # Theme system
│   │   ├── _primitive-colors.scss
│   │   ├── _color-definitions.scss
│   │   └── main.scss        # Global styles
│   └── video/               # Video assets
├── components/
│   ├── layout/              # AppHeader, AppFooter
│   ├── sections/            # Page sections (Hero, Services, Gallery, etc.)
│   └── ui/                  # Reusable UI components (FButton, FLogo, etc.)
├── composables/             # Vue composables
│   ├── useTheme.ts
│   ├── useScrollSpy.ts
│   ├── useSmoothScroll.ts
│   └── useScrollAnimation.ts
├── locales/                 # Translation files
│   ├── pt.json
│   ├── en.json
│   ├── es.json
│   └── fr.json
├── pages/                   # Route pages
│   ├── index.vue
│   ├── services.vue
│   ├── gallery.vue
│   ├── contacts.vue
│   └── score.vue
├── public/                  # Static assets
│   ├── favicon.svg
│   ├── robots.txt
│   └── og-image.jpg
├── app.vue                  # Root component
├── app.html                 # Custom HTML template
├── nuxt.config.ts           # Nuxt configuration
├── netlify.toml             # Netlify deployment config
└── package.json
```

## Getting Started

### Prerequisites

- **Node.js**: Version 20.x or higher
- **npm**: Version 9.x or higher

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd fellas-babershop-spa
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser at `http://localhost:3000`

## Development

### Available Scripts

```bash
# Start development server with hot reload
npm run dev

# Build for production (SSR)
npm run build

# Generate static site
npm run generate

# Preview production build locally
npm run preview

# Lint files
npm run lint

# Format code with Prettier
npm run format
```

### Environment Variables

Create a `.env` file for local development:

```env
VITE_APP_TITLE=Fellas Barbers
VITE_BOOKING_URL=https://booking.example.com
VITE_INSTAGRAM_URL=https://instagram.com/fellasbarbers
VITE_GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
```

### Theme System

The app uses a CSS custom properties-based theme system:

- **Light theme**: Default, clean appearance
- **Dark theme**: Rich dark mode with brand colors
- **Auto**: Follows system preference

Theme is managed via `data-theme` attribute on `<html>` and persisted in localStorage.

### Adding New Components

1. Create component in appropriate directory (`components/ui/`, `components/sections/`)
2. Use SCSS with `@use '~/assets/styles/variables' as *`
3. Follow existing naming conventions (`FButton`, `FLogo`, etc.)
4. Add translations to locale files if needed

## Deployment

### Netlify (Current)

The project is configured for Netlify SSR deployment:

```toml
# netlify.toml
[build]
  command = "npm run build"
  publish = "dist"

[build.environment]
  NODE_VERSION = "20"
```

**Deployment is automatic** on push to `main` branch.

### Manual Deployment

1. Build the project:
   ```bash
   npm run build
   ```

2. The `.output` directory contains the server and static assets

3. Deploy using Netlify CLI:
   ```bash
   netlify deploy --prod
   ```

## Internationalization

Supported languages:
- **Portuguese (pt)** - Default
- **English (en)**
- **Spanish (es)**
- **French (fr)**

### Adding Translations

1. Add keys to all locale files in `locales/`
2. Use in components:
   ```vue
   <template>
     <p>{{ $t('key.path') }}</p>
   </template>
   ```

### Language Detection

- Detects browser language on first visit
- Stores preference in cookie (`i18n_redirected`)
- No URL prefix strategy (`/services` not `/en/services`)

## Design

The design system and UI/UX specifications are available in Figma:

**[View Figma Design](https://www.figma.com/design/KcNyrpxsmfBF6B3CNdzfVF/Fellas-Barber?node-id=0-1&p=f&t=LBEbTQ2tji4qFw0p-0)**

### Color System

| Color | Light Mode | Dark Mode |
|-------|------------|-----------|
| Primary | `#E83752` | `#E83752` |
| Background | `#F7F9FC` | `#0A0909` |
| Text | `#000000` | `#FFFFFF` |

### Typography

- **Primary Font**: Raleway (Google Fonts)
- **Weights**: 400, 500, 600, 700

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance Targets

| Metric | Target |
|--------|--------|
| Lighthouse Performance | 90+ |
| First Contentful Paint | < 1.5s |
| Largest Contentful Paint | < 2.5s |
| Cumulative Layout Shift | < 0.1 |

## Known Issues & Improvements

See [SEO_ACCESSIBILITY_AUDIT.md](./SEO_ACCESSIBILITY_AUDIT.md) for a detailed audit of SEO and accessibility improvements.

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Commit your changes: `git commit -m 'feat: add some feature'`
4. Push to the branch: `git push origin feature/my-feature`
5. Submit a pull request

### Commit Convention

Follow [Conventional Commits](https://www.conventionalcommits.org/):

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `chore`: Build process or tooling changes

---

Built with care by Mario Lannes
