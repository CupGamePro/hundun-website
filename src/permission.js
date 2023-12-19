import router from "./router";
import { store } from "./stores";
import { useCommonStore } from "./stores/commonStore";

import NProgress from "nprogress";
import "nprogress/nprogress.css";

NProgress.configure({ showSpinner: false }); // 进度条

const commonStore = useCommonStore(store);

// 白名单路由
const whiteList = ["/login"];

router.beforeEach(async (to, from, next) => {
  NProgress.start();
  const hasToken = localStorage.getItem("token");
  if (hasToken) {
    if (to.path === "/login") {
      // 如果已登录，跳转首页
      next({ path: "/" });
      NProgress.done();
    } else {
      const hasRoles = commonStore.getCurrentUser();
      if (hasRoles) {
        // 未匹配到任何路由，跳转404
        if (to.matched.length === 0) {
          from.name ? next({ name: from.name }) : next("/404");
        } else {
          next();
        }
      } else {
        commonStore.getUserInfo()
        const menuData = await commonStore.getSysMenus();
        const accessRoutes = await commonStore.generateRoutes(menuData, null);
        commonStore.setMenus(accessRoutes);
        accessRoutes.forEach((route) => {
          router.addRoute('Layout', route);
        });
        next({ ...to, replace: true });
      }
    }
  } else {
    // 未登录可以访问白名单页面
    if (whiteList.indexOf(to.path) !== -1) {
      next();
    } else {
      next(`/login?redirect=${to.path}`);
      NProgress.done();
    }
  }
});

router.afterEach(() => {
  NProgress.done();
});
