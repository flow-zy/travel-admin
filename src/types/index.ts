// 用户的类型
export interface IUser {
  id?: string
  username: string
  password: string
  email?: string
  phone?: string
  gender?: number | string
  role?: string
  token?: string
}
// 菜单栏类型
export interface IMenu {
  name: string
  iconClass?: string
  children?: IMenu[]
  auth?: string
  path?: string
}

// 页面数据
export interface IPage {
  [key: string]: {
    title: string
  }
}