<template>
  <PageCard style="margin-bottom: 10px;">
    <div class="query-filter-box">
      <div class="query-form">
        <el-form :inline="true" ref="formRef" :model="formItem" class="demo-form-inline" label-width="70px">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="formItem.username" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item label="工号" prop="code">
            <el-input v-model="formItem.code" placeholder="请输入工号"></el-input>
          </el-form-item>
          <el-form-item label="状态" prop="status" style="width: 250px;">
            <el-select v-model="formItem.status" placeholder="状态">
              <el-option label="启用" :value="1"></el-option>
              <el-option label="禁用" :value="2"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <div class="query-actions">
        <el-button type="default" @click="resetFields(formRef)">重置</el-button>
        <el-button type="primary" @click="onSubmit(formRef)">查询</el-button>
      </div>
    </div>
  </PageCard>
</template>

<script setup>
import { reactive, ref, defineExpose, defineEmits } from 'vue';
import { ElForm } from 'element-plus'

const formRef = ref()

const formItem = reactive({
  username: '',
  code: '',
  status: '',
})

const emit = defineEmits(['loadData'])

const onSubmit = (formEl) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
       emit('loadData');
    } else {
      return false
    }
  })
}

const resetFields = (formEl) => {
  if (!formEl) return
  formEl.resetFields();
}

defineExpose(formItem)
</script>
<style lang="scss" scoped>
.query-filter-box {
  display: flex;
  width: 100%;
}
.query-actions {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: flex-start;
  width: 10%;
}
.query-form {
  width: 90%;
}
.el-form-item {
  margin-bottom: 10px;
}
</style>
