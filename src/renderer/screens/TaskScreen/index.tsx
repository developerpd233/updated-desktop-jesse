import { Box, Button, Grid } from '@mui/material';
import BackgroundImage from '../../assets/bg.png'
import { CssGradientButton, StartTaskButton } from '../../components/Button'
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
import Notifications from '../../components/Notifications'
import ConfirmDialog from '../../components/ConfirmDialogbox'
import moment from 'moment';
import { baseURL } from '../../constant/url'
const axios = require("axios")

const TaskScreen = () => {

  const [rows, setRows] = useState<TaskTableData[]>([])
  const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '', onConfirm: () => { } })
  const [file, setfile] = useState()
  let history = useHistory()
  const dispatch = useDispatch()
  const [loader, setLoader] = useState(false)

  const { getAllTaskReducer } = useSelector((state: RootState) => {
    return state
  })

  const handleRedirect = (id: any) => {
    sessionStorage.setItem('taskId', id);
    history.push(`/new-task/${id}`)
  }

  console.log(rows, 'rows');


  const handleDelete = async (id: any) => {
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

  const taskStart = async (id: any) => {
    setLoader(true)
    let obj = { task_status: "start" }
    let url = `${baseURL}tasks/${id}`;
    // console.log(url, 'url');

    // if (allTasks[i].task_end !== "end" || allTasks[i].task_failed === "failed" || allTasks[i].task_failed === "start") {
    axios({
      method: "PUT",
      url: url,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem('token')}`
      },
      data: obj,
    }).then((response: any) => {
      console.log(response, 'response');
      setLoader(false)

    }).catch((error: any) => {
      console.log(error, 'error')
      setLoader(false)
      if (error.message === "Network Error") {

      }
      if (error.response.status === 401) {

      }
    })
  }


  async function fetchMyAPI() {
    let result: any = await dispatch(taskList())
    if (result.type === 'TASK_LIST_SUCCESS') {
      const row: any = [];
      let obj: any = {}
      result.response.data.data?.map((data: any, index: number) => {
        obj = createData(index++, data.store && data.store?.name, data.product_name && data.product_name,
          <div>{moment(data.start_time).format("Do MMM YY")}<br /> to {moment(data.end_time).format("Do MMM YY")}</div>,
          data.quantity, data.profile && data.profile.name, data.proxy && data.proxy.proxy,
          data.status === '1' ? 'Enabled' : 'Disabled',
          data?.task_status,
          data?.status,
          <Box display="flex" flexDirection="row" justifyContent="space-around">
            <Grid container>
              <Grid item xs={12} md={4}>
                <Box onClick={() => handleRedirect(data.id)} style={{ cursor: 'pointer' }}><FontAwesomeIcon icon={faEdit} size="1x" /></Box>
              </Grid>
              <Grid item xs={12} md={4}>
                <Box onClick={() => {
                  setConfirmDialog({
                    isOpen: true,
                    title: 'Are You Sure to Delete?',
                    subTitle: "You can't undo this operation",
                    onConfirm: () => { handleDelete(data.id) }
                  })
                }} style={{ cursor: 'pointer' }}><FontAwesomeIcon icon={faTrashAlt} size="1x" /></Box>
              </Grid>

              <Grid item xs={12} md={4}>
                <Box
                  // onClick={() => {
                  //   setConfirmDialog({
                  //     isOpen: true,
                  //     title: 'Are You Sure to Delete?',
                  //     subTitle: "You can't undo this operation",
                  //     onConfirm: () => { handleDelete(data.id) }
                  //   })
                  // }} 
                  style={{ cursor: 'pointer' }}>
                  {/* <FontAwesomeIcon icon={faTrashAlt} size="1x" /> */}
                  <StartTaskButton type="submit"
                    onClick={() => { taskStart(data.id) }}
                  >Start</StartTaskButton>
                </Box>
              </Grid>
            </Grid>
          </Box>,

          // <Box display="flex" flexDirection="row" justifyContent="space-around">
          //   <Grid container>
          //     <Grid item xs={12} md={6}>
          //       <Box
          //         // onClick={() => handleRedirect(data.id)}
          //         style={{ cursor: 'pointer' }}>
          //       </Box>
          //     </Grid>
          //   </Grid>
          // </Box>


        )
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

  const createData = (id: number, storeName: string, productName: string, dateTime: any, quantity: number, profileName: string, proxy: string, status: string, taskStatus: string, processingStatus: string, action: any): TaskTableData => {
    return {
      id, storeName, productName, dateTime, quantity, profileName, proxy, status,
      taskStatus,
      processingStatus,
      action
    };
  }

  const createNewTask = () => {
    sessionStorage.removeItem('taskId')
    history.push('/new-task')
  }
  const handlercsve = (e) => {
    // setfile()
    console.log("e==>", e[0].name.split('.').pop());
    const ext = e[0].name.split('.').pop();
    if (ext === 'csv') {
      console.log("yehi sahi file he")
    }
    else {
      console.log("yehi galat file he")
    }

  }
  const headers = [
    { label: "id", key: "id" },
    { label: "profileName ", key: "profileName" },
    { label: "proxy ", key: "proxy" },
    { label: "quantity ", key: "quantity" },
    { label: " storeName", key: "storeName" },
    { label: "status", key: "status" }
  ];
  //  const data = [
  //   // { id: , lastName: "Morrow", email: "sokyt@mailinator.com", age: "36" },
  //   { firstName: "Gwendolyn", lastName: "Galloway", email: "weciz@mailinator.com", age: "76" },
  //   { firstName: "Astra", lastName: "Wyatt", email: "quvyn@mailinator.com", age: "57" },
  //   { firstName: "Jasmine", lastName: "Wong", email: "toxazoc@mailinator.com", age: "42" },
  //   { firstName: "Brooke", lastName: "Mcconnell", email: "vyry@mailinator.com", age: "56" },
  //   { firstName: "Christen", lastName: "Haney", email: "pagevolal@mailinator.com", age: "23" },
  //   { firstName: "Tate", lastName: "Vega", email: "dycubo@mailinator.com", age: "87" },
  //   { firstName: "Amber", lastName: "Brady", email: "vyconixy@mailinator.com", age: "78" },
  //   { firstName: "Philip", lastName: "Whitfield", email: "velyfi@mailinator.com", age: "22" },
  //   { firstName: "Kitra", lastName: "Hammond", email: "fiwiloqu@mailinator.com", age: "35" },
  //   { firstName: "Charity", lastName: "Mathews", email: "fubigonero@mailinator.com", age: "63" }
  // ];
  const csvReport = {
    data: rows,
    headers: headers,
    filename: 'Clue_Mediator_Report.csv'
  };


  return (
    <Box display={'flex'} justifyContent={'flex-start'} flexDirection={'column'} sx={{ maxWidth: '100vw', height: '100vh', color: 'secondary.main', backgroundImage: `url(${BackgroundImage})`, padding: '20px 20px' }}>
      <Box display={'flex'} justifyContent={'flex-end'} flexDirection={'row'}>
        <Grid container item xs={12} sm={12} md={12} lg={12} alignItems="center" justifyContent="flex-end" direction="row" sx={{}}>
          {/* <Box sx={{marginRight:2}}>
          <CssGradientButton variant="contained" component="label"> <CSVLink  {...csvReport}>Export</CSVLink> </CssGradientButton>
 
          </Box> */}
          {/* <Box sx={{marginRight:2}}>
            <CssGradientButton variant="contained" component="label"> <input type="file" hidden accept='.csv' onChange={(e)=>handlercsve(e.target.files)} />Import</CssGradientButton>
          </Box> */}
          <Box>
            <CssGradientButton type="submit" onClick={createNewTask}>New Task</CssGradientButton>
          </Box>
        </Grid>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
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
      <Notifications notify={notify} setNotify={setNotify} />
      <ConfirmDialog confirmDialog={confirmDialog} setConfirmDialog={setConfirmDialog} />
    </Box>
  )
}

export default TaskScreen
