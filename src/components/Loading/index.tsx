import { type FC, useState } from 'react'
import './index.scss'

const Loading: FC = () => {
	const [text] = useState<string>('Loading...')
	return (
		<div className="loading" style={{ display: 'none' }}>
			<div className="loading__content">
				<div className="loading__text">
					{text.split('').map((item: string, index: number) => (
						<span
							key={index}
							style={{
								width: '20px',
								animationDelay: `${index * 0.2}s`
							}}
						>
							{item}
						</span>
					))}
				</div>
			</div>
		</div>
	)
}

export default Loading
