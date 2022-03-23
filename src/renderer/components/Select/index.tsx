import {useState} from 'react'
import { Box, InputLabel, MenuItem, FormControl } from '@mui/material'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles({
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
          fontFamily: 'poppins',
          borderBottom: '1px solid #ccc'
      },
      '& div': {
          fontSize: 13,
          fontFamily: 'poppins',
          borderBottom: '1px solid #ccc',
          padding: '0 15px',
          '& p': {
              fontSize: 13,
              fontFamily: 'poppins',
              margin: '5px 0'
          }
      },
  },
});


const CustomizeSelect = () => {
  const classes = useStyles();
  const [age, setAge] = useState('')
  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  }
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <Select value={age} onChange={handleChange} size='small' MenuProps={{ classes: { paper: classes.select } }} inputProps={{classes:{icon: classes.icon}}} className={classes.root}>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
    </Box>
  )
}

export default CustomizeSelect
