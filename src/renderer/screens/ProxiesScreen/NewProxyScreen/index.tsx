

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { makeStyles } from '@mui/styles';
import BackgroundImage from '../../../assets/bg.png';
// import AddCircleIcon from '@mui/icons-material/AddCircle';
import {FiDownload} from 'react-icons/fi';

function NewProxyScreen(){
  const classes = useStyles();

  return(
    <>
    <Box className={classes.newProxiesdiv}>
     <Container maxWidth='sm'>
      <Grid container>
        <Grid xs={12} className={classes.main_container}>
          {/* <Box className={classes.padding_box}>
            <Box>
              <AddCircleIcon className={classes.add_icon}/>
            </Box>
            <Box>
              <h4 className={classes.addproxies_heading}>Add Proxies</h4>
            </Box>
          </Box> */}

          <Box>
            <h6 className={classes.proxies_heading2}>Proxies</h6>
          </Box>
          <Box>
            <textarea  className={classes.input_field_area}>

              </textarea>
   
          </Box>
          <Box className={classes.flex_center}>
          <FiDownload className={classes.dowmload_icon}/>
          </Box>
          <Box >
          <p className={classes.drop_para}>or drag and drop a .txt file here</p>
          </Box>
          <Box>
            <button className={classes.btn_import}>Import (0) New Proxies</button>
          </Box>
        </Grid>

      </Grid>
     </Container>

    </Box>
    </>
  )
};


const useStyles = makeStyles({
  newProxiesdiv : {
    maxWidth:'100vw',
    height:'100vh', 
    maxHeight:'80%', 
    color: 'secondary.main', 
    backgroundImage:`url(${BackgroundImage})`,
     padding:'80px 20 20 20px' ,
     display :"flex",
     justifyContent : "center",
    paddingTop:"180px",


  },
  add_icon : {
    color : "#C67B4D",
    fontSize  :"40px",
    transition : "0.4s ease",
    cursor : "pointer",
    '&:hover':{
      color  :"#fff"
    }


  },
  dowmload_icon : {
    color : "#C67B4D",
    fontSize  :"30px",
    transition : "0.4s ease",
    cursor : "pointer",
    '&:hover':{
      color  :"#fff"
    }

  },

  main_container : {
    // border : "1px solid #C67B4D",
    padding:"20px 20px",
    background : "#00000063",
  },

  padding_box : {
    // paddingTop:"130px",
   
    display :"flex"
  },

  addproxies_heading : {
    fontFamily: 'roboto', 
    fontWeight: 400,
     color: '#C67B4D',
      fontSize: 20, 
      margin : "8px 0px 0px 8px",
  },
  proxies_heading2 : {
    fontFamily: 'roboto', 
    fontWeight: 400,
     color: '#fff',
      fontSize: 16, 
      marginBottom : "10px"

  },

  input_field_area : {
    // border : "none",
    background :"transparent",
    width : "100%",
    height  :"300px",
    border : "2px solid #C67B4D",
    // color  :"#ffffff",
    color: '#fff',
    fontSize: 16, 
    boxSizing : "border-box",
    padding : "15px",
    '&:focus':{
      outline : "none"
    }
  },

  flex_center : {
    display : 'flex',
    justifyContent : 'center',
    paddingTop:"20px"
  },
  drop_para : {
    fontFamily: 'roboto', 
    fontWeight: 400,
     color: '#fff',
      fontSize: 12,
      textAlign : "center"
  },
  btn_import : {
    fontFamily: 'roboto', 
    fontWeight: 400,
     color: '#fff',
      fontSize: 16, 
      width : "100%",
      textAlign : "center",
      cursor : "pointer",
      background : '#C67B4D',
      border : "none",
      height :"50px",
      borderRadius :"5px",
      '&:hover':{
        background : "#c67b4d75"
      }


  }
})

export default NewProxyScreen;
// "package-win": "electron-packager . Jesse --overwrite --asar=true --platform=win32 --arch=ia32 --icon=assets/icons/win/icon.ico --prune=true --out=release-builds --version-string.CompanyName=CE --version-string.FileDescription=CE --version-string.ProductName=\"Jesse\""