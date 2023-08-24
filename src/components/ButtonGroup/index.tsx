import { Button } from 'antd'
import { type FC } from 'react'

import { type IBtn } from '@/types'

declare interface Props {
	btns?: IBtn[]
}
const ButtonGroup: FC<Props> = ({ btns }: Props) => {
	return (
		<Button.Group className="mt-5 grid gap-3 col-auto grid-rows-2 grid-cols-12">
			{btns?.map(btn => (
				<Button
					key={btn.name}
					onClick={() => btn.click && btn.click()}
					className={`border-solid border border-blue-400 text-blue-400 text-center leading-none ${btn.className}`}
					icon={
						typeof btn?.icon === 'string' ? (
							<i className={`fa fa-${btn.icon}`}></i>
						) : (
							btn.icon
						)
					}
				>
					{btn.name}
				</Button>
			))}
		</Button.Group>
	)
}

export default ButtonGroup
