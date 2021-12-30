<template>
  <div ref="chartEL" class="my-chart"></div>
</template>

<script setup>
import * as echarts from 'echarts/core'

// 图例组件
import {
  // TitleComponent, // 提示框
  // LegendComponent,
  // LegendPlainComponent,
  // LegendScrollComponent,
  TooltipComponent, // 标题
  // GridComponent // 直角坐标系
  ToolboxComponent,
  DataZoomComponent,
  LegendComponent
  // VisualMapComponent
} from 'echarts/components'
// 后续有更多扩展，在此引入
import { ScatterChart, GraphChart, LineChart, BarChart, PictorialBarChart } from 'echarts/charts'
// 渲染器
import { CanvasRenderer, SVGRenderer } from 'echarts/renderers'

const emits = defineEmits(['on-click'])

const props = defineProps({
  renderer: {
    type: String,
    required: false,
    default: 'canvas'
  },
  theme: {
    type: String,
    required: false,
    default: 'light'
  },
  options: {
    type: Object,
    required: true
  }
})
const { renderer, theme, options } = toRefs(props)

const chartEL = ref(null)
// 注册必须的组件
echarts.use([
  CanvasRenderer,
  SVGRenderer,
  ScatterChart,
  GraphChart,
  ToolboxComponent,
  TooltipComponent,
  LineChart,
  DataZoomComponent,
  BarChart,
  PictorialBarChart,
  LegendComponent
])

onMounted(() => {
  const myChart = echarts.init(chartEL.value, theme.value, {
    renderer: renderer.value
  })

  // 监听数据
  watchEffect(() => {
    myChart.setOption(options.value)
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

<style lang="css" scoped>
.my-chart {
  width: 100%;
  height: 100%;
  /* background-color: #fff; */
}
</style>
