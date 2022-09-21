<template>
  <div class="header-action-item">
    <div class="action-wraper">
      <el-tooltip
        content="文 档"
        placement="bottom"
      >
        <el-icon :size="18">
          <PartlyCloudy />
        </el-icon>
      </el-tooltip>
    </div>
  </div>
</template>
<script setup>
</script>
<style lang="scss" scoped>
.header-action-item {
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 0 10px;
}
.action-wraper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 30px;
  width: 30px;
}
.action-wraper:hover {
  background-color: var(--el-bg-color);
}
</style>
