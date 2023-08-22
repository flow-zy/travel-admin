import { type FC, useState } from 'react'
import { Drawer, Button, ColorPicker, Space } from 'antd'
import { useSelector, useDispatch } from 'react-redux'

import { save, type ISetting } from '@/store/slice/setting'
import { type RootState } from '@/store'

interface Props {
	open: boolean
	close?: Function
}
const SettingDrawer: FC<Props> = ({ open, close = () => {} }: Props) => {
	const dispatch = useDispatch()
	const setting = useSelector((state: RootState) => state.setting)
	const [config, setConfig] = useState<ISetting>(setting)
	const [loading, setLoading] = useState<boolean>(false)
	const [active, setActive] = useState<string>(config.componentSize)
	const changeSize = (size: string) => {
		setActive(size)
		setConfig((config: ISetting) => ({ ...config, componentSize: size }))
	}
	const saveConfig = () => {
		setLoading(true)
		setTimeout(() => {
			setLoading(false)
			dispatch(save(config))
			close()
			parent.location.reload()
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
			<div className="theme pt-6 pb-6 flex items-start justify-between">
				<p className="title">
					<i className="fa fa-themeisle mr-2"></i>
					<span>主题</span>
				</p>
				<div className="flex flex-col justify-between pr-5">
					<div className="flex justify-between items-center">
						<span className="mr-2">主色</span>
						<ColorPicker
							onChange={(_v, hex) => {
								const obj = config
								obj.theme.token.colorPrimary = hex
								setConfig(obj)
							}}
							showText
							allowClear
							defaultValue={config.theme.token.colorPrimary}
							disabledAlpha
							size="small"
						/>
					</div>
					<div className="flex justify-between items-center mt-5">
						<span className="mr-2">背景色</span>
						<ColorPicker
							showText
							onChange={(_v, hex) => {
								const obj = config
								obj.theme.token.colorPrimaryBg = hex
								setConfig(obj)
							}}
							allowClear
							defaultValue={config.theme.token.colorPrimaryBg}
							disabledAlpha
							size="small"
						/>
					</div>
				</div>
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

export default SettingDrawer
