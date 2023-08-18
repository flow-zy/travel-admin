import { v4 as uuid } from 'uuid'
import { Random } from 'mockjs'

import list from '../data/user'
import permissionArr from '../data/permission'

import type { IUser } from '@/types'
import { pageData } from '@/utils'

interface Options {
	body: string
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
		phone:
			/^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[1589]))\d{8}$/,
		gender: Random.pick(['男', '女']),
		createAt: new Date(Random.datetime()),
		updateAt: new Date(Random.datetime()),
		role: `document,users,${Random.pick(
			permissionArr.filter(
				i => !['document', 'users'].includes(i.name as string)
			)
		)}`,
		avatar: `https://picsum.photos/id/${
			i * Math.round(Math.random() * (99 - i)) + 1
		}/200/200`
	})
}
// 登录
export const handleLogin = (options: Options) => {
	const { body } = options
	const data = JSON.parse(body)
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
export const handleUser = ({ body }: Options) => {
	const query = JSON.parse(body)
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
