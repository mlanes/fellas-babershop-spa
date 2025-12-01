// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: [
    '@pinia/nuxt',
    '@nuxtjs/i18n',
    '@vite-pwa/nuxt',
    'nuxt-svgo',
  ],

  svgo: {
    autoImportPath: false,
    defaultImport: 'component',
  },

  css: ['~/assets/styles/main.scss'],

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler',
        },
      },
    },
  },

  app: {
    head: {
      htmlAttrs: {
        lang: 'pt-PT',
      },
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: 'Fellas Barbers - A Sua Barbearia de Confiança',
      meta: [
        { name: 'theme-color', content: '#e63946' },
        { name: 'description', content: 'Fellas Barbers - Barbearia premium em Lisboa. Cortes de cabelo masculinos, barba, styling e grooming profissional. Ambiente moderno e serviço de excelência. Agende já!' },
        { name: 'keywords', content: 'barbearia lisboa, barbeiro lisboa, corte masculino lisboa, barba lisboa, barbearia premium portugal, fellas barbers, grooming masculino, fade haircut, undercut, beard trim, barbearia tradicional, men\'s grooming lisboa, hair styling lisboa, aparar barba, corte degradê' },
        // Open Graph
        { property: 'og:title', content: 'Fellas Barbers - A Sua Barbearia de Confiança' },
        { property: 'og:description', content: 'Serviços profissionais de barbeiro com qualidade premium em Lisboa, Portugal.' },
        { property: 'og:image', content: '/og-image.jpg' },
        { property: 'og:type', content: 'website' },
        // Twitter Card
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'Fellas Barbers' },
        { name: 'twitter:description', content: 'A sua barbearia de confiança em Lisboa, Portugal.' },
        { name: 'twitter:image', content: '/og-image.jpg' },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
      ],
      script: [
        {
          innerHTML: `
            const THEME_STORAGE_KEY = 'fellas-theme-preference';
            const storedTheme = localStorage.getItem(THEME_STORAGE_KEY);
            const htmlElement = document.documentElement;
            if (storedTheme === 'auto' || !storedTheme) {
              htmlElement.removeAttribute('data-theme');
            } else if (storedTheme === 'dark' || storedTheme === 'light') {
              htmlElement.setAttribute('data-theme', storedTheme);
            }
          `,
        },
      ],
    },
  },

  routeRules: {
    '/': { prerender: true },
    '/services': { prerender: true },
    '/gallery': { prerender: true },
    '/contacts': { prerender: true },
    '/score': { prerender: true },
  },

  i18n: {
    locales: [
      { code: 'pt', file: 'pt.json', name: 'Português' },
      { code: 'en', file: 'en.json', name: 'English' },
      { code: 'es', file: 'es.json', name: 'Español' },
      { code: 'fr', file: 'fr.json', name: 'Français' },
    ],
    defaultLocale: 'pt',
    lazy: true,
    langDir: 'locales',
    strategy: 'no_prefix',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
      fallbackLocale: 'en',
    },
  },

  pwa: {
    registerType: 'autoUpdate',
    includeAssets: ['favicon.svg', 'apple-touch-icon.png', 'favicon-32x32.png', 'favicon-16x16.png'],
    manifest: {
      name: 'Fellas Barbers',
      short_name: 'Fellas',
      description: 'Barbearia premium em Lisboa. Cortes de cabelo masculinos, barba, styling e grooming profissional.',
      theme_color: '#e63946',
      background_color: '#ffffff',
      display: 'standalone',
      icons: [
        {
          src: '/pwa-192x192.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: '/pwa-512x512.png',
          sizes: '512x512',
          type: 'image/png',
        },
        {
          src: '/pwa-512x512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'any maskable',
        },
      ],
    },
    workbox: {
      maximumFileSizeToCacheInBytes: 5 * 1024 * 1024, // 5MB limit
      globPatterns: ['**/*.{js,css,html,ico,png,svg,jpg,jpeg,webp,woff,woff2}'],
      runtimeCaching: [
        {
          urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
          handler: 'CacheFirst',
          options: {
            cacheName: 'google-fonts-cache',
            expiration: {
              maxEntries: 10,
              maxAgeSeconds: 60 * 60 * 24 * 365,
            },
            cacheableResponse: {
              statuses: [0, 200],
            },
          },
        },
        {
          urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
          handler: 'CacheFirst',
          options: {
            cacheName: 'gstatic-fonts-cache',
            expiration: {
              maxEntries: 10,
              maxAgeSeconds: 60 * 60 * 24 * 365,
            },
            cacheableResponse: {
              statuses: [0, 200],
            },
          },
        },
        {
          urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp)$/,
          handler: 'CacheFirst',
          options: {
            cacheName: 'images-cache',
            expiration: {
              maxEntries: 60,
              maxAgeSeconds: 60 * 60 * 24 * 30,
            },
          },
        },
        {
          urlPattern: /\.(?:mp4|webm)$/,
          handler: 'CacheFirst',
          options: {
            cacheName: 'videos-cache',
            expiration: {
              maxEntries: 10,
              maxAgeSeconds: 60 * 60 * 24 * 30,
            },
            rangeRequests: true,
          },
        },
      ],
    },
  },

  compatibilityDate: '2025-01-01',
})
