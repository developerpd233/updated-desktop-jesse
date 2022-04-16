import { withStyles } from '@mui/styles'
import { Button } from '@mui/material'

export const CssButton = withStyles({
    root: {
        color: '#fff',
        backgroundColor: '#cd563e',
        textTransform:'capitalize',
        fontFamily:'Roboto',
        '&:hover': {
            backgroundColor: '#2a1ab9',
        },
    },
})(Button);

export const CssTransparentButton = withStyles({
    root: {
        color: '#231698',
        backgroundColor: 'transparent',
        textTransform:'capitalize',
        '&:hover': {
            backgroundColor: 'transparent',
            textDecroation:'underline',
            color: '#231698',
        },
    },
})(Button);

export const CssGradientButton = withStyles({
    root: {
        color: '#fff',
        background: 'linear-gradient(to right, #DA792D, #AC609E)',
        textTransform:'uppercase',
        borderRadius:30,
        padding:'8px 40px',
        '&:hover': {
            backgroundPosition: "100% 0",
            transition: 'all .4s ease-in-out'
            // background: '#272727',
            // textDecroation:'underline',
            // color: 'linear-gradient(to right, #DA792D, #AC609E)',
        },
    },
})(Button);



export const StartTaskButton = withStyles({
    root: {
        color: '#fff',
        background: 'linear-gradient(to right, #DA792D, #AC609E)',
        textTransform:'uppercase',
        borderRadius:30,
        padding:'0px 15px',
        left:-5,
        '&:hover': {
            backgroundPosition: "100% 0",
            transition: 'all .4s ease-in-out'
            // background: '#272727',
            // textDecroation:'underline',
            // color: 'linear-gradient(to right, #DA792D, #AC609E)',
        },
    },
})(Button);

export const CssBlackButton = withStyles({
  root: {
      color: '#fff',
      background: '#272727',
      textTransform:'capitalize',
      borderRadius:30,
      padding:'8px 20px',
      // fontSize:6,
      '&:hover': {
          background: '#fff',
          textDecroation:'underline',
          color: '#272727',
      },
  },
})(Button);
