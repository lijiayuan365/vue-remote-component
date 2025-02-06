import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
// import postcsspxtoviewport from 'postcss-px-to-viewport'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  css: {
    postcss: {
      plugins: [
        // postcsspxtoviewport({
        //   unitToConvert: 'px',
        //   viewportWidth: 750,
        //   unitPrecision: 5,
        //   propList: ['*', '!*--van-*'],
        //   viewportUnit: 'vw',
        //   fontViewportUnit: 'vw',
        //   selectorBlackList: [/^van-/],
        //   minPixelValue: 1,
        //   mediaQuery: false,
        //   replace: true,
        //   exclude: undefined,
        //   landscape: false,
        // })
      ]
    }
  }
})
