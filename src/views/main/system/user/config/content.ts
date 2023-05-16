const contentConfig = {
  pageName: 'users',
  header: {
    title: '用户列表',
    btnTitle: '新建用户'
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
      label: '用户名',
      prop: 'name'
    },
    {
      label: '真实姓名',
      prop: 'realname'
    },
    {
      label: '手机号码',
      prop: 'cellphone'
    },
    {
      type: 'status',
      label: '状态',
      prop: 'enable',
      width: '90'
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
