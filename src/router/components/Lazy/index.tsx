import {
	lazy,
	Suspense,
	type ComponentType,
	type ReactNode,
	type FC,
	useEffect,
	useState
} from 'react'
import { useLocation } from 'react-router-dom'

import { NProgress } from '@/components'

export namespace Type {
	export interface defRC {
		default: ComponentType<any>
	}
}
export const Progress: FC = () => {
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const { key } = useLocation()
	useEffect(() => {
		setIsLoading(!isLoading)
	}, [])
	return <NProgress isAnimating={isLoading} key={key} />
}
function Lazy(callback: () => Promise<Type.defRC>): ReactNode {
	const LazyRC = lazy(callback)
	return (
		<Suspense fallback={<Progress />}>
			<LazyRC />
		</Suspense>
	)
}
export default Lazy
