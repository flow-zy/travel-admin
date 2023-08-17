import { lazy, Suspense, type  ComponentType, type ReactNode, type FC, Fragment, useEffect} from 'react'
import Nprogress from 'nprogress'
import 'nprogress/nprogress.css'
export namespace Type{
  export interface defRC {
    default:ComponentType<any>
  }
}
const Progress:FC = () => {
  Nprogress.start()
  useEffect(() => () => {Nprogress.done()}, [])
  return <Fragment/>
}
function Lazy(callback: () => Promise<Type.defRC>):ReactNode {
  const LazyRC = lazy(callback)
  return (
    <Suspense fallback={<Progress />}>
      <LazyRC/>
    </Suspense>
  )
}
export default Lazy
