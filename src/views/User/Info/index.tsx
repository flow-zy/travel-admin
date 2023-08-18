import { type FC } from 'react'
import { useSelector } from 'react-redux'
import { Avatar, Button } from 'antd'

import { type RootState } from '@/store'

const Info: FC = () => {
  const userInfo = useSelector((state: RootState) => state.user)

  return (
    <div className='grid grid-cols-1 gap-6 w-1/4'>
      <div className='username flex items-start justify-between w-full'>
        <span>用户名</span>
        <span>{userInfo?.username}</span>
      </div>
      <div className='nickname flex items-start justify-between w-full'>
        <span>昵称</span>
        <span>{userInfo?.nickname ?? userInfo?.username}</span>
      </div>
      <div className="gender flex items-start justify-between w-full">
        <span>性别</span>
        <span>{userInfo?.gender}</span>
      </div>
      <div className="email flex items-start justify-between w-full">
        <span>联系方式</span>
        <span>{userInfo?.email}/ {userInfo?.phone as string}</span>
      </div>
      <div className='avatar flex items-start justify-between w-full'>
        <span>头像</span>
        <Avatar shape="square" size="large" src={userInfo?.avatar} alt={userInfo?.avatar ?? '头像'} />
      </div>
      <Button type="primary">修改</Button>
    </div>
  )
}

export default Info
