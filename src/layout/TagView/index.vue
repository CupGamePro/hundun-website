<template>
  <div class="tag-box-wrap">
    <div class="tags-main-box">
      <div class="tabs-card-scroll-item" :id="`taghome`"
        :class="{ 'active-item': state.activeKey === '/home' }" @click.stop="linkTo({ fullPath: '/home'})">
        <div class="tabs-card-title">
          <span>首 页</span>
        </div>
      </div>
      <Draggable :list="tabsList" animation="300" item-key="fullPath" class="flex">
        <template #item="{ element }">
          <div class="tabs-card-scroll-item" :id="`tag${element.fullPath.split('/').join('\/')}`"
            :class="{ 'active-item': state.activeKey === element.path }" @click.stop="linkTo(element)">
            <div class="tabs-card-title">
              <span>{{ element.meta.title }}</span>
            </div>
            <div class="tabs-card-close-button" v-if="element.meta.title !== '首页'">
              <el-icon :size="16" @click.stop="closeTabItem(element)">
                <Close />
              </el-icon>
            </div>
          </div>
        </template>
      </Draggable>
    </div>
  </div>
</template>
<script setup>
import {
  computed,
  reactive,
  watch
} from 'vue'
import Draggable from 'vuedraggable'
import { TAGS_ROUTES } from '@/utils/storeKeys'
import { useTabsViewStore } from '@/stores/tabsView'
import { useRoute, useRouter } from 'vue-router'
import { storage } from '@/utils/storage'
import { ElMessage } from 'element-plus'

const tabsViewStore = useTabsViewStore()
const route = useRoute()
const router = useRouter()

const state = reactive({
  activeKey: route.fullPath
})

// 获取简易的路由对象
const getSimpleRoute = (route) => {
  const { fullPath, hash, meta, name, params, path, query } = route
  return { fullPath, hash, meta, name, params, path, query }
}

// 在页面关闭或刷新之前，保存数据
window.addEventListener('beforeunload', () => {
  storage.set(TAGS_ROUTES, JSON.stringify(tabsList.value))
})

let cacheRoutes = []
const simpleRoute = getSimpleRoute(route)
try {
  const routesStr = storage.get(TAGS_ROUTES)
  cacheRoutes = routesStr ? JSON.parse(routesStr) : [simpleRoute]
} catch (e) {
  cacheRoutes = [simpleRoute]
}

// 将最新的路由信息同步到 localStorage 中
const routes = router.getRoutes()

cacheRoutes.forEach((cacheRoute) => {
  const route = routes.find((route) => route.path === cacheRoute.path)
  if (route) {
    cacheRoute.meta = route.meta || cacheRoute.meta
    cacheRoute.name = (route.name || cacheRoute.name)
  }
})

// 初始化标签页
tabsViewStore.initTabs(cacheRoutes)

// 标签页列表
const tabsList = computed(() => tabsViewStore.tabsList.filter(ele => ele.path !== '/home'))

// 监听路由
watch(
  () => route.fullPath,
  (to) => {
    state.activeKey = to
    tabsViewStore.addTabs(getSimpleRoute(route))
  },
  { immediate: true }
)

// 关闭当前页面
const removeTab = (route) => {
  if (tabsList.value.length === 1) {
    return ElMessage({
      showClose: true,
      message: '这已经是最后一页，不能再关闭了！',
      type: 'warning'
    })
  }
  tabsViewStore.closeCurrentTab(route)
  // 如果关闭的是当前页
  if (state.activeKey === route.fullPath) {
    const currentRoute = tabsList.value[Math.max(0, tabsList.value.length - 1)]
    state.activeKey = currentRoute.fullPath
    router.push(currentRoute)
  }
}

// 删除tab
const closeTabItem = (e) => {
  const { fullPath } = e
  const routeInfo = tabsList.value.find((item) => item.fullPath === fullPath)
  removeTab(routeInfo)
}

// tags 跳转页面
const linkTo = (e) => {
  const { fullPath } = e
  if (fullPath === route.fullPath) return
  state.activeKey = fullPath
  router.push({ path: fullPath })
}
</script>
<style lang="scss" scoped>
.tag-box-wrap {
  position: fixed;
  box-sizing: border-box;
  height: 42px;
  width: inherit;
  background-color: var(--el-color-white);
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  z-index: 90;
  color: var(--el-text-color-regular);
}

.tags-main-box {
  display: flex;
  flex-direction: row;
  overflow-x: auto;
  padding: 6px;
}
.tabs-card-scroll-item {
  display: flex;
  align-items: center;
  background: #fff;
  height: 30px;
  line-height: 30px;
  font-size: 14px;
  border-radius: 2px;
  border: 1px solid var(--el-border-color-lighter);
  margin-right: 6px;
  cursor: pointer;
  box-shadow: var(--el-box-shadow-lighter);
}
.tabs-card-title {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: inline-block;
  padding: 0 10px;
}
.active-item {
  color: var(--el-color-primary);
  background-color: var(--el-color-primary-light-9);
  border-color: var(--el-border-color-lighter);
}
.tabs-card-close-button:hover {
  background-color: var(--el-border-color-lighter);
  border-radius: 50%;
}
.tabs-card-close-button {
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 6px;
}
.flex {
  display: flex;
}
/* 滚动条的宽度 */
*::-webkit-scrollbar {
  width: 5px;
  height: 5px;
}

/* 滚动条的设置 */
*::-webkit-scrollbar-thumb {
  background-color: #ddd;
  background-clip: padding-box;
  -webkit-border-radius: 2em;
  -moz-border-radius: 2em;
  border-radius: 2em;
}

/* 滚动条鼠标移上去 */
*::-webkit-scrollbar-thumb:hover {
  background-color: #bbb;
}
</style>
