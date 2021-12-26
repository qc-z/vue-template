import { defineStore } from 'pinia'

export const useGlobalStore = defineStore({
  // id: 必须的，在所有 Store 中唯一
  id: 'myGlobalState',
  // state: 返回对象的函数
  state: () => ({
    implementNum: 0,
    qyid: null
  }),
  actions: {
    implementNumChange() {
      this.implementNum = Math.random()
    },
    changeQyid(id) {
      this.qyid = id
    }
  }
})
