export interface TableInterface {
  columns: any,
  rows: any,
  page?: any,
  rowsPerPage?: any,
  loader?: any
}

export interface TabsInterface {
  tabs: any
  tabsPanel?: any,
}

export interface BillingInfo {
  id?: any
}

// export interface ProfileInterface {
//   record?: any
// }

export interface UserInfo {
  newRecord?: any
}

export interface NotificationInterface {
  notify: any,
  setNotify: any
}
export interface ConfirmDialogInterface {
  confirmDialog?: any,
  setConfirmDialog?: any,
}

export interface ConfirmDialogOrderInterface {
  confirmDialog?: Object,
  setConfirmDialog?: any,
}

export interface ProfileColumns {
  id: 'name' | 'email' | 'creditCard' | 'expire' | 'action',
  label: string,
  minWidth?: number,
  align?: 'right',
  textTransform?: string,
  format?: (value: number) => string,
}

export interface ProfileData {
  nick_name: string,
  name: string,
  lastname: string,
  email: string,
  address: string,
  address_2: string,
  country: string,
  state: string,
  city: string,
  phone: string,
  zip: number,
  card_no: string,
  expire: any,
  cvv: string,
  card_owner_name: string
}

export interface ProfileTableData {
  id: number,
  name: string,
  email: string,
  creditCard: string,
  expire: any,
  action: any
}

export interface OrderColumns {
  id: 'image' | 'name' | 'description' | 'price' | 'quantity' | 'action',
  label: string,
  minWidth?: number,
  align?: 'right',
  format?: (value: number) => string,
}

export interface OrderData {
  id: number,
  image: any,
  name: string,
  description: string,
  price: number,
  quantity: number,
  action: any
}

export interface ProxiesColumns {
  id: 'proxy' | 'name' | 'status' | 'action',
  label: string,
  minWidth?: number,
  align?: 'right',
  textTransform?: string,
  format?: (value: number) => string,
}

export interface ProxyData {
  name: any,
  proxy: any,
  status: any
}

export interface ProxiesTableData {
  id: number,
  proxy: any,
  name: string,
  status: any,
  action: any,
}

export interface TaskData {
  store_id: number,
  site: string,
  product: string,
  product_name: string,
  quantity: string,
  status: string,
  profile_id: number,
  proxy_id: number,
  start_time: any,
  end_time: any,
  task_status: number,
  login_status: string,
  task_type: number,
  username: string,
  password: string,
  checkout: number,
  discount_code: string,
  password_page: string,
  task_name: string,
  colors: string,
  sizes: string
}


export interface EmailSend {
  email: string,

}

export interface TaskTableData {
  id: number,
  storeName: string,
  productName: string,
  dateTime: any,
  quantity: number,
  profileName: string,
  proxy: string,
  status: string,
  taskStatus:string,
  processingStatus: string,
  action: any
}

export interface TaskColumns {
  id: 'storeName' | 'productName' | 'dateTime' | 'quantity' | 'profileName' | 'proxy'  | 'status' |'taskStatus'| 'processingStatus' | 'action' 
  label: string,
  minWidth?: number,
  align?: 'right',
  textTransform?: string,
  format?: (value: number) => string,
}
export interface SettingeData {

  name: string,
  email: string,
  country: string,
  state: string,
  phone_number: string,
  zip: string,
}