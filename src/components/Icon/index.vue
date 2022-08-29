<template>
  <span class="icon-comp">
    <el-icon v-if="type === 'el-icon'" :style="{ 'font-size': size + 'px', 'color': color || '' }">
      <component :is="`el-${name}-icon`" />
    </el-icon>
  </span>
</template>

<script setup>
import { defineProps } from 'vue'
defineProps({
  type: {
    type: String,
    default: 'el-icon'
  },
  size: {
    type: String,
    default: '14'
  },
  color: {
    type: String,
    default: ''
  },
  name: {
    type: String,
    default: 'Pear'
  }
})
</script>
<style lang="scss" scoped>
  .icon-comp {
    display: flex;
    align-items: center;
    vertical-align: middle;
    text-align: center;
    cursor: pointer;
  }
</style>
