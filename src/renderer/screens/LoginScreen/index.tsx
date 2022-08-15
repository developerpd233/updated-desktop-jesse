import { useState } from 'react'
import { Box, Paper, Grid, Typography, InputAdornment, FormControlLabel } from '@mui/material';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import BackgroundImage from '../../assets/bg.png'
import Logo from '../../assets/logo.png'
import { CssTextField } from '../../components/Textfield'
import { Email, Lock } from '@mui/icons-material'
import { CssCheckboxField } from '../../components/Checkbox'
import { CssTransparentButton, CssGradientButton } from '../../components/Button'
import CloseIcon from '@mui/icons-material/Close';
import { useHistory } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from 'renderer/redux/reducers'
import Loader from "react-loader-spinner"
import { userLogin } from '../../redux/actions/login-action'
import Notifications from '../../components/Notifications'
import ConfirmDialog from '../../components/ConfirmDialogbox'
import MinimizeIcon from '@mui/icons-material/Minimize';
import { IpcMain } from 'electron';
// import { app } from 'electron';
// const {remote} = require('electron');
// var win = remote.getCurrentWindow();

// import './menu'
const LoginScreen = () => {
  const [email, setEmail] = useState('')
  const [showpass, setshowpass] = useState(true)
  const [password, setPassword] = useState('')
  const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '', onConfirm: () => { } })
  let history = useHistory()

  const dispatch = useDispatch()

  const { loginReducer } = useSelector((state: RootState) => {
    return state


  })
  const handler = () => {
    setshowpass(!showpass)
  }

  const HandleMinimize = () => {
    console.log("chal gaya");
    // app.quit()
    // win.minimize();
  }
  const onSubmit = async () => {
    let data = {
      email: email,
      password: password
    }
    let result: any = await dispatch(userLogin(data))
    if (result.type === 'LOGIN_SUCCESS') {
      sessionStorage.setItem('token', result.response.data.data.token);
      sessionStorage.setItem("name", result.response.data.data.name);

      history.push("/task")
    }
    else if (result.type === 'LOGIN_ERROR') {
      console.log('fail')
      setNotify({
        isOpen: true,
        message: `Email Or Password Doesn't Match`,
        type: 'error'
      })
    }
  }

  return (
    <>
      <Box display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'} sx={{ maxWidth: '100vw', height: '100vh', maxHeight: '100%', color: 'secondary.main', backgroundImage: `url(${BackgroundImage})` }}>
        <Box display={'flex'} justifyContent={'flex-end'} sx={{ position: "absolute", top: "1px", width: "100%", }}  >
          <Box display={'flex'} sx={{ background: 'linear-gradient(to right, #DA792D, #AC609E)', borderBottomLeftRadius: 40, height: 30, width: 70, display: "flex", justifyContent: "flex-end", alignItems: "center" }} >
            <MinimizeIcon sx={{ position: "relative", top: "-7px", cursor: "pointer" }} onClick={HandleMinimize}/>
            <CloseIcon id="minimize" sx={{ cursor: "pointer" }} />
          </Box>
        </Box>
        <Box display={'flex'} alignItems={'center'} >
          <Grid container item xs={12} sm={12} md={6} lg={6} alignItems="center" justifyContent="space-between" direction="column" sx={{ filter: !loginReducer.loading ? 'blur(0px)' : 'blur(5px)' }}>
            <Paper elevation={10} style={{ minWidth: 500, backgroundColor: '#2121228f', paddingLeft: 20, paddingRight: 20, paddingTop: 30, paddingBottom: 30, borderRadius: 5, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
              <img src={Logo} alt='' width={100} height={100} />
              <Box display={'flex'} justifyContent={'flex-start'} alignItems={'flex-start'} width={'100%'} flexDirection={'column'}>
                <Typography color={'#768192'}>Login</Typography>
                <div />

                <CssTextField onChange={(e) => setEmail(e.target.value)} name="email" placeholder="Email" label="Email" variant="outlined" margin="normal" required fullWidth InputProps={{ startAdornment: <InputAdornment position="start"><Email /></InputAdornment>, style: { color: 'white' } }} />
                <CssTextField onChange={(e) => setPassword(e.target.value)} name="password" placeholder="Password" label="Password" variant="outlined" margin="normal" required fullWidth type={showpass ? "password" : "text"} InputProps={{ startAdornment: <InputAdornment position="start"><Lock /></InputAdornment>, style: { color: 'white', position: "relative" } }} />{showpass ? <VisibilityOffIcon onClick={handler} style={{ color: 'white', position: "relative", bottom: "49px", left: "450px", cursor: "pointer" }} /> : <VisibilityIcon onClick={handler} style={{ color: 'white', position: "relative", bottom: "49px", left: "450px", cursor: "pointer" }} />}
                <FormControlLabel control={<CssCheckboxField name="Web" color="secondary" style={{ color: 'white' }} />} label="Remember me" style={{ color: 'white', marginBottom: 10 }} />
                <div />
                <Box display={'flex'} justifyContent={'space-between'} width={'100%'}>
                  <CssGradientButton type="submit" onClick={onSubmit}>Login</CssGradientButton>
                  <CssTransparentButton style={{ color: "white" }} onClick={() => history.push(`/forgot`)}>Forgot Your Password?</CssTransparentButton>
                </Box>
              </Box>
            </Paper>
          </Grid>
          {
            loginReducer.loading ?
              <Box sx={{ position: 'absolute', left: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '80vh' }}>
                <Loader type="Bars" color="#DA792D" height={80} width={80} />
              </Box>
              : null
          }
          <Notifications notify={notify} setNotify={setNotify} />
          <ConfirmDialog confirmDialog={confirmDialog} setConfirmDialog={setConfirmDialog} />
        </Box>
      </Box>
    </>
  )

}

export default LoginScreen