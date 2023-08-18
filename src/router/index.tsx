import { Navigate, type RouteObject } from 'react-router-dom'

import { Lazy, AuthRoute } from './components/index'
// 获取views  文件夹下的所有组件
const modules = import.meta.glob('@/views/**/*.tsx', {
  eager: true,
  as: 'url',
})
interface IHandle {
  title: string | any
}
interface PathObject {
  path: string
  component: string
  handle?: IHandle
}
const pathArr: PathObject[] = []
const output: RouteObject[] = []
Object.entries(modules).map(([key, element]) => {
  const path = key.replace('/src/views', '').replace('/index.tsx', '')
    .replace('/', '')
    .toLowerCase() || '/'

  if (!['index', 'notfound', 'login'].includes(path)) {
    pathArr.push({
      path,
      component: element
    })
  }
})
pathArr.forEach((item) => {
  const paths = item.path && item.path.split('/')
  let currentLevel = output
  paths && paths.forEach((path) => {
    const existingPath = currentLevel.find((level) => level.path === path)

    if (existingPath != null) {
      currentLevel = existingPath.children as RouteObject[]
    } else {
      const newLevel: RouteObject = {
        path: item.path,
        children: [],
        element: Lazy(() => import( /* @vite-ignore */ item.component))
      }
      currentLevel.push(newLevel)
      currentLevel = newLevel.children as RouteObject[]
    }
  })
})
// 初始化路由
const routes: RouteObject[] = [
  {
    path: '/',
    element: <AuthRoute> {Lazy(() => /* @vite-ignore */ import('@/layout'))}</AuthRoute>,
    handle: {
      title: '首页',
    },
    children: [
      {
        path: '',
        element: <Navigate to='home' />
      },
      ...output
    ]
  },
  {
    path: '/login',
    element: Lazy(() => /* @vite-ignore */ import('@/views/Login')),
    handle: {
      title: '登录',
    },
  },
  {
    path: '/:catchAll(.*)',
    element: Lazy(() => /* @vite-ignore */ import('@/views/NotFound')),
    handle: {
      title: '404',
    },
  },
]

export default routes
