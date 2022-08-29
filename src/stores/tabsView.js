import { defineStore } from 'pinia'

const whiteList = ['Redirect', 'login']

export const useTabsViewStore = defineStore({
  id: 'app-tabs-view',
  state: () => ({
    tabsList: []
  }),
  getters: {},
  actions: {
    initTabs (routes) {
      this.tabsList = routes
    },
    addTabs (route) {
      // 添加标签页
      if (whiteList.includes(route.name)) return false
      const isExists = this.tabsList.some((item) => item.fullPath === route.fullPath)
      if (!isExists) {
        this.tabsList.push(route)
      }
      return true
    },
    closeLeftTabs (route) {
      // 关闭左侧
      const index = this.tabsList.findIndex((item) => item.fullPath === route.fullPath)
      this.tabsList.splice(0, index)
    },
    closeRightTabs (route) {
      // 关闭右侧
      const index = this.tabsList.findIndex((item) => item.fullPath === route.fullPath)
      this.tabsList.splice(index + 1)
    },
    closeOtherTabs (route) {
      // 关闭其他
      this.tabsList = this.tabsList.filter((item) => item.fullPath === route.fullPath)
    },
    closeCurrentTab (route) {
      // 关闭当前页
      const index = this.tabsList.findIndex((item) => item.fullPath === route.fullPath)
      this.tabsList.splice(index, 1)
    },
  }
})
