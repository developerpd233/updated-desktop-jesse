import { Box, Paper, Grid, Typography, } from '@mui/material';
import BackgroundImage from '../../assets/bg.png'
import { CssTextField } from '../../components/Textfield'
import { CssGradientButton } from '../../components/Button'
import { useHistory } from "react-router-dom"
import { baseURL } from '../../constant/url'
import { useState } from 'react';
import { Forgettask } from '../../redux/actions/task-action'
import { useDispatch } from "react-redux"
import MinimizeIcon from '@mui/icons-material/Minimize';
import Loader from "react-loader-spinner";
import CloseIcon from '@mui/icons-material/Close';
const axios = require("axios")
const ForgotPasswordScreen = () => {

    let history = useHistory()
    const dispatch = useDispatch();
    const [load, setload] = useState(false)
    const [email, setemail] = useState('')
    const [validation, setValidation] = useState(null)
    const validateEmail = async () => {
        //    const result = email.toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        // const pat = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        // const result = pat.test(email)

        // if (result) {
        //     setValidation(result)
        // } else {
        //     setValidation(result)
        // }
        // console.log(email, result, validation)

        let obj = {
            email: email
        }
        setload(true)
        let results: any = await dispatch(Forgettask(obj))
        console.log(results, 'result');
setload(false)
        history.push("")

        // for (var i in allTasks) {
        //     let obj = { task_status: "start" }
        //     let url = `${baseURL}tasks/${allTasks[i].id}`;

        //     axios({
        //         method: "Post",
        //         url: url,
        //         headers: {
        //             Accept: "application/json",
        //             "Content-Type": "application/x-www-form-urlencoded",
        //             Authorization: `Bearer ${sessionStorage.getItem('token')}`
        //         },
        //         data: obj,
        //     }).then((response: any) => {
        //         console.log(response, 'response');

        //     }).catch((error: any) => {
        //         console.log(error, 'error')
        //         if (error.message === "Network Error") {

        //         }
        //         if (error.response.status === 401) {

        //         }
        //     })
        // }

    }
    const onSubmit = () => {
        history.push("")
    }

    return (
        <>
        {load?
            <Box sx={{ backgroundImage: `url(${BackgroundImage})`, paddingTop: 5, paddingLeft: 2, paddingRight: 10, display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100vh' }}>
                <Loader type="Bars" color="#DA792D" height={80} width={80} />
            </Box>
            
            
            :
            <Box display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'} sx={{ maxWidth: '100vw', height: '100vh', maxHeight: '100%', color: 'secondary.main', backgroundImage: `url(${BackgroundImage})` }}>
                <Box display={'flex'} justifyContent={'flex-end'} sx={{ position: "absolute", top: "1px", width: "100%", }}  >
                    <Box display={'flex'} sx={{ background: 'linear-gradient(to right, #DA792D, #AC609E)', borderBottomLeftRadius: 40, height: 30, width: 70, display: "flex", justifyContent: "flex-end", alignItems: "center" }} >
                        <MinimizeIcon sx={{ position: "relative", top: "-7px", cursor: "pointer" }} />
                        <CloseIcon sx={{ cursor: "pointer" }} />

                    </Box>

                </Box>


                <Box display={'flex'} alignItems={'center'}>
                    <Grid container item xs={12} sm={12} md={6} lg={6} alignItems="center" justifyContent="space-between" direction="column">
                        <Paper elevation={10} style={{ minWidth: 500, backgroundColor: '#2121228f', paddingLeft: 20, paddingRight: 20, paddingTop: 30, paddingBottom: 30, borderRadius: 5, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start' }}>
                            <Typography variant="h1" color={'#3C4B64'}>Jesse</Typography>
                            <Box display={'flex'} justifyContent={'flex-start'} alignItems={'flex-start'} width={'100%'} flexDirection={'column'}>
                                <Typography color={'#768192'}>Reset Password</Typography>
                                <div />
                                <CssTextField name="email" placeholder="Email" onChange={(e) => { setemail(e.target.value) }} label="Email" variant="outlined" margin="normal" required fullWidth InputProps={{ style: { color: 'white' } }} />
                                <Typography style={{ color: "red" }}>{validation == false ? "invalid_email" : null}</Typography>
                                <div />
                                <Box display={'flex'} justifyContent={'flex-end'} width={'100%'} sx={{ marginTop: 2 }}>

                                    <CssGradientButton type="submit" onClick={validateEmail} style={{ marginRight: "10px" }} >Send Password Reset Link</CssGradientButton>

                                    <CssGradientButton type="submit"
                                        onClick={onSubmit}

                                    >cancel</CssGradientButton>
                                </Box>
                            </Box>
                        </Paper>
                    </Grid>
                </Box>
            </Box>
}
        </>
    )


};





export default ForgotPasswordScreen