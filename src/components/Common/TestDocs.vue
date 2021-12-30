<template>
  <div class="container">
    <el-button size="small" type="primary" @click="testMessage">测试</el-button>
  </div>
</template>

<script setup>
function testMessage() {
  ElMessage.success('this is a message.')
}
</script>
