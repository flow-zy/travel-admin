
import { type FC, useState, useEffect } from 'react'
import { Spin, Card, Layout, type MenuProps, theme } from 'antd'
import { Sider, TagView, Header } from '@/components'
import {useSelector } from 'react-redux'
import {type RootState} from '@/store'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import data from '@/data/menu'
import {type IMenu} from '@/types'
const { Content } = Layout
const { useToken } = theme
export type MenuItem = Required<MenuProps>['items'][number]
const LayOut: FC = () => {
  const { token } = useToken()
  const { pathname } = useLocation()
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false)
  const [tags, setTags] = useState<MenuProps['items']>([{ key: '/home', icon: 'fa fa-home ant-menu-item-icon', label: '首页' }])
  const [defaultKey, setDefault] = useState<string[]>([pathname])
  const [loading, setLoading] = useState(true)
  const {role} =useSelector((state:RootState)=>state.user)
  const [menuData,setMenuData]=useState<IMenu[]>([])
  const navigate = useNavigate()
  const changeRoute: MenuProps['onClick'] = ({key}): void => {
    navigate(key)
  }
  const changeTag=(menuData:IMenu[]):void=>{
    setDefault([pathname]) 
    const arr = pathname.split('/').splice(1) 
    let i=0
    if (arr.length > 1) {
      const tag = menuData.find(menu => menu.path.includes(arr[0]))?.children?.map((tag,index) => {
        if (tag.path.includes(arr[arr.length - 1])) {
          i=index
          return ({
            key: tag.path,
            icon: `fa fa-${tag.iconClass}`,
            label: tag.name
          })
        }
      })[i] as MenuItem
      setTags(() => {
        const index = tags && tags.findIndex(item => item && tag && item.key === tag.key)
        if (index === -1) {
          return tags && [...tags,tag]
        }
        return tags && [...tags]
      })
    }
  }
  useEffect(() => {
    changeTag(menuData)
    setLoading(false)
  }, [pathname])

  useEffect(()=>{
    const arr=role && role.split(',')
    const newMenu=data.filter(menu=>arr && arr.includes((menu.auth as string)))
    setMenuData(newMenu)
    changeTag(newMenu)
    console.log("🚀 ~ file: index.tsx:60 ~ useEffect ~ newMenu:", newMenu)
  },[])
  return (
    <Layout className='layout'>
      {/* 菜单栏 */}
      <Sider
        data={menuData}
        collpase={isCollapsed}
        defaultKey={defaultKey}
        click={(e: any) => { changeRoute(e) }}
        style={{
          backgroundColor: token.colorPrimaryBg
        }} />
      {/* 中间部分 */}
      <Layout>
        {/* 头部 */}
        <Header collpase={isCollapsed} click={() => { setIsCollapsed(!isCollapsed) }} style={{
          backgroundColor: token.colorPrimaryBg
        }} />
        {/* 内容区 */}
        <Content className='bg-white'>
          {/* 动态tag */}
          <TagView tags={tags ?? []} />
          <Spin spinning={loading} tip="Loading...">
            <Card
              style={{ padding: '15px', border: 'none', backgroundColor: 'transparent' }}
              bodyStyle={{ backgroundColor: '#fff', border: 'none' }}>
              ads
              <Outlet />
            </Card>
          </Spin>
        </Content>
      </Layout>
    </Layout>
  )
}
export default LayOut
