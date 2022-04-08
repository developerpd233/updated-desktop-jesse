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

const StartScreen = () => {
  // const [rows, setRows] = useState<TaskTableData[]>([])
  const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '', onConfirm: () => { } })
  const [but, setbut]=useState(true)
  const handleClick=()=>{
    setbut(!but)
  }
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
     <Box  display={'flex'} >
     <Box display={'flex'} sx={{width:"50%"}} justifyContent={'flex-start'} >
     <Typography sx={{fontSize:"70px",textTransform:"capitalize"}} >Hi {sessionStorage.getItem("name")}</Typography> 
      </Box>
      <Box display={'flex'} sx={{width:"50%"}} justifyContent={'flex-end'} flexDirection={'row'}>
        <img src={Logo}  />
      </Box>
    
     </Box>
     <Box sx={{ display: 'flex', flexDirection:"column", justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
    {but? <Button onClick={handleClick} sx={{backgroundColor:"#d4763d",fontWeight:900,borderRadius:"10px",padding:"13px 40px 13px 40px",margin:"0 0 37px 0",'&:hover': {
      background: "#d4763d",
    }}} >start All task</Button> :  <Button onClick={handleClick} sx={{backgroundColor:"#d4763d",fontWeight:900,borderRadius:"10px",padding:"13px 40px 13px 40px",'&:hover': {
      background: "#d4763d",
    }}} >Stop All task</Button>}   
      
      </Box>

      <Notifications notify={notify} setNotify={setNotify} />
      <ConfirmDialog confirmDialog={confirmDialog} setConfirmDialog={setConfirmDialog} />
    </Box>
  )
}

export default StartScreen;
