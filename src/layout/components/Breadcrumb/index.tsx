import { type FC } from 'react'
import {Breadcrumb as Bread} from 'antd'
import type {BreadcrumbProps} from 'antd'
interface Props {
  bread:BreadcrumbProps['items']
}
const Breadcrumb: FC<Props> = ({bread} :Props) => {
  return <Bread items={bread && bread?.length >1?bread :[]} className='ml-4'></Bread>
}
export default Breadcrumb
