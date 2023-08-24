import { Table, Button, Pagination } from 'antd'
import { type ColumnsType } from 'antd/es/table'
import { useEffect, useState, type FC, Fragment } from 'react'

import { type IDataType } from '@/types'

interface Props<T> {
	columns: ColumnsType<T>
	dataSource: readonly T[]
	isShowPage?: boolean // 是否显示分页
	isLoading?: boolean
	edit: Function
	updatePwd: Function
	pageSize?: number
	pageNum?: number
	change: Function
	total?: number
	options?: number[] | string[]
}
const Tables: FC<Props<IDataType>> = (props: Props<IDataType>) => {
	const {
		columns,
		isLoading = true,
		isShowPage = true,
		dataSource,
		edit,
		updatePwd,
		pageSize,
		pageNum,
		change,
		total,
		options
	} = props
	const [newCol, setCol] = useState<ColumnsType<IDataType>>(columns)
	useEffect(() => {
		setCol([
			...columns,
			{
				title: '操作',
				key: 'action',
				align: 'center',
				render: (_text: any, record: { id: string }) => (
					<div className="flex justify-center items-center">
						<Button type="link" size="small" onClick={() => edit(record.id)}>
							修改
						</Button>
						<Button
							type="link"
							size="small"
							onClick={() => updatePwd(record.id)}
						>
							重置密码
						</Button>
					</div>
				)
			}
		])
	}, [])
	return (
		<Fragment>
			{/* 表格区域 */}
			<Table
				columns={newCol}
				dataSource={dataSource}
				pagination={false}
				loading={isLoading}
				style={{
					minHeight: 300
				}}
			></Table>
			{/* 分页器区域 */}
			{isShowPage ? (
				<Pagination
					className="mt-5"
					total={total}
					showSizeChanger
					showQuickJumper
					pageSize={pageSize}
					current={pageNum}
					onShowSizeChange={() => change()}
					showTotal={total => `总共 ${total} 条`}
					pageSizeOptions={options}
				/>
			) : (
				<></>
			)}
		</Fragment>
	)
}

export default Tables
