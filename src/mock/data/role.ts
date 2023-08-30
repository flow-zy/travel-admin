import type { IRole } from '@/types'

const data: IRole[] = [
	{
		id: 1,
		name: '超级管理员',
		description: '拥有最高权限',
		// 权限
		permission: 'admin',
		create_time: new Date(),
		update_time: new Date(),
		status: 0
	},
	{
		id: 2,
		name: '管理员',
		description: '拥有大部分权限',
		permission: 'admin',
		create_time: new Date(),
		update_time: new Date(),
		status: 0
	},
	{
		id: 3,
		name: '普通用户',
		description: '拥有部分权限',
		permission: 'user',
		create_time: new Date(),
		update_time: new Date(),
		status: 0
	},
	{
		id: 4,
		name: '游客',
		description: '无任何权限',
		permission: '',
		create_time: new Date(),
		update_time: new Date(),
		status: 0
	},
	{
		id: 5,
		name: '测试',
		description: '测试',
		permission: 'user',
		create_time: new Date(),
		update_time: new Date(),
		status: 0
	}
]
export default data
