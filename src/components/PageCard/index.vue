<template>
  <div class="page-card">
    <transition name="el-fade-in-linear">
      <div class="page-card-body">
        <slot></slot>
      </div>
    </transition>
  </div>
</template>
<script setup>
</script>
<style lang="scss" scoped>
.page-card {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  color: rgba(0, 0, 0, 0.85);
  font-size: 14px;
  font-variant: tabular-nums;
  line-height: 1.5715;
  list-style: none;
  font-feature-settings: "tnum", "tnum";
  background: #fff;
  border-radius: 2px;
  width: 100%;
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 0.5s;
}
.page-card-body {
  box-sizing: border-box;
  padding: 20px;
}
</style>
