import { type FC, useState, Fragment, type ReactElement } from 'react'
import {
	FullscreenOutlined,
	BellOutlined,
	SyncOutlined,
	SettingOutlined,
	MenuFoldOutlined,
	MenuUnfoldOutlined,
	ExclamationCircleFilled,
	FullscreenExitOutlined
} from '@ant-design/icons'
import { Layout, Dropdown, Space, Avatar, Tooltip, Modal, message } from 'antd'
import type { MenuProps, TooltipProps, ModalProps as ModelProps } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import SettingDrawer from '../SettingDrawer'

import avatar from '@/assets/avatar.png'
import { type RootState } from '@/store'
import { logout as log } from '@/store/slice/user'

const { confirm } = Modal

interface Props {
	collpase: boolean
	click: Function
	style: any
	handle: Function
	full: boolean
	children?: ReactElement
}
const items: MenuProps['items'] = [
	{
		label: '个人信息',
		key: 'user/info',
		icon: <i className="fa fa-user"></i>
	},
	{
		label: '修改密码',
		key: 'user/password',
		icon: <i className="fa fa-lock"></i>
	},
	{
		label: '退出登录',
		key: 'logout',
		icon: <i className="fa fa-sign-out"></i>
	}
]

const Header: FC<Props> = (props: Props) => {
	const { collpase, click, style, full, handle, children } = props
	const userInfo = useSelector((state: RootState) => state.user)
	const [settingVisible, setSettingVisible] = useState<boolean>(false)
	const navigate = useNavigate()
	const [messageApi, contextHolder] = message.useMessage()
	const dispatch = useDispatch()
	const [open, setOpen] = useState<boolean>(false)
	const tools: TooltipProps[] = [
		{
			placement: 'bottom',
			title: !full ? '全屏' : '退出全屏',
			children: !full ? (
				<FullscreenOutlined
					style={{ fontSize: '20px' }}
					onClick={() => {
						handle(true)
					}}
				/>
			) : (
				<FullscreenExitOutlined
					style={{ fontSize: '20px' }}
					onClick={() => {
						handle(false)
					}}
				/>
			)
		},
		{
			placement: 'bottom',
			title: '通知',
			children: <BellOutlined style={{ fontSize: '20px' }} />
		},
		{
			placement: 'bottom',
			title: '刷新',
			children: <SyncOutlined style={{ fontSize: '20px' }} />
		},
		{
			placement: 'bottom',
			title: '设置',
			children: (
				<SettingOutlined
					style={{ fontSize: '20px' }}
					onClick={() => {
						setSettingVisible(!settingVisible)
					}}
				/>
			)
		}
	]

	const logout: ModelProps['onOk'] = _e => {
		void messageApi.open({
			type: 'success',
			content: '退出登录成功稍后将跳转至登录页',
			onClose: () => {
				dispatch(log())
				navigate('/login')
			}
		})
	}
	const onClick: MenuProps['onClick'] = ({ key }) => {
		if (key.includes('user')) {
			navigate(key)
		} else if (key === 'logout') {
			setOpen(true)
			confirm({
				title: '你确定要退出登录？',
				icon: <ExclamationCircleFilled />,
				onOk(e) {
					setOpen(false)
					const modal = document.querySelector(
						'.ant-modal-root .css-dev-only-do-not-override-fpg3f5'
					)
					modal && modal.remove()
					logout(e)
				},
				onCancel() {
					void messageApi.info('你取消了退出登录操作')
				},
				cancelText: '取消',
				okText: '确认',
				open
			})
		}
	}
	return (
		<Fragment>
			{contextHolder}
			<Layout.Header
				className="flex items-center justify-between shadow pl-0"
				style={style}
			>
				<div className="nav flex justify-between flex-auto">
					<div className="header-left pl-4 flex mr-4 items-center ">
						{!collpase ? (
							<MenuFoldOutlined
								style={{ fontSize: '20px' }}
								onClick={() => click()}
							/>
						) : (
							<MenuUnfoldOutlined
								style={{ fontSize: '20px' }}
								onClick={() => click()}
							/>
						)}
						{children}
					</div>
					<div className="header-right flex justify-between items-center w-1/5">
						{tools.map((tool, index) => (
							<Tooltip
								placement={tool.placement}
								key={index}
								title={tool.title}
							>
								{tool.children}
							</Tooltip>
						))}
						<Dropdown menu={{ items, onClick }}>
							<a
								onClick={e => {
									e.preventDefault()
								}}
							>
								<Space>
									<Avatar
										src={userInfo.avatar ?? avatar}
										size={48}
										alt={userInfo.username ?? '头像'}
									/>
								</Space>
							</a>
						</Dropdown>
					</div>
				</div>
			</Layout.Header>
			{settingVisible ? (
				<SettingDrawer
					open={settingVisible}
					close={() => {
						setSettingVisible(!settingVisible)
					}}
				/>
			) : (
				<></>
			)}
		</Fragment>
	)
}

export default Header
