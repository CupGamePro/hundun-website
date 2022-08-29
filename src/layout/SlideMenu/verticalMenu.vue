<template>
  <div
    class="slide-menu"
    :style="{
      'height': `100vh`,
      marginTop: `${ThemeConfig.HeaderHeight}px`,
      'width': `${commonStore.isCollapse ? ThemeConfig.SlideMenuMinWidth : ThemeConfig.SlideMenuWidth}px`
    }"
  >
    <el-scrollbar
      :style="{
        'height': `calc(100% - ${ThemeConfig.HeaderHeight + 40}px)`
      }"
    >
      <el-menu class="el-menu-vertical" :default-active="activeIndex">
        <MenuTree :menuList="menus" />
      </el-menu>
    </el-scrollbar>
    <div class="slide-menu-collapse">
      <Icon
        :name="!commonStore.isCollapse ? 'Fold' : 'Expand'"
        :color="ThemeConfig.PrimaryColor"
        size="22"
        @click="handleCollapse"
      ></Icon>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'
import { ThemeConfig } from '../../themeConfig'
import { menus } from '../../router/menu'
import MenuTree from './MenuTree.vue'
import Icon from '@/components/Icon/index.vue'
import { useCommonStore } from '@/stores/commonStore'
import { useRoute } from 'vue-router'

const commonStore = useCommonStore()
const route = useRoute()

const activeIndex = ref()

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
</script>

<style lang="scss" scoped>
.slide-menu {
  position: fixed;
  background: #fff;
  border-right: 1px solid #f0f0f0;
  box-shadow: 2px 0 8px 0 rgba(29, 35, 41, 0.05);
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 0.5s;
  z-index: 99;
}
.el-menu {
  border-right: none;
}
.el-menu-vertical {
  width: 100%;
}
.slide-menu-collapse {
  margin-top: 8px;
  padding-left: 25px;
  cursor: pointer;
}
.special-button-box {
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
