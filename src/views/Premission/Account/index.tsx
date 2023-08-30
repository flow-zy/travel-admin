import { useState, type FC, useEffect, Fragment } from 'react'
import {
	Form,
	Switch,
	Button,
	Select,
	Input,
	type PaginationProps,
	message
} from 'antd'
import { type ColumnsType } from 'antd/es/table'
import { ExportOutlined, FolderAddOutlined } from '@ant-design/icons'
import { useSelector } from 'react-redux'

import Modal from './components/Modal'

import { Table, ButtonGroup } from '@/components'
import type { IBtn, IDataType, IUser } from '@/types'
import { userAll, editStatus } from '@/api'
import { type RootState } from '@/store'

const pageOptions: PaginationProps['pageSizeOptions'] = [10, 15, 20, 40]
declare interface Open {
	type?: boolean
	[key: string]: boolean
}
const Account: FC = () => {
	const { role } = useSelector((state: RootState) => state.user)
	const [userList, setUserList] = useState<IDataType[]>([])
	const [total, setTotal] = useState<number>(0)
	const [messageApi, contextHolder] = message.useMessage()
	const [loading, setLoading] = useState<boolean>(true)
	const [open, setOpen] = useState<Open>({
		add: false,
		edit: false,
		reset: false
	})
	const [query, setQuery] = useState<{ pageSize: number; pageNum: number }>({
		pageSize: 10,
		pageNum: 1
	})
	const [type, setType] = useState<string>('')
	const [title, setTitle] = useState<string>('')
	const [form, setForm] = useState<{
		add: IDataType
		edit: IDataType
		reset: IDataType
		[key: string]: IDataType
	}>({
		add: { username: '', password: '', role: '', status: 0 },
		edit: {
			username: '',
			password: ''
		},
		reset: {
			username: '',
			password: ''
		}
	})
	const edit = (user: IDataType) => {
		setOpen({ ...open, edit: true })
		setTitle('修改账号')
		setType('edit')
		setForm({ ...form, edit: user })
	}
	const resetPwd = (user: IDataType) => {
		setOpen({ ...open, reset: true })
		setTitle('重置密码')
		setType('reset')
		setForm({ ...form, reset: user })
	}
	// 取消
	const close = () => {
		setOpen({ ...open, [type]: false })
		setForm({
			add: { username: '', password: '', role: '', status: 0 },
			edit: {
				username: '',
				password: ''
			},
			reset: {
				username: '',
				password: ''
			}
		})
		setType('')
	}
	const getUser = async () => {
		const { data, message, code } = await userAll<{
			list: IUser[]
			total: number
			query: { pageSize: number; pageNum: number }
		}>({
			url: '/users/all',
			method: 'get',
			params: query
		})
		void messageApi.open({
			type: code === 200 ? 'success' : 'error',
			content: message,
			onClose: () => {
				if (code === 200) {
					setUserList(data.list)
					setTotal(data.total)
				}
			}
		})
	}
	// 确认
	const confirm = () => {}
	// 导出
	const exportAccount = (): void => {}
	// 改变分页器
	const onChange: PaginationProps['onShowSizeChange'] = (page, size) => {
		setQuery({ pageSize: size, pageNum: page })
	}
	// 改变账号状态
	const changeStatus = async (id: string, status: number) => {
		const { message, code } = await editStatus({
			url: `/users/status/edit?id=${id}`,
			method: 'post',
			data: { status, role: role === '管理员' ? 'admin' : 'user' }
		})
		setUserList(() => {
			const list = userList.map(item => {
				if (item.id === id) {
					item.status = status
				}
				return item
			})
			return list
		})
		void getUser()
		void messageApi.open({
			content: message,
			type: code === 200 ? 'success' : 'error'
		})
	}
	const columns: ColumnsType<IDataType> = [
		{
			title: '序号',
			key: 'index',
			dataIndex: 'id',
			align: 'center',
			render: (_text, _record, index) => index + 1
		},
		{
			title: '账号',
			dataIndex: 'username',
			key: 'username',
			align: 'center'
		},
		{
			title: '所拥有角色',
			dataIndex: 'role',
			key: 'role',
			align: 'center'
		},
		{
			title: '账号状态',
			dataIndex: 'status',
			key: 'status',
			align: 'center',
			render: (_text, record) => (
				<Switch
					checked={Boolean(record.status)}
					onChange={checked => changeStatus(record.id, Number(checked))}
					size="default"
				/>
			)
		},
		{
			title: '操作',
			key: 'action',
			align: 'center',
			render: (_text: any, record: IDataType) => (
				<div className="flex justify-center items-center">
					<Button type="link" size="small" onClick={() => edit(record)}>
						修改
					</Button>
					<Button type="link" size="small" onClick={() => resetPwd(record)}>
						重置密码
					</Button>
				</div>
			)
		}
	]
	const btns: IBtn[] = [
		{
			name: '新增',
			icon: <FolderAddOutlined />,
			click: () => {
				setOpen({ ...open, add: true })
				setTitle('新增账号')
				setType('add')
			}
		},
		{
			name: '导出',
			icon: <ExportOutlined />,
			click: exportAccount
		}
	]

	useEffect(() => {
		setLoading(false)
		void getUser()
	}, [])
	return (
		<Fragment>
			{contextHolder}
			<div className="p-3 pt-0 pb-0 w-full">
				{/* 查询条件 */}
				<Form
					layout="inline"
					name="wrap"
					colon={false}
					labelAlign="left"
					labelWrap
					size="small"
					className="search-form bg-transparent w-full"
				>
					<Form.Item label="账号">
						<Input
							placeholder="请输入"
							style={{
								marginRight: 20,
								marginLeft: 80,
								boxSizing: 'border-box',
								width: 120
							}}
						/>
					</Form.Item>
					{/* 账号状态 */}
					<Form.Item label="账号状态">
						<Select placeholder="请选择" style={{ width: 120 }} />
					</Form.Item>
					<Form.Item className="ml-auto mr-3">
						<Button type="primary" htmlType="submit">
							查询
						</Button>
						<Button type="default" htmlType="reset" className="ml-1">
							重置
						</Button>
					</Form.Item>
				</Form>
				{/* 按钮组 */}
				<ButtonGroup btns={btns} />
				<Table
					total={total}
					change={onChange}
					pageNum={query.pageNum}
					pageSize={query.pageSize}
					columns={columns}
					dataSource={userList}
					isLoading={loading}
					options={pageOptions}
				/>
				{type && (
					<Modal
						type={type}
						title={title}
						open={open[type]}
						close={close}
						confirm={confirm}
						data={form[type]}
					/>
				)}
			</div>
		</Fragment>
	)
}

export default Account
