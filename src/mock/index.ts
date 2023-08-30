import Mock from 'mockjs'

import { handleLogin, handleUser, handleChangeStatus } from './server'

// 用户
Mock.mock(/\/api\/login/, 'get', handleLogin)

Mock.mock(/\/api\/users\/all/, 'get', handleUser)

// 修改用户状态
Mock.mock(/\/api\/users\/status\/edit/, 'post', handleChangeStatus)
