import { type FC } from 'react'
import { Breadcrumb as Bread } from 'antd'
import type { BreadcrumbProps } from 'antd'
import { RightOutlined } from '@ant-design/icons'

interface Props {
	bread: BreadcrumbProps['items']
}
const Breadcrumb: FC<Props> = ({ bread }: Props) => {
	return (
		<Bread items={bread} className="ml-4" separator={<RightOutlined />}></Bread>
	)
}
export default Breadcrumb
