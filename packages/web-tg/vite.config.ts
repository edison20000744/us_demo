import { defineConfig } from 'vite'
import pluginsConfig from '../web/pluginsConfig'

// https://vitejs.dev/config/
export default defineConfig({
  // server: {
  //   host: '0.0.0.0'
  // },
  envDir: '../../',
  build: {
    chunkSizeWarningLimit: 500,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            const module = id.toString().split('node_modules/')[1].split('/')[0].toString()
            if (module === 'unicode-emoji') {
              return 'emoji';
            } else if (module === 'hls.js') {
              return 'hls';
            } else {
              return 'vendor';
            }
          }
        }
      }
    }
  },
  plugins: pluginsConfig,
  publicDir: "../web/public",
  resolve: {
    alias: {
      '/src/icons': '@us/web/src/icons',
      '/src/assets': '@us/web/src/assets',
      '@us/web': '@us/web/src',
      '@us/web-mobile': '@us/web-mobile/src',
      '@us/web-tg': '@us/web-tg/src',
      '@us/locales': '@us/locales/src',
      '@us/shared': '@us/shared/src',
      '@us/utils': '@us/utils/src',
      '@us/proto': '@us/proto/src',
      '@us/api': '@us/api/src',
      '@us/relay-api': '@us/relay-api/src',
      '@us/ws': '@us/ws/src',
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        // example : additionalData: `@import "./src/design/styles/variables";`
        // dont need include file extend .scss
        additionalData: `@use "sass:math"; @import '@us/web/assets/scss/function.scss';`
      },
    },
    postcss: {
      plugins: [
        // flexGapPolyfill({ only: true }),
      ],
    },
  },
})
