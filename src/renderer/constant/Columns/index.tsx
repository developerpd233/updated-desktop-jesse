import { ProfileColumns, ProxiesColumns, OrderColumns, TaskColumns } from '../Interface'

export const profileColumns: ProfileColumns[] = [
    {
        id: 'name',
        label: 'Name',
        minWidth: 170,
        textTransform: 'capitalize'
    },
    {
        id: 'email',
        label: 'Email',
        minWidth: 100,
        textTransform: 'lowercase'
    },
    {
        id: 'creditCard',
        label: 'Credit Card',
        minWidth: 100,
        textTransform: 'lowercase'
    },
    {
        id: 'expire',
        label: 'Expire',
        minWidth: 100,
        textTransform: 'capitalize'
    },
    {
        id: 'action',
        label: 'Action',
        minWidth: 10,
        textTransform: 'capitalize'
    }
];

export const proxiesolumns: ProxiesColumns[] = [
  {
    id: 'proxy',
    label: 'Proxy',
    minWidth: 100,
    textTransform: 'capitalize'
  },
  {
    id: 'name',
    label: 'Name',
    minWidth: 100,
    textTransform: 'capitalize'
},
  {
    id: 'status',
    label: 'Status',
    minWidth: 100,
    textTransform: 'capitalize'
  },
  {
    id: 'action',
    label: 'Action',
    minWidth: 100
  },
];

export const orderColumns: OrderColumns[] = [
  {
    id: 'image',
    label: 'Product Image',
    minWidth: 100
  },
  {
    id: 'name',
    label: 'Name',
    minWidth: 100
  },
  {
    id: 'description',
    label: 'Description',
    minWidth: 100
  },
  {
    id: 'price',
    label: 'Price',
    minWidth: 100
  },
  {
    id: 'quantity',
    label: 'Quantity',
    minWidth: 100
  },
  {
    id: 'action',
    label: 'Action',
    minWidth: 10
  },
]

export const taskColumns: TaskColumns[] = [
  {
    id: 'storeName',
    label: 'Store Name',
    minWidth: 100,
    textTransform: 'capitalize'
  },
  {
    id: 'productName',
    label: 'Product Name',
    minWidth: 100,
    textTransform: 'capitalize'
  },
  {
    id: 'dateTime',
    label: 'Start Date & End Date',
    minWidth: 100,
    textTransform: 'capitalize'
  },
  {
    id: 'quantity',
    label: 'Quantity',
    minWidth: 100,
    textTransform: 'capitalize'
  },
  {
    id: 'profileName',
    label: 'Profile Name',
    minWidth: 100,
    textTransform: 'capitalize'
  },
  {
    id: 'proxy',
    label: 'Proxy',
    minWidth: 100,
    textTransform: 'capitalize'
  },
  {
    id: 'status',
    label: 'Status',
    minWidth: 100,
    textTransform: 'capitalize'
  },
  {
    id: 'action',
    label: 'Action',
    minWidth: 10,
    textTransform: 'capitalize'
  },
]
