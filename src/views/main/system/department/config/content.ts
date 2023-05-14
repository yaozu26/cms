const contentConfig = {
  pageName: 'department',
  header: {
    title: '部门列表',
    btnTitle: '新建部门'
  },
  tableList: [
    {
      type: 'selection',
      label: '选择',
      width: '55'
    },
    {
      type: 'index',
      label: '序号',
      width: '55'
    },
    {
      label: '部门名称',
      prop: 'name'
    },
    {
      label: '部门领导',
      prop: 'leader'
    },
    {
      label: '上级部门',
      prop: 'parentId'
    },
    {
      type: 'timer',
      label: '创建时间',
      prop: 'createAt',
      width: '180'
    },
    {
      type: 'timer',
      label: '更新时间',
      prop: 'updateAt',
      width: '180'
    },
    {
      type: 'handle',
      label: '操作',
      prop: 'leader',
      width: '180'
    }
  ]
}

export default contentConfig
