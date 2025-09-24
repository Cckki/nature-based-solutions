import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'

// https://vite.dev/config/
export default defineConfig({
  base: '/nature-based-solutions/',
  plugins: [
    vue(),
    //    vueDevTools(),
    // AutoImport({
    //   imports: [
    //     'vue',
    //     'vue-router',
    //   ],
    //   dts: 'src/auto-imports.d.ts',
    //   eslintrc: {
    //     enabled: true,
    //     filepath: './.eslintrc-auto-import.json',
    //     globalsPropValue: true,
    //   },
    // }),
    Components({
      resolvers: [
        AntDesignVueResolver({
          importStyle: 'less',
        })
      ]
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})
