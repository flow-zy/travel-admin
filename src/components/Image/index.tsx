import LazyLoad from 'react-lazyload'
import { Skeleton } from 'antd'
import { type ReactElement, type FC, useEffect, useState } from 'react'

interface Props {
	children: ReactElement
}
const Image: FC<Props> = ({ children, ...props }: Props) => {
	const [loading, setLoading] = useState<boolean>(false)
	useEffect(() => {
		setLoading(false)
	}, [])
	return (
		<LazyLoad
			placeholder={
				<Skeleton
					loading={loading}
					active
					avatar
					paragraph={false}
					title={false}
				>
					{children}
				</Skeleton>
			}
			{...props}
			className="w-16"
		>
			<Skeleton loading={loading} active avatar paragraph={false} title={false}>
				{children}
			</Skeleton>
		</LazyLoad>
	)
}

export default Image
