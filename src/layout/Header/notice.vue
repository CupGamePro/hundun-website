<template>
  <div class="header-action-item">
    <el-popover
      placement="bottom-end"
      popper-class="notice-popper"
      :width="300"
      trigger="click"
      :show-arrow="false"
    >
      <template #reference>
        <div class="action-wrapper">
          <el-icon :size="18">
            <el-badge :value="100" class="item" :is-dot="true">
              <Bell />
            </el-badge>
          </el-icon>
        </div>
      </template>
      <div class="notice-wrapper">
        <div class="notice-list">
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="通知" name="通知">
              <NoticeList />
            </el-tab-pane>
            <el-tab-pane label="消息" name="消息"><NoticeList /></el-tab-pane>
            <el-tab-pane label="待办" name="待办">待 办</el-tab-pane>
          </el-tabs>
        </div>

        <div class="notice-action-tools">
          <el-button text>标记已读</el-button>
          <el-button text>清空{{ activeName }}</el-button>
          <el-button text>查看更多</el-button>
        </div>
      </div>
    </el-popover>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import NoticeList from './noticeList.vue'

const activeName = ref('通知')

const handleClick = (tab) => {
  console.log(tab)
}

</script>
<style lang="scss" scoped>
.header-action-item {
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 0 10px;
}
.action-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 30px;
  width: 30px;
}
.action-wrapper:hover {
  background-color: var(--el-bg-color);
}

.notice-wrapper {
  max-height: 440px;
}
.notice-action-tools {
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  height: 50px;
  border-top: 1px solid var(--el-bg-color);
}
.notice-list {
  max-height: 390px;
}
</style>
