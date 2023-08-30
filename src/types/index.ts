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
	permission?: string
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
interface Pre {
	id: number | string
	name: string
	children: Pre[]
}
// 权限
export interface IRole {
	id?: number
	name?: string
	description?: string
	permission?: string
	create_time?: Date
	update_time?: Date
	status?: 0 | 1
	[key: string]: string | undefined | number | Pre | Date
}

export interface IAttractionTicket {
	id: number
	attraction_id: number
	price: number
	create_time: string
	update_time: string
}

export interface IAttraction {
	id: number
	name: string
	description: string
	location: string
	create_time: string
	update_time: string
	status: number
}

export interface IFlight {
	id: number
	member_id: number
	flight_number: string
	departure_date: string
	arrival_date: string
	price: number
	status: number
	create_time: string
	update_time: string
}

export interface IFlightDatail {
	id: number
	hotel_order_id: number
	room_type_id: number
	check_in_date: string
	check_out_date: string
	num_adults: number
	num_children: number
	price: number
	create_time: string
	update_time: string
}

export interface IHotel {
	id: number
	name: string
	address: string
	star_rating_id: number
	tag_id: number
	create_time: string
	update_time: string
	status: number
}
export interface IHotelOrder {
	id: number
	member_id: number
	deal_type_id: number
	hotel_id: number
	room_type_id: number
	price: number
	status: number
	create_time: string
	update_time: string
}
export interface IHotelDetail {
	id: number
	hotel_order_id: number
	room_type_id: number
	check_in_date: string
	check_out_date: string
	num_adults: number
	num_children: number
	price: number
	create_time: string
	update_time: string
}

export interface IHotelPerformance {
	id: number
	hotel_id: number
	monthly_income: number
	daily_average: number
	create_time: string
	update_time: string
}
export interface IHotelRoom {
	id: number
	hotel_id: number
	name: string
	capacity: number
	price: number
	create_time: string
	update_time: string
	status: number
}

export interface IHotelStar {
	id: number
	name: string
	description: string
	create_time: string
	update_time: string
	status: number
}

export interface IHotelTag {
	id: number
	name: string
	description: string
	create_time: string
	update_time: string
	status: number
}
export interface IMemberType {
	id: number
	name: string
	description: string
	member_permissions: string
	create_time: string
	update_time: string
	status: number
}

export interface IMember {
	id: number
	name: string
	age: number
	gender: number
	country: string
	city: string
	password: string
	avatar: string
	member_type_id: number
	registration: string
	payment_password: string
	create_time: string
	update_time: string
	status: number
}

export interface IProductDetail {
	id: number
	product_order_id: number
	quantity: number
	price: number
	create_time: string
	update_time: string
}

export interface IProduct {
	id: number
	member_id: number
	deal_type_id: number
	product_id: number
	order_number: string
	price: number
	status: number
	create_time: string
	update_time: string
}
