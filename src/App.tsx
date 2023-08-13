import { Loading } from './components'
import  { useState, useEffect } from 'react'
import type {FC} from 'react'
import routes from './router'
import { createHashRouter, RouterProvider } from 'react-router-dom'
import type {RouteObject}  from 'react-router-dom'
const App:FC = () => {
  const [router] = useState<RouteObject[]>(routes)
  useEffect(() => {
  }, [])
  return (
    <div className="app">
      <RouterProvider router={createHashRouter(router)}></RouterProvider>
      <Loading/>
    </div>
  )
}

export default App
