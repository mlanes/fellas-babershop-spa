# Fellas Barbershop 💈

A modern, responsive single-page application for Fellas Barbers - a premium barbershop experience in Coimbra, Portugal. Built with Vue 3, TypeScript, and modern web technologies.

![Fellas Barbershop](./assets/preview.png)

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Design](#design)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Development](#development)
- [Testing](#testing)
- [Building for Production](#building-for-production)
- [Contributing](#contributing)
- [License](#license)

## Overview

Fellas Barbershop SPA is a professionally crafted web application showcasing barbershop services with a focus on user experience, accessibility, and performance. The application features smooth animations, responsive design, internationalization support, and a comprehensive gallery of services.

## Features

### Core Features

- **Responsive Design**: Fully optimized for mobile, tablet, and desktop devices
- **Internationalization (i18n)**: Multi-language support with Vue I18n
- **Theme Support**: Light and dark theme with smooth transitions
- **Smooth Scrolling**: Buttery smooth navigation between sections
- **Scroll Animations**: Engaging animations triggered by scroll events
- **Scroll Spy Navigation**: Active navigation highlighting based on scroll position

### Component Features

- **Service Showcase**: Interactive service cards with detailed information
- **Infinite Scroll Gallery**: Three-row gallery with infinite scrolling effect
- **Media Preview Dialog**: Full-screen media preview with keyboard navigation
- **Contact Forms**: Accessible and validated contact forms
- **Testimonials**: Customer testimonials with social proof
- **Icon System**: Integrated Feather Icons for consistent iconography

### Development Features

- **TypeScript**: Full type safety across the application
- **Storybook**: Component development and documentation
- **Unit Testing**: Vitest for component and unit tests
- **E2E Testing**: Playwright for end-to-end testing
- **Accessibility Testing**: Axe-core integration for a11y testing
- **ESLint & Prettier**: Code quality and formatting enforcement

## Design

The design system and UI/UX specifications are available in Figma:

**[View Figma Design](https://www.figma.com/design/KcNyrpxsmfBF6B3CNdzfVF/Fellas-Barber?node-id=0-1&p=f&t=LBEbTQ2tji4qFw0p-0)**

The design includes:

- Complete component library
- Responsive breakpoints
- Color system and typography
- Spacing and layout guidelines
- Animation specifications

## Tech Stack

### Core

- **Vue 3**: Progressive JavaScript framework with Composition API
- **TypeScript**: Type-safe development
- **Vite**: Next-generation frontend tooling
- **Vue Router**: Official routing solution
- **Pinia**: State management library

### UI/UX

- **SCSS**: Enhanced CSS with variables and nesting
- **Feather Icons**: Beautiful open-source icons
- **VueUse**: Collection of Vue Composition utilities

### Development Tools

- **Storybook**: Component development environment
- **Vitest**: Unit testing framework
- **Playwright**: End-to-end testing
- **ESLint**: Code linting
- **Prettier**: Code formatting

### Internationalization

- **Vue I18n**: Internationalization plugin

## Project Structure

```
fellas-babershop-spa/
├── .storybook/           # Storybook configuration
├── assets/               # Static assets
├── public/               # Public static files
├── src/
│   ├── components/       # Vue components
│   │   ├── layout/       # Layout components (Header, Footer)
│   │   ├── sections/     # Page sections (Hero, Services, Gallery, etc.)
│   │   └── ui/           # Reusable UI components
│   ├── composables/      # Vue composables
│   │   ├── useTheme.ts
│   │   ├── useScrollSpy.ts
│   │   ├── useSmoothScroll.ts
│   │   └── useScrollAnimation.ts
│   ├── i18n/             # Internationalization
│   │   ├── locales/      # Translation files
│   │   └── index.ts
│   ├── router/           # Vue Router configuration
│   ├── stores/           # Pinia stores
│   ├── types/            # TypeScript type definitions
│   ├── styles/           # Global styles
│   ├── App.vue           # Root component
│   └── main.ts           # Application entry point
├── tests/                # Test files
├── specs/                # Project specifications
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## Getting Started

### Prerequisites

- **Node.js**: Version 18.x or higher
- **npm**: Version 9.x or higher (comes with Node.js)

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
3. Create environment file (optional):

   ```bash
   cp .env.example .env
   ```
4. Start the development server:

   ```bash
   npm run dev
   ```
5. Open your browser and navigate to `http://localhost:5173`

## Development

### Available Scripts

```bash
# Start development server with hot reload
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Run unit tests
npm run test:unit

# Run E2E tests
npm run test:e2e

# Start Storybook
npm run storybook

# Build Storybook
npm run build-storybook

# Lint and fix files
npm run lint

# Format code with Prettier
npm run format
```

### Development Workflow

1. **Component Development**: Use Storybook for isolated component development

   ```bash
   npm run storybook
   ```
2. **Type Checking**: TypeScript provides real-time type checking in your IDE
3. **Linting**: Run ESLint to catch potential issues

   ```bash
   npm run lint
   ```
4. **Formatting**: Format code with Prettier

   ```bash
   npm run format
   ```

## Testing

### Unit Tests

Unit tests are written with Vitest and Vue Test Utils:

```bash
npm run test:unit
```

### End-to-End Tests

E2E tests use Playwright for browser automation:

```bash
npm run test:e2e
```

### Accessibility Tests

Accessibility testing is integrated with Playwright using Axe-core:

- Tests run automatically during E2E test execution
- Storybook includes the a11y addon for manual testing

## Building for Production

1. Build the application:

   ```bash
   npm run build
   ```
2. The optimized build will be in the `dist/` directory
3. Preview the production build locally:

   ```bash
   npm run preview
   ```

### Build Optimizations

- Code splitting for optimal bundle sizes
- Tree shaking to remove unused code
- Minification of JavaScript and CSS
- Asset optimization (images, fonts)
- Gzip compression ready

## Component Documentation

Component documentation and examples are available in Storybook:

```bash
npm run storybook
```

Access Storybook at `http://localhost:6006`

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance

The application is optimized for performance:

- Lighthouse score: 90+ across all metrics
- First Contentful Paint (FCP): < 1.5s
- Largest Contentful Paint (LCP): < 2.5s
- Cumulative Layout Shift (CLS): < 0.1
- Time to Interactive (TTI): < 3.5s

## Accessibility

The application follows WCAG 2.1 Level AA guidelines:

- Semantic HTML
- ARIA labels and roles
- Keyboard navigation
- Focus management
- Screen reader support
- Color contrast compliance

## Contributing

Contributions are welcome! Please follow these guidelines:

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
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Test updates
- `chore`: Build process or tooling changes

---

Built with ❤️ by Mario Lanes
