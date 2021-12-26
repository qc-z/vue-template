// 主题样式
import 'vitepress-theme-demoblock/theme/styles/index.css'
import theme from 'vitepress/dist/client/theme-default'

// 插件的组件，主要是demo组件
import { registerComponents } from './register-components.js'

export default {
  ...theme,
  enhanceApp({ app }) {
    registerComponents(app)
  }
}
