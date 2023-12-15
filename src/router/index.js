import { createRouter, createWebHistory } from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import Layout from '../layout/index.vue'
import BlockLayout from '../layout/BlockLayout.vue'
import { ElLoading } from 'element-plus'
import request from '../utils/request';
import { store } from '../stores'
import { useCommonStore } from '@/stores/commonStore'

const commonStore = useCommonStore(store)

export const constantRoutes = [
  {
    path: '/home',
    name: 'Layout',
    component: Layout,
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import(/* webpackChunkName: "Dashboard" */ '../views/Dashboard/index.vue'),
        meta: {
          title: '首页'
        }
      }
    ]
  }
]

const otherRouters = [
  {
    path: '/*',
    name: '404',
    component: () => import(/* webpackChunkName: "ErrorPage" */ '../views/ErrorPage/404.vue'),
    meta: {
      title: '404'
    }
  }
]

// 请求后端数据
const fetchMenuData = async () => {
  try {
    const response = await request.get('/plat-service/menu/sysmenu');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch menu data:', error);
    return [];
  }
};

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: constantRoutes
})

const loadingInstance = ElLoading.service({ target: '.page-container' })

// 生成路由
const generateRoutes = (menuData, parent) => {
  const routes = [];
  menuData.forEach((item) => {
    const path = parent ? parent.path + item.path : item.path;
    const component = item.type === 1 ? Layout : () => import('@/views' + item.component + '.vue');
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
      rou.children = generateRoutes(item.children, item);
    }
    routes.push(rou);
  });
  return routes
};

router.beforeEach(async (to, from, next) => {
  NProgress.start()
  if (commonStore.getMenus().length === 0) {
    const menuData = await fetchMenuData();
    const routes = generateRoutes(menuData);
    console.log(menuData);
    commonStore.setMenus(routes)
    router.addRoute(
      {
        path: '/',
        name: 'BlockLayout',
        redirect: {
          name: 'Home'
        },
        component: BlockLayout,
        children: [...routes, ...otherRouters]
      }
    )
    next({ ...to, replace: true })
  } else {
    next()
  }

})
console.log(router.getRoutes());
router.afterEach(() => {
  NProgress.done()
  loadingInstance.close();
})
export default router
