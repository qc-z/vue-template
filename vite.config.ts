import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
// import styleImport, { ElementPlusResolve } from 'vite-plugin-style-import'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
// import legacy from '@vitejs/plugin-legacy'
// import Inspect from 'vite-plugin-inspect'
// import IconsResolver from 'unplugin-icons/resolver'
// import Icons from 'unplugin-icons/vite'
// import WindiCSS from 'vite-plugin-windicss'
import viteSvgIcons from 'vite-plugin-svg-icons'
import path from 'path'
import Unocss from 'unocss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Components({
      dirs: ['src/components'],
      extensions: ['vue', 'ts', 'tsx'],
      dts: 'src/components.d.ts',
      resolvers: [
        // 自动注册图标组件
        // IconsResolver({
        //   enabledCollections: ['ep']
        // }),
        // 自动导入 Element Plus 组件
        ElementPlusResolver({
          importStyle: 'sass',
          directives: true,
          version: '1.2.0-beta.6'
        })
      ]
    }),
    AutoImport({
      resolvers: [ElementPlusResolver()],
      imports: ['vue', 'vue-router'],
      dts: 'src/auto-import.d.ts'
    }),
    // styleImport({
    //   resolves: [ElementPlusResolve()]
    // }),
    // WindiCSS(),
    viteSvgIcons({
      // Specify the icon folder to be cached
      iconDirs: [path.resolve(process.cwd(), 'src/icons')],
      // Specify symbolId format
      symbolId: 'icon-[dir]-[name]'
    }),
    // legacy({
    //   targets: ['ie >= 11'],
    //   additionalLegacyPolyfills: ['regenerator-runtime/runtime']
    // }),
    // Icons({
    //   autoInstall: true
    // }),
    // Inspect(),
    Unocss()
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '/src'),
      '@api': path.resolve(__dirname, '/src/api/mods')
    },
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue']
  },
  // 设置打包路径
  base: './',
  server: {
    port: 4000,
    open: true,
    cors: true
    // 设置代理，根据我们项目实际情况配置
    // proxy: {
    //   '/api': {
    //     target: 'http://xxx.xxx.xxx.xxx:8000',
    //     changeOrigin: true,
    //     secure: false,
    //     rewrite: (path) => path.replace('/api/', '/')
    //   }
    // }
  },
  build: {
    // target: 'es2015',
    // assetsDir: 'static/img/',
    rollupOptions: {
      output: {
        chunkFileNames: 'static/js/[name]-[hash].js',
        entryFileNames: 'static/js/[name]-[hash].js',
        assetFileNames: 'static/[ext]/[name]-[hash].[ext]'
      }
    },
    chunkSizeWarningLimit: 2000,
    brotliSize: false,
    sourcemap: false
    // 设置为 false 可以禁用最小化混淆
    // minify: true
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "./src/style/element/index.scss" as *;@use "./src/style/variable/index.scss" as *;`,
        charset: false
      }
    }
  }
})
