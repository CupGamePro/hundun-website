
import { reactive, ref } from 'vue'
import lodash from 'lodash';
export function useBaseTable(api, queryFilter) {
  const loading = ref(false);
  const pagination = reactive({
    page: 1,
    pageSize: 10,
  })

  const state = reactive({
    tableData: [],
    total: 0,
  })

  const changeSize = (size) => {
    pagination.pageSize = size
    handleData()
  }
  const changePage = (page) => {
    pagination.page = page
    handleData()
  }

  const handleData = () => {
    loading.value = true;
    const condition = queryFilter.value;
    const params = {
      page: pagination.page,
      pageSize: pagination.pageSize,
      condition: {
        ...lodash.pickBy(condition, value => value !== '')
      },
    }
    api(params).then(res => {
      if (res.code && res.code === 200) {
        state.tableData = res.data.content;
        state.total = res.data.total;
      }
      loading.value = false;
    })
    loading.value = false;
  };

  return {
    pagination,
    state,
    loading,
    changeSize,
    changePage,
    handleData
  }
}