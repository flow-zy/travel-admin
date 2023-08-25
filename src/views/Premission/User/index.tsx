import { Fragment, type FC, useState, useEffect } from 'react'
import { Form, Input, Button, type PaginationProps, Modal } from 'antd'
import { ExportOutlined, FolderAddOutlined } from '@ant-design/icons'
import { type ColumnsType } from 'antd/es/table'

import ModalC from './components/Modal'

import { ButtonGroup, Table } from '@/components'
import { type IRole, type IBtn } from '@/types'

declare interface Open {
	type?: boolean
	[key: string]: boolean
}
const pageOptions: PaginationProps['pageSizeOptions'] = [10, 15, 20, 40]
const User: FC = () => {
	const [loading, setLoading] = useState<boolean>(true)
	const [roleList, setRoleList] = useState<IRole[]>([])
	const [query, setQuery] = useState<{ pageSize: number; pageNum: number }>({
		pageSize: 10,
		pageNum: 1
	})
	const [open, setOpen] = useState<Open>({
		add: false,
		edit: false,
		setRole: false
	})
	const [type, setType] = useState<string>('')
	const [title, setTitle] = useState<string>('')
	const [openPop, setOpenPop] = useState(false)
	const [confirmLoading, setConfirmLoading] = useState(false)
	const [form, setForm] = useState<{
		add: IRole
		edit: IRole
		setRole: IRole
		[key: string]: IRole
	}>({
		add: {
			name: '',
			description: ''
		},
		edit: {
			name: '',
			description: ''
		},
		setRole: {
			name: '',
			description: ''
		}
	})
	// 改变分页器
	const onChange: PaginationProps['onShowSizeChange'] = (page, size) => {
		setQuery({ pageSize: size, pageNum: page })
	}
	const exportUser = () => {}
	const edit = (role: IRole) => {
		setOpen({ ...open, edit: true })
		setTitle('修改角色')
		setType('edit')
		setForm({ ...form, edit: role })
	}
	const roleUpd = (role: IRole) => {
		setOpen({ ...open, setRole: true })
		setTitle('设置权限')
		setType('setRole')
		setForm({ ...form, setRole: role })
	}
	// 取消
	const close = () => {
		setOpen({ ...open, [type]: false })
	}
	// 确认
	const confirm = () => {}
	const handleOk = () => {
		setConfirmLoading(true)

		setTimeout(() => {
			setOpenPop(false)
			setConfirmLoading(false)
		}, 2000)
	}

	const handleCancel = () => {
		console.log('Clicked cancel button')
		setOpenPop(false)
	}
	useEffect(() => {
		// 生成两条初始数据
		setRoleList([
			{
				id: 1,
				name: '管理员',
				description: '拥有所有权限'
			},
			{
				id: 2,
				name: '编辑',
				description: '拥有编辑权限'
			}
		])
		setLoading(false)
	}, [])
	const columns: ColumnsType<IRole> = [
		{
			title: '序号',
			key: 'index',
			align: 'center',
			render: (_text, _record, index) => index + 1
		},
		{
			title: '角色名称',
			key: 'name',
			align: 'center',
			dataIndex: 'name'
		},
		{
			title: '角色描述',
			key: 'description',
			align: 'center',
			dataIndex: 'description'
		},
		{
			title: '操作',
			key: 'action',
			align: 'center',
			render: (_text, record) => (
				<Fragment>
					<Button type="link" onClick={() => edit(record)}>
						编辑
					</Button>
					<Button type="link" onClick={() => roleUpd(record)}>
						分配权限
					</Button>
					<Button
						type="link"
						danger
						onClick={() => {
							Modal.confirm({
								title: '删除角色',
								content:
									'删除角色后，该角色下的用户将无法登录系统，确定删除该角色吗？',
								okText: '确认',
								cancelText: '取消',
								okButtonProps: { loading: confirmLoading },
								onOk: handleOk,
								onCancel: handleCancel
							})
							setOpenPop(!openPop)
						}}
					>
						删除
					</Button>
				</Fragment>
			)
		}
	]
	const btns: IBtn[] = [
		{
			name: '新增',
			icon: <FolderAddOutlined />,
			click: () => {
				setOpen({ ...open, add: true })
				setTitle('新增角色')
				setType('add')
			}
		},
		{
			name: '导出',
			icon: <ExportOutlined />,
			click: exportUser
		}
	]
	return (
		<Fragment>
			<Form
				layout="inline"
				name="wrap"
				colon={false}
				labelAlign="left"
				labelWrap
				size="small"
				className="search-form bg-transparent w-full"
			>
				<Form.Item label="角色名称" name="name">
					<Input placeholder="请输入角色名称" />
				</Form.Item>
				<Form.Item className="gap-3">
					<Button type="primary" htmlType="submit">
						搜索
					</Button>
					<Button type="default" htmlType="reset" className="ml-3">
						重置
					</Button>
				</Form.Item>
			</Form>
			<ButtonGroup btns={btns} />
			<Table
				total={2}
				change={onChange}
				pageNum={query.pageNum}
				pageSize={query.pageSize}
				columns={columns}
				dataSource={roleList}
				isLoading={loading}
				options={pageOptions}
			/>
			<ModalC
				data={form[type]}
				type={type}
				title={title}
				open={open[type]}
				close={close}
				confirm={confirm}
			/>
		</Fragment>
	)
}
export default User
