import { combineReducers } from "redux"
import GetAllTaskReducer from './task/allTask'
import AddNewTaskReducer from './task/newTask'
import GetTaskReducer from './task/getTask'
import UpdateTaskReducer from './task/updateTask'
import DeleteTaskReducer from './task/deleteTask'

import GetAllOrderReducer from './order/allOrders'

import GetAllProfileReducer from './profile/allProfile'
import AddNewProfileReducer from './profile/newProfile'
import GetProfileReducer from './profile/getProfile'
import UpdateProfileReducer from './profile/updateProfile'
import DeleteProfileReducer from './profile/deleteProfile'

import GetAllStoreReducer from './store/allStore'

import GetAllProxyReducer from './proxy/allProxy'
import AddNewProxyReducer from './proxy/newProxy'
import DeleteProxyReducer from './proxy/deleteProxy'
import GetProxyReducer from './proxy/getProxy'
import UpdateProxyReducer from './proxy/updateProxy'

import GetProfileSettingReducer from './settings/getProfile'

import LoginReducer from './login'



export const rootReducer = combineReducers({
  getAllTaskReducer: GetAllTaskReducer,
  addNewTaskReducer: AddNewTaskReducer,
  getTaskReducer: GetTaskReducer,
  updateTaskReducer: UpdateTaskReducer,
  deleteTaskReducer: DeleteTaskReducer,

  getAllOrderReducer: GetAllOrderReducer,

  getAllProfileReducer: GetAllProfileReducer,
  addNewProfileReducer: AddNewProfileReducer,
  getProfileReducer: GetProfileReducer,
  updateProfileReducer: UpdateProfileReducer,
  deleteProfileReducer: DeleteProfileReducer,

  getAllStoreReducer: GetAllStoreReducer,

  getAllProxyReducer: GetAllProxyReducer,
  addNewProxyReducer: AddNewProxyReducer,
  deleteProxyReducer: DeleteProxyReducer,
  getProxyReducer: GetProxyReducer,
  updateProxyReducer: UpdateProxyReducer,

  getProfileSettingReducer: GetProfileSettingReducer,

  loginReducer: LoginReducer
})

export type RootState = ReturnType<typeof rootReducer>
