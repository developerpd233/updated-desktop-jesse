import { CustomTextField } from '../../components/Textfield'
import { Grid, Box, Tab } from '@mui/material'
import { makeStyles } from '@mui/styles'
import CustomizeSelectComponent from '../../components/Select'
import { CustomCheckbox } from '../../components/Checkbox'
import { UserInfo } from '../../constant/Interface'
import { TabContext, TabList, TabPanel } from '@mui/lab'

const useStyles = makeStyles({
  divider: {
    background:'#C67B4D',
  },
  indicator: {
    background: "#C67B4D"
  },
  tabs: {
    "& button": {
      // padding: 5,
      color:'#fff'
    },
    "& button[aria-selected='true']": {
      position: "relative",
      color:'#fff',
      '&::after': {
        margin:'0px auto',
        content: '""',
        display: 'block',
        position:'absolute',
        bottom:0,
        right:0,
        left:0,
        borderBottom: 'solid 8px #C67B4D',
        borderLeft: 'solid 8px transparent',
        borderRight: 'solid 8px transparent',
        width: 0,
        height: 0,
      },
      "& > *": { zIndex: 0 },
      "& > .MuiTab-wrapper": {
        background: "#fff",
        height: "100%"
      }
    }
  },
  tabsPanel: {
    color:'#fff'
  },
  label: {
    fontSize:14,
    fontFamily:'roboto',
    textTransform:'capitalize'
  }
})

const UserInfo: React.FC<UserInfo> = ({newRecord}) => {
  const classes = useStyles()
  return(
    <Grid container columnSpacing={3} sx={{marginBottom:5}}>
      <Grid item xs={12} sm={12} md={4} lg={4} sx={{marginTop:4}}>
        <CustomTextField size="small" fullWidth InputProps={{ style: {  color: 'white'} }} placeholder='First Name' />
      </Grid>
      <Grid item xs={12} sm={12} md={4} lg={4} sx={{marginTop:4}}>
        <CustomTextField size="small" fullWidth InputProps={{ style: {  color: 'white'} }} placeholder='Last Name' />
      </Grid>
      <Grid item xs={12} sm={12} md={4} lg={4} sx={{marginTop:4}}>
        <CustomTextField size="small" fullWidth InputProps={{ style: {  color: 'white'} }} placeholder='Email' />
      </Grid>
      <Grid item xs={12} sm={12} md={4} lg={4} sx={{marginTop:4}}>
        <CustomTextField size="small" fullWidth InputProps={{ style: {  color: 'white'} }} placeholder='Telephone' />
      </Grid>
      <Grid item xs={12} sm={12} md={4} lg={4} sx={{marginTop:4}}>
        <CustomTextField size="small" fullWidth InputProps={{ style: {  color: 'white'} }} placeholder='Address Line 1' />
      </Grid>
      <Grid item xs={12} sm={12} md={4} lg={4} sx={{marginTop:4}}>
        <CustomTextField size="small" fullWidth InputProps={{ style: {  color: 'white'} }} placeholder='Address Line 2 House Number (optional)' />
      </Grid>
      <Grid item xs={12} sm={12} md={3} lg={3} sx={{marginTop:3}}>
        <CustomTextField size="small" fullWidth InputProps={{ style: {  color: 'white'} }} placeholder='City' />
      </Grid>
      <Grid item xs={12} sm={12} md={3} lg={3} sx={{marginTop:3}}>
        <CustomTextField size="small" fullWidth InputProps={{ style: {  color: 'white'} }} placeholder='Postal Code' />
      </Grid>
      <Grid item xs={12} sm={12} md={3} lg={3} sx={{marginTop:3}}>
        <CustomizeSelectComponent />
      </Grid>
      <Grid item xs={12} sm={12} md={3} lg={3} sx={{marginTop:3}}>
        <CustomTextField size="small" fullWidth InputProps={{ style: {  color: 'white'} }} placeholder='State' />
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12} sx={{marginTop:3}}>
        <Box display={'flex'} flexDirection={'row'} justifyContent={'flex-start'} alignItems={'center'}>
          <CustomCheckbox />
          <Box sx={{ width: '100%', typography: 'body1', padding:'0px 0px', borderRadius:4 }}>
            Shipping information same as Billing Information
          </Box>
        </Box>
      </Grid>
        {/* <Grid container columnSpacing={1} sx={{marginTop:2, marginBottom:2}} display={'flex'} justifyContent={'center'} alignItems={'center'}>
          <Button variant="contained" sx={{borderRadius:30, textTransform:'capitalize', padding:'5px 50px', background:'linear-gradient(to right, #DA792D, #AC609E)',}}>
            Save
          </Button>
        </Grid> */}
    </Grid>
  )
}

export default UserInfo
