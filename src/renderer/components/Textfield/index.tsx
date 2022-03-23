import { withStyles } from '@mui/styles'
import { TextField } from '@mui/material'

export const CustomTextField = withStyles({
  root: {
    background:'#17171A',
    color: '#fff',
    fontSize:10,
    borderRadius:6,
    "& .MuiInput-icon": {
      color: "#ffffff"
    },
    // boxShadow:'5px 10px #17171A',
    '& .MuiInputLabel-root': {
        color: '#fff',
    },
    '& .MuiFormLabel-root-MuiInputLabel-root': {
        color: '#fff',
    },
    '& label.Mui-focused': {
        color: '#fff',
    },
    '& .MuiInput-underline:after': {
        borderBottomColor: '#fff',
    },
    '& .MuiInputAdornment-root': {
        color: '#fff',
    },
    '& .MuiInputBase-root-MuiOutlinedInput-root': {
        color: '#fff',
        fontSize:10,
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: 'transparent',
        },
        '&:hover fieldset': {
            borderColor: 'transparent',
        },
        '&.Mui-focused fieldset': {
            borderColor: 'transparent',
        },
    },
},
})(TextField)

export const CssTextField = withStyles({
    root: {
        '& .MuiInputLabel-root': {
            color: '#fff',
        },
        '& .MuiFormLabel-root-MuiInputLabel-root': {
            color: '#fff',
        },
        '& label.Mui-focused': {
            color: '#fff',
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: '#fff',
        },
        '& .MuiInputAdornment-root': {
            color: '#fff',
        },
        '& .MuiInputBase-root-MuiOutlinedInput-root': {
            color: '#fff',
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: '#fff',
            },
            '&:hover fieldset': {
                borderColor: '#fff',
            },
            '&.Mui-focused fieldset': {
                borderColor: '#fff',
            },
        },
    },
})(TextField);


export const TextField2 = withStyles({
  root: {
      '& .MuiInput-underline:after': {
          borderBottomColor: '#ffffff',
      },
      "& .MuiSelect-icon": {
          color: "#ffffff"
      },
      "& .MuiInput-icon": {
          color: "#ffffff"
      },
  },})(TextField);
