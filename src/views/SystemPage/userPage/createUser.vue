<template>
  <el-dialog v-model="drawer" :show-close="false" @close="closeDrawer">
    <template #header>
      <h4>添加</h4>
    </template>
    <template #default>
      <el-form ref="formRef" :model="form" :rules="rules" label-width="100px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="用户名" prop="username">
              <el-input v-model="form.username" placeholder="请输入用户名"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="密码" prop="password">
              <el-input v-model="form.password" placeholder="请输入密码" type="password"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="姓名" prop="reallyName">
              <el-input v-model="form.reallyName" placeholder="请输入姓名"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="性别" prop="gender">
              <el-radio-group v-model="form.gender">
                <el-radio label="male">男</el-radio>
                <el-radio label="female">女</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="form.email" placeholder="请输邮箱"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="电话" prop="phone">
              <el-input v-model="form.phone" placeholder="请输入电话号码"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="状态" prop="status">
              <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="地址" prop="address">
              <el-input v-model="form.address" placeholder="请输入地址" type="textarea" maxlength="50"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="角色" prop="roleIds">
              <el-table>
                <el-table-column type="selection" width="55" align="center" />
                <el-table-column label="角色名称" prop="roleName"></el-table-column>
                <el-table-column label="角色编码" prop="code"></el-table-column>
              </el-table>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </template>

    <template #footer>
      <div style="display: flex; justify-content: center;">
        <el-button type="primary" @click="submitForm(formRef)">保 存</el-button>
        <el-button @click="closeDrawer">取 消</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, reactive, defineExpose, defineEmits } from 'vue';
import { createUser, getCatalogs, updateUser } from '@/services/userService';
import { ElMessage } from 'element-plus';
import { cloneDeep } from 'lodash'

const drawer = ref(false);
const formRef = ref()
const form = ref({
  username: '',
  password: '',
  reallyName: '',
  avatar: '',
  gender: 'male',
  email: '',
  phone: '',
  status: 1,
});

const catalogOptions = ref([]);

const rules = reactive({
  username: [
    {
      required: true,
      message: '请输入用户名',
      trigger: 'blur',
    },
  ],
  password: [
    {
      required: true,
      message: '请输入密码',
      trigger: 'blur',
    },
  ],
  reallyName: [
    {
      required: true,
      message: '请输入姓名',
      trigger: 'blur',
    },
  ],
  gender: [
    {
      required: true,
      message: '请选择性别',
      trigger: 'blur',
    },
  ],
  email: [
    {
      required: true,
      message: '请输入邮箱',
      trigger: 'blur',
    },
  ],
  phone: [
    {
      required: true,
      message: '请输入电话号码',
      trigger: 'blur',
    },
  ],
  roleIds: [
    {
      required: true,
      message: '请选择角色',
      trigger: 'blur',
    },
  ],
})

const emit = defineEmits(['loadData'])

const handleCreate = (params) => {
  createUser(params).then(res => {
    if (res.code && res.code === 200) {
      emit('loadData');
      closeDrawer();
      ElMessage.success('保存成功');
    } else {
      ElMessage.error(res.message);
    }
  })
}

const handleEdit = (params) => {
  params.uuid = form.value.uuid
  updateUser(params).then(res => {
    if (res.code && res.code === 200) {
      emit('loadData');
      closeDrawer();
      ElMessage.success('保存成功');
    } else {
      ElMessage.error(res.message);
    }
  })
}

const submitForm = (formEl) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      const params = {
        username: form.value.username,
        password: form.value.password,
        reallyName: form.value.reallyName,
        avatar: form.value.avatar,
        gender: form.value.gender,
        email: form.value.email,
        phone: form.value.phone,
        address: form.value.address,
        status: form.value.status,
      }
      if (form.value.uuid) {
        handleEdit(params);
      } else {
        handleCreate(params);
      }
    } else {
      console.log('error submit!')
      return false
    }
  })
}

// 获取所有目录
const handleCatalogs = () => {
  getCatalogs().then(res => {
    if (res.code && res.code === 200) {
      catalogOptions.value = res.data;
    }
  })
}
handleCatalogs()

const resetForm = () => {
  formRef.value.resetFields();
}


const openDrawer = (row) => {
  if (row) {
    const value = cloneDeep(row);
    if (row.uuid) {
      form.value = value;
    }

  } else {
    resetForm();
  }
  drawer.value = true;
}

const closeDrawer = () => {
  drawer.value = false;
  resetForm();
}

defineExpose({
  openDrawer,
})
</script>
