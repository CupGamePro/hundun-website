import { defineStore } from 'pinia'

export const useCommonStore = defineStore({
  id: 'app-common',
  state: () => ({
    isCollapse: false
  }),
  getters: {},
  actions: {
    setCollapse (collapse) {
      this.isCollapse = collapse
    }
  }
})
