<template>
  <div style="height: 100vh">
    <Header></Header>
    <div class="layout-content">
      <SlideMenu></SlideMenu>
      <div class="micro-layout-container" :style="{
          paddingTop: isTagsMenu ? '' : `calc(${HeaderHeight} + 42px)`,
          marginLeft: `${!isCollapse ? SlideMenuWidth : SlideMenuMinWidth}`,
          width: `calc(100% - ${isCollapse ? SlideMenuMinWidth : SlideMenuWidth})`
        }">
        <TagView v-if="isTagsMenu"></TagView>
        <router-view v-slot="{ Component }">
          <PageContainer>
            <component :is="Component" />
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

const { HeaderHeight, SlideMenuWidth, SlideMenuMinWidth, isTagsMenu } = ThemeConfig
const { isCollapse } = toRefs(commonStore)
</script>

<style lang="scss" scoped>
.layout-content {
  display: flex;
  height: calc(100% - v-bind(HeaderHeight));
}
.micro-layout-container {
  position: relative;
  top: v-bind(HeaderHeight);
  height: 100%;
  transition: all 0.3s linear;
}
</style>
