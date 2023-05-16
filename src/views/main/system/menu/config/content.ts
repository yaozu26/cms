const contentConfig = {
  pageName: 'menu',
  header: {
    title: '菜单列表',
    btnTitle: '新建菜单'
  },
  tableList: [
    {
      label: '菜单名称',
      prop: 'name'
    },
    {
      label: '级别',
      prop: 'type'
    },
    {
      label: '菜单url',
      prop: 'url'
    },
    {
      label: '菜单icon',
      prop: 'icon'
    },
    {
      label: '排序',
      prop: 'sort'
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
