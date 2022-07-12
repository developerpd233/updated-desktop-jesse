import { CustomTextField } from '../../components/Textfield'
import { Grid, Box, Divider, FormControlLabel, Typography, Button, Stack, RadioGroup, FormControl, FormHelperText } from '@mui/material'
import CropSquareIcon from '@mui/icons-material/CropSquare'
import SquareIcon from '@mui/icons-material/Square'
import {IOSSwitch} from '../../components/Switch'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import {StyledRadio} from '../../components/RadioButton'
import {useState, useEffect} from 'react'
import { MenuItem } from '@mui/material'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import {createNewTask, updateTask, getTaskRecord} from '../../redux/actions/task-action'
import { useDispatch, useSelector } from "react-redux"
import { RootState } from 'renderer/redux/reducers'
import moment from 'moment'
import {profileList} from '../../redux/actions/profile-action'
import {proxyList} from '../../redux/actions/proxy-action'
import { useHistory } from "react-router-dom"
import Loader from "react-loader-spinner"
import { BillingInfo } from '../../constant/Interface'
import { useStyles } from '../../constant/customStyles'
import { storeData } from '../../constant/Dropdown/store'
import { statusData } from '../../constant/Dropdown/taskStatus'

let errorObject: any = {}

let initialState = {
  taskName: '',
  productName: '',
  site: '',
  productLink: '',
  startDate: '',
  endDate: '',
  store: '',
  profile: '',
  proxy: '',
  status: '',
  quantity: '',
  taskTypes: '1',
  loginStatus: 'disabled',
  userName: '',
  userPassword: '',
  checkout: '0',
  discountCode: '',
  loginPage: '',
  color: '',
  size: ''
}

const BillingInfoComponent: React.FC<BillingInfo> = ({id}) => {
  const [flag, setFlag] = useState(false)
  const [profileData, setProfileData] = useState([])
  const [proxyData, setproxyData] = useState([])
  const [values, setValues] = useState(initialState)

  const classes = useStyles()

  let history = useHistory()
  const dispatch = useDispatch()
  const {getAllProfileReducer, getAllProxyReducer, addNewTaskReducer} = useSelector((state: RootState) => {
    return state
  })

  const handleTaskName = (e: any) => {
    setValues({ ...values, taskName: e.target.value })
    if (errorObject && errorObject['taskName'] && e.target.value) {
      errorObject['taskName'] = ''
    }
  }

  const handleProductName = (e: any) => {
    setValues({ ...values, productName: e.target.value })
    if (errorObject && errorObject['productName'] && e.target.value) {
      errorObject['productName'] = ''
    }
  }

  const validURL = (str: string) => {
    var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
      '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return !!pattern.test(str);
  }

  const handleProductLink = (e: any) => {
    setValues({ ...values, productLink: e.target.value })
    if(validURL(e.target.value)) {
      if (errorObject && errorObject['productLink'] && e.target.value) {
        errorObject['productLink'] = ''
      }
    }
    else
      errorObject['productLink'] = 'This is not a link'
  }

  const handleStartDate = (e: any) => {
    setValues({ ...values, startDate: e.target.value })
    if (errorObject && errorObject['startDate'] && e.target.value) {
      errorObject['startDate'] = ''
    }
  }

  const handleEndDate = (e: any) => {
    setValues({ ...values, endDate: e.target.value })
    if (errorObject && errorObject['endDate'] && e.target.value) {
      errorObject['endDate'] = ''
    }
  }

  const handleStoreChange = (event: SelectChangeEvent) => {
    setValues({ ...values, store: event.target.value })
    if (errorObject && errorObject['store'] && event.target.value) {
      errorObject['store'] = ''
    }
  }

  const handleProfileChange = (event: SelectChangeEvent) => {
    setValues({ ...values, profile: event.target.value })
    if (errorObject && errorObject['profile'] && event.target.value) {
      errorObject['profile'] = ''
    }
  }

  const handleProxyChange = (event: SelectChangeEvent) => {
    setValues({ ...values, proxy: event.target.value })
    if (errorObject && errorObject['proxy'] && event.target.value) {
      errorObject['proxy'] = ''
    }
  }

  const handleStatusChange = (event: SelectChangeEvent) => {
    setValues({ ...values, status: event.target.value })
    if (errorObject && errorObject['status'] && event.target.value) {
      errorObject['status'] = ''
    }
  }

  const handleTaskTypes = (e: any) => {
    setValues({ ...values, taskTypes: e.target.value })
  }

  const handleSiteChange = (e: any) => {
    setValues({ ...values, site: e.target.value})
    if(validURL(e.target.value)) {
      if (errorObject && errorObject['site'] && e.target.value) {
        errorObject['site'] = ''
      }
    }
    else
      errorObject['site'] = 'This is not a link'
  }

  const handleLoginStatus = (e: any) => {
    setValues({ ...values, loginStatus: e.target.checked ? 'enabled' : 'disabled'})
  }

  const handleUserName = (e: any) => {
    setValues({ ...values, userName: e.target.value })
  }

  const handleUserPassword = (e: any) => {
    setValues({ ...values, userPassword: e.target.value })
  }

  const handleCheckout = (e: any) => {
    setValues({ ...values, checkout: e.target.value})
  }

  const handleQuantity = (e: any) => {
    setValues({ ...values, quantity: e.target.value})
    if (errorObject && errorObject['quantity'] && e.target.value) {
      errorObject['quantity'] = ''
    }
  }

  const handleDicountCode = (e: any) => {
    setValues({ ...values, discountCode: e.target.value})
  }

  const handleLoginPage = (e: any) => {
    setValues({ ...values, loginPage: e.target.value})
    if(validURL(e.target.value)) {
      if (errorObject && errorObject['loginPage'] && e.target.value) {
        errorObject['loginPage'] = ''
      }
    }
    else
      errorObject['loginPage'] = 'This is not a link'
  }

  const handleColorChange = (e: any) => {
    setValues({ ...values, color: e.target.value})
  }

  const handleSizeChange = (e: any) => {
    setValues({ ...values, size: e.target.value})
  }

  const getProfile = async () => {
    let result: any = await dispatch(profileList())
    if (result.type === 'PROFILE_LIST_SUCCESS') {
      setProfileData(result.response.data.data)
    }
    else if (result.type === 'PROFILE_LIST_ERROR') {

    }
  }

  const getProxy = async () => {
    let result: any = await dispatch(proxyList())
    if (result.type === 'PROXY_LIST_SUCCESS') {
      setproxyData(result.response.data.data)
    }
    else if (result.type === 'PROXY_LIST_ERROR') {

    }
  }

  const onUpdate = async (e: any) => {
    e.preventDefault()
    errorObject = {}
    for (let [key, value] of Object.entries(values)) {
      if(key !== 'taskName' && key !== 'loginPage' && key !== 'discountCode' && key !== 'color' && key !== 'size' && key !== 'userPassword' && key !== 'userName'  && key !== 'site') {
        if(value.length === 0) {
          if(key === 'productName' || key === 'productLink' || key === 'quantity')
            errorObject[key] = `Please enter a ${key.replace(/([a-z])([A-Z])/g, '$1 $2')} value`
          else
            errorObject[key] = `Please Select a ${key.replace(/([a-z])([A-Z])/g, '$1 $2')} value`
          setFlag(!flag)
        }
      }
    }

    if (Object.entries(errorObject).length === 0) {
      let data:any = {
        store_id: parseInt(values.store),
        site: values.site,
        product: values.productLink,
        product_name: values.productName,
        quantity: parseInt(values.quantity),
        status: values.status,
        profile_id: parseInt(values.profile),
        proxy_id: parseInt(values.proxy),
        start_time: moment(values.startDate).format("YYYY-MM-DD HH:mm:ss"),
        end_time: moment(values.endDate).format("YYYY-MM-DD HH:mm:ss"),
        task_status: values.status,
        login_status: values.loginStatus,
        task_type: parseInt(values.taskTypes),
        username: values.userName,
        password: values.userPassword,
        checkout: parseInt(values.checkout),
        discount_code: values.discountCode,
        password_page: values.loginPage,
        task_name: values.taskName,
        colors: values.color,
        sizes: values.size,
        _method: 'PATCH'
      }

      let result: any = await dispatch(updateTask(data, id))
      if (result.type === 'TASK_UPDATE_SUCCESS') {
        history.push('/task')
      }
      else if (result.type === 'TASK_UPDATE_ERROR') {
        console.log('result', result)
      }
    }
  }
 const handleTo=()=>{
   history.push('/task')
 }

  const onSubmit = async (e:any) => {
    e.preventDefault()
    errorObject = {}
    for (let [key, value] of Object.entries(values)) {
      if (value.length === 0 &&  key !== 'loginPage' &&
        key !== 'discountCode' && key !== 'userPassword' && key !== 'userName' && key !== 'color' && key !== 'size'  && key !== 'site'
         && key !== 'startDate' && key !== 'endDate' && key !== 'status'
         ) {
          if(key === 'productName' || key === 'productLink' || key === 'quantity')
            errorObject[key] = `Please enter a ${key.replace(/([a-z])([A-Z])/g, '$1 $2')} value`
          else
            errorObject[key] = `Please Select a ${key.replace(/([a-z])([A-Z])/g, '$1 $2')} value`
        setFlag(!flag)
      }
    }

    if (Object.entries(errorObject).length === 0) {
      let data:any = {
        store_id: parseInt(values.store),
        site: values.site,
        product: values.productLink,
        product_name: values.productName,
        quantity: parseInt(values.quantity),
        status: values.status,
        profile_id: parseInt(values.profile),
        proxy_id: parseInt(values.proxy),
        start_time: values.startDate ? moment(values.startDate).format("YYYY-MM-DD HH:mm:ss"):"" ,
        end_time: values.endDate ? moment(values.endDate).format("YYYY-MM-DD HH:mm:ss") :"",
        // start_time:"",
        // end_time: "",
        task_status: values.status,
        login_status: values.loginStatus,
        task_type: parseInt(values.taskTypes),
        username: values.userName,
        password: values.userPassword,
        checkout: parseInt(values.checkout),
        discount_code: values.discountCode,
        password_page: values.loginPage,
        task_name: values.taskName,
        colors: values.color,
        sizes: values.size,
        // variants: {
        //   size: values.size, //!isNaN(values.size) ? values.size : parseFloat(values.size),
        //   color: values.color
        // }
      }

      let result: any = await dispatch(createNewTask(data))
      if (result.type === 'TASK_CREATE_SUCCESS') {
        console.log("working");
        
        history.push('/task')
      }
      else if (result.type === 'TASK_CREATE_ERROR') {
        console.log('result', result)
      }
    }
  }

  const fetchData = async (id: any) => {
    let result: any = await dispatch(getTaskRecord(id))
    console.log('id', id)

    if(result.type === 'TASK_LIST_SUCCESS') {
      setValues({
        taskName: result.response.data.data && result.response.data.data.task_name,
        productName: result.response.data.data && result.response.data.data.product_name,
        site: result.response.data.data && result.response.data.data.site,
        productLink: result.response.data.data && result.response.data.data.product,
        startDate: result.response.data.data && result.response.data.data.start_time.replace(" ", "T"),
        endDate: result.response.data.data && result.response.data.data.end_time.replace(" ", "T"),
        store: result.response.data.data && result.response.data.data.store_id,
        profile: result.response.data.data && result.response.data.data.profile_id,
        proxy: result.response.data.data && result.response.data.data.proxy_id,
        status: result.response.data.data && result.response.data.data.status,
        quantity: result.response.data.data && result.response.data.data.quantity,
        taskTypes: result.response.data.data && result.response.data.data.task_type,
        loginStatus: result.response.data.data && result.response.data.data.login_status,
        userName: result.response.data.data && result.response.data.data.username,
        userPassword: result.response.data.data && result.response.data.data.password,
        checkout: result.response.data.data && result.response.data.data.checkout,
        discountCode: result.response.data.data && result.response.data.data.discount_code,
        loginPage: result.response.data.data && result.response.data.data.password_page,
        color: result.response.data.data && result.response.data.data.colors,
        size: result.response.data.data &&result.response.data.data.sizes,
      })
      sessionStorage.removeItem('taskId')
      // setData(result.response.data.data)
    }
    else if(result.type === 'TASK_LIST_ERROR') {
      console.log('result', result)
    }
  }


  useEffect(() => {
    errorObject = {}
    getProfile()
    getProxy()
    console.log("Billing info", sessionStorage.getItem('taskId'))
    if(id)
      fetchData(id)
  }, [])

  return(
    <>
      {(getAllProfileReducer.loading && getAllProxyReducer.loading) || addNewTaskReducer.loading ?
      <Box sx={{ paddingTop:5, paddingLeft:2, paddingRight:10, display:'flex', justifyContent:'center', alignItems:'center', width:'100%', height:'80vh'}}>
        <Loader type="Bars" color="#DA792D" height={80} width={80}  />
      </Box>
      :
      <>
      <Grid container columnSpacing={1} sx={{marginBottom:5}}>
        <Grid item xs={12} sm={12} md={6} lg={6} columnSpacing={1} sx={{marginTop:4}}>
          <Grid container display={'flex'} flexDirection={'row'} columnSpacing={1} sx={{marginBottom:1}}>
            <Grid item xs={12} sm={12} lg={6} md={6}>
              <Box sx={{  fontFamily:'roboto', fontWeight:400, color: '#C67B4D', fontSize:12, marginBottom:0.5 }}>Task Name</Box>
              <CustomTextField onChange={handleTaskName} value={values.taskName} size="small" fullWidth InputProps={{ style: {  color: 'white'} }} />
              {errorObject && errorObject['taskName'] !== '' ? <FormHelperText className="form-error-text" style={{color:'red'}}>{errorObject['taskName']}</FormHelperText> : ""}
            </Grid>
            <Grid item xs={12} sm={12} lg={6} md={6}>
              <Box sx={{  fontFamily:'roboto', fontWeight:400, color: '#C67B4D', fontSize:12, marginBottom:0.5 }}>Product Name</Box>
              <CustomTextField onChange={handleProductName} value={values.productName} defaultValue={values.productName} size="small" fullWidth InputProps={{ style: {  color: 'white'} }} />
              {errorObject && errorObject['productName'] !== '' ? <FormHelperText className="form-error-text" style={{color:'red'}}>{errorObject['productName']}</FormHelperText> : ""}
            </Grid>
          </Grid>
          <Grid container display={'flex'} flexDirection={'row'} columnSpacing={1} sx={{marginBottom:1}}>
            <Grid item xs={12} sm={12} lg={12} md={12}>
              <Box sx={{  fontFamily:'roboto', fontWeight:400, color: '#C67B4D', fontSize:12, marginBottom:0.5 }}>Product Link</Box>
              <CustomTextField onChange={handleProductLink} value={values.productLink} size="small" fullWidth InputProps={{ style: {  color: 'white'} }} />
              {errorObject && errorObject['productLink'] !== '' ? <FormHelperText className="form-error-text" style={{color:'red'}}>{errorObject['productLink']}</FormHelperText> : ""}
            </Grid>
          </Grid>
          <Grid container display={'flex'} flexDirection={'row'} columnSpacing={1}>
            <Grid item xs={12} sm={12} lg={6} md={6}>
              <Box sx={{  fontFamily:'roboto', fontWeight:400, color: '#C67B4D', fontSize:12, marginBottom:0.5 }}>Start Date</Box>
              <CustomTextField onChange={handleStartDate} value={values.startDate} type="datetime-local" size='small' fullWidth inputProps={{min: moment(new Date).format("YYYY-MM-DD HH:mm").replace(' ', 'T')}} InputProps={{style:{color:'#fff'}}} />
              {/* {errorObject && errorObject['startDate'] !== '' ? <FormHelperText className="form-error-text" style={{color:'red'}}>{errorObject['startDate']}</FormHelperText> : ""} */}
            </Grid>
            <Grid item xs={12} sm={12} lg={6} md={6}>
              <Box sx={{  fontFamily:'roboto', fontWeight:400, color: '#C67B4D', fontSize:12, marginBottom:0.5 }}>End Date</Box>
              <CustomTextField onChange={handleEndDate} value={values.endDate} id="datetime-local" type="datetime-local" size='small' fullWidth inputProps={{min: values.startDate}} InputProps={{style:{color:'#fff'}}} />
              {/* {errorObject && errorObject['endDate'] !== '' ? <FormHelperText className="form-error-text" style={{color:'red'}}>{errorObject['endDate']}</FormHelperText> : ""} */}
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={12} md={1} lg={1} sx={{display:'flex', justifyContent:'center', alignItems:'center', position:'relative', top:20}}>
          <Divider orientation="vertical" className={classes.divider} />
        </Grid>
        <Grid item xs={12} sm={12} md={5} lg={5} columnSpacing={1}>
          {/* <Box sx={{ typography: 'subtitle2', fontFamily:'roboto', fontWeight:700, color: '#C67B4D', marginBottom:2 }}>100 Thices</Box> */}
            <Grid item xs={12} sm={12} lg={12} md={12} sx={{marginBottom:1}}>
              <Box sx={{  fontFamily:'roboto', fontWeight:400, color: '#fff', marginBottom:0.5, fontSize:12 }}>Store</Box>
                <FormControl fullWidth>
                  <Select value={values.store} onChange={handleStoreChange} size='small' MenuProps={{ classes: { paper: classes.select } }} inputProps={{classes:{icon: classes.icon}}} className={classes.root}>
                    {storeData.map((data:any, index:number)=> {
                      return(
                        <MenuItem value={data.value} key={index++}>{data.name}</MenuItem>
                      )
                    })}
                  </Select>
                </FormControl>
                {errorObject && errorObject['store'] !== '' ? <FormHelperText className="form-error-text" style={{color:'red'}}>{errorObject['store']}</FormHelperText> : ""}
            </Grid>
            <Grid item xs={12} sm={12} lg={12} md={12} sx={{marginBottom:1}}>
              <Box sx={{  fontFamily:'roboto', fontWeight:400, color: '#fff', marginBottom:0.5, fontSize:12 }}>Profile</Box>
                <FormControl fullWidth>
                  <Select value={values.profile} onChange={handleProfileChange} size='small' MenuProps={{ classes: { paper: classes.select } }} inputProps={{classes:{icon: classes.icon}}} className={classes.root}>
                    {profileData.map((data:any, index:number)=> {
                      return(
                        <MenuItem value={data.id} key={index++}>{`${data.name} ${data.lastname}`}</MenuItem>
                      )
                    })}
                  </Select>
                </FormControl>
                {errorObject && errorObject['profile'] !== '' ? <FormHelperText className="form-error-text" style={{color:'red'}}>{errorObject['profile']}</FormHelperText> : ""}
            </Grid>
            <Grid item xs={12} sm={12} lg={12} md={12} sx={{marginBottom:1}}>
              <Box sx={{  fontFamily:'roboto', fontWeight:400, color: '#fff', marginBottom:0.5, fontSize:12 }}>Proxy</Box>
              {/* <CustomizeSelectComponent /> */}
                <FormControl fullWidth>
                  <Select value={values.proxy} onChange={handleProxyChange} size='small' MenuProps={{ classes: { paper: classes.select } }} inputProps={{classes:{icon: classes.icon}}} className={classes.root}>
                    {proxyData.map((data:any, index:number)=> {
                      return(
                        <MenuItem value={data.id} key={index++}>{data.proxy}</MenuItem>
                      )
                    })}
                  </Select>
                </FormControl>
                {errorObject && errorObject['proxy'] !== '' ? <FormHelperText className="form-error-text" style={{color:'red'}}>{errorObject['proxy']}</FormHelperText> : ""}
            </Grid>
            {/* <Grid item xs={12} sm={12} lg={12} md={12} sx={{marginBottom:1}}>
              <Box sx={{  fontFamily:'roboto', fontWeight:400, color: '#fff', marginBottom:0.5, fontSize:12 }}>Task Status</Box> */}
              {/* <CustomizeSelectComponent /> */}
                {/* <FormControl fullWidth>
                  <Select value={values.status} onChange={handleStatusChange} size='small' MenuProps={{ classes: { paper: classes.select } }} inputProps={{classes:{icon: classes.icon}}} className={classes.root}>
                    {statusData.map((data:any, index:number)=> {
                      return(
                        <MenuItem value={data.value} key={index++}>{data.name}</MenuItem>
                      )
                    })}
                  </Select>
                </FormControl>
                {errorObject && errorObject['status'] !== '' ? <FormHelperText className="form-error-text" style={{color:'red'}}>{errorObject['status']}</FormHelperText> : ""}
            </Grid> */}
        </Grid>
      </Grid>
      <br />
      <Divider sx={{background:'#C67B4D', height:1.2}} />
      <Grid container columnSpacing={1} sx={{marginTop:2, marginBottom:5}}>
        <Grid item xs={12} sm={12} md={5} lg={5} columnSpacing={1}>
          <Box sx={{ typography: 'subtitle2', fontFamily:'roboto', fontWeight:700, color: '#C67B4D', marginBottom:1 }}>Task Types</Box>
          <Grid container display={'flex'} flexDirection={'row'} columnSpacing={1}>
            <Grid item xs={12} sm={12} lg={12} md={12}>
              <FormControl component="fieldset">
                <RadioGroup row aria-label="gender" name="row-radio-buttons-group" value={parseInt(values.taskTypes)} onChange={handleTaskTypes}>
                  <FormControlLabel value="1" control={<StyledRadio icon={<CropSquareIcon />} checkedIcon={<SquareIcon />} />} label={<Typography variant="body2" style={{ color: '#fff', fontSize:12 }}>Direct Link</Typography>} className='radios' />
                  <FormControlLabel value="2" control={<StyledRadio icon={<CropSquareIcon />} checkedIcon={<SquareIcon />} />} label={<Typography variant="body2" style={{ color: '#fff', fontSize:12 }}>Keywords</Typography>} />
                  {/* <FormControlLabel value="3" control={<StyledRadio icon={<CropSquareIcon />} checkedIcon={<SquareIcon />} />} label={<Typography variant="body2" style={{ color: '#fff', fontSize:12 }}>Variant</Typography>} /> */}
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12} lg={12} md={12}>
              <Box sx={{  fontFamily:'roboto', fontWeight:400, color: '#C67B4D', fontSize:12, marginBottom:0.5 }}>Site</Box>
              <CustomTextField value={values.site} onChange={handleSiteChange} size="small" fullWidth InputProps={{ style: {  color: 'white'} }} />
              {errorObject && errorObject['site'] !== '' ? <FormHelperText className="form-error-text" style={{color:'red'}}>{errorObject['site']}</FormHelperText> : ""}
            </Grid>
          </Grid>
          <Box sx={{ typography: 'subtitle2', fontFamily:'roboto', fontWeight:700, color: '#C67B4D', marginBottom:2, marginTop:2 }}>Variant</Box>
            <Grid container columnSpacing={1}>
              <Grid item xs={12} sm={12} lg={6} md={6}>
                <Box sx={{  fontFamily:'roboto', fontWeight:400, color: '#C67B4D', fontSize:12, marginBottom:0.5 }}>Color</Box>
                <CustomTextField onChange={handleColorChange} value={values.color} size="small" fullWidth InputProps={{ style: {  color: 'white'} }} />
                {errorObject && errorObject['color'] !== '' ? <FormHelperText className="form-error-text" style={{color:'red'}}>{errorObject['color']}</FormHelperText> : ""}
              </Grid>
              <Grid item xs={12} sm={12} lg={6} md={6}>
                <Box sx={{  fontFamily:'roboto', fontWeight:400, color: '#C67B4D', fontSize:12, marginBottom:0.5 }}>Size</Box>
                <CustomTextField onChange={handleSizeChange} value={values.size} size="small" fullWidth InputProps={{ style: {  color: 'white'} }} />
                {errorObject && errorObject['size'] !== '' ? <FormHelperText className="form-error-text" style={{color:'red'}}>{errorObject['size']}</FormHelperText> : ""}
              </Grid>
            </Grid>
        </Grid>
        <Grid item xs={12} sm={12} md={1} lg={1} display={'flex'} flexDirection={'row'} justifyContent={'center'} alignItems={'center'} sx={{position:'relative', top:20}}>
          <Divider orientation="vertical" className={classes.divider} flexItem />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} columnSpacing={1} display={'flex'} flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'} sx={{marginTop:10}}>
          <Grid item xs={12} sm={12} md={1} lg={1} columnSpacing={1} display={'flex'} flexDirection={'row'} justifyContent={'center'} alignItems={'center'}>
            <Box sx={{ typography: 'subtitle2', fontFamily:'roboto', fontWeight:700, color: '#C67B4D', marginBottom:2, textTransform:'uppercase',marginTop:2 }}>Login</Box>
          </Grid>
          <Grid item xs={12} sm={12} md={1} lg={1} columnSpacing={1}>
            <IOSSwitch onChange={handleLoginStatus} defaultChecked={values.loginStatus === 'enabled' ? true : false} />
          </Grid>
          <Grid item xs={12} sm={12} lg={4} md={4}>
            <CustomTextField onChange={handleUserName} value={values.userName} size="small" fullWidth InputProps={{ style: {  color: 'white', fontSize:14} }} placeholder='username' />
          </Grid>
          <Grid item xs={2} sm={2} lg={4} md={4}>
            <CustomTextField onChange={handleUserPassword} value={values.userPassword} size="small" fullWidth InputProps={{ style: {  color: 'white', fontSize:14} }} placeholder='password' />
          </Grid>
          <Grid item xs={12} sm={12} md={1} lg={1} columnSpacing={1}>
            <Box display={'flex'} flexDirection={'row'}justifyContent={'center'} alignItems={'center'}>
              <Divider orientation="vertical" className={classes.divider} flexItem />
              <ArrowForwardIcon style={{color:'#C67B4D'}} />
            </Box>
          </Grid>
        </Grid>
      </Grid>
      <Divider sx={{background:'#C67B4D', height:1.2}} />
      <Grid container columnSpacing={1} sx={{marginTop:0, marginBottom:0}} display={'flex'} justifyContent={'flex-start'} alignItems={'center'}>
        <Grid item xs={12} sm={12} md={1} lg={1} columnSpacing={1}>
          <Box sx={{ typography: 'subtitle2', fontFamily:'roboto', fontWeight:700, color: '#C67B4D', textTransform:'uppercase' }}>Checkout</Box>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} columnSpacing={1} sx={{marginTop:1}}>
          <FormControl component="fieldset">
            <RadioGroup row aria-label="gender" name="row-radio-buttons-group" value={values.checkout} onChange={handleCheckout}>
              <FormControlLabel value="0" control={<StyledRadio icon={<CropSquareIcon />} checkedIcon={<SquareIcon />} />} label={<Typography variant="body2" style={{ color: '#fff', fontSize:12 }}>Credit Card(Auto)</Typography>} className='radios' />
              <FormControlLabel value="1" control={<StyledRadio icon={<CropSquareIcon />} checkedIcon={<SquareIcon />} />} label={<Typography variant="body2" style={{ color: '#fff', fontSize:12 }}>Paypal (Manual)</Typography>} />
            </RadioGroup>
          </FormControl>
        </Grid>
      </Grid>
      <Divider sx={{background:'#C67B4D', height:1.1}} className='custom-divider' />

      <Grid container columnSpacing={1} sx={{marginTop:2, marginBottom:2}}>
        <Grid item xs={12} sm={12} md={12} lg={12} columnSpacing={1}>
          <Box sx={{ typography: 'subtitle2', fontFamily:'roboto', fontWeight:700, color: '#C67B4D', textTransform:'uppercase' }}>Various</Box>
        </Grid>
        <Grid container columnSpacing={1} sx={{marginTop:1, marginLeft:0.5}}>
          <Grid item xs={12} sm={12} lg={4} md={4} columnSpacing={1} sx={{marginBottom:1}}>
            <Box sx={{  fontFamily:'roboto', fontWeight:400, color: '#C67B4D', fontSize:12, marginBottom:0.5 }}>Quantity</Box>
            <CustomTextField type='number' value={values.quantity} onChange={handleQuantity} inputProps={{ inputMode: 'numeric', pattern: '[1-9]*', min: 1, max:1000 }}   size="small" fullWidth InputProps={{ style: {  color: 'white'} }} />
            {errorObject && errorObject['quantity'] !== '' ? <FormHelperText className="form-error-text" style={{color:'red'}}>{errorObject['quantity']}</FormHelperText> : ""}
          </Grid>
          <Grid item xs={12} sm={12} lg={4} md={4} columnSpacing={1} sx={{marginBottom:1}}>
            <Box sx={{  fontFamily:'roboto', fontWeight:400, color: '#C67B4D', fontSize:12, marginBottom:0.5 }}>Discount Code</Box>
            <CustomTextField size="small" value={values.discountCode} onChange={handleDicountCode}  fullWidth InputProps={{ style: {  color: 'white'} }} />
          </Grid>
          <Grid item xs={12} sm={12} lg={4} md={4} columnSpacing={1} sx={{marginBottom:1}}>
            <Box sx={{  fontFamily:'roboto', fontWeight:400, color: '#C67B4D', fontSize:12, marginBottom:0.5 }}>Login Link</Box>
            <CustomTextField size="small" value={values.loginPage} onChange={handleLoginPage}  fullWidth InputProps={{ style: {  color: 'white'} }} />
            {errorObject && errorObject['loginPage'] !== '' ? <FormHelperText className="form-error-text" style={{color:'red'}}>{errorObject['loginPage']}</FormHelperText> : ""}
          </Grid>
        </Grid>
      </Grid>
      <Grid container columnSpacing={1} sx={{marginTop:2, marginBottom:2}} display={'flex'} justifyContent={'center'} alignItems={'center'}>
        <Stack direction="row" spacing={2}>
          {/* <Button  variant="contained" sx={{borderRadius:30, textTransform:'capitalize', padding:'5px 30px', background:'transparent', border:'1px solid #DA792D'}}>
            Save & Start
          </Button> */}
          <Button onClick={handleTo} variant="contained" sx={{borderRadius:30, textTransform:'capitalize', padding:'5px 30px', background:'transparent', border:'1px solid #DA792D'}}>
            Cancel
          </Button>
          <Button variant="contained" sx={{borderRadius:30, textTransform:'capitalize', padding:'5px 30px', background:'linear-gradient(to right, #DA792D, #AC609E)',}} onClick={!!id ? onUpdate : onSubmit }>
              Save
          </Button>
          
        </Stack>
      </Grid>
      </> }
      {/* <Divider sx={{background:'#C67B4D', height:1.1}}  /> */}
    </>
  )
}

export default BillingInfoComponent
