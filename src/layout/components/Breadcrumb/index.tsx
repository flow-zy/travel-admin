import { type FC, useState, Fragment, useEffect } from 'react'
import { Breadcrumb } from 'antd'
import type { BreadcrumbProps } from 'antd'
import { RightOutlined } from '@ant-design/icons'
import { useLocation } from 'react-router-dom'

import menuData from '@/mock/data/menu'
import { type IMenu } from '@/types'

const config = {
	title: (
		<Fragment>
			<i className="fa fa-home"></i>
			<span>首页</span>
		</Fragment>
	),
	path: '/'
}

const renderBreadcrumbItems = (menu: IMenu): BreadcrumbProps['items'] => {
	const breadcrumbItems: BreadcrumbProps['items'] = []
	const pathname = location.hash.slice(1)
	breadcrumbItems.push({
		title: (
			<Fragment>
				<i className={`fa fa-${menu.iconClass}`}></i>
				<span>{menu.name}</span>
			</Fragment>
		)
	})
	if (pathname === '/home') return breadcrumbItems
	if (menu.children && menu.children.length >= 0) {
		menu.children.forEach(child => {
			if (pathname.includes(child.path)) {
				breadcrumbItems.push(...renderBreadcrumbItems(child))
			}
		})
	}

	return breadcrumbItems
}

const Breadcrumbs: FC = () => {
	const { pathname } = useLocation()
	const [items, setItems] = useState<BreadcrumbProps['items']>([])
	useEffect(() => {
		const pathSnippets = pathname.split('/').filter(i => i)
		const breadcrumbItems: BreadcrumbProps['items'] = []
		pathname === '/home' ? '' : breadcrumbItems.push(config)
		let currentPath: string = ''
		currentPath += `/${pathSnippets[0]}`
		const menu = menuData.find(item => item.path === currentPath)

		if (menu) {
			const breadcrumbItem = renderBreadcrumbItems(menu)
			breadcrumbItems.push(...breadcrumbItem)
		}
		setItems(() => [...breadcrumbItems])
	}, [pathname])
	return (
		<Breadcrumb items={items} className="ml-4" separator={<RightOutlined />} />
	)
}
export default Breadcrumbs
