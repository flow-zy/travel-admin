import { useState, type FC, useRef, useEffect } from 'react'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { Button, Form, Input, message, type InputRef } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { login } from '@/store/slice/user'
import { type IUser } from '@/types'
import { login as loginApi } from '@/api'
import './index.scss'
import left from '@/assets/login_left.png'

const Login: FC = () => {
	const inputRef = useRef<InputRef>(null)
	const [form] = Form.useForm()
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const [messageApi, contextHolder] = message.useMessage()
	const [loginForm, setLoginForm] = useState<IUser>({
		username: '',
		password: ''
	})
	const change = (type: string, value: string) => {
		setLoginForm(form => {
			form[type] = value
			return form
		})
	}
	const onFinish = async (values: IUser) => {
		const { data, code, message } = await loginApi<IUser>({
			url: '/login',
			method: 'get',
			data: values
		})
		if (code === 200) {
			void messageApi.open({
				type: 'success',
				content: `${message},稍后将跳转至首页`,
				onClose() {
					dispatch(login(data))
					navigate('/')
				}
			})
		} else {
			void messageApi.open({
				type: 'error',
				content: message
			})
		}
	}

	const onFinishFailed = () => {
		void messageApi.open({
			type: 'error',
			content: '用户名或密码错误'
		})
	}
	const reset = () => {
		form.resetFields()
	}
	useEffect(() => {
		inputRef.current?.focus({ cursor: 'start' })
	}, [])
	return (
		<div className="login-page flex items-center justify-center w-full h-full">
			<div className="login-box  shadow-md flex justify-around rounded-md items-center">
				<div className="login-left">
					<img src={left} />
				</div>
				<div className="login-right">
					<div className="login-title"></div>
					{contextHolder}
					<Form
						name="basic"
						style={{ maxWidth: 600 }}
						onFinish={onFinish}
						initialValues={loginForm}
						onFinishFailed={onFinishFailed}
						autoComplete="off"
						className="login-form"
						form={form}
					>
						<Form.Item<IUser>
							name="username"
							rules={[{ required: true, message: '请输入用户名!' }]}
						>
							<Input
								ref={inputRef}
								prefix={<UserOutlined className="site-form-item-icon" />}
								placeholder="用户名:admin/user"
								onChange={e => change('username', e.target.value)}
								allowClear
							/>
						</Form.Item>

						<Form.Item<IUser>
							name="password"
							rules={[{ required: true, message: '请输入密码!' }]}
						>
							<Input.Password
								prefix={<LockOutlined className="site-form-item-icon" />}
								placeholder="密码:123456"
								onChange={e => change('password', e.target.value)}
								allowClear
							/>
						</Form.Item>
						<Form.Item>
							<Button type="primary" htmlType="submit" className="mr-6">
								登录
							</Button>
							<Button type="default" htmlType="button" onClick={reset}>
								重置
							</Button>
						</Form.Item>
					</Form>
				</div>
			</div>
		</div>
	)
}

export default Login
