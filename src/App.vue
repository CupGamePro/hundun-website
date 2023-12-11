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

const locale = ref(zhCn);
</script>

<style lang="scss">
</style>
