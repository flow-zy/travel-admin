import {mock} from 'mockjs'
import {handleLogin} from '@/server'
mock('/api/login', handleLogin)
