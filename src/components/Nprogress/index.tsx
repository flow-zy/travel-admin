import { withNProgress } from '@tanem/react-nprogress'
import { type FC } from 'react'

import Container from './Container'
import Bar from './Bar'
import Spinner from './Spinner'

interface Props {
	animationDuration: number
	isFinished: boolean
	progress: number
}
const Progress: FC<Props> = (props: Props) => {
	const { animationDuration, isFinished, progress } = props
	return (
		<Container animationDuration={animationDuration} isFinished={isFinished}>
			<Bar animationDuration={animationDuration} progress={progress} />
			<Spinner />
		</Container>
	)
}
export default withNProgress(Progress)
