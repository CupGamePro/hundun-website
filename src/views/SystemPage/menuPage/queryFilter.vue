<template>
  <div class="query-filter-box">
    <div class="query-form">
      <el-form :inline="true" ref="formRef" :model="formItem" class="demo-form-inline" label-width="70px">
        <el-form-item label="菜单名称" prop="menu_name">
          <el-input v-model="formItem.menu_name" placeholder="请输入菜单名称"></el-input>
        </el-form-item>
        <el-form-item label="菜单编码" prop="menu_code">
          <el-input v-model="formItem.menu_code" placeholder="请输入菜单编码"></el-input>
        </el-form-item>
        <el-form-item label="菜单描述" prop="menu_dsc">
          <el-input v-model="formItem.menu_dsc" placeholder="请输入菜单描述"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="menu_status">
          <el-select v-model="formItem.menu_status" placeholder="状态">
            <el-option label="开启" value="开启"></el-option>
            <el-option label="关闭" value="关闭"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </div>
    <div class="query-actions">
      <el-button type="default" @click="resetFields(formRef)">重置</el-button>
      <el-button type="primary" @click="onSubmit(formRef)">查询</el-button>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, defineExpose, defineEmits } from 'vue';
import { ElForm } from 'element-plus'

const formRef = ref()

const formItem = reactive({
  menu_name: '',
  menu_code: '',
  menu_dsc: '',
  menu_status: '',
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

defineExpose({
  filterData: formItem,
})
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
