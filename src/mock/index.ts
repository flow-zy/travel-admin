import {mock} from 'mockjs'
import {handleLogin} from '@/server'
const api=import.meta.env.VITE_APP_BASE
mock(`${api}/login`, handleLogin)
