import { defineStore } from 'pinia'
import { getDictApi } from '@/api/common'

export const useDictStore = defineStore({
  // id: 必须的，在所有 Store 中唯一
  id: 'myDictState',
  // state: 返回对象的函数
  state: () => ({
    fxxxDictsOptions: [],
    fxxxDicts: {}
  }),
  actions: {
    async getDicts(key) {
      try {
        const res = await getDictApi(key)
        res.data.subDictionary.forEach((item) => {
          this.fxxxDictsOptions.push({
            label: item.itemName,
            value: item.itemCode
          })
          this.fxxxDicts[item.itemCode] = item.itemName
        })
      } catch (e) {
        console.log(e)
      }
    }
  }
})
