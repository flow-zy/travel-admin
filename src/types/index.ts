// 用户的类型
export interface IUser {
  id?: string
  username: string
  password: string
  email?: string
  phone?: string
  gender?: string
  role?: string
  token?: string
  avatar?:string
  [key: string]: string | undefined
}
// 菜单栏类型
export interface IMenu {
  name: string
  iconClass?: string
  children?: IMenu[]
  auth?: string
  path: string
}