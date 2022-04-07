import { Box, Paper, Grid, Typography,} from '@mui/material';
import BackgroundImage from '../../assets/bg.png'
import { CssTextField } from '../../components/Textfield'
import { CssGradientButton } from '../../components/Button'
import { useHistory } from "react-router-dom"
import { useState } from 'react';

const ForgotPasswordScreen = () => {
    let history = useHistory()

    const [email, setemail] = useState('')
    const [validation, setValidation] = useState(null)
        const validateEmail = () => {
        //    const result = email.toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        const pat=/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const result = pat.test(email)
  
        if(result)
        {
         setValidation(result)
        }else
        {
       setValidation(result)
        }
        console.log(email,result,validation)
          };
       
          
        

 

    const onSubmit = () => {
        history.push("/LoginScreen")
    }
    
    return (
        <Box display={'flex'} justifyContent={'center'} alignItems={'center'} sx={{ maxWidth:'100vw',  height:'98vh', maxHeight:'100%', color: 'secondary.main', backgroundImage:`url(${BackgroundImage})` }}>
            <Grid container item xs={12} sm={12} md={6} lg={6} alignItems="center" justifyContent="space-between" direction="column">
                <Paper elevation={10} style={{minWidth: 500, backgroundColor:'#2121228f', paddingLeft: 20, paddingRight: 20,  paddingTop: 30, paddingBottom: 30, borderRadius: 5, display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'flex-start'}}>
                    <Typography variant="h1" color={'#3C4B64'}>Jesse</Typography>
                    <Box display={'flex'} justifyContent={'flex-start'} alignItems={'flex-start'} width={'100%'} flexDirection={'column'}>
                        <Typography color={'#768192'}>Reset Password</Typography>
                        <div />
                        <CssTextField name="email" placeholder="Email"onChange={(e)=>{setemail(e.target.value)}} label="Email" variant="outlined" margin="normal" required fullWidth InputProps={{ style: {  color: 'white'} }} />
                        <Typography style={{color:"red"}}>{validation==false?"invalid_email":null}</Typography>
                        <div />
                        <Box display={'flex'} justifyContent={'flex-end'} width={'100%'} sx={{marginTop:2}}>
                         
                            <CssGradientButton type="submit" onClick={validateEmail} style={{marginRight:"10px"}} >Send Password Reset Link</CssGradientButton>
                            
                            <CssGradientButton type="submit" onClick={onSubmit} >cancel</CssGradientButton>
                        </Box>
                    </Box>
                </Paper>
            </Grid>
        </Box>
    )
}

export default ForgotPasswordScreen