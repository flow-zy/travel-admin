import {
	type FC,
	useState,
	useEffect,
	cloneElement,
	type CSSProperties,
	type ReactElement
} from 'react'
import { Tabs, type TabsProps, type MenuProps } from 'antd'
import { useLocation, useNavigate } from 'react-router-dom'
import type { DragEndEvent } from '@dnd-kit/core'
import { DndContext, PointerSensor, useSensor } from '@dnd-kit/core'
import {
	arrayMove,
	horizontalListSortingStrategy,
	SortableContext,
	useSortable
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

import { type IMenu } from '@/types'
import menuData from '@/mock/menu'

type TargetKey = React.MouseEvent | React.KeyboardEvent | string
interface DraggableTabPaneProps extends React.HTMLAttributes<HTMLDivElement> {
	'data-node-key': string
}
const DraggableTabNode = ({ className, ...props }: DraggableTabPaneProps) => {
	const { attributes, listeners, setNodeRef, transform, transition } =
		useSortable({
			id: props['data-node-key']
		})
	const style: CSSProperties = {
		...props.style,
		transform: CSS.Transform.toString(transform && { ...transform, scaleX: 1 }),
		transition,
		cursor: 'move'
	}

	return cloneElement(props.children as ReactElement, {
		ref: setNodeRef,
		style,
		...attributes,
		...listeners
	})
}
const newMenu: IMenu[] = []
const flatern = (data: IMenu[]) => {
	data.forEach(item => {
		if (item.children) {
			flatern(item.children)
		} else {
			newMenu.push(item)
		}
	})
}
const TagView: FC = () => {
	const { pathname } = useLocation()
	const [activeKey, setActive] = useState<string>('/home')
	const [items, setItems] = useState<TabsProps['items']>([])
	const [tags, setTags] = useState<MenuProps['items']>([
		{ key: '/home', icon: 'fa fa-home ant-menu-item-icon', label: '首页' }
	])
	const sensor = useSensor(PointerSensor, {
		activationConstraint: { distance: 10 }
	})
	const navigate = useNavigate()
	// 改变标签
	const changeTag = (menuData: IMenu[]): void => {
		flatern(menuData)
		if (!pathname.includes('info') || !pathname.includes('password')) {
			const current = newMenu.find(menu => menu.path.includes(pathname))
			const index = tags.findIndex(tag => tag.key === current?.path)
			if (index === -1) {
				setTags(() => [
					...tags,
					{
						key: current.path,
						icon: `fa fa-${current.iconClass} ant-menu-icon`,
						label: current.name
					}
				])
			}
		}
	}
	useEffect(() => {
		const newItems: TabsProps['items'] =
			tags &&
			tags.map((tag: any) => ({
				key: tag && tag.key,
				label: (
					<span>
						<i className={tag && tag.icon} style={{ marginRight: '5px' }}></i>
						{tag && tag.label}
					</span>
				),
				closable: tag?.key !== '/home'
			}))
		setItems(newItems)
	}, [tags])
	useEffect(() => {
		setActive(pathname)
		changeTag(menuData)
	}, [pathname])
	const changeRoute = (activeKey: string) => {
		navigate(activeKey)
	}
	const remove = (targetKey: TargetKey) => {
		let newActiveKey = activeKey
		let lastIndex = -1
		items &&
			items.forEach((item, i) => {
				if (item.key === targetKey) {
					lastIndex = i - 1
				}
			})
		const newPanes = items && items.filter(item => item.key !== targetKey)
		if (newPanes && newPanes.length && newActiveKey === targetKey) {
			if (lastIndex >= 0) {
				newActiveKey = newPanes[lastIndex].key
				navigate(newActiveKey)
			} else {
				newActiveKey = newPanes[0].key
				navigate(newActiveKey)
			}
		}
		setItems(newPanes)
	}
	const onEdit = (
		targetKey: React.MouseEvent | React.KeyboardEvent | string
	) => {
		remove(targetKey)
	}
	const onDragEnd = ({ active, over }: DragEndEvent) => {
		if (active.id !== over?.id) {
			setItems(prev => {
				const activeIndex = prev.findIndex(i => i.key === active.id)
				const overIndex = prev.findIndex(i => i.key === over?.id)
				return arrayMove(prev, activeIndex, overIndex)
			})
		}
	}
	const renderTabBar: TabsProps['renderTabBar'] = (
		tabBarProps,
		DefaultTabBar
	) => (
		<DndContext sensors={[sensor]} onDragEnd={onDragEnd}>
			<SortableContext
				items={items.map(i => i.key)}
				strategy={horizontalListSortingStrategy}
			>
				<DefaultTabBar {...tabBarProps}>
					{node => (
						<DraggableTabNode {...node.props} key={node.key}>
							{node}
						</DraggableTabNode>
					)}
				</DefaultTabBar>
			</SortableContext>
		</DndContext>
	)
	return (
		<Tabs
			className="p-2 bg-white"
			defaultActiveKey={'/home'}
			items={items}
			renderTabBar={renderTabBar}
			onChange={changeRoute}
			activeKey={activeKey}
			type="editable-card"
			hideAdd
			onEdit={onEdit}
			size="small"
			tabBarGutter={14}
		/>
	)
}

export default TagView
