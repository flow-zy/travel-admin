import type { IMenu } from '@/types'

const menu: IMenu[] = [
  {
    name: '首页',
    iconClass: 'home',
    path: '',
    auth: 'all',
  }, {
    name: '分类管理',
    iconClass: 'bookmark',
    path: 'category',
    auth: 'admin',
    children: [
      {name: ''},
    ],
  },
]
export default menu
