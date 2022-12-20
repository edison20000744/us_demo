import { defineConfig } from 'vite'
import pluginsConfig from './pluginsConfig'
// https://vitejs.dev/config/
export default defineConfig({
  // server: {
  //   host: '0.0.0.0'
  // },
  envDir: '../../',
  plugins: pluginsConfig,
  resolve: {
    alias: {
      '@us/web': '@us/web/src',
      '@us/web-mobile': '@us/web-mobile/src',
      '@us/web-tg': '@us/web-tg/src',
      '@us/locales': '@us/locales/src',
      '@us/shared': '@us/shared/src',
      '@us/utils': '@us/utils/src',
      '@us/proto': '@us/proto/src',
      '@us/api': '@us/api/src',
      '@us/ws': '@us/ws/src',
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        // example : additionalData: `@import "./src/design/styles/variables";`
        // dont need include file extend .scss
        additionalData: `@use "sass:math"; @import "@us/web/assets/scss/common";`
      },
    },
    postcss: {
      plugins: [
        // flexGapPolyfill({ only: true }),
      ],
    },
  },
})
