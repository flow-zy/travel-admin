import { Loading } from './components'
import type {FC} from 'react'
import routes from './router'
import { createHashRouter, RouterProvider } from 'react-router-dom'
import {ConfigProvider } from 'antd'
import { useSelector } from 'react-redux'
import { type RootState } from '@/store'
const App:FC = () => {
  const config =useSelector((state:RootState)=> state.setting)
  return (
    <div className="app">
      <ConfigProvider theme={config.theme} componentSize={config.componentSize}>
      <RouterProvider router={createHashRouter(routes)}></RouterProvider>
      <Loading/>
      </ConfigProvider>
    </div>
  )
}

export default App
