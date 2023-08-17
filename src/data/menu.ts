import type { IMenu } from '@/types'

const menu: IMenu[] = [
  {
    name: '首页',
    iconClass: 'home',
    path: '/home',
    auth: 'document',
  }, {
    name: '数据大屏',
    iconClass: 'area-chart',
    path: '/chart',
    auth:'document'
  },
  {
    name: '商品管理',
    path: '/product',
    iconClass: 'product-hunt',
    auth:'products',
    children: [
      {
        name: '分类列表',
        iconClass: 'bookmark',
        path: '/product/category',
      }, {
        name: '商品列表',
        iconClass: 'list',
        path: '/product/list',
      }, {
        name: '订单列表',
        iconClass: 'first-order',
        path:'/product/order'
      }, {
        name: '支付',
        iconClass: 'paypal',
        path:'/product/payment'
      }
    ]
  },
  {
    name: '组织架构',
    iconClass: 'users',
    path: '/org',
    auth: 'roles',
    children: [
     {
        name: '菜单列表',
        path: '/org/menu',
        iconClass: 'window-restore'
      },
      {
        name: '用户列表',
        path: '/org/list',
        iconClass: 'list-alt'
      },
      {
        name: '权限列表',
        path: '/org/permission',
        iconClass: 'level-up'
      }
    ]
  }, {
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
