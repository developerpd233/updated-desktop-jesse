import { Box, Paper, Grid, Typography,} from '@mui/material';
import BackgroundImage from '../../assets/bg.png'
import { CssTextField } from '../../components/Textfield'
import { CssGradientButton } from '../../components/Button'
import { useHistory } from "react-router-dom"

const ForgotPasswordScreen = () => {
    let history = useHistory()
    const onSubmit = () => {
        history.push("/profile")
    }
    return (
        <Box display={'flex'} justifyContent={'center'} alignItems={'center'} sx={{ maxWidth:'100vw',  height:'98vh', maxHeight:'100%', color: 'secondary.main', backgroundImage:`url(${BackgroundImage})` }}>
            <Grid container item xs={12} sm={12} md={6} lg={6} alignItems="center" justifyContent="space-between" direction="column">
                <Paper elevation={10} style={{minWidth: 500, backgroundColor:'#2121228f', paddingLeft: 20, paddingRight: 20,  paddingTop: 30, paddingBottom: 30, borderRadius: 5, display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'flex-start'}}>
                    <Typography variant="h1" color={'#3C4B64'}>Jesse</Typography>
                    <Box display={'flex'} justifyContent={'flex-start'} alignItems={'flex-start'} width={'100%'} flexDirection={'column'}>
                        <Typography color={'#768192'}>Reset Password</Typography>
                        <div />
                        <CssTextField name="email" placeholder="Email" label="Email" variant="outlined" margin="normal" required fullWidth InputProps={{ style: {  color: 'white'} }} />
                        <div />
                        <Box display={'flex'} justifyContent={'space-between'} width={'100%'} sx={{marginTop:2}}>
                            <CssGradientButton type="submit" fullWidth onClick={onSubmit}>Send Password Reset Link</CssGradientButton>
                        </Box>
                    </Box>
                </Paper>
            </Grid>
        </Box>
    )
}

export default ForgotPasswordScreen