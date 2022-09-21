<template>
  <el-space fill :size="15" direction="horizontal" style="width: 100%">
    <PageCard>
      <QueryFilter ref="queryFilter" @loadData="handleData"></QueryFilter>
    </PageCard>
    <PageCard>
      <div class="table-actions">
        <el-button type="primary" :icon="Plus" @click="handleCreate">新 建</el-button>
      </div>
      <div class="table-box">
        <el-table
          :data="state.tableData"
          style="width: 100%; margin-bottom: 20px"
          row-key="id"
          v-loading="loading"
          default-expand-all
        >
          <el-table-column type="selection" width="55" align="center" />
          <el-table-column prop="menu_name" label="菜单名称" sortable />
          <el-table-column prop="menu_code" label="编码" sortable />
          <el-table-column prop="menu_type" label="类型" sortable />
          <el-table-column prop="menu_dsc" label="菜单描述" sortable />
          <el-table-column prop="menu_status" label="状态" sortable>
            <template #default="scope">
              <el-tag
                :type="scope.row.menu_status === '启用' ? '' : 'success'"
                disable-transitions
              >{{ scope.row.menu_status }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="100px">
            <template #default="scope">
              <div style="display: flex; justify-content: center;">
                <el-space>
                  <el-icon @click="handleEdit(scope.row)" :color="ThemeConfig.PrimaryColor">
                    <Edit />
                  </el-icon>
                  <el-icon @click="handleDelete(scope.row)" :color="ThemeConfig.DangerColor">
                    <Delete />
                  </el-icon>
                </el-space>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-scrollbar>
        <div class="pagination-box">
          <el-pagination
            v-model:current-page="pagination.currentPage"
            background
            layout="total, sizes, prev, pager, next"
            :total="state.total"
            v-model:page-size="pagination.pageSize"
          ></el-pagination>
        </div>
      </el-scrollbar>
    </PageCard>
    <create-menu ref="menuDrawer" @loadData="handleData" />
  </el-space>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import QueryFilter from './queryFilter.vue';
import { getMenuList, deleteMenu } from '@/services/menuService';
import { Plus } from '@element-plus/icons-vue';
import CreateMenu from './createMenu.vue';
import { ThemeConfig } from '@/themeConfig'
import { ElMessage } from 'element-plus';

const queryFilter = ref();
const menuDrawer = ref();
const loading = ref(false);

const state = reactive({
  tableData: [],
  total: 0,
})

const pagination = reactive({
  currentPage: 1,
  pageSize: 10,
})

const handleData = () => {
  loading.value = true;
  const payload = queryFilter.value.filterData;
  getMenuList(pagination, payload).then(res => {
    if (res.code && res.code === 200) {
      state.tableData = res.data.content;
      state.total = res.data.totalCount;
    }
    loading.value = false;
  })
  loading.value = false;
};

const handleCreate = () => {
  if (!menuDrawer.value) return false;
  menuDrawer.value.openDrawer();
};

const handleDelete = row => {
  deleteMenu(row.id).then(res => {
    if (res.code === 200) {
      ElMessage.success('删除成功');
      handleData();
    }
  })
};

onMounted(() => {
  handleData();
});
</script>

<style lang="scss" scoped>
.pagination-box {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
  width: 100%;
}

.table-actions {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 10px;
}
</style>
