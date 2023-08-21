import { type FC, useState, useEffect, createContext, Fragment } from 'react'
import { Spin, Card, Layout, type MenuProps, theme, notification } from 'antd'
import { useSelector } from 'react-redux'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import type { NotificationPlacement } from 'antd/es/notification/interface'
import moment from 'moment'
import { FullScreen, useFullScreenHandle } from 'react-full-screen'

import { Sider, TagView, Header, Breadcrumb } from './components'

import { type RootState } from '@/store'
import data from '@/mock/data/menu'
import { type IMenu } from '@/types'

const { Content } = Layout
const { useToken } = theme
export type MenuItem = Required<MenuProps>['items'][number]
const LayOut: FC = () => {
	const { token } = useToken()
	const { pathname } = useLocation()
	const [full, setFull] = useState<boolean>(false)
	const handle = useFullScreenHandle()
	const [api, contextHolder] = notification.useNotification()
	const Context = createContext({ name: 'Default' })
	const [isCollapsed, setIsCollapsed] = useState<boolean>(false)

	const [defaultKey, setDefault] = useState<string[]>([pathname])
	const [loading, setLoading] = useState(true)
	const { role, username, nickname } = useSelector(
		(state: RootState) => state.user
	)
	const [menuData, setMenuData] = useState<IMenu[]>([])
	const navigate = useNavigate()
	// 点击菜单
	const changeRoute: MenuProps['onClick'] = ({ key }): void => {
		navigate(key)
		setLoading(true)
	}
	// 通知提醒
	const openNotification = (
		placement: NotificationPlacement = 'bottomRight'
	) => {
		// 判断当前时间是上午还是下午或者晚上
		const currentTime = new Date()
		const currentHour = currentTime.getHours()
		const now: string =
			currentHour >= 0 && currentHour < 12
				? '上午好'
				: currentHour >= 12 && currentHour < 18
				? '下午好'
				: '晚上好'
		api.info({
			message: (
				<Context.Consumer>
					{() => `${now}, ${nickname ?? username}!`}
				</Context.Consumer>
			),
			description: (
				<Fragment>
					<div>今天又是努力搬砖的一天</div>
					<div className="capitalize truncate drop-shadow-md">
						现在是<span>{moment().format('HH:mm:s')}</span>
					</div>
				</Fragment>
			),
			placement,
			style: {
				maxWidth: '260px'
			},
			duration: 3
		})
	}
	// 全屏
	const handleFull = (bool: boolean) => {
		setFull(bool)
		return bool ? handle.enter() : handle.exit()
	}
	useEffect(() => {
		setDefault([pathname])
		setLoading(false)
	}, [pathname])
	useEffect(() => {
		const arr = role && role.split(',')
		const newMenu = data.filter(menu => arr && arr.includes(menu.auth))
		setMenuData(newMenu)
		openNotification()
	}, [])

	return (
		<FullScreen handle={handle} onChange={setFull}>
			<Layout className="layout">
				{/* 菜单栏 */}
				<Sider
					data={menuData}
					collpase={isCollapsed}
					defaultKey={defaultKey}
					click={(e: any) => {
						changeRoute(e)
					}}
					style={{
						backgroundColor: token.colorPrimaryBg
					}}
				/>
				{/* 中间部分 */}
				<Layout>
					{/* 头部 */}
					<Header
						collpase={isCollapsed}
						click={() => {
							setIsCollapsed(!isCollapsed)
						}}
						style={{
							backgroundColor: token.colorPrimaryBg
						}}
						full={full}
						handle={handleFull}
					>
						{/* 面包屑 */}
						<Breadcrumb />
					</Header>
					{/* 内容区 */}
					<Content>
						{/* 动态tag */}
						{/* <TagView /> */}
						<Spin spinning={loading} tip="Loading...">
							<Card
								style={{
									padding: '15px',
									border: 'none',
									backgroundColor: 'transparent',
									height: 'calc(100vh - 52px - 64px)'
								}}
								bodyStyle={{
									backgroundColor: '#fff',
									border: 'none',
									height: '100%'
								}}
							>
								<Outlet />
							</Card>
						</Spin>
					</Content>
				</Layout>
				{contextHolder}
			</Layout>
		</FullScreen>
	)
}
export default LayOut
