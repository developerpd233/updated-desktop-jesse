import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Typography } from '@mui/material'
import { ConfirmDialogOrderInterface } from '../../constant/Interface'
import { NotListedLocation } from '@mui/icons-material'
import { useStyles } from '../../constant/customStyles'

const ConfirmDialog = ({ confirmDialog, setConfirmDialog }) => {
    const classes = useStyles()
    console.log(confirmDialog, 'confirmDialog');
    return (
        <Dialog open={confirmDialog.isOpen} classes={{ paper: classes.dialog }}>
            <DialogTitle className={classes.dialogTitle}>
                <img src={`${confirmDialog.order_image}`} />
            </DialogTitle>
            <DialogContent className={classes.dialogContent}>
                <Typography variant='h6'>{`Product Name: ${confirmDialog.product_name}`}</Typography>
                <Typography variant='subtitle2'>{`Product Description: ${confirmDialog.product_description}`}</Typography>
                <Typography variant='subtitle2'>{`Product Price: ${confirmDialog.product_price}`}</Typography>
                <Typography variant='subtitle2'>{`Product Quantity: ${confirmDialog.product_qty}`}</Typography>
                <Typography variant='subtitle2'>{`Product Quantity: ${confirmDialog?.task?.product}`}</Typography>
                
                {/* <Typography variant='subtitle2'>{confirmDialog.product_description}</Typography>
                <Typography variant='subtitle2'>{confirmDialog.product_description}</Typography>
                <Typography variant='subtitle2'>{confirmDialog.product_description}</Typography> */}

            </DialogContent>
            <DialogActions className={classes.dialogAction}>
                <Button variant="outlined" color="error" onClick={() => setConfirmDialog({ ...confirmDialog, isOpen: false })}>Cancel</Button>
                {/* <Button variant="contained" color="error" onClick={confirmDialog.onConfirm}>Yes</Button> */}
            </DialogActions>
        </Dialog>
    );
};
export default ConfirmDialog;