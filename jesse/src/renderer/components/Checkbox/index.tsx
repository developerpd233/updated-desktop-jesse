import { withStyles } from '@mui/styles'
import { Checkbox } from '@mui/material'

export const CssCheckboxField = withStyles({
    root: {
        '& .MuiFormControlLabel-label': {
            color:'#fff',
        },
        '& .MuiFormControlLabel-root' : {
            color:'#fff',
        },
        '& .css-1960bxs-MuiTypography-root': {
            color:'#fff',
        }
    }
})(Checkbox);

export const CustomCheckbox = withStyles({
  root: {
    color: "gray",
    "& .MuiIconButton-label": {
      position: "relative",
      zIndex: 0
    },
    '&$checked': {
      color: '#C67B4D',
    },
    "&:not($checked) .MuiIconButton-label:after": {
      content: '""',
      left: 4,
      top: 4,
      height: 15,
      width: 15,
      position: "absolute",
      backgroundColor: "white",
      zIndex: -1
    }
  },
  checked: {}

})(Checkbox)