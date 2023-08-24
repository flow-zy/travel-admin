import { useState, type FC, useEffect } from 'react'
import { Form, Switch, Button, Select, Input, type PaginationProps } from 'antd'
import { type ColumnsType } from 'antd/es/table'
import { ExportOutlined, FolderAddOutlined } from '@ant-design/icons'

import { Table, ButtonGroup } from '@/components'
import { type IBtn, type IDataType } from '@/types'

const pageOptions: PaginationProps['pageSizeOptions'] = [10, 15, 20, 40]
const btns: IBtn[] = [
	{
		name: '新增',
		icon: <FolderAddOutlined />,
		click: () => {}
	},
	{
		name: '导出',
		icon: <ExportOutlined />,
		click: () => {}
	}
]
const Account: FC = () => {
	const [userList, setUserList] = useState<IDataType[]>([])
	const [loading, setLoading] = useState<boolean>(true)
	const [query, setQuery] = useState<{ pageSize: number; pageNum: number }>({
		pageSize: 10,
		pageNum: 1
	})
	const edit = (id: string) => {
		console.log('🚀 ~ file: index.tsx:15 ~ id:', id)
	}
	const updatePwd = (id: string) => {
		console.log('🚀 ~ file: index.tsx:16 ~ updatePwd ~ id:', id)
	}
	const columns: ColumnsType<IDataType> = [
		{
			title: '序号',
			key: 'index',
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
			render: status => (
				<Switch checked={status} onChange={() => {}} size="default" />
			)
		}
	]
	const onChange: PaginationProps['onShowSizeChange'] = (page, size) => {
		setQuery({ pageSize: size, pageNum: page })
	}
	useEffect(() => {
		setUserList([
			{
				key: 'admin',
				id: '1',
				username: 'admin',
				role: 'admin',
				status: 0
			},
			{
				key: 'user',
				id: '2',
				username: 'admin',
				role: 'admin',
				status: 1
			}
		])
		setLoading(false)
	}, [])
	return (
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
				total={2}
				change={onChange}
				pageNum={query.pageNum}
				pageSize={query.pageSize}
				columns={columns}
				dataSource={userList}
				isLoading={loading}
				edit={edit}
				updatePwd={updatePwd}
				options={pageOptions}
			/>
		</div>
	)
}

export default Account
