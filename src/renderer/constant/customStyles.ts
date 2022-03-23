import { createTheme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles'

export const theme = createTheme({
  palette:{
    primary:{
      main:'#2E2E2E'
    },
    secondary: {
      light: '#fff',
      main: '#fff',
      dark: '#fff',
      contrastText: '#fff',
    },
  },
  typography: {
    h1: {
      fontSize: '2.1875rem',
      fontWeight: 600
    },
    button: {
      fontFamily: [
        'Roboto',
        'sans-serif',
      ].join(','),
    },
    fontFamily: [
      'Roboto',
      'sans-serif',
    ].join(','),
  },

});

export const useStyles = makeStyles({
  indicator: {
    background: "#C67B4D"
  },
  tabs: {
    "& button": {
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
  },
  root: {
    background:'#17171A',
    color:'#fff',
  },
  icon: {
    fill: '#fff',
  },
  select: {
    '& ul': {
        maxHeight: 150,
    },
    '& li': {
        fontSize: 13,
        fontFamily: 'roboto',
        borderBottom: '1px solid #ccc',
        textTransform: 'capitalize'
    },
    '& li:last-child': {
      borderBottom: '0px solid #ccc',
    },
    '& div': {
        fontSize: 13,
        fontFamily: 'roboto',
        borderBottom: '1px solid #ccc',
        padding: '0 15px',
        '& p': {
          fontSize: 13,
          fontFamily: 'roboto',
          margin: '5px 0',
        }
    },
  },
  divider: {
    background:'#C67B4D',
  },
  dialog: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  dialogTitle: {
    textAlign: 'center'
  },
  dialogContent: {
    textAlign: 'center'
  },
  dialogAction: {
    justifyContent: 'center'
  },
  titleIcon: {
    backgroundColor: '#F85160',
    color: theme.palette.secondary.main,
    '&:hover': {
      backgroundColor: '#F85160',
      cursor: 'default',
    },
    '& .MuiSvgIcon-root': {
      fontSize:'8rem'
    }
  }
})
