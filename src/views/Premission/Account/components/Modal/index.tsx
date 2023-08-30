import { Modal, Form, Input, Select, Radio } from 'antd'
import { Fragment, type FC } from 'react'

import { type IUser } from '@/types'

interface Props {
	type: string
	title: string
	open: boolean
	close: () => void
	confirm: () => void
	data: IUser
}
const Add: FC<Props> = (props: Props) => {
	const { open, close, confirm, data, title, type } = props
	return (
		<Modal
			open={open}
			title={title}
			okText="确认"
			cancelText="取消"
			onOk={confirm}
			onCancel={close}
			className={`${type}-modal`}
			style={{ maxWidth: 400 }}
		>
			<Form
				className="pt-4"
				colon={false}
				initialValues={data}
				autoComplete="off"
				style={{ maxWidth: 400 }}
				labelCol={{ span: 6 }}
				labelAlign="right"
			>
				{type !== 'reset' ? (
					<Fragment>
						<Form.Item label="账号" required>
							<Input
								placeholder="请输入账号"
								disabled={type === 'edit'}
								defaultValue={data.username}
							></Input>
						</Form.Item>
						<Form.Item
							label="密码"
							required
							rules={[
								{
									type: 'string',
									min: 6,
									max: 16,
									message: '密码长度为6-16位的数字或字母'
								}
							]}
						>
							<Input.Password
								type="password"
								placeholder="请输入密码"
								disabled={type === 'edit'}
								defaultValue={data.password}
							></Input.Password>
						</Form.Item>
						<Form.Item label="拥有角色" required>
							<Select
								placeholder="请选择"
								disabled={type === 'edit'}
								defaultValue={data.role.length === 0 ? '请选择' : data.role}
							/>
						</Form.Item>
						<Form.Item label="账号状态" required>
							<Radio.Group defaultValue={data.status}>
								<Radio value={1} defaultChecked={data.status === 1}>
									启用
								</Radio>
								<Radio value={0} defaultChecked={data.status === 0}>
									禁用
								</Radio>
							</Radio.Group>
						</Form.Item>
					</Fragment>
				) : (
					<Form.Item
						label="密码"
						required
						rules={[
							{
								type: 'string',
								min: 6,
								max: 16,
								message: '密码长度为6-16位的数字或字母'
							}
						]}
					>
						<Input.Password
							type="password"
							placeholder="请输入密码"
							disabled={['edit'].includes(type)}
							defaultValue={data.password}
						></Input.Password>
					</Form.Item>
				)}
			</Form>
		</Modal>
	)
}

export default Add
