import { Box, Button, Typography } from '@mui/material';
import BackgroundImage from '../../assets/bg.png'
import { useDispatch } from "react-redux"
import { tasksallexistsuser } from '../../redux/actions/task-action'
import { useState, useEffect } from 'react'
import Notifications from '../../components/Notifications'
import ConfirmDialog from '../../components/ConfirmDialogbox'
import Logo from '../../assets/logo.png'
import { baseURL } from '../../constant/url'
const axios = require("axios")
import { getProfileRecord } from '../../redux/actions/setting-action';
import Loader from "react-loader-spinner"

const StartScreen = () => {
  const dispatch = useDispatch();
  const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '', onConfirm: () => { } })
  const [but, setbut] = useState(true)
  const [name, setUserName] = useState("");
  const [loader, setLoader] = useState(false);

  const handleClick = async () => {
    setLoader(true)
    setbut(!but)
    let result: any = await dispatch(tasksallexistsuser())
    var allTasks = result.response.data.data;

    for (var i in allTasks) {
      let obj = { task_status: "start" }
      let url = `${baseURL}tasks/${allTasks[i].id}`;
      console.log(url, 'url');

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

      }).catch((error: any) => {
        console.log(error, 'error')
        if (error.message === "Network Error") {

        }
        if (error.response.status === 401) {

        }
      })
      // }
    }
    setbut(true)
    setLoader(false)
  }

  useEffect(() => {
    fetchMyAPI()

  }, [])


  async function fetchMyAPI() {
    let result: any = await dispatch(getProfileRecord())
    console.log(result, 'resukt');

    // setUserName(result.response.data.data.name);

  }


  return (
    <Box display={'flex'} justifyContent={'flex-start'} flexDirection={'column'} sx={{ maxWidth: '100vw', height: '100vh', color: 'secondary.main', backgroundImage: `url(${BackgroundImage})`, padding: '20px 20px' }}>
      <Box display={'flex'} >
        <Box display={'flex'} sx={{ width: "50%" }} justifyContent={'flex-start'} >
          <Typography sx={{ fontSize: "70px", textTransform: "capitalize" }} >Hi {name}</Typography>
        </Box>
        <Box display={'flex'} sx={{ width: "50%" }} justifyContent={'flex-end'} flexDirection={'row'}>
          <img src={Logo} />
        </Box>

      </Box>
      <Box sx={{ display: 'flex', flexDirection: "column", justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
        {but ? <Button onClick={handleClick} sx={{
          backgroundColor: "#d4763d", fontWeight: 900, borderRadius: "10px", padding: "13px 40px 13px 40px", margin: "0 0 37px 0", '&:hover': {
            background: "#d4763d",
          }
        }} >start All task</Button> :
          <Button onClick={handleClick} sx={{
            backgroundColor: "#d4763d", fontWeight: 900, borderRadius: "10px", padding: "13px 40px 13px 40px", '&:hover': {
              background: "#d4763d",
            }
          }} >Stop All task</Button>}

        {loader ?
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
            <Loader type="Bars" color="#DA792D" height={80} width={80} />
          </Box> : null}

      </Box>

      <Notifications notify={notify} setNotify={setNotify} />
      <ConfirmDialog confirmDialog={confirmDialog} setConfirmDialog={setConfirmDialog} />
    </Box>
  )
}

export default StartScreen;
