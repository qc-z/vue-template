import { createApp } from 'vue'
import VueLazyLoad from 'vue3-lazyload'

// import ElementPlus from 'element-plus'
import ResizeObserver from 'resize-observer-polyfill'
import { createPinia } from 'pinia'
import Message from '@/utils/resetMessage'

import router from './router/index'
// import 'element-plus/dist/index.css'
import './style/base.scss'
import App from './App.vue'
// // 第一种方法 使用中国时区weekStart默认为1
import 'dayjs/locale/zh-cn'
import 'virtual:windi.css'
import 'virtual:svg-icons-register'

window.ResizeObserver = ResizeObserver
;(window as any).Message = Message

const app = createApp(App)
app.use(VueLazyLoad, {})
app.use(router)
// app.use(ElementPlus)
app.use(createPinia())

app.mount('#app')
