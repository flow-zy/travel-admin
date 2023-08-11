import { Skeleton } from 'antd'
import { lazy, Suspense ,type ComponentType, type ReactElement} from 'react'

export namespace Type{
  export interface defRC {
    default:ComponentType<any>
  }
}
function Lazy(callback: () => Promise<Type.defRC>):ReactElement {
  const LazyRC = lazy(callback)
  return (
    <Suspense fallback={<Skeleton active />}>
     <LazyRC/>
   </Suspense>
  )
} 
export default Lazy