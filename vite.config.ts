import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import svgLoader from 'vite-svg-loader'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'
import viteCompression from 'vite-plugin-compression'
import { visualizer } from 'rollup-plugin-visualizer'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    svgLoader(),
    ViteImageOptimizer({
      // JPEG optimization - aggressive compression
      jpeg: {
        quality: 60,
        progressive: true,
      },
      // JPG optimization - aggressive compression
      jpg: {
        quality: 60,
        progressive: true,
      },
      // PNG optimization - aggressive compression
      png: {
        quality: 60,
        compressionLevel: 9,
      },
      // WebP conversion - aggressive compression
      webp: {
        quality: 70,
      },
    }),
    // Gzip compression
    viteCompression({
      algorithm: 'gzip',
      ext: '.gz',
      threshold: 10240, // Only compress files larger than 10KB
      deleteOriginFile: false,
    }),
    // Brotli compression (better compression than gzip)
    viteCompression({
      algorithm: 'brotliCompress',
      ext: '.br',
      threshold: 10240,
      deleteOriginFile: false,
    }),
    // Bundle analyzer - generates stats.html
    visualizer({
      filename: 'dist/stats.html',
      open: false,
      gzipSize: true,
      brotliSize: true,
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  build: {
    target: 'esnext',
    minify: 'terser',
    cssCodeSplit: true,
    sourcemap: false,
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Split vendor code into separate chunks for better caching
          if (id.includes('node_modules')) {
            // Vue core framework
            if (id.includes('vue') && !id.includes('vue-i18n')) {
              return 'vendor-vue'
            }
            // Vue Router
            if (id.includes('vue-router')) {
              return 'vendor-vue'
            }
            // Pinia state management
            if (id.includes('pinia')) {
              return 'vendor-vue'
            }
            // Internationalization
            if (id.includes('vue-i18n')) {
              return 'vendor-i18n'
            }
            // All other node_modules
            return 'vendor-other'
          }
        },
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name?.split('.')
          const extType = info?.[info.length - 1]
          if (/\.(png|jpe?g|svg|gif|tiff|bmp|ico|webp)$/i.test(assetInfo.name ?? '')) {
            return 'assets/images/[name]-[hash][extname]'
          } else if (/\.(woff2?|eot|ttf|otf)$/i.test(assetInfo.name ?? '')) {
            return 'assets/fonts/[name]-[hash][extname]'
          } else if (extType === 'css') {
            return 'assets/css/[name]-[hash][extname]'
          }
          return 'assets/[name]-[hash][extname]'
        }
      }
    },
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info'],
        passes: 2
      },
      mangle: {
        safari10: true
      },
      format: {
        comments: false
      }
    },
    reportCompressedSize: false,
    assetsInlineLimit: 4096
  },
  server: {
    port: 3000,
    allowedHosts: [
      'cec4c9c514a4.ngrok-free.app',
      '.ngrok-free.app'
    ]
  }
})
