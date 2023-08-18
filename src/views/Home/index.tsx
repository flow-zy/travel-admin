import { type FC } from 'react'

import welcome from '@/assets/welcome.png'

const Home: FC = () => {
	return (
		<div
			className="w-full h-full bg-no-repeat bg-contain bg-center"
			style={{ backgroundImage: `url(${welcome})` }}
		></div>
	)
}

export default Home
