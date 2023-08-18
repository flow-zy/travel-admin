interface IPermission {
  id?: number | string;
  name?: string;
}

const permissions: IPermission[] = [
  {
    id: 1,
    name: 'document'
  },
  {
    id: 2,
    name: 'users'
  },
  {
    id: 3,
    name: 'category'
  },
  {
    id: 4,
    name: 'orders'
  },
  {
    id: 5,
    name: 'carts'
  },
  {
    id: 6,
    name: 'products'
  },
  {
    id: 7,
    name: 'settings'
  },
  {
    id: 8,
    name: 'roles'
  },
  {
    id: 9,
    name: 'permissions'
  },
  {
    id: 10,
    name: 'profile'
  },
  {
    id: 11,
    name: 'logs'
  },
  {
    id: 12,
    name: 'notifications'
  },
  {
    id: 13,
    name: 'addresses'
  },
  {
    id: 14,
    name: 'payments'
  },
  {
    id: 15,
    name: 'gateways'
  }
]
export default permissions