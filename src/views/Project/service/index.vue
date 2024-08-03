<template>
  <QueryFilter ref="queryFilter" @loadData="handleData"></QueryFilter>
  <PageCard class="table-page-card">
    <div class="table-actions">
      <el-button type="primary" icon="Plus" @click="handInitService" :loading="initLoading">初始化服务数据</el-button>
    </div>
    <div class="table-box">
      <el-table :data="state.tableData" style="width: 100%; margin-bottom: 20px" row-key="uuid" border v-loading="loading"
        default-expand-all :tree-props="{ children: 'children', hasChildren: 'hasChildren' }" show-overflow-tooltip>
        <el-table-column type="selection" width="50" />
        <el-table-column prop="name" label="服务名称" />
        <el-table-column prop="owner" label="组织" />
        <el-table-column prop="gitAddress" label="git地址" />
        <el-table-column prop="gitBranch" label="默认分支" />
        <el-table-column prop="gitCommitId" label="CommitId" />
        <el-table-column prop="gitCommitMessage" label="最新提交信息" />
        <el-table-column prop="gitCommitTime" label="最后一次提交时间" />
        <el-table-column label="操作" width="80px">
          <template #default="scope">
            <el-button type="danger" text @click="handleDelete(scope.row)" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination-box">
      <el-pagination v-model:current-page="pagination.currentPage" background layout="total, sizes, prev, pager, next"
        :total="state.total" v-model:page-size="pagination.pageSize" @size-change="changeSize"
        @current-change="changePage" />
    </div>
  </PageCard>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useBaseTable } from '@/hooks/useBaseTable';
import { getServiceList, deleteService, initService } from '@/services/service';
import QueryFilter from './queryFilter.vue'
import { ElMessage } from 'element-plus';

const queryFilter = ref();

const { pagination, changePage, changeSize, loading, state, handleData } = useBaseTable(getServiceList, queryFilter)

const initLoading = ref(false);
const handInitService = () => {
  initLoading.value = true;
  initService('CupGamePro').then(res => {
    if(res.success) {
      handleData();
      ElMessage.success('初始化成功');
    } else {
      ElMessage.error(res.message);
    }
    initLoading.value = false;
  });
}

const handleDelete = (row) => {
  deleteService(row.uuid).then(res => {
    if(res.success) {
      ElMessage.success('删除成功');
      handleData();
    } else {
      ElMessage.error(res.message);
    }
  });
}

onMounted(() => {
  handleData();
});
</script>
<style scoped>

</style>
