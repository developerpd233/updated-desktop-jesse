import {useState} from 'react'
import { Box, Paper, Grid, Typography, InputAdornment, FormControlLabel } from '@mui/material';
import BackgroundImage from '../../assets/bg.png'
import Logo from '../../assets/logo.png'
import { CssTextField } from '../../components/Textfield'
import { Email, Lock} from '@mui/icons-material'
import { CssCheckboxField } from '../../components/Checkbox'
import { CssTransparentButton, CssGradientButton } from '../../components/Button'

import { useHistory , Redirect} from "react-router-dom"
import {ReadCookie} from '../../utils/readCookies'
import { useDispatch, useSelector } from "react-redux"
import { RootState } from 'renderer/redux/reducers'
import Loader from "react-loader-spinner"
import { userLogin } from '../../redux/actions/login-action'
import Notifications from '../../components/Notifications'
import ConfirmDialog from '../../components/ConfirmDialogbox'

const LoginScreen = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [notify, setNotify] = useState({isOpen: false, message:'', type:''})
  const [confirmDialog, setConfirmDialog] = useState({isOpen: false, title: '', subTitle: '', onConfirm: () => {}})
  const [redirect, setRedirect] = useState(false)
    let history = useHistory()

    const dispatch = useDispatch()

    const { loginReducer } = useSelector((state: RootState) => {
        return state
    })

    const onSubmit = async() => {
      let data = {
        email: email,
        password: password
      }
      let result: any = await dispatch(userLogin(data))
      if (result.type === 'LOGIN_SUCCESS') {
        sessionStorage.setItem('token', result.response.data.data.token)
        history.push("/task")
      }
      else if (result.type === 'LOGIN_ERROR') {
        console.log('fail')
        setNotify({
          isOpen: true,
          message: 'Email Or Password Doesnot Match',
          type: 'error'
        })
      }
      

      // history.push("/task")
        // document.cookie = `token=eyJpdiI6Ik9xcWhtaTZuZlJnR2RRdGcwMG9vQ3c9PSIsInZhbHVlIjoiQmQ1U1k1TUpiMnp1MG5ldHVyekFBQ0IxLzE4N2RpZ3RteTZ1QlVpQ1pNZSs3ZTV0N3hlQW1VekNMdWF0TVVlNnlGOXg0aEFpWUdhbTJiK08zamdwUkNVUkdvOGJFT28rbEoxSXE3Sm8yb0RRcG93WWd4T3JJK09ZeFQva1NManMiLCJtYWMiOiI2YzY5NmMwM2RhNTE4NTA3NzQwMmM5MWY4ZTZkZWEzNTViZjZiZDhiYTU1Y2MwMjVjZDg0NDk0NWUwMmY5ODIwIiwidGFnIjoiIn0%3D; laravel_session=eyJpdiI6IlJwN2toZTBOYllQVUduSnJkTU1WR0E9PSIsInZhbHVlIjoiSlVLdTN1Q2EwRlBmZXNJNzdpWk1Jd2hTRDFpQTVmQTMrTDhNNVRVT3llem9XbWNCaTEySEFGUEVPR1JsaEQ4TTdjY1lQUmJ6ZXNIbmdmWkErMENjOWhNbS94YWM2U0xLQm1qQkszbk01SW5tZ3RpMkhCdEhhZVdGSTlHMEtockUiLCJtYWMiOiJjMTE2MGQ0MzBlNDMyMTljZWYzZjBkMzg4ODNlZTVmZTJmMzNmMDU5ODdjNjAwZTdmZmMzMTdjNTljNTkzMTg1IiwidGFnIjoiIn0%3D`
        // // history.push("/proxies")
        // // window.location.reload()
        // if(ReadCookie('token'))
        //   setRedirect(true)
    }

  // const Test = () => {
  //   return(
  //     <Redirect to='/task' />
  //   )
  // }

    return (
      <>
      {/* { redirect ?   <Test /> : null } */}
        <Box display={'flex'} justifyContent={'center'} alignItems={'center'} sx={{ maxWidth:'100vw',  height:'98vh', maxHeight:'100%', color: 'secondary.main', backgroundImage:`url(${BackgroundImage})`}}>
            <Grid container item xs={12} sm={12} md={6} lg={6} alignItems="center" justifyContent="space-between" direction="column" sx={{filter:!loginReducer.loading ?  'blur(0px)' : 'blur(5px)'}}>
                <Paper elevation={10} style={{minWidth: 500, backgroundColor:'#2121228f', paddingLeft: 20, paddingRight: 20,  paddingTop: 30, paddingBottom: 30, borderRadius: 5, display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
                    <img src={Logo} alt='' width={100} height={100} />
                    <Box display={'flex'} justifyContent={'flex-start'} alignItems={'flex-start'} width={'100%'} flexDirection={'column'}>
                        <Typography color={'#768192'}>Login</Typography>
                        <div />

                        <CssTextField onChange={(e) => setEmail(e.target.value)} name="email" placeholder="Email" label="Email" variant="outlined" margin="normal" required fullWidth InputProps={{ startAdornment: <InputAdornment position="start"><Email /></InputAdornment>, style: {  color: 'white'} }} />
                        <CssTextField onChange={(e) => setPassword(e.target.value)} name="password" placeholder="Password" label="Password" variant="outlined" margin="normal" required fullWidth type="password"  InputProps={{ startAdornment: <InputAdornment position="start"><Lock /></InputAdornment>, style: {  color: 'white'}     }} />
                        <FormControlLabel control={<CssCheckboxField  name="Web"   color="secondary"  style={{color:'white'}} /> } label="Remember me"  style={{color:'white', marginBottom:10}}  />
                        <div />
                        <Box display={'flex'} justifyContent={'space-between'} width={'100%'}>
                            <CssGradientButton type="submit" onClick={onSubmit}>Login</CssGradientButton>
                            <CssTransparentButton onClick={() => history.push(`/forgot`)}>Forgot Your Password?</CssTransparentButton>
                        </Box>
                    </Box>
                </Paper>
            </Grid>
            {
              loginReducer.loading ?
              <Box sx={{ position:'absolute', left:0, display:'flex', justifyContent:'center', alignItems:'center', width:'100%', height:'80vh'}}>
                <Loader type="Bars" color="#DA792D" height={80} width={80}  />
              </Box>
              : null
            }
              <Notifications notify={notify} setNotify={setNotify } />
              <ConfirmDialog confirmDialog={confirmDialog} setConfirmDialog={setConfirmDialog } />
        </Box>
      </>
    )

}

export default LoginScreen
