<template>
  <div class="slide-menu" :style="{
    width: `${isCollapse ? SlideMenuMinWidth : SlideMenuWidth}`
  }">
    <el-scrollbar class='el-menu-vertical'>
      <el-menu class='el-menu-vertical' :style="{ width: isCollapse ? SlideMenuMinWidth : SlideMenuWidth }"
        :default-active="activeIndex" :collapse="isCollapse">
        <template v-for="item in menus" :key="item.path">
          <el-sub-menu v-if="item.children && item.children.length > 0" :key="item.name" :index="item.name">
            <template #title>
              <el-icon :size="18">
                <component :is="item.icon"></component>
              </el-icon>
              <span>{{  item.title  }}</span>
            </template>
            <el-menu-item v-for="subItem in item.children" :key="subItem.path" :index="subItem.path"
              @click="handleMenuClick(subItem)">
              <el-icon :size="18">
                <component :is="subItem.icon"></component>
              </el-icon>
              <template #title>
                <span>{{  subItem.title  }}</span>
              </template>
            </el-menu-item>
          </el-sub-menu>
          <el-menu-item v-else :index="item.path" @click="handleMenuClick(item)">
            <el-icon :size="18">
              <component :is="item.icon"></component>
            </el-icon>
            <template #title>
              <span>{{  item.title  }}</span>
            </template>
          </el-menu-item>
        </template>
      </el-menu>
    </el-scrollbar>

    <div class="slide-menu-collapse">
      <el-icon @click="handleCollapse" :color="PrimaryColor" :size="22">
        <component :is="!isCollapse ? 'Fold' : 'Expand'"></component>
      </el-icon>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch, toRefs } from 'vue'
import { ThemeConfig } from '../../themeConfig'
import { menus } from '../../router/menu'
import { useCommonStore } from '@/stores/commonStore'
import { useRoute, useRouter } from 'vue-router'

const commonStore = useCommonStore()
const route = useRoute()
const router = useRouter()

const activeIndex = ref()
const { HeaderHeight, SlideMenuWidth, SlideMenuMinWidth, PrimaryColor } = ThemeConfig;
const { isCollapse } = toRefs(commonStore)

onMounted(() => {
  getActiveIndex()
})

watch(
  () => route.fullPath,
  () => {
    getActiveIndex()
  }
)

const getActiveIndex = () => {
  // location.pathname的值通常为：/main-angular11/app-vue2/page2，我们只取`/app-vue2/page2`
  const pathArr = location.pathname.match(/\/app-.+/) || [location.pathname]
  activeIndex.value = pathArr ? pathArr[0].replace(/\/$/, '') : '/'

  // 去除斜线后缀，如：/app-vue2/ 转换为 /app-vue2
  if (activeIndex.value !== '/') {
    activeIndex.value = activeIndex.value.replace(/\/$/, '')
  }
}

const handleCollapse = () => {
  commonStore.setCollapse(!commonStore.isCollapse)
}


const handleMenuClick = (item) => {
  if (item.path) {
    router.push(item.path)
  }
}
</script>

<style lang="scss" scoped>
.slide-menu {
  position: fixed;
  background: #fff;
  border-right: 1px solid #f0f0f0;
  box-shadow: 2px 0 8px 0 rgba(29, 35, 41, 0.05);
  z-index: 99;
  height: 100vh;
  padding-top: v-bind(HeaderHeight);
  transition: width 0.3s linear;
}
.slide-menu-collapse {
  margin-top: 8px;
  padding-left: 20px;
  cursor: pointer;
}
.el-menu-item.is-active::after {
  position: absolute;
  content: '';
  top: 0;
  right: 0;
  bottom: 0;
  border-right: 3px solid var(--el-color-primary);
}

.el-menu-item.is-active {
  background-color: var(--el-color-primary-light-9);
  color: var(--el-color-primary);
}
.el-menu-vertical {
  height: calc(100% - v-bind(HeaderHeight) - 40px);
}
.el-menu {
  padding-top: 3px;
  border-right: none;
}
</style>
