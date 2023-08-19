import { type FC, useState, Fragment } from 'react'
import {
	FullscreenOutlined,
	BellOutlined,
	SyncOutlined,
	SettingOutlined,
	MenuFoldOutlined,
	MenuUnfoldOutlined,
	ExclamationCircleFilled
} from '@ant-design/icons'
import {
	Layout,
	Dropdown,
	Space,
	Avatar,
	Tooltip,
	Drawer,
	Button,
	ColorPicker,
	Modal,
	message
} from 'antd'
import type {
	MenuProps,
	TooltipProps,
	ColorPickerProps,
	ModalProps as ModelProps
} from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import avatar from '@/assets/avatar.png'
import { type RootState } from '@/store'
import { save, type ISetting } from '@/store/slice/setting'
import { logout as log } from '@/store/slice/user'

const { confirm } = Modal
interface DrawerProps {
	open: boolean
	close?: Function
}
interface Props {
	collpase: boolean
	click: Function
	style: any
}
const items: MenuProps['items'] = [
	{
		label: '个人信息',
		key: '/user/info',
		icon: <i className="fa fa-user"></i>
	},
	{
		label: '修改密码',
		key: '/user/password',
		icon: <i className="fa fa-lock"></i>
	},
	{
		label: '退出登录',
		key: 'logout',
		icon: <i className="fa fa-sign-out"></i>
	}
]
const SettingDrawer: FC<DrawerProps> = ({
	open,
	close = () => {}
}: DrawerProps) => {
	const dispatch = useDispatch()
	const [active, setActive] = useState<string>('middle')
	const [config, setConfig] = useState<ISetting>({})
	const [loading, setLoading] = useState<boolean>(false)
	const changeSize = (size: string) => {
		setActive(size)
		setConfig((config: ISetting) => ({ ...config, componentSize: size }))
	}
	const changeTheme: ColorPickerProps['onChange'] = (_value, hex) => {
		console.log(hex)
		setConfig(config => ({
			...config,
			theme: {
				token: {
					colorPrimaryBg: hex
				}
			}
		}))
	}
	const saveConfig = () => {
		setLoading(true)
		setTimeout(() => {
			setLoading(false)
			dispatch(save(config))
			close()
		}, 3000)
	}
	return (
		<Drawer
			title="基本设置"
			placement="right"
			open={open}
			onClose={() => close()}
			className="drawer"
			footer={
				<Space className="footer">
					<Button type="primary" loading={loading} onClick={saveConfig}>
						保存
					</Button>
					<Button type="default" onClick={() => setConfig({})}>
						重置
					</Button>
				</Space>
			}
		>
			<div className="theme pt-6 pb-6 flex justify-between">
				<p className="title">
					<i className="fa fa-themeisle mr-2"></i>
					<span>主题</span>
				</p>
				<ColorPicker
					showText
					onChange={changeTheme}
					allowClear
					defaultValue="#1077ff"
					disabledAlpha
				/>
			</div>
			<div className="theme pt-6 pb-6 flex justify-between">
				<p className="title">
					<i className="fa fa-tag mr-2"></i>
					<span>大小</span>
				</p>
				<div className="flex justify-around flex-1">
					<Button
						size="middle"
						type={active === 'large' ? 'primary' : 'default'}
						onClick={() => {
							changeSize('large')
						}}
					>
						large
					</Button>
					<Button
						size="middle"
						type={active === 'middle' ? 'primary' : 'default'}
						onClick={() => {
							changeSize('middle')
						}}
					>
						middle
					</Button>
					<Button
						size="middle"
						type={active === 'small' ? 'primary' : 'default'}
						onClick={() => {
							changeSize('small')
						}}
					>
						small
					</Button>
				</div>
			</div>
			<div className="components  pt-6 pb-6">
				<div className="title">
					<i className="fa fa-window-maximize  mr-2"></i>
					<span>布局</span>
				</div>
			</div>
			<div className="locale  pt-6 pb-6">
				<p className="title">
					<i className="fa fa-language  mr-2"></i>
					<span>语言</span>
				</p>
			</div>
		</Drawer>
	)
}

const Header: FC<Props> = ({ collpase, click, style }: Props) => {
	const userInfo = useSelector((state: RootState) => state.user)
	const [settingVisible, setSettingVisible] = useState<boolean>(false)
	const navigate = useNavigate()
	const [messageApi, contextHolder] = message.useMessage()
	const dispatch = useDispatch()
	const [open, setOpen] = useState<boolean>(false)
	const tools: TooltipProps[] = [
		{
			placement: 'bottom',
			title: '全屏',
			children: <FullscreenOutlined style={{ fontSize: '20px' }} />
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
				navigate('/')
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
						{/* 面包屑 */}
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
