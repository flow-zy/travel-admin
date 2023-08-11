/** @format */

import {type RouteObject} from 'react-router-dom'
import {Lazy, AuthRoute} from '@/components/index'
// 初始化路由
export const routes: RouteObject[] = [
  {
    path: '/',
    element: <AuthRoute></AuthRoute>,
    handle: {
      title: '首页'
    },
    children: [
      {
        path: '/',
        element: Lazy(async () => await import('@/views/Index')),
        handle: {
          title: '首页'
        }
      }
    ]
  },
  {
    path: '/login',
    element: Lazy(async () => await import('@/views/Login')),
    handle: {
      title: '登录'
    }
  },
  {
    path: '/:catchAll(.*)',
    element: Lazy(async () => await import('@/views/NotFound'))
  }
]

export default routes
