import { type FC, useState, Fragment } from 'react'
import {
  FullscreenOutlined, BellOutlined, SyncOutlined, SettingOutlined,
  MenuFoldOutlined, MenuUnfoldOutlined
} from '@ant-design/icons'
import avatar from '@/assets/avatar.png'
import { Layout, Dropdown, Space, Avatar, Tooltip, Drawer,Button,ColorPicker } from 'antd'
import type { MenuProps, TooltipProps, ColorPickerProps,ThemeConfig  } from 'antd'
import { useSelector,useDispatch } from 'react-redux'
import { type RootState } from '@/store'
import {save} from '@/store/slice/setting'
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
interface DrawerProps {
  open: boolean
  close?: Function
}
interface ConfigOptions {
  theme?:ThemeConfig 
  componentSize?:string
} 
const SettingDrawer: FC<DrawerProps> = ({ open, close = () => { } }: DrawerProps) => {
  const dispatch=useDispatch()
  const [active,setActive]=useState<string>('middle')
  const [config,setConfig]=useState<ConfigOptions>({})
   const [loading, setLoading] = useState<boolean>(false)
  const changeSize=(size:string)=>{
    setActive(size)
    setConfig((config:ConfigOptions)=>({...config,componentSize:size}))
  }
  const changeTheme:ColorPickerProps['onChange']=(value,hex)=>{
    console.log(hex)
    setConfig(config=>({
      ...config,
      theme: {
        token: {
           colorPrimaryBg:hex,
        }
      }
    }))
  }
  const saveConfig=()=>{
    setLoading(true)
    setTimeout(async ()=>{
     await setLoading(false)
    void dispatch(save(config))
    void  close()
    },3000)
  }
  return (<Drawer 
  title="基本设置"          
   placement="right"
   open={open} 
   onClose={() => close()}
    className='drawer'
    footer={
      <Space className="footer">
        <Button type="primary" loading={loading} onClick={saveConfig}>保存</Button>  
        <Button type='default'>重置</Button>  
      </Space>
    }
    >
    <div className='theme pt-6 pb-6 flex justify-between'>
      <p className='title'>
        <i className='fa fa-themeisle mr-2'></i>
        <span>主题</span>
      </p>
      <ColorPicker showText onChange={changeTheme} allowClear default='#1377ff' disabledAlpha />
    </div>
     <div className='theme pt-6 pb-6 flex justify-between'>
      <p className='title'>
        <i className='fa fa-tag mr-2'></i>
        <span>大小</span>
      </p>
      <div className='flex justify-around flex-1'>
        <Button size="middle" type={active==='large'?'primary':'default'} onClick={()=>{changeSize('large')}}>large</Button>
        <Button size="middle" type={active==='middle'?'primary':'default'} onClick={()=>{changeSize('middle')}}>middle</Button>
        <Button size="middle" type={active==='small'?'primary':'default'} onClick={()=>{ changeSize('small') }}>small</Button>
      </div>
    </div>
    <div className="components  pt-6 pb-6">
      <div className="title">
        <i className='fa fa-window-maximize  mr-2'></i>
        <span>布局</span>
      </div>

    </div>
    <div className='locale  pt-6 pb-6'>
      <p className="title">
        <i className='fa fa-language  mr-2'></i>
        <span>语言</span>
      </p>
    </div>
  </Drawer>)
}
interface Props {
  collpase: boolean
  click: Function
  style:any
}     
const Header: FC<Props> = ({ collpase, click,style }: Props) => {
  const userInfo = useSelector((state: RootState) => state.user)
  const [settingVisible, setSettingVisible] = useState<boolean>(false)
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
    children: <SettingOutlined style={{ fontSize: '20px' }} onClick={() => { setSettingVisible(!settingVisible) }} />,
  }]
  return (
    <Fragment>
      <Layout.Header className='flex items-center justify-between shadow pl-0' style={style}>
        <div className="nav flex justify-between flex-auto">
          <div className="header-left pl-4 flex mr-4 items-center ">
            {
              !collpase ? (<MenuFoldOutlined style={{ fontSize: '20px' }} onClick={() => click()} />) :
                <MenuUnfoldOutlined style={{ fontSize: '20px' }} onClick={() => click()} />
            }
            {/* 面包屑 */}
          </div>
          <div className="header-right flex justify-between items-center w-1/5">
            {tools.map((tool, index) => (
              <Tooltip placement={tool.placement} key={index} title={tool.title}>{tool.children}</Tooltip>))}
            <Dropdown menu={{ items }}>
              <a onClick={(e) => { e.preventDefault() }}>
                <Space>
                  <Avatar src={avatar} size={48} alt={userInfo.username || '头像'} />
                </Space>
              </a>
            </Dropdown>
          </div>
        </div>
      </Layout.Header>
      {settingVisible ? (<SettingDrawer open={settingVisible} close={() => { setSettingVisible(!settingVisible) }} />) : (<></>)}
    </Fragment>
  )
}

export default Header
