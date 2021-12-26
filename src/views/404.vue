<template>
  <el-result icon="error" title="错误提示" sub-title="抱歉，找不到该页面">
    <template #extra>
      <el-button type="primary" size="medium" @click="toHome">首页</el-button>
    </template>
  </el-result>
</template>
<script setup>
function toHome() {
  window.location.href = '/'
}
</script>
