<template>
  <div>
    <div class="menu-item-wrap" v-for="item in props.menuList" :key="item.path">
      <template v-if="!commonStore.isCollapse">
        <transition name="el-fade-in-linear">
          <el-sub-menu v-if="item.children && item.children.length > 0" :key="item.name" :index="item.name">
            <template #title>
              <Icon :name="item.icon" size="18"></Icon>
              <span class="el-menu-item-title">{{  item.title  }}</span>
            </template>
            <el-menu-item v-for="subItem in item.children" :key="subItem.path" :index="subItem.path"
              @click="handleMenuClick(subItem)">
              <template #title>
                <Icon :name="subItem.icon" size="18"></Icon>
                <span class="el-menu-item-title">{{  subItem.title  }}</span>
              </template>
            </el-menu-item>
          </el-sub-menu>
          <el-menu-item v-else :index="item.path" @click="handleMenuClick(item)">
            <template #title>
              <Icon :name="item.icon" size="18" style="margin-left: 5px;"></Icon>
              <span class="el-menu-item-title">{{  item.title  }}</span>
            </template>
          </el-menu-item>
        </transition>
      </template>

      <template v-else>
        <el-popover :key="item.name" placement="right-start" :width="200" trigger="hover"
          v-if="item.children && item.children.length > 0">
          <template #reference>
            <div :key="item.path" :index="item.path" class="icon-menu-detail-item icon-active">
              <Icon v-if="item.icon" :name="item.icon" size="18"></Icon>
            </div>
          </template>
          <div v-for="ele in item.children" :key="ele.path" class="icon-menu-detail-item icon-active"
            @click="handleMenuClick(ele)">
            <Icon v-if="ele.icon" :name="ele.icon" size="18"></Icon>
            <span class="el-menu-item-title">{{  ele.title  }}</span>
          </div>
        </el-popover>
        <div v-else :key="item.path" class="icon-menu-detail-item icon-active" @click="handleMenuClick(ele)">
          <Icon v-if="item.icon" :name="item.icon" size="18"></Icon>
        </div>
      </template>
    </div>
  </div>
</template>
<script setup>
import { useRouter } from 'vue-router'
import { defineProps } from 'vue'
import Icon from '@/components/Icon/index.vue'
import { useCommonStore } from '@/stores/commonStore'

const props = defineProps(['menuList'])

const commonStore = useCommonStore()
const router = useRouter()

const handleMenuClick = (item) => {
  if (item.path) {
    router.push(item.path)
  }
}

</script>
<style scoped lang="scss">
:deep(.el-menu-item.is-active) {
  background-color: var(--el-color-primary-light-9);
  color: var(--el-color-primary);
  border-radius: var(--el-border-radius-base);
  border-right: 3px solid var(--el-color-primary);
}

.menu-item-wrap .el-menu-item {
  height: 48px;
  line-height: 48px;
}

:deep(.el-sub-menu__title) {
  height: 48px;
  line-height: 48px;
}

.icon-menu-detail-item {
  display: flex;
  box-sizing: border-box;
  cursor: pointer;
  height: 48px;
  line-height: 48px;
}

.icon-active:hover {
  background: var(--el-color-primary-light-9);
  color: var(--el-color-primary);
  border-radius: var(--el-border-radius-base);
}
</style>
