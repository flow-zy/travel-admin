import userList from '@/data/user'
import {v4 as uuid } from 'uuid'
import type { IUser } from '@/types'
interface Options {
  body:string
  type:string
  url:string
}

// 登录
export const handleLogin = (options:Options) => {
  const {body} =options
  const data = JSON.parse(body)  
  const current = userList.find((user: IUser) => user.username === data.username && user.password ===data.password && user.role===data.role)
  if (current ===undefined) {
    return {
      message: '账号或者密码错误',
      code: 201,
      data:null
    }
  }
  return {
    code: 200,
    message: '登录成功',
    data: {
      ...current,
      password: '',
      token:uuid()
    }
  }
}
