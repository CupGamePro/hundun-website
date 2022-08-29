<template>
  <div>
    <Header></Header>
    <div class="layout-content">
      <SlideMenu></SlideMenu>
      <div
        class="micro-layout-container"
        :style="{
          top: `${ThemeConfig.HeaderHeight}px`,
          minHeight: `calc(100vh - ${ThemeConfig.HeaderHeight}px)`,
          marginLeft: `${!commonStore.isCollapse ? ThemeConfig.SlideMenuWidth : ThemeConfig.SlideMenuMinWidth}px`,
          width: `calc(100% - ${commonStore.isCollapse ? 50 : ThemeConfig.SlideMenuWidth}px)`
        }"
      >
        <TagView v-if="ThemeConfig.isTagsMenu"></TagView>
        <router-view v-slot="{ Component }">
          <transition name="el-fade-in-linear" mode="out-in" appear>
            <PageContainer>
              <component :is="Component" />
            </PageContainer>
          </transition>
        </router-view>
      </div>
    </div>
  </div>
</template>

<script setup>
import Header from './Header/index.vue'
import SlideMenu from './SlideMenu/verticalMenu.vue'
import TagView from './TagView/index.vue'
import { ThemeConfig } from '../themeConfig'
import { useCommonStore } from '@/stores/commonStore'
import PageContainer from './Page/PageContainer.vue'

const commonStore = useCommonStore()
</script>

<style lang="scss" scoped>
.layout-content {
  display: flex;
}
.micro-layout-container {
  position: relative;
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 0.5s;
}
</style>
