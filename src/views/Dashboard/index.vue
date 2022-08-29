<template>
  <el-row :gutter="15">
    <el-col :span="6">
      <PageCard class="crad-item">
        <div>成功咯</div>
      </PageCard>
    </el-col>
    <el-col :span="6">
      <PageCard class="crad-item">
        <el-space direction="vertical" alignment="left">
          <div>
            <el-button type="primary" @click="submit">哈喽</el-button>
          </div>
          <div>
            <CupRadioButton @change="handleChange" :btnArr="options.btnOptions" :checked="form.checked"></CupRadioButton>
          </div>
          <div>
            <el-radio-group v-model="form.radio1" @change="change2">
              <el-radio-button label="New York"></el-radio-button>
              <el-radio-button label="Washington"></el-radio-button>
              <el-radio-button label="Los Angeles"></el-radio-button>
              <el-radio-button label="Chicago"></el-radio-button>
            </el-radio-group>
          </div>
        </el-space>
      </PageCard>
    </el-col>
    <el-col :span="6">
      <PageCard class="crad-item">
        <div></div>
      </PageCard>
    </el-col>
    <el-col :span="6">
      <PageCard class="crad-item">
        <div></div>
      </PageCard>
    </el-col>
  </el-row>
  <el-row>
    <el-col :span="24">
      <PageCard class="crad-item-1">
        <div>
        </div>
      </PageCard>
    </el-col>
  </el-row>
  <el-row :gutter="15">
    <el-col :span="12">
      <PageCard class="crad-item-2">
        <div></div>
      </PageCard>
    </el-col>
    <el-col :span="12">
      <PageCard class="crad-item-2">
        <div></div>
      </PageCard>
    </el-col>
  </el-row>
  <el-row>
    <el-col :span="24">
      <PageCard class="crad-item-3">
        <div></div>
      </PageCard>
    </el-col>
  </el-row>
</template>

<script setup>
import { reactive } from 'vue';

const form = reactive({
  radio1: 'New York',
  checked: '3',
})
const options = reactive({
  btnOptions: [
    { label: '新建需求', value: '1', name: '新建需求' },
    { label: '评审需求', value: '2', name: '评审需求' },
    { label: '需求归档', value: '3', name: '需求归档' },
    { label: '需求动态', value: '4', name: '需求动态' },
  ]
})

const submit = () => {
  console.log(form);
}

const handleChange = (value) => {
  form.checked = value;
}

const change2 = () => {
  console.log(form.radio1);

}

</script>

<style lang="scss" scoped>
.el-row {
  margin-bottom: 15px;
}
.el-row:last-child {
  margin-bottom: 0;
}

.crad-item {
  min-height: 180px;
}
.crad-item-1 {
  min-height: 400px;
}
.crad-item-2 {
  min-height: 510px;
}
.crad-item-3 {
  min-height: 600px;
}
</style>
