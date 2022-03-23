import  {useState, useEffect} from 'react'
import { Box, Grid, FormControl, Button, MenuItem, FormHelperText } from '@mui/material';
import BackgroundImage from '../../../assets/bg.png'
import { CustomTextField } from '../../../components/Textfield'
import { createNewProxy, getProxyRecord, updateProxy } from '../../../redux/actions/proxy-action'
import { useDispatch, useSelector } from "react-redux"
import { RootState } from 'renderer/redux/reducers'
import { useHistory } from "react-router-dom"
import Notifications from '../../../components/Notifications'
import ConfirmDialog from '../../../components/ConfirmDialogbox'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { makeStyles } from '@mui/styles'
import Loader from "react-loader-spinner"
import { statusData } from '../../../constant/Dropdown/taskStatus'
import { useStyles } from '../../../constant/customStyles'

let initialState = {
  name: '',
  proxy: '',
  status: '1'
}

let errorObject: any = {}

const NewProxyScreen= ()=> {
  const [values, setValues] = useState(initialState)
  const [notify, setNotify] = useState({isOpen: false, message:'', type:''})
  const [confirmDialog, setConfirmDialog] = useState({isOpen: false, title: '', subTitle: '', onConfirm: () => {}})
  const [flag, setFlag] = useState(false)

  const classes = useStyles()
  let history = useHistory()
  const dispatch = useDispatch()
  const { addNewProxyReducer } = useSelector((state: RootState) => {
    return state
  })

  const handleStatusChange = (event: SelectChangeEvent) => {
    setValues({ ...values, status: event.target.value })
  }

  const handleDataChange = (e: any) => {
    e.preventDefault()
    setValues({ ...values, [e.target.name]: e.target.value})
    if (errorObject && errorObject[e.target.name] && e.target.value) {
      errorObject[e.target.name] = ''
    }
  }

  const onSubmit = async (e: any) => {
    e.preventDefault()
    errorObject = {}
    for (let [key, value] of Object.entries(values)) {
      if (value.length === 0) {
        errorObject[key] = `Please enter a ${key.replace(/([a-z])([A-Z])/g, '$1 $2')} value`
        setFlag(!flag)
      }
    }
    if (Object.entries(errorObject).length === 0) {
      let data: any = {
        name: values.name,
        proxy: values.proxy,
        status: values.status
      }

      let result: any = await dispatch(createNewProxy(data))
      if (result.type === 'PROXY_CREATE_SUCCESS') {
        setNotify({
          isOpen: true,
          message: 'New Proxy Add Successfully',
          type: 'success'
        })
        setTimeout(() => {
          history.push('/proxies')
        }, 2000)
      }
      else if (result.type === 'PROXY_CREATE_ERROR') {
        console.log('result', result)
      }
    }
  }

  const onUpdate = async (e: any) => {
    e.preventDefault()
    errorObject = {}
    for (let [key, value] of Object.entries(values)) {
      if (value.length === 0) {
        errorObject[key] = `Please enter a ${key.replace(/([a-z])([A-Z])/g, '$1 $2')} value`
        setFlag(!flag)
      }
    }
    if (Object.entries(errorObject).length === 0) {
      let record: any = {
        name: values.name,
        proxy: values.proxy,
        status: values.status
      }
      record._method = 'PATCH'
      let result: any = await dispatch(updateProxy(record,sessionStorage.getItem('proxyId')))
      if (result.type === 'PROXY_UPDATE_SUCCESS') {
        setNotify({
          isOpen: true,
          message: 'Update Proxy Successfully',
          type: 'success'
        })
        setTimeout(() => {
          history.push('/proxies')
        }, 2000)
      }
      else if (result.type === 'PROXY_UPDATE_ERROR') {
        console.log('result', result)
      }
    }
  }

  const fetchData = async () => {
    let result: any = await dispatch(getProxyRecord(sessionStorage.getItem('proxyId')))
    if(result.type === 'PROXY_LIST_SUCCESS') {
      setValues({
        name: result.response.data.data && result.response.data.data.name,
        proxy: result.response.data.data && result.response.data.data.proxy,
        status: result.response.data.data && result.response.data.data.status
      })
    }
    else if(result.type === 'PROXY_LIST_ERROR') {
      console.log('result', result)
    }
  }

  useEffect(() => {
    if(!!sessionStorage.getItem('proxyId')) {
      fetchData()
    }
  }, [])


  return (
    <Box sx={{ display:'flex', alignItems:'center', maxWidth:'100vw',  height:'calc(100vh - 160px)', maxHeight:'80%', color: 'secondary.main', backgroundImage:`url(${BackgroundImage})`, padding:'20px 20px' }}>
      <Grid container columnSpacing={1} sx={{marginBottom:5}} display={'flex'} justifyContent={'center'} alignItems={'center'}>
        <Grid item xs={12} sm={12} md={7} lg={7} columnSpacing={1} sx={{marginTop:4}}>
          <Box sx={{ width: '100%', typography: 'body1',background: 'rgba(0, 0, 0, .4)', padding:'0px 0px 2px', borderRadius:2 }}>
          {!addNewProxyReducer.loading ?
            <Grid container columnSpacing={3} sx={{marginBottom:5, paddingLeft:2, paddingRight:2}}>
              <Grid item xs={12} sm={12} lg={12} md={12}>
                <Box sx={{  fontFamily:'roboto', fontWeight:700, color: '#C67B4D', fontSize:14, marginTop:1, marginBottom:1 }}>New Proxy</Box>
              </Grid>
              <Grid item xs={12} sm={12} lg={12} md={12}>
                <Box sx={{marginBottom:3}}>
                  <CustomTextField name='name' value={values.name} onChange={handleDataChange}  size="small" fullWidth  placeholder={'Proxy Title'} InputProps={{ style: {  color: '#fff'} }} />
                  {errorObject && errorObject['name'] !== '' ? <FormHelperText className="form-error-text" style={{color:'red'}}>{errorObject['name']}</FormHelperText> : ""}
                </Box>
                <Box sx={{marginBottom:3}}>
                  <CustomTextField name='proxy' value={values.proxy} onChange={handleDataChange}  size="small" fullWidth  placeholder={'Proxy Name'} InputProps={{ style: {  color: '#fff'} }} />
                  {errorObject && errorObject['proxy'] !== '' ? <FormHelperText className="form-error-text" style={{color:'red'}}>{errorObject['proxy']}</FormHelperText> : ""}
                </Box>
                <Box sx={{marginBottom:3}}>
                  <FormControl fullWidth>
                    <Select value={values.status} placeholder='Status' onChange={handleStatusChange} size='small' MenuProps={{ classes: { paper: classes.select } }} inputProps={{classes:{icon: classes.icon}}} className={classes.root}>
                      {statusData.map((data:any, index:number)=> {
                        return(
                          <MenuItem value={data.value} key={index++}>{data.name}</MenuItem>
                        )
                      })}
                    </Select>
                  </FormControl>
                </Box>
              </Grid>
              <Grid item xs={12} sm={12} lg={12} md={12} display={'flex'} justifyContent={'flex-end'}>
                <Button onClick={!!sessionStorage.getItem('proxyId') ? onUpdate : onSubmit} variant="contained" sx={{borderRadius:30, textTransform:'capitalize', padding:'5px 50px', background:'linear-gradient(to right, #DA792D, #AC609E)',}}>
                  Save
                </Button>
              </Grid>
            </Grid>
            :
            <Box sx={{ paddingTop:5, paddingLeft:2, paddingRight:10, display:'flex', justifyContent:'center', alignItems:'center', width:'100%', height:'80vh'}}>
              <Loader type="Bars" color="#DA792D" height={80} width={80}  />
            </Box>
          }
          </Box>
        </Grid>
      </Grid>
      <Notifications notify={notify} setNotify={setNotify } />
      <ConfirmDialog confirmDialog={confirmDialog} setConfirmDialog={setConfirmDialog } />
    </Box>
  )
}

export default NewProxyScreen
