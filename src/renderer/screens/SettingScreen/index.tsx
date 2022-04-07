
import BackgroundImage from '../../assets/bg.png';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import {Container} from '@mui/material'
import { Button,FormControl,Select,FormHelperText, SelectChangeEvent  } from '@mui/material';
import { CustomTextField } from '../../components/Textfield';
import { countryData } from '../../constant/Dropdown/country';
import { stateList } from '../../constant/Dropdown/states';
import { MenuItem } from '@mui/material';
import { useStyles } from '../../constant/customStyles'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';

import { useState,useEffect} from 'react'
import { useDispatch, useSelector } from "react-redux"
import {getProfileRecord,updateProfile} from '../../redux/actions/setting-action';
import { RootState } from 'renderer/redux/reducers';
import Loader from "react-loader-spinner";

let errorObject: any = {}

  let initialState = {
    name:'',
    email:'',
    // password:'',
    // role:'',
    phoneNumber:'',
    country:'',
    state:'',
    zip:''
  }

const SettingScreen = () => {
  const [flag, setFlag] = useState(false);
  const [values, setValues] = useState(initialState);

  const classes = useStyles();
  const dispatch = useDispatch();
  const {getProfileSettingReducer} = useSelector((state: RootState) => {
    return state
  })

  console.log('getProfileSettingReducer ===>', getProfileSettingReducer)
  
  const handleName = (e: any) => {
    setValues({ ...values, name: e.target.value })
    if (errorObject && errorObject['name'] && e.target.value) {
      errorObject['name'] = ''
    }
  }

  const validEmail = (str: string) => {
    var pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return pattern.test(str);
  }
  const handleEmail = (e: any) => {
    setValues({ ...values, email: e.target.value })
if(validEmail(e.target.value))
{
  if (errorObject && errorObject['email'] && e.target.value) {
      errorObject['email'] = ''; 
    }
  }else{
    errorObject['email'] = 'Please Enter Valid Email';
  }
}
   

  // const handlePassword = (e: any) => {
  //   setValues({ ...values, password: e.target.value })
  //   if (errorObject && errorObject['password'] && e.target.value) {
  //     errorObject['password'] = '';
  //   }
  // }

  // const handleRoleChange = (event: SelectChangeEvent) => {
  //   setValues({ ...values, role: event.target.value })
  //   if (errorObject && errorObject['role'] && event.target.value) {
  //     errorObject['role'] = ''
  //   }
  // }

  const handlePhoneNumber = (e: any) => {
    setValues({ ...values, phoneNumber: e.target.value })
    if (errorObject && errorObject['phoneNumber'] && e.target.value) {
      errorObject['phoneNumber'] = ''
    }
  }

  const handleCountry = (event: SelectChangeEvent) => {
    setValues({ ...values, country: event.target.value })
    if (errorObject && errorObject['country'] && event.target.value) {
      errorObject['country'] = ''
    }
  }

  const handleState = (event: SelectChangeEvent) => {
    setValues({ ...values, state: event.target.value })
    if (errorObject && errorObject['state'] && event.target.value) {
      errorObject['state'] = ''
    }
  }

  const handleZip = (e: any) => {
    setValues({ ...values, zip: e.target.value })
    if (errorObject && errorObject['zip'] && e.target.value) {
      errorObject['zip'] = ''
    }
  }


  const onUpdate = async (e: any) => {
    e.preventDefault()
    errorObject = {}
    for (let [key, value] of Object.entries(values)) {
     console.log('key', key, value)
        if(value.length === 0) {
          if(key === 'name' || key === 'email' || key === 'phoneNumber' || key === 'zip')
            errorObject[key] = `Please enter  ${key.replace(/([a-z])([A-Z])/g, '$1 $2').toUpperCase()}`
          else
            errorObject[key] = `Please Select ${key.replace(/([a-z])([A-Z])/g, '$1 $2').toLowerCase()}`
           setFlag(!flag)
        }
      
    }

     if (Object.entries(errorObject).length === 0) {
       console.log("form submitted")
       let data = {
        name: values.name,
        email:values.email,
        // password:'',
        // role:'',
        phone_number:values.phoneNumber,
        country:values.country,
        state:values.state,
        zip:values.zip,
        _method: 'PATCH'
      };

       let result: any = dispatch(updateProfile(data))
      if (result.type === 'SETTING_UPDATE_SUCCESS') {
        // history.push('/task')
        fetchMyAPI()
      }
      else if (result.type === 'SETTING_UPDATE_ERROR') {
        console.log('result', result)
      }
     }
  }

  async function fetchMyAPI() {
    let result: any = await dispatch(getProfileRecord())
    if (result.type === 'SETTING_LIST_SUCCESS') {
        console.log('result', result)
       let data = {
          name: result.response.data.data.name,
          email:result.response.data.data.email,
          // password:'',
          // role:'',
          phoneNumber:result.response.data.data.phone_number,
          country:result.response.data.data.country,
          state:result.response.data.data.state,
          zip:result.response.data.data.zip
        }
        setValues(data);

        
    }

    else if (result.type === 'SETTING_LIST_ERROR') {
      // if (typeof (result.response) === 'string')
      //     setEmpty(result.response)
      // else
      //     setEmpty(result.response.data.messageText.mesg)
    }
  }

  useEffect(() => {
    // alert("hello");
    // if(Object.entries(errorObject).length > 0) {
    //   console.log('length', Object.entries(errorObject).length)
       errorObject = {};
        setFlag(!flag)
        fetchMyAPI()
   
    // }
   // fetchMyAPI()
  }, [])

  return(
    <>
    {getProfileSettingReducer?.loading ? 
    <Box sx={{backgroundImage:`url(${BackgroundImage})`, paddingTop:5, paddingLeft:2, paddingRight:10, display:'flex', justifyContent:'center', alignItems:'center', width:'100%', height:'80vh'}}>
      <Loader type="Bars" color="#DA792D" height={80} width={80}  />
    </Box> 
    :
    <Box  display={'flex'} justifyContent={'center'} alignItems={'center'} sx={{ maxWidth:'100vw',  height:'90vh', maxHeight:'100%', color: 'secondary.main',padding:"25px", backgroundImage:`url(${BackgroundImage})`,}}>

<Box sx={{background:'rgba(235, 237, 239, 0.2)',padding:'25px 15px',borderRadius:'20px'}}>
  <Container>
    <Box sx={{display:'flex',justifyContent:'center',paddingBottom:'20px'}}>  
     <AccountCircleOutlinedIcon sx={{fontSize:'100px',color:'#78787a'}} />
    </Box>

      <Grid container spacing={3}>
        <Grid item md={6} xs={12}>
          <Box sx={{  fontFamily:'roboto', fontWeight:400, color: '#C67B4D', fontSize:12, marginBottom:0.5 }}>Name</Box>
          <CustomTextField onChange={handleName} value={values.name} size="small" fullWidth InputProps={{ style: {  color: 'white'} }} placeholder="Enter Name Here"/>
          {errorObject && errorObject['name'] !== '' ? <FormHelperText className="form-error-text" style={{color:'red'}}>{errorObject['name']}</FormHelperText> : ""}
         
        </Grid>
        <Grid item md={6} xs={12}>
          <Box sx={{  fontFamily:'roboto', fontWeight:400, color: '#C67B4D', fontSize:12, marginBottom:0.5 }}>Email</Box>
          <CustomTextField onChange={handleEmail} value={values.email} size="small" fullWidth InputProps={{ style: {  color: 'white'} }} placeholder="abc@abc.com"/>
          {errorObject && errorObject['email'] !== '' ? <FormHelperText className="form-error-text" style={{color:'red'}}>
            {errorObject['email']}</FormHelperText> : ""}
        </Grid>
        {/* <Grid item md={6} xs={12}>
          <Box sx={{  fontFamily:'roboto', fontWeight:400, color: '#C67B4D', fontSize:12, marginBottom:0.5 }}>Password</Box>
          <CustomTextField onChange={handlePassword} value={values.password}  size="small" fullWidth InputProps={{ style: {  color: 'white'} }} placeholder="Enter Password Here"/>
          {errorObject && errorObject['password'] !== '' ? <FormHelperText className="form-error-text" style={{color:'red'}}>
            {errorObject['password']}</FormHelperText> : ""}
        </Grid> */}
        {/* <Grid item md={6} xs={12}>
          <Box sx={{  fontFamily:'roboto', fontWeight:400, color: '#C67B4D', fontSize:12, marginBottom:0.5 }}>Role</Box>
        
          <FormControl fullWidth >
              <Select onChange={handleRoleChange} value={values.role} label="Select Role" size='small' MenuProps={{ classes: { paper: classes.select } }} inputProps={{classes:{icon: classes.icon}}} className= {classes.root} >
                            {roleData.map((data:any, index:number)=> {
                              return(
                                <MenuItem value={data.value} key={index++}>{data.name}</MenuItem>
                              )
                            })}
                </Select>      
                 
          </FormControl>    
          {errorObject && errorObject['role'] !== '' ? <FormHelperText className="form-error-text" style={{color:'red'}}>
            {errorObject['role']}</FormHelperText> : ""}        
        </Grid> */}
        <Grid item md={6} xs={12}>
          <Box sx={{  fontFamily:'roboto', fontWeight:400, color: '#C67B4D', fontSize:12, marginBottom:0.5 }}>Phone Number</Box>
          <CustomTextField onChange={handlePhoneNumber} value={values.phoneNumber} size="small" fullWidth InputProps={{ style: {  color: 'white'} }} placeholder="+13478196127"/>
          {errorObject && errorObject['phoneNumber'] !== '' ? <FormHelperText className="form-error-text" style={{color:'red'}}>
            {errorObject['phoneNumber']}</FormHelperText> : ""} 
        </Grid>
        <Grid item md={6} xs={12}>
          <Box sx={{  fontFamily:'roboto', fontWeight:400, color: '#C67B4D', fontSize:12, marginBottom:0.5 }}>Country</Box>
          <FormControl fullWidth >
              <Select onChange={handleCountry} value={values.country} size='small' MenuProps={{ classes: { paper: classes.select } }} inputProps={{classes:{icon: classes.icon}}} className= {classes.root}>
                            {countryData.map((data:any, index:number)=> {
                              return(
                                <MenuItem value={data.value} key={index++}>{data.name}</MenuItem>
                              )
                            })}
                </Select>           
               
          </FormControl> 
          {errorObject && errorObject['country'] !== '' ? <FormHelperText className="form-error-text" style={{color:'red'}}>
            {errorObject['country']}</FormHelperText> : ""} 
        </Grid>
        <Grid item md={6} xs={12}>
          <Box sx={{  fontFamily:'roboto', fontWeight:400, color: '#C67B4D', fontSize:12, marginBottom:0.5 }}>State</Box>
          <FormControl fullWidth >
              <Select onChange={handleState} value={values.state} size='small' MenuProps={{ classes: { paper: classes.select } }} inputProps={{classes:{icon: classes.icon}}} className= {classes.root} >
                            {stateList.map((data:any, index:number)=> {
                              return(
                                <MenuItem value={data.value} key={index++}>{data.name}</MenuItem>
                              )
                            })}
                </Select>         
              
          </FormControl> 
          {errorObject && errorObject['state'] !== '' ? <FormHelperText className="form-error-text" style={{color:'red'}}>
            {errorObject['state']}</FormHelperText> : ""}  
        </Grid>
        <Grid item md={6} xs={12}>
          <Box sx={{  fontFamily:'roboto', fontWeight:400, color: '#C67B4D', fontSize:12, marginBottom:0.5 }}>Zip</Box>
          <CustomTextField onChange={handleZip} value={values.zip} size="small" fullWidth InputProps={{ style: {  color: 'white'} }} placeholder="Enter Zip"/>
          {errorObject && errorObject['zip'] !== '' ? <FormHelperText className="form-error-text" style={{color:'red'}}>
            {errorObject['zip']}</FormHelperText> : ""}
        </Grid>
        <Grid item md={6} xs={12}>
          <Button variant="contained" sx={{borderRadius:30, textTransform:'capitalize', padding:'5px 30px', background:'linear-gradient(to right, #DA792D, #AC609E)'}} onClick={onUpdate}>
                      Update
          </Button>
        </Grid>
      
      </Grid>
</Container>
</Box>
    </Box>
    }
      
    </>
  )
}

export default SettingScreen