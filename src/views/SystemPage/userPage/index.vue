<template>
  <PageCard>
    <el-form ref="ruleFormRef" :model="form" label-width="0" class="demo-ruleForm">
      <el-table :data="tableDatas" style="width: 100%">
        <el-table-column :prop="col.key" :label="col.name" v-for="col in columns" :key="col.uuid">
          <template #default="scope">
            <el-form-item label="" :prop="`${scope.row.uuid}-${col.key}`"
              :rules="rules[`${scope.row.uuid}-${col.key}`]">
              <el-input v-model="form[`${scope.row.uuid}-${col.key}`]" @change="inputChange" />
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="120">
          <template #default="scope">
            <el-button link type="primary" size="small" @click.prevent="deleteRow(scope.row)">
              Remove
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-form>
    <el-button class="mt-4" style="width: 100%; margin-top: 10px;" @click="onAddItem">Add Item</el-button>
    <el-button class="mt-4" style="width: 100%; margin-top: 10px;" @click="submit(ruleFormRef)">Submit</el-button>
  </PageCard>
</template>

<script setup>
import { ref, reactive } from "vue";
import { tableData, columns } from "./data";
const tableDatas = ref(tableData);
const form = reactive({});
const rules = reactive({});
const colsMap = ref({})

const ruleFormRef = ref()

const onAddItem = () => {
  tableDatas.value.push({
    date: "",
    name: "",
    address: "",
    uuid: new Date().getTime(),
    fieldConfig: {
      uuid: `${tableDatas.value.length + 1}-${new Date().getTime()}`,
      type: "Input",
      rules: {
        required: true,
        messgae: '请输入',
        trigger: 'blur'
      },
    },
  });
  handleData()
};

const handleData = () => {
  tableDatas.value.forEach(item => {
    Object.keys(item).forEach((ele) => {
      const message = colsMap.value[ele] ? `请填写${colsMap.value[ele]}` : '';
      rules[`${item.uuid}-${ele}`] = [{
        ...item.fieldConfig.rules,
        message,
        trigger: 'blur'
      }];
      form[`${item.uuid}-${ele}`] = item[ele];
    });
  });
};

const handleColumn = (cols) => {
  const res = {}
  cols.forEach(ele => {
    res[ele.key] = ele.name
  })
  colsMap.value = res;
}

handleColumn(columns)
handleData();

const deleteRow = (row) => {
  tableDatas.value = tableDatas.value.filter((ele) => ele.uuid !== row.uuid);
};

const submit = async (formEl) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log(form);
    } else {
      console.log('error submit!', fields)
    }
  })
}
</script>