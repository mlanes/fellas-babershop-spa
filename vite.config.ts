import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import svgLoader from 'vite-svg-loader'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'
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
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': ['vue', 'vue-router', 'pinia'],
          'utils': ['@vueuse/core']
        }
      }
    },
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    }
  },
  server: {
    port: 3000,
    allowedHosts: [
      'cec4c9c514a4.ngrok-free.app',
      '.ngrok-free.app'
    ]
  }
})
