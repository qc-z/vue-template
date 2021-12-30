<template>
  <el-table :data="tableData" style="width: 100%" class="my-table">
    <el-table-column prop="date" label="Date" width="180"></el-table-column>
    <el-table-column prop="name" label="Name" width="180"></el-table-column>
    <el-table-column prop="address" label="Address">
      <el-button type="primary" @click="switchTheme('defaultTheme')">defaultTheme</el-button>
      <el-button type="warning" @click="switchTheme('darkTheme')">darkTheme</el-button>
      <el-button color="#626aef" style="color: #fff">Custom</el-button>

      <span class="fonts">字体</span>
      <span class="fonts1">字体</span>
    </el-table-column>
  </el-table>
</template>

<script setup>
import themes from '@/utils/themes'
import { colorMix } from '@/utils/utils'

const switchTheme = (type) => {
  // 根据不同的主题类型 获取不同主题数据
  // themes 对象包含 defaultTheme、darkTheme 两个属性即默认主题与深色主题
  // 通过`import themes from '@/utils/themes'` 导入
  type = type || 'darkTheme'
  const colorObj = themes[type]

  // 获取基本色色阶
  // colorMix是一个函数
  for (let i = 1; i < 10; i += 1) {
    colorObj[`--el-color-primary-light-${10 - i}`] = colorMix(
      colorObj['--el-color-white'],
      colorObj['--el-color-primary'],
      i * 0.1
    )
  }

  // 设置css 变量
  Object.keys(colorObj).map((item) => {
    document.documentElement.style.setProperty(item, colorObj[item])
  })
}
const tableData = [
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  }
]
onMounted(() => {
  ElMessage('this is a message.')

  // switchTheme('darkTheme')
})
</script>

<style lang="scss" scoped>
.test {
  color: $color1;
}
.fonts {
  font-family: HYXiaoBoZheZhiTiJ;
  font-size: 18px;
  font-weight: 400;
}
.fonts1 {
  font-family: LESLIE-Regular;
  font-size: 18px;
  font-weight: 400;
}
</style>
