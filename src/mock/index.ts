import {mock} from 'mockjs'
import {handleLogin,handleUser} from '@/server'
const api=import.meta.env.VITE_APP_BASE
// 用户
mock(`${api}/login`, handleLogin)
mock(`${api}/users/all`,handleUser)