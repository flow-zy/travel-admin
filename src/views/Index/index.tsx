/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { type FC, useState } from 'react'
import { Layout, Dropdown, Space, Avatar, Tooltip,Menu ,Spin} from 'antd'
import './index.scss'
import type { MenuProps, TooltipProps } from 'antd'
import  {Logo} from '@/components'
import avatar from '@/assets/avatar.png'
import { useSelector } from 'react-redux'
import { type RootState } from '@/store'
import {
  FullscreenOutlined, BellOutlined, SyncOutlined, SettingOutlined,
  MenuFoldOutlined, MenuUnfoldOutlined
} from '@ant-design/icons'
import menuData from '@/data/menu'

import {type IMenu}  from '@/types'
type MenuItem = Required<MenuProps>['items'][number];

  // menu item
  const getItem = (
    label: React.ReactNode,
    key?: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: 'group'
  ): MenuItem => {
    return {
      key,
      icon,
      children,
      label,
      type,
    } as MenuItem
  }
const { Header, Content, Sider } = Layout
const dropItems: MenuProps['items'] = [
  {
    label: '个人信息',
    key: '1',
    icon: <i className='fa fa-user'></i>
  },
  {
    label: '修改密码',
    key: '2',
    icon: <i className='fa fa-lock'></i>
  },
  {
    label: '退出登录',
    key: '3',
    icon: <i className='fa fa-sign-out'></i>
  }
]
const tools: TooltipProps[] = [{
  placement: 'bottom',
  title: '全屏',
  children: <FullscreenOutlined style={{ fontSize: '20px' }} />
}, {
  placement: 'bottom',
  title: '通知',
  children: <BellOutlined style={{ fontSize: '20px' }} />
}, {
  placement: 'bottom',
  title: '刷新',
  children: <SyncOutlined style={{ fontSize: '20px' }} />
}, {
  placement: 'bottom',
  title: '设置',
  children: <SettingOutlined style={{ fontSize: '20px' }} />
}]
const generateMenus=(menuData:IMenu[]):MenuItem[]=>{
  const menuItems:MenuItem[] =[]
  menuData.forEach(menu=>{
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    menuItems.push(getItem(menu.name,menu.path,(<i className={`fa fa-${menu.iconClass}`}></i>),menu.children && generateMenus(menu.children)))
  })
  return menuItems
//  return  menuData.map(menu => ({
//    label: menu.name,
//    key: menu.path,
//    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
//    icon: (<i className={`fa fa-${menu.iconClass}`}></i>),
//    children: menu.children && generateMenus(menu.children)
//  }))as MenuItem
}
const menuList=generateMenus(menuData)
const Index: FC = () => {
  const userInfo = useSelector((state: RootState) => state.user)
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false)

  return (
    <Layout className='layout'>
      {/* 菜单栏 */}
      <Sider width={isCollapsed ? 60 : 200} style={{ minHeight: '100vh' }} className='bg-slate-200'>
        <Spin spinning={false} tip="Loading...">
           <Logo isCollapse={isCollapsed}/>
      <Menu
       defaultSelectedKeys={['/']}
        mode="inline"
        theme="dark"
        triggerSubMenuAction="click"
        items={menuList ?? []}/>
        </Spin>
       
      </Sider>
      {/* 中间部分 */}
      <Layout>{/* 头部 */}
        <Header className='flex items-center justify-between bg-white shadow pl-0' >
          <div className="nav flex justify-between flex-auto">
            <div className="header-left pl-4">
              {
                !isCollapsed ? (<MenuFoldOutlined style={{ fontSize: '20px' }} onClick={() => { setIsCollapsed(!isCollapsed) }} />) :
                  <MenuUnfoldOutlined style={{ fontSize: '20px' }} onClick={() => { setIsCollapsed(!isCollapsed) }} />
              }
            </div>
            <div className="header-right flex justify-between items-center w-1/5">
              {tools.map((tool, index) => (<Tooltip placement={tool.placement} key={index} title={tool.title}>{tool.children}</Tooltip>))}
              <Dropdown menu={{ dropItems }}>
                <a onClick={(e) => { e.preventDefault() }}>
                  <Space>
                    <Avatar src={avatar} size={48} alt={userInfo.username || '头像'} />
                  </Space>
                </a>
              </Dropdown>
            </div>
          </div>
        </Header>
        {/* 内容区 */}
        <Content>内容区</Content>
      </Layout>
    </Layout>
  )
}
export default Index
