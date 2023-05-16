import type { IDialogConfig } from '@/components/page-dialog/type'

const dialogConfig: IDialogConfig = {
  pageName: 'menu',
  header: {
    newTitle: '新建菜单',
    editTitle: '编辑菜单'
  },
  formList: [
    {
      type: 'input',
      label: '菜单名称',
      prop: 'name',
      placeholder: '请输入菜单名称'
    },
    {
      type: 'select',
      label: '菜单级别',
      prop: 'type',
      placeholder: '请输入菜单级别',
      options: []
    },
    {
      type: 'input',
      label: '菜单url',
      prop: 'url',
      placeholder: '请输入菜单url'
    },
    {
      type: 'input',
      label: '序号',
      prop: 'sort',
      placeholder: '请输入序列'
    },
    {
      type: 'select',
      label: '上级菜单',
      prop: 'parentId',
      placeholder: '请选择上级菜单',
      options: []
    }
  ]
}

export default dialogConfig
