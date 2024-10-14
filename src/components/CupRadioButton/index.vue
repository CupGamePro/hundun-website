<template>
  <div class="cup-adio-button">
    <el-radio-group v-model="checkedValue" @change="handleClick">
      <el-radio-button
        :value="item.value"
        :key="item.value"
        v-for="item in btnArr"
      >{{ item.label }}</el-radio-button>
    </el-radio-group>
  </div>
</template>

<script setup name="CupRadioButton">
import { defineProps, ref, defineEmits } from 'vue';

const props = defineProps({
  btnArr: {
    type: Array,
    default: () => []
  },
  checked: {
    type: String,
    default: ''
  }
})

const checkedValue = ref(props.checked);

const emit = defineEmits(['change']);
const handleClick = () => {  
  emit('change', checkedValue.value);
};

</script>

<style scoped lang="scss">
.cup-adio-button {
  :deep(.el-radio-button.is-active) {
    --el-radio-button-checked-bg-color: var(--el-color-white);
    --el-radio-button-checked-text-color: var(--el-color-primary);
    --el-radio-button-checked-border-color: var(--el-color-primary);
    --el-radio-button-disabled-checked-fill: var(--el-border-color-extra-light);
  }
}
</style>