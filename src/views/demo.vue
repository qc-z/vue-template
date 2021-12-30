<template>
  <div class="container">
    <SvgIcon name="icon1" color="red"></SvgIcon>
    <el-row>
      <div class="mr-3">
        <el-button size="small" type="primary" @click="openMessage">测试</el-button>
      </div>
      <el-upload
        accept="application/msexcel,application/msword,application/pdf,image/jpeg,image/png,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.openxmlformats-officedocument.wordprocessingml.document,aplication/zip"
        multiple
        action=""
        ref="uploadRef"
        :auto-upload="false"
        :on-change="handleChange"
      >
        <el-button size="small" type="primary">上传</el-button>
      </el-upload>
    </el-row>
    <div
      class="py-8 px-8 max-w-sm mx-auto bg-white rounded-xl shadow-md space-y-2 sm:(py-4 flex items-center space-y-0 space-x-6)"
    >
      <img
        class="block mx-auto h-24 rounded-full sm:(mx-0 flex-shrink-0)"
        src="/favicon.ico"
        alt="Woman's Face"
      />
      <div class="text-center space-y-2 sm:text-left">
        <div class="space-y-0.5">
          <p class="text-lg text-black font-semibold">Erin Lindford</p>
          <p class="text-gray-500 font-medium">产品经理</p>
        </div>
        <button
          class="px-4 py-1 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 hover:(text-white bg-purple-600 border-transparent) focus:(outline-none ring-2 ring-purple-600 ring-offset-2)"
        >
          消息
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
/* API */
/* 组件 */

/* 功能 */
const openMessage = () => {
  ElMessageBox.confirm('proxy will permanently delete the file. Continue?', 'Warning', {
    confirmButtonText: 'OK',
    cancelButtonText: 'Cancel',
    type: 'warning'
  })
    .then(() => {
      ElMessage({
        type: 'success',
        message: 'Delete completed'
      })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: 'Delete canceled'
      })
    })
}
</script>

<style lang="scss" scoped>
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
}
</style>
