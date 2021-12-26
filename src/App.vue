<template>
  <div id="app">
    <el-config-provider :locale="locale">
      <router-view></router-view>
    </el-config-provider>
  </div>
</template>
<script setup>
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
import 'dayjs/locale/zh-cn'

const locale = zhCn
function setRem() {
  const element = document.documentElement
  const width = element.clientWidth
  element.style.fontSize = `${Math.ceil(width / 100)}px`
}

setRem()
window.addEventListener('resize', () => {
  setRem()
})
</script>
<style></style>
