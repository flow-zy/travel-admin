import type { FC } from 'react'
import { Layout, Dropdown, Space, Avatar } from 'antd'
import './index.scss'
import type { DropDownProps } from 'antd'
import avatar from '@/assets/avatar.png'
const { Header, Content, Sider} = Layout
const items:  DropDownProps['menu'] = [{
  label: (
    <a  rel="noopener noreferrer" href="#">
      个人信息
    </a>
  ),
  keys: '1',
},
{
  label: (
    <a  rel="noopener noreferrer" href="#">
      修改密码
    </a>
  ),
  keys: '2',
}, {
  label: (
    <a rel="noopener noreferrer" href="#">
      退出登录
    </a>
  ),
  keys: '3',
}]
const Index: FC = () => (
  <Layout className='layout'>
    {/* 头部 */}
    <Header className='flex items-center justify-around'>
      <div className="logo">logo</div>
      <div className="nav flex justify-around">
        <i className="fa fa-toggle-left"></i>
        <div className="right">
          <div className="username"></div>
          <Dropdown menu={{ items }}>
            <a onClick={(e) => {e.preventDefault()}}>
              <Space>
                <Avatar src={avatar} size={64} alt='头像' />
              </Space>
            </a>
          </Dropdown>
        </div>
      </div>
    </Header>
    {/* 中间部分 */}
    <Layout>
      {/* 菜单栏 */}
      <Sider>菜单栏</Sider>
      {/* 内容区 */}
      <Layout>
        <Content>内容区</Content>
      </Layout>
    </Layout>
  </Layout>
)

export default Index
