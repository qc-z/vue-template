<template>
  <div ref="GLChart" class="my-glChart"></div>
</template>
<script setup>
import 'echarts-gl'
import * as echarts from 'echarts'

const emits = defineEmits(['on-click'])

const GLChart = ref(null)

const props = defineProps({
  options: {
    type: Object,
    required: true
  }
})
const { options } = toRefs(props)

// 渲染echarts图

onMounted(() => {
  const myChart = echarts.init(GLChart.value)
  // 监听数据
  watchEffect(() => {
    myChart.setOption(options.value, true, true)
  })
  // 响应式
  const resize = () => {
    window.requestAnimationFrame(() => {
      myChart.resize()
    })
  }
  window.addEventListener('resize', resize)
  onBeforeUnmount(() => {
    window.removeEventListener('resize', resize)
  })
  myChart.on('click', function (params) {
    // 在用户点击后控制台打印数据的名称
    emits('on-click', params)
  })
})
</script>
<style scoped>
.my-glChart {
  width: 100%;
  height: 100%;
}
</style>
