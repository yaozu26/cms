const contentConfig = {
  pageName: 'role',
  header: {
    title: '角色列表',
    btnTitle: '新建角色'
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
      label: '角色名称',
      prop: 'name'
    },
    {
      label: '角色权限',
      prop: 'intro'
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
