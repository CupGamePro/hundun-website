<template>
  <div class="header-box-wrap" :style="{
      height: HeaderHeight,
      lineHeight: HeaderHeight,
    }">
    <div class="header-title" :style="{
      width: SlideMenuWidth,
    }">
      <span>{{ title }}</span>
    </div>
    <div class="header-content"></div>
    <div class="header-actions">
      <Notice />
      <HelpDoc />
      <Avatar />
    </div>
  </div>
</template>

<script setup>
import { ThemeConfig } from "../../themeConfig";
import Notice from "./notice.vue";
import Avatar from "./avatar.vue";
import HelpDoc from "./helpDoc.vue";

const { HeaderHeight, SlideMenuWidth, title } = ThemeConfig
</script>

<style lang="scss" scoped>
.header-box-wrap {
  position: fixed;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  box-shadow: 0 4px 10px rgb(0 0 0 / 5%);
  width: 100%;
  background: #fff;
  z-index: 100;
  transition: opacity 0.3s ease-out 0s, transform 0.3s ease-out 0s;
  opacity: 1;
  transform: translateY(0px);

  .header-title {
    padding: 0 23px;
    color: var(--el-color-primary);
    font-size: 26px;
    font-weight: bold;
    overflow: hidden;
  }
  .header-content {
    padding: 0 20px;
  }
  .header-actions {
    display: flex;
    align-items: center;
  }
}
</style>
