/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { type FC, useState, useEffect } from 'react'
import { Layout, Dropdown, Space, Avatar, Tooltip, Menu, Spin,Card } from 'antd'
import type { MenuProps, TooltipProps } from 'antd'
import { Logo } from '@/components'
import avatar from '@/assets/avatar.png'
import { useSelector } from 'react-redux'
import { type RootState } from '@/store'
import {
  FullscreenOutlined, BellOutlined, SyncOutlined, SettingOutlined,
  MenuFoldOutlined, MenuUnfoldOutlined
} from '@ant-design/icons'
import menuData from '@/data/menu'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { type IMenu } from '@/types'
import TagView from './components/TagView'
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
const items: MenuProps['items'] = [
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
const generateMenus = (menuData: IMenu[]): MenuItem[] => {
  const menuItems: MenuItem[] = []
  menuData.forEach(menu => {
    menuItems.push(getItem(menu.name, menu.path, (<i className={`fa fa-${menu.iconClass}`}></i>), menu.children && generateMenus(menu.children)))
  })
  return menuItems
}
const menuList = generateMenus(menuData)
const rootSubmenuKeys:string[] =menuList.map(menu=>menu?.key as string) 
const LayOut: FC = () => {
  const { pathname } = useLocation()
  const userInfo = useSelector((state: RootState) => state.user)
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false)
  const [tags, setTags] = useState<MenuProps['items']>([{ key: '/home', icon: 'fa fa-home ant-menu-item-icon', label: '首页' }])
  const [defaultKey, setDefault] = useState<string[]>([pathname])
  const [loading, setLoading] = useState(true)
  const [openKeys, setOpenKeys] = useState<string[]>([])
  const navigate = useNavigate()
  const changeRoute: MenuProps['onClick'] = (s): void => {
    const { key, domEvent } = s
    const parent = (domEvent.target as HTMLElement)?.parentElement
    navigate(key)
    const tag: MenuItem = {
      key,
      icon: parent &&parent.querySelector('i')?.className,
      label:parent&& parent.querySelector('span')?.innerText
    }
    setTags(() => {
      const index = tags && tags.findIndex(item =>item &&tag &&  item.key === tag.key)
      if (index === -1) {
        return tags && [...tags, tag]
      }
      return tags && [...tags]
    })
  }
  const onOpenChange: MenuProps['onOpenChange'] = (keys) => {
    const latestOpenKey = keys.find((key) => !openKeys.includes(key))
    if (!rootSubmenuKeys.includes(latestOpenKey!)) {
      setOpenKeys(keys)
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : [])
    }
  }

  useEffect(() => {
    setDefault([pathname])
    const arr = pathname.split('/').splice(1)
    if (arr.length > 1){
      const tag = menuData.find(menu => menu.path.includes(arr[0]))?.children?.map(tag => {
        if (tag.path.includes(arr[arr.length - 1])) {
          return ({
            key: tag.path,
            icon:`fa fa-${tag.iconClass}`,
            label:tag.name
          })
        }
      })[0] as MenuItem
       setTags(() => {
      const index =tags&& tags.findIndex(item =>item && tag && item.key === tag.key)
      if (index === -1) {
        return tags&& [...tags, tag]
      }
      return  tags&& [...tags]
    })
    setOpenKeys([`/${arr[0]}`])
    }
  }, [])
  useEffect(() => {
    setDefault([pathname])
    setLoading(false)
  },[pathname])
  return (
    <Layout className='layout'>
      {/* 菜单栏 */}
      <Sider width={isCollapsed ? 60 : 200} trigger={null} collapsible style={{ minHeight: '100vh' }} className='bg-slate-200'  collapsed={isCollapsed}>
        <Logo isCollapse={isCollapsed} />
        <Menu
          defaultSelectedKeys={defaultKey}
          mode="inline"
          theme="dark"
          openKeys={openKeys}
          selectedKeys={defaultKey}
          triggerSubMenuAction="click"
          items={menuList ?? []}
          onClick={changeRoute}
          onOpenChange={onOpenChange}
        />
      </Sider>
      {/* 中间部分 */}
      <Layout>{/* 头部 */}
        <Header className='flex items-center justify-between bg-white shadow pl-0' >
          <div className="nav flex justify-between flex-auto">
            <div className="header-left pl-4 flex mr-4 items-center ">
              {
                !isCollapsed ? (<MenuFoldOutlined style={{ fontSize: '20px' }} onClick={() => { setIsCollapsed(!isCollapsed) }} />) :
                  <MenuUnfoldOutlined style={{ fontSize: '20px' }} onClick={() => { setIsCollapsed(!isCollapsed) }} />
              }
              {/* 面包屑 */}
            </div>
            <div className="header-right flex justify-between items-center w-1/5">
              {tools.map((tool, index) => (<Tooltip placement={tool.placement} key={index} title={tool.title}>{tool.children}</Tooltip>))}
              <Dropdown menu={{ items }}>
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
        <Content>
          {/* 动态tag */}
            <TagView tags={tags ?? []} />
          <Spin spinning={loading} tip="Loading...">
           <Card style={{padding:'15px',borderTop:'none',backgroundColor:'transparent'}} bodyStyle={{backgroundColor:'#fff'}}> 
              <Outlet />
            </Card>  
          </Spin>
        </Content>
      </Layout>
    </Layout>
  )
}
export default LayOut
