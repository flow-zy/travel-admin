import type { FC } from 'react'
import { createHashRouter, RouterProvider } from 'react-router-dom'
import { ConfigProvider } from 'antd'
import { useSelector } from 'react-redux'

import routes from './router'
import { Loading } from './components'

import { type RootState } from '@/store'

const App: FC = () => {
  const config = useSelector((state: RootState) => state.setting)
  return (
    <div className="app">
      <ConfigProvider theme={config.theme} componentSize={config.componentSize}>
        <RouterProvider router={createHashRouter(routes)}></RouterProvider>
        <Loading />
      </ConfigProvider>
    </div>
  )
}

export default App
