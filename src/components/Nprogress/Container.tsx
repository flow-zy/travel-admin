interface Props {
	animationDuration: number
	isFinished: boolean
	children: React.ReactElement[]
}
const Container: React.FC<Props> = (props: Props) => {
	const { isFinished, children, animationDuration } = props
	return (
		<div
			style={{
				opacity: isFinished ? 0 : 1,
				pointerEvents: 'none',
				transition: `opacity ${animationDuration}ms linear`
			}}
		>
			{children}
		</div>
	)
}

export default Container
