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
import zhCn from 'element-plus/lib/locale/lang/zh-cn';

const locale = ref(zhCn);
</script>

<style lang="scss">
</style>
