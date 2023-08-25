import { Modal, Form, Input, Tree } from 'antd'
import { Fragment, type FC } from 'react'
import { type TreeProps, type DataNode } from 'antd/es/tree'

import { type IRole } from '@/types'

interface Props {
	type: string
	title: string
	open: boolean
	close: () => void
	confirm: () => void
	data: IRole
}
declare interface MFormProps {
	type: string
	data: IRole
}
const treeData: DataNode[] = [
	{
		title: 'parent 1',
		key: '0-0',
		children: [
			{
				title: 'parent 1-0',
				key: '0-0-0',
				disabled: true,
				children: [
					{
						title: 'leaf',
						key: '0-0-0-0',
						disableCheckbox: true
					},
					{
						title: 'leaf',
						key: '0-0-0-1'
					}
				]
			},
			{
				title: 'parent 1-1',
				key: '0-0-1',
				children: [
					{
						title: <span style={{ color: '#1677ff' }}>sss</span>,
						key: '0-0-1-0'
					}
				]
			}
		]
	}
]
const MForm: FC<MFormProps> = (props: MFormProps) => {
	const { type, data } = props
	return (
		<Fragment>
			<Form.Item label="角色名称" required>
				<Input
					placeholder="请输入角色名称"
					disabled={type === 'edit'}
					defaultValue={data.name}
				></Input>
			</Form.Item>
			<Form.Item label="角色描述" required>
				<Input.TextArea placeholder="请输入角色描述"></Input.TextArea>
			</Form.Item>
		</Fragment>
	)
}
const Add: FC<Props> = (props: Props) => {
	const { open, close, confirm, data, title, type } = props
	const onSelect: TreeProps['onSelect'] = (selectedKeys, info) => {
		console.log('selected', selectedKeys, info)
	}

	const onCheck: TreeProps['onCheck'] = (checkedKeys, info) => {
		console.log('onCheck', checkedKeys, info)
	}

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
				{type !== 'setRole' ? (
					<MForm type={type} data={data} />
				) : (
					<Tree
						checkable
						onSelect={onSelect}
						onCheck={onCheck}
						treeData={treeData}
					></Tree>
				)}
			</Form>
		</Modal>
	)
}

export default Add
