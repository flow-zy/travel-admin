import { Table, Pagination } from 'antd'
import { type ColumnsType } from 'antd/es/table'
import { type FC, Fragment } from 'react'

import { type IRole, type IDataType } from '@/types'

interface Props<T> {
	columns: ColumnsType<T>
	dataSource: readonly T[]
	isShowPage?: boolean // 是否显示分页
	isLoading?: boolean
	pageSize?: number
	pageNum?: number
	change: Function
	total?: number
	options?: number[] | string[]
}
const Tables: FC<Props<IDataType | IRole>> = (
	props: Props<IDataType | IRole>
) => {
	const {
		columns,
		isLoading = true,
		isShowPage = true,
		dataSource,
		pageSize,
		pageNum,
		change,
		total,
		options
	} = props
	return (
		<Fragment>
			{/* 表格区域 */}
			<Table
				columns={columns}
				dataSource={dataSource}
				pagination={false}
				loading={isLoading}
				style={{
					minHeight: 250
				}}
			></Table>
			{/* 分页器区域 */}
			{isShowPage ? (
				<Pagination
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
