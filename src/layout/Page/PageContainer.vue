<template>
  <div class="page-container" :style="{
    top: ThemeConfig.isTagsMenu ? '62px' : '20px'
  }">
    <slot></slot>
  </div>
</template>
<script setup>
import { ThemeConfig } from '../../themeConfig'
</script>

<style lang="scss" scoped>
.page-container {
  position: relative;
  box-sizing: border-box;
  margin: 0 20px 20px 20px;
}
</style>
