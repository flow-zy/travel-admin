import { v4 as uuid } from 'uuid'
import { Random } from 'mockjs'

import list from '../data/user'
import permissionArr from '../data/permission'
import roleData from '../data/role'

import type { IUser } from '@/types'
import { pageData, getData } from '@/utils'

interface Options {
	body?: any
	type: string
	url: string
}
const userList: IUser[] = list
// 生成十条数据
for (let i = 0; i < 10; i++) {
	userList.push({
		id: Random.id(),
		username: Random.cname() || Random.name(),
		password: '123456',
		nickname: Random.name(),
		email: Random.email(),
		phone: '1231234534',
		gender: Random.pick(['男', '女']),
		createAt: new Date(Random.datetime()),
		updateAt: new Date(Random.datetime()),
		permission: `document,users,${Random.pick(
			permissionArr
				.filter(i => !['document', 'users'].includes(i.name))
				.map(i => i.name)
		)}`,
		avatar: `https://picsum.photos/id/${
			i * Math.round(Math.random() * (99 - i)) + 1
		}/200/200`,
		role: Random.pick(roleData.map(i => i.name)),
		status: Random.pick([0, 1])
	})
}
// 登录
export const handleLogin = (options: Options) => {
	const { url } = options
	const data = getData(url)
	const current = userList.find(
		(user: IUser) =>
			user.username === data.username && user.password === data.password
	)
	if (current === undefined) {
		return {
			message: '账号或者密码错误',
			code: 201,
			data: null
		}
	}
	return {
		code: 200,
		message: '登录成功',
		data: {
			...current,
			password: '',
			token: uuid()
		}
	}
}

// 获取所有的用户列表
export const handleUser = ({ url }: Options) => {
	const query = getData(url)
	const data = pageData(userList, query)

	return {
		code: 200,
		message: '获取成功',
		data: {
			list: data,
			query,
			total: userList.length
		}
	}
}
// 修改账号状态
export const handleChangeStatus = (options: Options) => {
	const { url, body } = options
	const { id } = getData(url)
	const data = JSON.parse(body)
	if (data.role !== 'admin') {
		return {
			code: 201,
			message: '你没有权限修改用户状态'
		}
	}

	userList.forEach(user => {
		if (user.id === id) {
			user.status = data.status
		}
	})

	return {
		data: null,
		code: 200,
		message: '修改成功'
	}
}
