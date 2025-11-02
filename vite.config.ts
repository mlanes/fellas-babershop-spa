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
      // JPEG optimization
      jpeg: {
        quality: 80,
      },
      // JPG optimization
      jpg: {
        quality: 80,
      },
      // PNG optimization
      png: {
        quality: 80,
      },
      // WebP conversion
      webp: {
        quality: 85,
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
