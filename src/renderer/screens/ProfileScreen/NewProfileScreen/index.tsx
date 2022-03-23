import React, {useState, useEffect} from 'react'
import { Box, Grid, InputAdornment, Button, Tab, FormControl, Select, MenuItem, FormHelperText } from '@mui/material';
import BackgroundImage from '../../../assets/bg.png'
import { CustomTextField } from '../../../components/Textfield'
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import CodeOffIcon from '@mui/icons-material/CodeOff';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import CardImage from '../../../assets/card.png'
import VISA from '../../../assets/visa.png'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import { CustomCheckbox } from '../../../components/Checkbox'
import moment from 'moment'
import { createNewProfile, getProfileRecord, updateProfile } from '../../../redux/actions/profile-action'
import { useDispatch, useSelector } from "react-redux"
import { RootState } from 'renderer/redux/reducers'
import { useHistory } from "react-router-dom"
import Notifications from '../../../components/Notifications'
import ConfirmDialog from '../../../components/ConfirmDialogbox'
import {stateList} from '../../../constant/dropdown/states'
import {countryData} from '../../../constant/dropdown/country'
import {useStyles} from '../../../constant/customStyles'

let errorObject: any = {}

let initialState = {
  cardOwnerName: '',
  cardNumber: '',
  cardCvv: '',
  nickName: '',
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  address: '',
  newAddress: '',
  city: '',
  country: '',
  zip: '',
  state: '',
}

const NewProfileScreen= ()=> {
  const [flag, setFlag] = useState(false)
  const [value, setValue] = useState<Date | null>(new Date())
  const [cardType, setCardType] = useState('')
  const [count, setCount] = useState('1')
  const [values, setValues] = useState(initialState)
  const [notify, setNotify] = useState({isOpen: false, message:'', type:''})
  const [confirmDialog, setConfirmDialog] = useState({isOpen: false, title: '', subTitle: '', onConfirm: () => {}})

  const color = "#7A7878"
  const classes = useStyles()
  let history = useHistory()
  const dispatch = useDispatch()
  const { addNewProfileReducer } = useSelector((state: RootState) => {
    return state
  })

  function creditCardType(cc: string) {
    let amex = new RegExp('^3[47][0-9]{13}$');
    let visa = new RegExp('^4[0-9]{12}(?:[0-9]{3})?$');
    let cup1 = new RegExp('^62[0-9]{14}[0-9]*$');
    let cup2 = new RegExp('^81[0-9]{14}[0-9]*$');

    let mastercard = new RegExp('^5[1-5][0-9]{14}$');
    let mastercard2 = new RegExp('^2[2-7][0-9]{14}$');

    let disco1 = new RegExp('^6011[0-9]{12}[0-9]*$');
    let disco2 = new RegExp('^62[24568][0-9]{13}[0-9]*$');
    let disco3 = new RegExp('^6[45][0-9]{14}[0-9]*$');

    let diners = new RegExp('^3[0689][0-9]{12}[0-9]*$');
    let jcb =  new RegExp('^35[0-9]{14}[0-9]*$');


    if (visa.test(cc)) {
      return 'VISA'
    }
    if (amex.test(cc)) {
      return 'AMEX'
    }
    if (mastercard.test(cc) || mastercard2.test(cc)) {
      return 'MASTERCARD'
    }
    if (disco1.test(cc) || disco2.test(cc) || disco3.test(cc)) {
      return 'DISCOVER'
    }
    if (diners.test(cc)) {
      return 'DINERS'
    }
    if (jcb.test(cc)) {
      return 'JCB'
    }
    if (cup1.test(cc) || cup2.test(cc)) {
      return 'CHINA_UNION_PAY'
    }
    return ''
  }

  const changeCardNumber = (e:any) => {
    let cardName = creditCardType(e.target.value)
    setCardType(cardName)
    setValues({ ...values, [e.target.name]: e.target.value})
  }

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setCount(newValue);
  }

  const handleDataChange = (e: any) => {
    e.preventDefault()
    setValues({ ...values, [e.target.name]: e.target.value})
    if (errorObject && errorObject[e.target.name] && e.target.value) {
      errorObject[e.target.name] = ''
    }
  }

  const onUpdate = async(e: any) => {
    e.preventDefault()
    errorObject = {}
    for (let [key, value] of Object.entries(values)) {
      if (key !== 'address' && key !== 'newAddress' &&
        key !== 'phone' && key !== 'userName' && key !== 'card_no' &&
        key !== 'cardCvv' && key !== 'nickName' && key !== 'cardOwnerName' && key !== 'cardNumber' && key !== 'cardCvv') {
          if(value.length === 0  ) {
            errorObject[key] = `Please enter a ${key.replace(/([a-z])([A-Z])/g, '$1 $2')} value`
            setFlag(!flag)
          }
      }
    }
    if (Object.entries(errorObject).length === 0) {
      let record: any = {
        name: values.firstName,
        lastname: values.lastName,
        email:values.email,
        address: values.address,
        address_2: values.newAddress,
        country: values.country,
        state: values.state,
        city: values.city,
        phone: values.phone,
        zip: values.zip,
        card_no: values.cardNumber ? values.cardNumber : '',
        expire: values.cardNumber === '' ? 'N/A' : moment(value).format('MM/YYYY'),
        cvv: values.cardCvv ?  values.cardCvv : '',
        nick_name: values.nickName ? values.nickName : '',
        card_owner_name: values.cardOwnerName ? values.cardOwnerName : '',
        _method: 'PATCH'
      }
      let result: any = await dispatch(updateProfile(record,sessionStorage.getItem('profileId')))
      if (result.type === 'PROFILE_UPDATE_SUCCESS') {
        setNotify({
          isOpen: true,
          message: 'Update Profile Successfully',
          type: 'success'
        })
        setTimeout(() => {
          sessionStorage.removeItem('profileId')
          history.push('/profile')
        }, 2000)
      }
      else if (result.type === 'PROFILE_UPDATE_ERROR') {
        console.log('result', result)
      }
    }
  }

  const onSubmit = async (e: any) => {
    e.preventDefault()
    errorObject = {}
    for (let [key, value] of Object.entries(values)) {
      if (value.length === 0 && key !== 'address' && key !== 'newAddress' &&
        key !== 'phone' && key !== 'userName' && key !== 'card_no' &&
        key !== 'cardCvv' && key !== 'nickName' && key !== 'cardOwnerName' && key !== 'cardNumber' && key !== 'cardCvv') {
          errorObject[key] = `Please enter a ${key.replace(/([a-z])([A-Z])/g, '$1 $2')} value`
          setFlag(!flag)
      }
    }
    if (Object.entries(errorObject).length === 0) {
      let data: any = {
        name: values.firstName,
        lastname: values.lastName,
        email:values.email,
        address: values.address,
        address_2: values.newAddress,
        country: values.country,
        state: values.state,
        city: values.city,
        phone: values.phone,
        zip: values.zip,
        card_no: values.cardNumber,
        expire: values.cardNumber === '' ? 'N/A' : moment(value).format('MM/YYYY'),
        cvv: values.cardCvv,
        nick_name: values.nickName,
        card_owner_name: values.cardOwnerName
      }

      let result: any = await dispatch(createNewProfile(data))
      if (result.type === 'PROFILE_CREATE_SUCCESS') {
        setNotify({
          isOpen: true,
          message: 'New Profile Add Successfully',
          type: 'success'
        })
        setTimeout(() => {
          history.push('/profile')
        }, 2000)
      }
      else if (result.type === 'PROFILE_CREATE_ERROR') {
        console.log('result', result)
      }
    }
  }

  const fetchData = async () => {
    let result: any = await dispatch(getProfileRecord(sessionStorage.getItem('profileId')))
    if(result.type === 'PROFILE_LIST_SUCCESS') {
      setValues({
        cardOwnerName: result.response.data.data && result.response.data.data.card_owner_name,
        cardNumber: result.response.data.data && result.response.data.data.card_no,
        cardCvv: result.response.data.data && result.response.data.data.cvv,
        nickName: result.response.data.data && result.response.data.data.nick_name,
        firstName: result.response.data.data && result.response.data.data.name,
        lastName: result.response.data.data && result.response.data.data.lastname,
        email: result.response.data.data && result.response.data.data.email,
        phone: result.response.data.data && result.response.data.data.phone,
        address: result.response.data.data && result.response.data.data.address,
        newAddress: result.response.data.data && result.response.data.data.address_2,
        city: result.response.data.data && result.response.data.data.city,
        country: result.response.data.data && result.response.data.data.country,
        zip: result.response.data.data && result.response.data.data.zip,
        state: result.response.data.data && result.response.data.data.state,
      })
      if(result.response.data.data.expire !== 'N/A') {
        let date = result.response.data.data && result.response.data.data.expire.split("/")
        let newDate: any = new Date(`${date[0]}/01/${date[1]}`)
        setValue(newDate)
      }
      else {
        let newDate: any = new Date()
        setValue(newDate)
      }

    }
    else if(result.type === 'PROFILE_LIST_ERROR') {
      console.log('result', result)
    }
  }

  useEffect(() => {

  }, [cardType])

  useEffect(() => {
    if(!!sessionStorage.getItem('profileId')) {
      fetchData()
    }
  }, [])

  return (
    <Box sx={{ maxWidth:'100vw',  height:'100%', maxHeight:'80%', color: 'secondary.main', backgroundImage:`url(${BackgroundImage})`, padding:'20px 0' }}>
      <Grid container columnSpacing={1} sx={{marginBottom:5}} display={'flex'} justifyContent={'center'} alignItems={'center'}>
        <Grid item xs={12} sm={12} md={7} lg={7} columnSpacing={1} sx={{marginTop:4}}>
          <Box sx={{ width: '100%', typography: 'body1',background: 'rgba(0, 0, 0, .4)', padding:'0px 0px 2px', borderRadius:2 }}>
            <Grid container columnSpacing={3} sx={{marginBottom:5, paddingLeft:2, paddingRight:2}}>
              <Grid item xs={12} sm={12} lg={12} md={12}>
                <Box sx={{  fontFamily:'roboto', fontWeight:700, color: '#C67B4D', fontSize:14, marginTop:1, marginBottom:1 }}>Payment Details</Box>
              </Grid>
              <Grid item xs={12} sm={12} lg={12} md={12}>
                <Box display={'flex'} justifyContent={'center'} sx={{marginBottom:1}}>
                  <img src={cardType === 'VISA' ? VISA : CardImage} />
                </Box>
                <Box sx={{marginBottom:3}}>
                  <CustomTextField name='cardOwnerName' value={values.cardOwnerName} onChange={handleDataChange} size="small" fullWidth InputProps={{ style: {  color: color} }} placeholder={'Card Owner Name'} />
                </Box>
                <Box sx={{marginBottom:3}}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      value={value} views={['year', 'month']}
                      onChange={(newValue:any) => { setValue(newValue) }}
                      minDate={!!sessionStorage.getItem('profileId') ? value : new Date()}
                      renderInput={(params) => { return ( <CustomTextField   {...params} sx={{ svg: {color}, input:{color} }} fullWidth size='small' /> ); }} />
                  </LocalizationProvider>
                </Box>
                <Box sx={{marginBottom:3}}>
                  <CustomTextField name='cardNumber' value={values.cardNumber} size="small" fullWidth onChange={(e) => changeCardNumber(e)} InputProps={{ style: {  color: color}, endAdornment: <InputAdornment position="end"><CreditCardIcon sx={{color:color}} /></InputAdornment> }}  placeholder={'Card Number'} />
                </Box>
                <Box sx={{marginBottom:3}}>
                  <CustomTextField name='cardCvv' value={values.cardCvv} onChange={handleDataChange} size="small" fullWidth InputProps={{ style: {  color: color}, endAdornment: <InputAdornment position="end"><CodeOffIcon sx={{color:color}} /></InputAdornment> }} placeholder={'CVC Code'} />
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Grid>

        <Grid item xs={12} sm={12} md={7} lg={7} columnSpacing={1} sx={{marginTop:4}}>
          <Box sx={{ paddingTop:2, paddingLeft:5, paddingRight:5, background: 'rgba(0, 0, 0, .4)', borderRadius:5}}>
            <TabContext value={count}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider', padding:'0px 0px' }}>
                  <TabList onChange={handleChange} aria-label="lab API tabs example" className={classes.tabs} classes={{ indicator: classes.indicator }}>
                    <Tab label={'Billing Info'} value={'1'} className={classes.label}  />
                    {/* <Tab label={'Sizing'} value={'2'} className={classes.label}  /> */}
                    <Tab label={'Additional Data'} value={'3'} className={classes.label}  />
                  </TabList>
              </Box>
              <TabPanel value={'1'} className={classes.tabsPanel}>
                <Grid container columnSpacing={3} sx={{marginBottom:5}}>
                  <Grid item xs={12} sm={12} md={4} lg={4} sx={{marginTop:4}}>
                    <CustomTextField name='firstName' onChange={handleDataChange} value={values.firstName}  size="small" fullWidth InputProps={{ style: {  color: 'white'} }} placeholder='First Name' />
                    {errorObject && errorObject['firstName'] !== '' ? <FormHelperText className="form-error-text" style={{color:'red'}}>{errorObject['firstName']}</FormHelperText> : ""}
                  </Grid>
                  <Grid item xs={12} sm={12} md={4} lg={4} sx={{marginTop:4}}>
                    <CustomTextField name='lastName' onChange={handleDataChange} value={values.lastName} size="small" fullWidth InputProps={{ style: {  color: 'white'} }} placeholder='Last Name' />
                    {errorObject && errorObject['lastName'] !== '' ? <FormHelperText className="form-error-text" style={{color:'red'}}>{errorObject['lastName']}</FormHelperText> : ""}
                  </Grid>
                  <Grid item xs={12} sm={12} md={4} lg={4} sx={{marginTop:4}}>
                    <CustomTextField name='email' onChange={handleDataChange} value={values.email} size="small" fullWidth InputProps={{ style: {  color: 'white'} }} placeholder='Email' />
                    {errorObject && errorObject['email'] !== '' ? <FormHelperText className="form-error-text" style={{color:'red'}}>{errorObject['email']}</FormHelperText> : ""}
                  </Grid>
                  <Grid item xs={12} sm={12} md={4} lg={4} sx={{marginTop:4}}>
                    <CustomTextField name='phone' onChange={handleDataChange} value={values.phone} size="small" fullWidth InputProps={{ style: {  color: 'white'} }} placeholder='Telephone' />
                  </Grid>
                  <Grid item xs={12} sm={12} md={4} lg={4} sx={{marginTop:4}}>
                    <CustomTextField name='address' onChange={handleDataChange} value={values.address} size="small" fullWidth InputProps={{ style: {  color: 'white'} }} placeholder='Address Line 1' />
                  </Grid>
                  <Grid item xs={12} sm={12} md={4} lg={4} sx={{marginTop:4}}>
                    <CustomTextField name='newAddress' onChange={handleDataChange} value={values.newAddress} size="small" fullWidth InputProps={{ style: {  color: 'white'} }} placeholder='Address Line 2 House Number (optional)' />
                  </Grid>
                  <Grid item xs={12} sm={12} md={3} lg={3} sx={{marginTop:3}}>
                    <CustomTextField name='city' onChange={handleDataChange} value={values.city} size="small" fullWidth InputProps={{ style: {  color: 'white'} }} placeholder='City' />
                  </Grid>
                  <Grid item xs={12} sm={12} md={3} lg={3} sx={{marginTop:3}}>
                    <CustomTextField name='zip' onChange={handleDataChange} value={values.zip} size="small" fullWidth InputProps={{ style: {  color: 'white'} }} placeholder='Postal Code' />
                    {errorObject && errorObject['zip'] !== '' ? <FormHelperText className="form-error-text" style={{color:'red'}}>{errorObject['zip']}</FormHelperText> : ""}
                  </Grid>
                  <Grid item xs={12} sm={12} md={3} lg={3} sx={{marginTop:3}}>
                    {/* <CustomizeSelectComponent /> */}
                    <FormControl fullWidth>
                      <Select value={values.country} onChange={handleDataChange} name='country' size='small' MenuProps={{ classes: { paper: classes.select } }} inputProps={{classes:{icon: classes.icon}}} className={classes.root}>
                        {countryData.map((data:any, index:number)=> {
                          return(
                            <MenuItem value={data.value} key={index++}>{data.name}</MenuItem>
                          )
                        })}
                      </Select>
                    </FormControl>
                    {errorObject && errorObject['country'] !== '' ? <FormHelperText className="form-error-text" style={{color:'red'}}>{errorObject['country']}</FormHelperText> : ""}
                  </Grid>
                  <Grid item xs={12} sm={12} md={3} lg={3} sx={{marginTop:3}}>
                    {/* <CustomTextField name='state' onChange={handleDataChange} value={values.state} size="small" fullWidth InputProps={{ style: {  color: 'white'} }} placeholder='State' /> */}
                    <FormControl fullWidth>
                      <Select value={values.state} onChange={handleDataChange} name='state' size='small' MenuProps={{ classes: { paper: classes.select } }} inputProps={{classes:{icon: classes.icon}}} className={classes.root}>
                        {stateList.map((data:any, index:number)=> {
                          return(
                            <MenuItem value={data.value} key={index++}>{data.name}</MenuItem>
                          )
                        })}
                      </Select>
                    </FormControl>
                    {errorObject && errorObject['state'] !== '' ? <FormHelperText className="form-error-text" style={{color:'red'}}>{errorObject['state']}</FormHelperText> : ""}
                  </Grid>
                  <Grid item xs={12} sm={12} md={12} lg={12} sx={{marginTop:3}}>
                    <Box display={'flex'} flexDirection={'row'} justifyContent={'flex-start'} alignItems={'center'}>
                      <CustomCheckbox />
                      <Box sx={{ width: '100%', typography: 'body1', padding:'0px 0px', borderRadius:4 }}>
                        Shipping information same as Billing Information
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </TabPanel>
              {/* <TabPanel value={'2'} className={classes.tabsPanel}>2</TabPanel> */}
              <TabPanel value={'3'} className={classes.tabsPanel}>
                <Grid item xs={12} sm={12} md={12} lg={12} sx={{marginTop:4}}>
                  <CustomTextField name='nickName' onChange={handleDataChange} value={values.nickName}  size="small" fullWidth InputProps={{ style: {  color: 'white'} }} placeholder='Nick Name' />
                </Grid>
              </TabPanel>
            </TabContext>
          </Box>
        </Grid>
      </Grid>
      <Grid container columnSpacing={1} sx={{marginTop:2, marginBottom:2}} display={'flex'} justifyContent={'center'} alignItems={'center'}>
        <Button onClick={!!sessionStorage.getItem('profileId') ? onUpdate : onSubmit} variant="contained" sx={{borderRadius:30, textTransform:'capitalize', padding:'5px 50px', background:'linear-gradient(to right, #DA792D, #AC609E)',}}>
          Save
        </Button>
      </Grid>
      <Notifications notify={notify} setNotify={setNotify } />
      <ConfirmDialog confirmDialog={confirmDialog} setConfirmDialog={setConfirmDialog } />
    </Box>
  )
}

export default NewProfileScreen
