const tableData = [
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
    uuid: 14649889,
    fieldConfig: {
      uuid: '1-1',
      type: 'Input',
      rules: {
        required: true
      }
    }
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
    uuid: 246456,
    fieldConfig: {
      uuid: '1-2',
      type: 'Input',
      rules: [{
        required: true
      }]
    }
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
    uuid: 34654,
    fieldConfig: {
      uuid: '1-3',
      type: 'Input',
      rules: [{
        required: true
      }]
    }
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
    uuid: 467868,
    fieldConfig: {
      uuid: '1-4',
      type: 'Input',
      rules: [{
        required: true
      }]
    }
  },
]

const columns = [
  {
    name: '姓名',
    uuid: 124342424,
    key: 'name'
  },
   {
    name: '地址',
    uuid: 245644646,
    key: 'address'
  },
   {
    name: '日期',
    uuid: 3678686,
    key: 'date'
  },
]

export {
  columns,
  tableData
}