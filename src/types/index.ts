import { type ReactElement } from 'react'

// 用户的类型
export interface IUser {
	id?: string
	username?: string
	nickname?: string
	password?: string
	email?: string
	phone?: string | RegExp
	gender?: string
	role?: string
	token?: string
	status?: number | string
	avatar?: string
	createAt?: Date
	updateAt?: Date
	[key: string]: string | undefined | RegExp | Date | number
}
// 菜单栏类型
export interface IMenu {
	name: string
	iconClass?: string
	children?: IMenu[]
	auth?: string
	path: string
}

// 用户数据返回类型
export interface IData {
	list: IUser[]
	total: number
}

export interface IDataType extends IUser {
	key?: string
}

export interface IBtn {
	icon?: string | ReactElement
	name: string
	click?: Function
	className?: string
}
