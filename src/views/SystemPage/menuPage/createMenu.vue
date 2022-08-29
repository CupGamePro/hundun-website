<template>
  <el-drawer v-model="menuDrawer">
    <template #title>
      <h4>新建目录</h4>
    </template>
    <template #default>
      <el-form ref="menuFormRef" :model="menuForm" :rules="rules" label-width="100px">
        <el-form-item label="类别" prop="menu_type">
          <el-select v-model="menuForm.menu_type" placeholder="请选择类别" style="width: 100%">
            <el-option label="菜单" value="菜单"></el-option>
            <el-option label="根目录" value="根目录"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="层级" prop="menu_level">
          <el-select v-model="menuForm.menu_level" placeholder="请选择层级" style="width: 100%" disabled>
            <el-option label="平台层" value="平台层"></el-option>
            <el-option label="租户层" value="租户层"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="目录编码" prop="menu_code">
          <el-input v-model="menuForm.menu_code" placeholder="请输入目录编码"></el-input>
        </el-form-item>
        <el-form-item label="目录名称" prop="menu_name">
          <el-input v-model="menuForm.menu_name" placeholder="请输入目录名称"></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="menu_dsc">
          <el-input v-model="menuForm.menu_dsc" placeholder="请输入描述"></el-input>
        </el-form-item>
        <el-form-item label="图标" prop="menu_icon">
          <el-input v-model="menuForm.menu_icon" placeholder="请输入Icon名称"></el-input>
        </el-form-item>
        <el-form-item label="序号" prop="menu_sort">
          <el-input-number v-model="menuForm.menu_sort"></el-input-number>
        </el-form-item>
        <el-form-item label="状态" prop="menu_status">
          <el-switch v-model="menuForm.menu_status"></el-switch>
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
  menu_type: '目录',
  menu_level: '平台级',
  menu_code: '',
  menu_name: '',
  menu_sort: 0,
  menu_icon: '',
  menu_dsc: '',
  menu_status: true
});

const rules = reactive({
  menu_type: [
    {
      required: true,
      message: '请选择类型',
      trigger: 'change',
    },
  ],
  menu_level: [
    {
      required: true,
      message: '请选择级别',
      trigger: 'change',
    },
  ],
  menu_code: [
    {
      required: true,
      message: '请输入编码',
      trigger: 'blur',
    },
  ],
  menu_name: [
    {
      required: true,
      message: '请输入目录名称',
      trigger: 'blur',
    },
  ],
  menu_icon: [
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