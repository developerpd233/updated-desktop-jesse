import { Box, Grid } from '@mui/material';
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


const TaskScreen = () => {
  const [rows, setRows] = useState<TaskTableData[]>([])
  const [notify, setNotify] = useState({isOpen: false, message:'', type:''})
  const [confirmDialog, setConfirmDialog] = useState({isOpen: false, title: '', subTitle: '', onConfirm: () => {}})

  let history = useHistory()
  const dispatch = useDispatch()
  const { getAllTaskReducer } = useSelector((state: RootState) => {
    return state
  })

  console.log(getAllTaskReducer , 'getAllTaskReducer');
  const handleRedirect = (id: any) => {
    sessionStorage.setItem('taskId', id);
    history.push(`/new-task/${id}`)
  }
  
  

  const handleDelete = async(id: any) => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false
    })
    let result: any = await dispatch(deleteTask(id))
    if (result.type === 'TASK_DELETE_SUCCESS') {
      setNotify({
        isOpen: true,
        message: 'Deleted Successfully',
        type: 'error'
      })
      fetchMyAPI()
    }
    else if (result.type === 'TASK_DELETE_ERROR') {
    }
  }


  async function fetchMyAPI() {
    let result: any = await dispatch(taskList())
    if (result.type === 'TASK_LIST_SUCCESS') {
      const row: any = [];
      let obj: any = {}
      result.response.data.data?.map((data: any, index: number) => {
        obj = createData(index++,data.store && data.store?.name, data.product_name && data.product_name, <div>{data.start_time}<br/>{data.end_time}</div>,
          data.quantity, data.profile && data.profile.name, data.proxy && data.proxy.proxy,
          data.status === '1' ? 'Enabled' : 'Disabled',
        <Box display="flex" flexDirection="row" justifyContent="space-around">
          <Grid container>
            <Grid item xs={12} md={6}>
              <Box onClick={() => handleRedirect(data.id)} style={{cursor: 'pointer'}}><FontAwesomeIcon icon={faEdit} size="1x" /></Box>
            </Grid>
            <Grid item xs={12} md={6}>
            <Box onClick={() => {
              setConfirmDialog({
                isOpen: true,
                title: 'Are You Sure to Delete?',
                subTitle: "You can't undo this operation",
                onConfirm: () => {  handleDelete(data.id) }
              })
              }} style={{cursor: 'pointer'}}><FontAwesomeIcon icon={faTrashAlt} size="1x" /></Box>
            </Grid>
          </Grid>
        </Box>)
        row.push(obj)
      })
      setRows(row)
    }
    else if (result.type === 'TASK_LIST_ERROR') {
      // if (typeof (result.response) === 'string')
      //     setEmpty(result.response)
      // else
      //     setEmpty(result.response.data.messageText.mesg)
    }
  }

  useEffect(() => {
    fetchMyAPI()
  }, [])

  const createData = (id: number, storeName: string, productName: string, dateTime: any, quantity: number, profileName: string, proxy: string, status: string, action: any): TaskTableData => {
    return { id, storeName, productName, dateTime, quantity, profileName, proxy, status, action };
  }

  const createNewTask = () => {
    sessionStorage.removeItem('taskId')
    history.push('/new-task')
  }

  return (
    <Box display={'flex'} justifyContent={'flex-start'} flexDirection={'column'} sx={{ maxWidth:'100vw',  height:'calc(100vh - 128px)', color: 'secondary.main', backgroundImage:`url(${BackgroundImage})`, padding:'20px 20px' }}>
      <Box display={'flex'} justifyContent={'flex-end'} flexDirection={'row'}>
        <Grid container item xs={12} sm={12} md={12} lg={12} alignItems="center" justifyContent="flex-end" direction="row" sx={{}}>
          <Box sx={{marginRight:2}}>
            <CssGradientButton type="submit">Export</CssGradientButton>
          </Box>
          <Box sx={{marginRight:2}}>
            <CssGradientButton type="submit">Import</CssGradientButton>
          </Box>
          <Box>
            <CssGradientButton type="submit" onClick={createNewTask}>New Task</CssGradientButton>
          </Box>
        </Grid>
      </Box>
      <Box sx={{ display:'flex', justifyContent:'center', alignItems:'center', marginTop:10}}>
        <TableComponent columns={taskColumns} rows={rows} loader={getAllTaskReducer?.loading} />
      </Box>
      {/* {!getAllTaskReducer.loading ?
        <Box sx={{ display:'flex', justifyContent:'center', alignItems:'center', marginTop:10}}>
          <TableComponent columns={taskColumns} rows={rows} />
        </Box> :
        <Box sx={{ display:'flex', justifyContent:'center', alignItems:'center', width:'100%', height:'80vh'}}>
          <Loader type="Bars" color="#DA792D" height={80} width={80}  />
        </Box>
      } */}
      <Notifications notify={notify} setNotify={setNotify } />
      <ConfirmDialog confirmDialog={confirmDialog} setConfirmDialog={setConfirmDialog } />
    </Box>
  )
}

export default TaskScreen
