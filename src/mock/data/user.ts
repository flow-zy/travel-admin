import type { IUser } from '@/types'

const data: IUser[] = [
	{
		id: 'bc1d0d62-4c49-4a56-871d-c5c6aeed2a30',
		username: 'admin',
		password: '123456',
		gender: '男',
		permission: `document,premission,member,visa,tourist,products,system,groggery,users,ticket`,
		phone: '13838383838',
		email: '1@qq.com',
		avatar: 'https://picsum.photos/id/201/200/200',
		nickname: 'admin',
		role: '管理员',
		status: 1
	},
	{
		id: 'ad257103-864c-4331-a1c1-092420249cc7',
		username: 'user',
		password: '123456',
		gender: '女',
		permission: 'document,settings,member,users',
		phone: '13838383838',
		email: '1@qq.com',
		avatar: 'https://picsum.photos/200/200',
		nickname: 'user',
		role: '普通用户',
		status: 1
	}
]
export default data
