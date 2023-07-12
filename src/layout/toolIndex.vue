<template>
  <div style="height: 100vh">
    <Header></Header>
    <div class="micro-layout-container">
      <router-view v-slot="{ Component }">
        <component :is="Component" />
      </router-view>
    </div>
  </div>
</template>

<script setup>
import Header from './Header/index.vue'
import { ThemeConfig } from '../themeConfig'

const { HeaderHeight } = ThemeConfig
</script>

<style lang="scss" scoped>
.micro-layout-container {
  position: relative;
  height: calc(100vh - v-bind(HeaderHeight));
  top: v-bind(HeaderHeight);
  transition: all 0.3s linear;
}
</style>
