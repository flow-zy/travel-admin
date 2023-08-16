import type {IUser} from '@/types'
const data:IUser[] = [
  {
    id: 'bc1d0d62-4c49-4a56-871d-c5c6aeed2a30',
    username: 'admin',
    password: '123456',
    gender: '男',
    role: `document,users,category,orders,carts,products,settings,roles,permissions,profile,logs,notifications,addresses,payments,gateways`,
    phone: '13838383838',
    email: '1@qq.com',
    avatar:''
  },
  {
    id: 'ad257103-864c-4331-a1c1-092420249cc7',
    username: 'user',
    password: '123456',
    gender: '女',
    role: 'document,settings,users',
    phone: '13838383838',
    email: '1@qq.com',
    avatar:''
  },
]
export default data
