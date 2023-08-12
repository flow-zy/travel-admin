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