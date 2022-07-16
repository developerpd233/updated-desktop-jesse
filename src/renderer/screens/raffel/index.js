import { Box, Grid ,Button, Typography} from '@mui/material';
import BackgroundImage from '../../assets/bg.png'
import { CssGradientButton } from '../../components/Button'
import { useHistory } from "react-router-dom"
import TableComponent from '../../components/Table'
import { taskColumns } from '../../constant/Columns'
import { TaskTableData } from '../../constant/Interface'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from "react-redux"
import { taskList, deleteTask } from '../../redux/actions/task-action'
import { useState, useEffect } from 'react'
import { RootState } from 'renderer/redux/reducers'
import Loader from "react-loader-spinner"
import Notifications from '../../components/Notifications'
import ConfirmDialog from '../../components/ConfirmDialogbox'
import Logo from '../../assets/logo.png'

const Raffal = () => {
  // const [rows, setRows] = useState<TaskTableData[]>([])
  // const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
  // const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '', onConfirm: () => { } })

  // let history = useHistory()
  // const dispatch = useDispatch()
  // const { getAllTaskReducer } = useSelector((state: RootState) => {
  //   return state
  // })



  // const createData = (id: number, storeName: string, productName: string, dateTime: any, quantity: number, profileName: string, proxy: string, status: string, action: any): TaskTableData => {
  //   return { id, storeName, productName, dateTime, quantity, profileName, proxy, status, action };
  // }

  // const createNewTask = () => {
  //   sessionStorage.removeItem('taskId')
  //   history.push('/new-task')
  // }

  return (
    <Box display={'flex'} justifyContent={'flex-start'} flexDirection={'column'} sx={{ maxWidth: '100vw', height: '100vh', color: 'secondary.main', backgroundImage: `url(${BackgroundImage})`, padding: '20px 20px' }}>
   <Typography sx={{marginTop:"171px",fontSize:"70px",textAlign:'center'}}>coming soon</Typography>
    </Box>
  )
}

export default Raffal;
