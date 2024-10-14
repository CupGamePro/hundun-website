<template>
  <el-config-provider
   :locale="locale"
    :size="'default'"
    :button="{
      autoInsertSpace: true,
    }">
    <router-view />
  </el-config-provider>
</template>

<script setup>
import { ref } from 'vue';
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import { debounce } from "lodash";

const _ = window.ResizeObserver;
window.ResizeObserver = class ResizeObserver extends _ {
  constructor(callback) {
    callback = debounce(callback, 100);
    super(callback);
  }
};

const locale = ref(zhCn);

</script>

<style lang="scss">
</style>
