<template>
  <el-result
    icon="warning"
    title="警告"
    sub-title="您没查看该页面的权限,请联系管理员配置该页面权限"
  >
    <template #extra>
      <el-button type="primary" size="medium" @click="toLogin">返回主界面</el-button>
    </template>
  </el-result>
</template>
<script setup>
function toLogin() {
  Message.error('您没查看任何菜单的权限,请联系管理员配置菜单权限')
}
</script>
