interface IPermission {
	id?: number | string
	name?: string
}

const permissions: IPermission[] = [
	{
		id: 1,
		name: 'document'
	},
	{
		id: 2,
		name: 'premission'
	},
	{
		id: 3,
		name: 'member'
	},
	{
		id: 4,
		name: 'visa'
	},
	{
		id: 5,
		name: 'tourist'
	},
	{
		id: 6,
		name: 'ticket'
	},
	{
		id: 7,
		name: 'system'
	},
	{
		id: 8,
		name: 'groggery'
	},
	{
		id: 9,
		name: 'users'
	}
]
export default permissions
