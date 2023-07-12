<template>
  <el-drawer v-model="menuDrawer" :show-close="false">
    <template #header>
      <h4>新建目录</h4>
    </template>
    <template #default>
      <el-form ref="menuFormRef" :model="menuForm" :rules="rules" label-width="100px">
        <el-form-item label="类别" prop="type">
          <el-select v-model="menuForm.type" placeholder="请选择类别" style="width: 100%">
            <el-option label="目录" value="目录"></el-option>
            <el-option label="菜单" value="菜单"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="编码" prop="code">
          <el-input v-model="menuForm.code" placeholder="请输入目录编码"></el-input>
        </el-form-item>
        <el-form-item label="名称" prop="name">
          <el-input v-model="menuForm.name" placeholder="请输入目录名称"></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="describe">
          <el-input v-model="menuForm.describe" placeholder="请输入描述"></el-input>
        </el-form-item>
        <el-form-item label="图标" prop="icon">
          <el-input v-model="menuForm.icon" placeholder="请输入Icon名称"></el-input>
        </el-form-item>
        <el-form-item label="序号" prop="sort">
          <el-input-number v-model="menuForm.sort"></el-input-number>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-switch v-model="menuForm.status" active-value="启用" inactive-value="禁用"></el-switch>
        </el-form-item>
      </el-form>
    </template>

    <template #footer>
      <div style="flex: auto">
        <el-button type="primary" @click="submitForm(menuFormRef)">保 存</el-button>
        <el-button @click="closeDrawer">取 消</el-button>
      </div>
    </template>
  </el-drawer>
</template>

<script setup>
import { ref, reactive, defineExpose, defineEmits } from 'vue';
import { createMenu } from '@/services/menuService';

const menuDrawer = ref(false);
const menuFormRef = ref()
const menuForm = reactive({
  type: '目录',
  code: '',
  name: '',
  sort: 0,
  icon: '',
  describe: '',
  status: '启用'
});

const rules = reactive({
  type: [
    {
      required: true,
      message: '请选择类型',
      trigger: 'change',
    },
  ],
  code: [
    {
      required: true,
      message: '请输入编码',
      trigger: 'blur',
    },
  ],
  name: [
    {
      required: true,
      message: '请输入名称',
      trigger: 'blur',
    },
  ],
  icon: [
    {
      required: true,
      message: '请输入icon名称',
      trigger: 'blur',
    },
  ],
})

const emit = defineEmits(['loadData'])
const submitForm = (formEl) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      createMenu(menuForm).then(res => {
        if (res.code && res.code === 200) {
          emit('loadData');
          closeDrawer();
        }
      })
    } else {
      console.log('error submit!')
      return false
    }
  })
}

const resetForm = (formEl) => {
  if (!formEl) return
  formEl.resetFields()
}


const openDrawer = () => {
  menuDrawer.value = true;
}

const closeDrawer = () => {
  menuDrawer.value = false;
  resetForm(menuFormRef.value);
}

defineExpose({
  openDrawer,
})
</script>
