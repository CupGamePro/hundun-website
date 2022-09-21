<template>
  <div>
    <Header></Header>
    <div class="layout-content">
      <SlideMenu></SlideMenu>
      <div
        class="micro-layout-container"
        :style="{
          minHeight: `calc(100vh - ${HeaderHeight})`,
          marginLeft: `${!isCollapse ? SlideMenuWidth : SlideMenuMinWidth}`,
          width: `calc(100% - ${isCollapse ? SlideMenuMinWidth : SlideMenuWidth})`
        }"
      >
        <TagView v-if="ThemeConfig.isTagsMenu"></TagView>
        <router-view v-slot="{ Component }">
          <PageContainer>
            <transition name="el-fade-in-linear" mode="out-in" appear>
              <component :is="Component" />
            </transition>
          </PageContainer>
        </router-view>
      </div>
    </div>
  </div>
</template>

<script setup>
import { toRefs } from 'vue'
import Header from './Header/index.vue'
import SlideMenu from './SlideMenu/verticalMenu.vue'
import TagView from './TagView/index.vue'
import { ThemeConfig } from '../themeConfig'
import { useCommonStore } from '@/stores/commonStore'
import PageContainer from './Page/PageContainer.vue'

const commonStore = useCommonStore()

const { HeaderHeight, SlideMenuWidth, SlideMenuMinWidth } = ThemeConfig
const { isCollapse } = toRefs(commonStore)
</script>

<style lang="scss" scoped>
.layout-content {
  display: flex;
}
.micro-layout-container {
  position: relative;
  top: v-bind(HeaderHeight);
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 0.5s;
}
</style>
