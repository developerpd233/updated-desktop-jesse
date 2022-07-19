import { withStyles } from '@mui/styles'
import { Radio } from '@mui/material'


export const StyledRadio =  withStyles({
  root: {
    color:'#fff',
    '&$checked': {
      color: '#C67B4D',
    },
  },
  checked: {}

})(Radio);
