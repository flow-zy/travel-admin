import type { IMenu } from '@/types'

const menu: IMenu[] = [
	{
		name: '首页',
		iconClass: 'home',
		path: '/home',
		auth: 'document'
	},
	{
		name: '数据报表',
		iconClass: 'area-chart',
		path: '/chart',
		auth: 'document'
	},
	{
		name: '权限管理',
		path: '/premission',
		iconClass: 'compass',
		auth: 'premission',
		children: [
			{
				name: '账号管理',
				iconClass: 'bookmark',
				path: '/premission/account'
			},
			{
				name: '角色管理',
				iconClass: 'users',
				path: '/premission/user'
			}
		]
	},
	{
		name: '会员管理',
		iconClass: 'edit',
		path: '/member',
		auth: 'member',
		children: [
			{
				name: '会员列表',
				path: '/member/list',
				iconClass: 'list'
			},
			{
				name: '会员类型设置',
				path: '/member/type',
				iconClass: 'list-alt'
			}
		]
	},
	{
		name: '签证管理',
		path: '/visa',
		iconClass: 'cc-visa',
		auth: 'visa',
		children: [
			{
				name: '签证列表',
				path: '/visa/list',
				iconClass: 'list'
			},
			{
				name: '签证设置',
				path: '/visa/setting',
				iconClass: 'cogs'
			},
			{
				name: '订单列表',
				path: '/visa/order',
				iconClass: 'first-order'
			}
		]
	},
	{
		name: '旅游团管理',
		path: '/travel',
		auth: 'tourist',
		iconClass: 'drivers-license',
		children: [
			{
				name: '产品列表',
				path: '/travel/list',
				iconClass: 'list'
			},
			{
				name: '产品设置',
				path: '/travel/setting',
				iconClass: 'cogs'
			},
			{
				name: '订单列表',
				iconClass: 'first-order',
				path: '/travel/order'
			}
		]
	},
	{
		name: '酒店管理',
		path: '/groggery',
		iconClass: 'hotel',
		auth: 'groggery',
		children: [
			{
				name: '酒店列表',
				path: '/groggery/list',
				iconClass: 'list'
			},
			{
				name: '酒店业绩',
				path: '/groggery/performance',
				iconClass: 'percent'
			},
			{
				name: '酒店设置',
				path: '/groggery/setting',
				iconClass: 'cogs'
			},
			{
				name: '酒店订单',
				path: '/groggery/order',
				iconClass: 'first-order'
			}
		]
	},
	{
		name: '机票管理',
		auth: 'ticket',
		path: '/ticket',
		iconClass: 'ticket',
		children: [
			{
				name: '订单列表',
				path: '/ticket/list',
				iconClass: 'list'
			}
		]
	},
	{
		name: '系统配置',
		path: '/system',
		iconClass: 'cogs',
		auth: 'system',
		children: [
			{
				name: '基础数据配置',
				path: '/system/base',
				iconClass: 'bars'
			}
		]
	}
]
export default menu
