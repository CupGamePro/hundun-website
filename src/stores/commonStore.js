import { defineStore } from 'pinia'
import { login, getInfo, getMenus } from '@/services/login'
import { ElMessage } from 'element-plus';
import BlockLayout from '@/layout/BlockLayout.vue';
import { resetRouter } from "@/router";
import { reject } from 'lodash';

export const useCommonStore = defineStore({
  id: 'app-common',
  state: () => ({
    isCollapse: false,
    menus: [],
    token: '',
    userInfo: null
  }),
  getters: {},
  actions: {
    setCollapse(collapse) {
      this.isCollapse = collapse
    },
    setMenus(menus) {
      this.menus = menus
    },
    getAllMenus() {
      return this.menus
    },
    setToken(token) {
      localStorage.setItem('token', token)
      this.token = token
    },
    getToken() {
      return this.token
    },
    loginAction(payload) {
      return new Promise(resolve => {
        login(payload).then(res => {
          if (res.success) {
            this.setToken(res.data.token || '')
            resolve(res.data)
          } else {            
            ElMessage.error(res.message)
            reject(res.message)
          }
        })
      })
    },
    getUserInfo() {
      getInfo().then(res => {
        if (res.success) {
          this.userInfo = res.data;
        }
      })
    },
    getSysMenus() {
      return new Promise((resolve, reject) => {
        getMenus().then(({ data }) => {
          resolve(data);
        })
          .catch((error) => {
            reject(error);
          });
      });
    },
    getCurrentUser() {
      return this.userInfo
    },
    /**
   * 生成动态路由
   *
   * @param roles 用户角色集合
   * @returns
   */
    generateRoutes(menuData, parent) {
      const routes = [];
      menuData.forEach((item) => {
        const path = parent ? parent.path + item.path : item.path;
        const component = item.type === 1 ? BlockLayout : () => import('@/views' + item.component + '.vue');
        const rou = {
          path,
          name: item.code,
          component, // 替换为对应的组件
          meta: {
            title: item.name,
            icon: item.icon
          }
        }
        if (item.children && item.children.length > 0) {
          rou.children = this.generateRoutes(item.children, item);
        }
        routes.push(rou);
      });
      return routes
    },
    resetToken() {
      return new Promise((resolve) => {
        this.token = ''
        localStorage.removeItem('token')
        resetRouter();
        resolve();
      });
    }
  }
})
