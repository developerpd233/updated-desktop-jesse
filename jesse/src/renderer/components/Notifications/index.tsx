import React from 'react'
import { Snackbar } from '@mui/material'
import { Alert } from '@mui/lab'
import { NotificationInterface } from '../../constant/Interface'

const Notifications: React.FC<NotificationInterface>  = ({ notify, setNotify }) => {

  const handleClose = (event: any, reason: any) => {
    if(reason === 'clickaway')
      return
    setNotify({
      ...notify,
      isOpen:false
    })
  }
  return (
    <Snackbar open={notify.isOpen} autoHideDuration={3000} anchorOrigin={{vertical:'top', horizontal:'right'}} onClose={handleClose}>
      <Alert severity={notify.type}>
        {notify.message}
      </Alert>
    </Snackbar>
  )
}

export default Notifications
