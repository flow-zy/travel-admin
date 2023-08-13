import type { IMenu } from '@/types'

const menu: IMenu[] = [
  {
    name: '首页',
    iconClass: 'home',
    path: '/',
    auth: 'all',
  }, {
    name: '分类管理',
    iconClass: 'bookmark',
    path: 'category',
    auth: 'admin',
    children: [
      {name: '添加分类',path:'category/add',iconClass:'plus-square-o'},
    ],
  },
]
export default menu
