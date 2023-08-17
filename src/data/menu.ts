import type { IMenu } from '@/types'

const menu: IMenu[] = [
  {
    name: '首页',
    iconClass: 'home',
    path: '/home',
    auth: 'document',
  }, {
    name: '分类管理',
    iconClass: 'bookmark',
    path: '/category',
    auth: 'category',
    children: [
      {
        name: '分类列表',
        path: '/category/list',
        iconClass: 'list-alt'
      },
      {
        name: '添加分类',
        path: '/category/add',
        iconClass: 'plus-square-o'
      },
    ],
  },
  {
    name: '菜单管理',
    iconClass: 'reorder',
    path: '/menu',
    auth:'profile',
    children: [
      {
        name: '菜单列表',
        path: '/menu/list',
        iconClass: 'list-alt'
      },
      {
        name: '添加菜单',
        path: '/menu/add',
        iconClass: 'plus-square-o'
      },
    ]
  },
   {
    name: '组织架构',
    iconClass: 'users',
    path:'/org',
    auth:'roles',
    children:[
       {
        name: '用户列表',
        path: '/org/list',
        iconClass: 'list-alt'
      },
      {
        name: '添加用户',
        path: '/org/add',
        iconClass: 'plus-square-o'
      },
      {
        name:'权限列表',
        path:'/org/permission',
        iconClass:'level-up'
      }
    ]     
  },{
    name: '个人管理',
    path: '/user',
    iconClass: 'user',
    auth: 'users',
    children: [
      {
        name: '个人信息',
        path: '/user/info',
        iconClass: 'info'
      }, {
        name: '修改密码',
        path: '/user/password',
        iconClass: 'compass'
      },
    ]
  }
]
export default menu
