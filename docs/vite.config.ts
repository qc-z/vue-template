import { defineConfig } from 'vite'
import vueJsx from '@vitejs/plugin-vue-jsx'
import path from 'path'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'

console.log(`${__dirname}/vitepress-auto-import.d.ts`)

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: [{ find: '@', replacement: path.resolve(__dirname, '../src') }]
  },
  plugins: [
    vueJsx(),
    Components({
      dts: './vitepress-components.d.ts',
      resolvers: [ElementPlusResolver()]
    }),
    AutoImport({
      dts: `${__dirname}/vitepress-auto-import.d.ts`,
      resolvers: [ElementPlusResolver()]
    })
  ]
})
