import { createRouter, createWebHistory } from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import Layout from '../layout/index.vue'
import { ElLoading } from 'element-plus'

export const routes = [
  {
    path: '/',
    name: 'Layout',
    redirect: '/home',
    component: Layout,
    children: [
      {
        path: 'home',
        name: 'Home',
        component: () => import(/* webpackChunkName: "Dashboard" */ '../views/Dashboard/index.vue'),
        meta: {
          title: '首页'
        }
      }
    ]
  },
  {
    path: '/authority',
    redirect: {
      name: 'Menu'
    },
    component: Layout,
    name: 'Authority',
    children: [
      {
        path: 'menu',
        name: 'Menu',
        component: () => import('../views/SystemPage/menuPage/index.vue'),
        meta: {
          title: '菜单管理'
        }
      },
      {
        path: 'roles',
        name: 'Roles',
        component: () => import('../views/SystemPage/userPage/index.vue'),
        meta: {
          title: '角色管理'
        }
      },
      {
        path: 'users',
        name: 'Users',
        component: () => import('../views/users.vue'),
        meta: {
          title: '用户管理'
        }
      },
      {
        path: 'resource',
        name: 'Resource',
        component: () => import('../views/resource.vue'),
        meta: {
          title: '资源管理'
        }
      }
    ]
  },
  {
    path: '/*',
    name: '/404',
    component: () => import(/* webpackChunkName: "ErrorPage" */ '../views/ErrorPage/404.vue'),
    meta: {
      title: '404'
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

const loadingInstance = ElLoading.service({ target: '.page-container' })
router.beforeEach((to, from, next) => {
  NProgress.start()
  next()
})

router.afterEach(() => {
  NProgress.done()
  loadingInstance.close();
})
export default router
