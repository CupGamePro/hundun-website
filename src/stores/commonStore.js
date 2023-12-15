import { defineStore } from 'pinia'

export const useCommonStore = defineStore({
  id: 'app-common',
  state: () => ({
    isCollapse: false,
    menus: []
  }),
  getters: {},
  actions: {
    setCollapse (collapse) {
      this.isCollapse = collapse
    },
    setMenus (menus) {
      this.menus = menus
    },
    getMenus () {
      return this.menus
    }
  }
})
