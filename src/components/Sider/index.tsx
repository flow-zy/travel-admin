/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { type FC, useState } from 'react'
import { Layout, Menu, type MenuProps } from 'antd'

import { Logo } from '@/components'
import { type IMenu } from '@/types'
export type MenuItem = Required<MenuProps>['items'][number];
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
interface Props {
  collpase: boolean
  data: IMenu[]
  defaultKey: string[]
  click: Function
  style: any
}
const Sider: FC<Props> = ({ collpase, data, defaultKey, click, style }: Props) => {
  const [openKeys, setOpenKeys] = useState<string[]>([])
  const generateMenus = (data: IMenu[]): MenuItem[] => {
    const menuItems: MenuItem[] = []
    data.forEach(menu => {
      menuItems.push(getItem(menu.name, menu.path, (<i className={`fa fa-${menu.iconClass}`}></i>), menu.children && generateMenus(menu.children)))
    })
    return menuItems
  }
  const menuList = generateMenus(data)
  const rootSubmenuKeys: string[] = menuList.map(menu => menu?.key as string)
  const onOpenChange: MenuProps['onOpenChange'] = (keys) => {
    const latestOpenKey = keys.find((key) => !openKeys.includes(key))
    if (!rootSubmenuKeys.includes(latestOpenKey!)) {
      setOpenKeys(keys)
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : [])
    }
  }
  return (
    <Layout.Sider
      width={collpase ? 60 : 200}
      trigger={null}
      collapsible
      className='bg-slate-200'
      collapsed={collpase}
      style={{ ...style, minHeight: '100vh' }}
    >
      <Logo isCollapse={collpase} />
      <Menu
        defaultSelectedKeys={defaultKey}
        mode="inline"
        theme="light"
        openKeys={openKeys}
        selectedKeys={defaultKey}
        triggerSubMenuAction="click"
        items={menuList ?? []}
        onClick={(e) => { click(e) }}
        onOpenChange={onOpenChange}
        style={{ ...style, border: 'none' }}
      />
    </Layout.Sider>
  )
}

export default Sider
