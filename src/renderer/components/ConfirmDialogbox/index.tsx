import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Typography } from '@mui/material'
import { ConfirmDialogInterface } from '../../constant/Interface'
import { NotListedLocation } from '@mui/icons-material'
import { useStyles } from '../../constant/customStyles'

const ConfirmDialog: React.FC<ConfirmDialogInterface>  = ({ confirmDialog, setConfirmDialog }) => {
  const classes = useStyles()
  return (
    <Dialog open={confirmDialog.isOpen} classes={{paper: classes.dialog}}>
      <DialogTitle className={classes.dialogTitle}>
        <IconButton disableRipple className={classes.titleIcon}>
          <NotListedLocation />
        </IconButton>
      </DialogTitle>
      <DialogContent className={classes.dialogContent}>
        <Typography variant='h6'>{confirmDialog.title}</Typography>
        <Typography variant='subtitle2'>{confirmDialog.subTitle}</Typography>
      </DialogContent>
      <DialogActions className={classes.dialogAction}>
      <Button variant="outlined" color="error" onClick={()=>setConfirmDialog({ ...confirmDialog, isOpen: false})}>No</Button>
      <Button variant="contained" color="error" onClick={confirmDialog.onConfirm}>Yes</Button>
      </DialogActions>
    </Dialog>
  );
};
export default ConfirmDialog;