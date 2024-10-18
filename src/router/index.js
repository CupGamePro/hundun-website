import { createRouter, createWebHistory } from 'vue-router'
import Layout from '../layout/index.vue'

export const constantRoutes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "Dashboard" */ '../views/Login/index.vue'),
    meta: {
      title: '登录'
    }
  },
  {
    path: '/',
    name: 'Layout',
    redirect: '/home',
    component: Layout,
    children: [
      {
        path: '/*',
        name: '404',
        component: () => import(/* webpackChunkName: "ErrorPage" */ '../views/ErrorPage/404.vue'),
        meta: {
          title: '404'
        }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes: constantRoutes
})

/**
 * 重置路由
 */
export function resetRouter() {
  router.replace({ path: "/login" });
}

export function initRouter() {
  router.replace({ path: "/" });
}

export default router
