import { type FC, useState, useEffect, type ReactElement } from 'react'
import { Spin } from 'antd'

const Loading: FC<{
	children: ReactElement
	load: boolean
}> = ({ children, load = true }: { children: ReactElement; load: boolean }) => {
	const [loading, setLoading] = useState(load)
	useEffect(() => {
		setTimeout(() => {
			setLoading(false)
		}, 1000)
	}, [])
	return (
		<Spin spinning={loading} tip="加载中..." size="large">
			{children}
		</Spin>
	)
}
export default Loading
