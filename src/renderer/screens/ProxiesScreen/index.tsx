import { Box, Grid } from '@mui/material';
import BackgroundImage from '../../assets/bg.png'
import { CssGradientButton } from '../../components/Button'
import { useHistory } from "react-router-dom"
import TableComponent from '../../components/Table'
import { proxiesolumns } from '../../constant/Columns'
import { ProxiesTableData } from '../../constant/Interface'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect } from 'react'
import Notifications from '../../components/Notifications'
import ConfirmDialog from '../../components/ConfirmDialogbox'
import Loader from "react-loader-spinner"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from 'renderer/redux/reducers'
import { proxyList, deleteProxy } from '../../redux/actions/proxy-action'

const ProxiesScreen = () => {
  const [rows, setRows] = useState<ProxiesTableData[]>([])
  const [notify, setNotify] = useState({isOpen: false, message:'', type:''})
  const [confirmDialog, setConfirmDialog] = useState({isOpen: false, title: '', subTitle: '', onConfirm: () => {}})

  let history = useHistory()

  const dispatch = useDispatch()
  const { getAllProxyReducer } = useSelector((state: RootState) => {
    return state
  })
 

  const createData = (id: number, proxy: any, name: string, status: any, action: any): ProxiesTableData  => {
    return { id,  proxy, name, status, action };
  }

  const deleteProxyData= async(id: any) => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false
    })
    let result: any = await dispatch(deleteProxy(id))
    if (result.type === 'PROXY_DELETE_SUCCESS') {
      setNotify({
        isOpen: true,
        message: 'Deleted Successfully',
        type: 'error'
      })
      fetchMyAPI()
    }
    else if (result.type === 'PROXY_DELETE_ERROR') {
      console.log('fail')
    }
  }

  const updateRecord = (id: any) => {
    sessionStorage.setItem('proxyId', id)
    history.push(`/new-proxies/${id}`)
  }

  async function fetchMyAPI() {
    let result: any = await dispatch(proxyList())
    if (result.type === 'PROXY_LIST_SUCCESS') {
      const row: any = [];
      let obj: any = {}
      result.response.data.data?.map((data: any, index: number) => {
        obj = createData(index++, data.proxy, data.name, data.status === '1' ? 'Enable' : 'Disable',
        <Box display="flex" flexDirection="row" justifyContent="space-around">
            <Grid container>
                <Grid item xs={12} md={6}>
                  <Box onClick={()=>updateRecord(data.id)} style={{cursor: 'pointer'}}><FontAwesomeIcon icon={faEdit} size="1x" /></Box>
                </Grid>
                <Grid item xs={12} md={6}>
                <Box onClick={()=>
                  setConfirmDialog({
                    isOpen: true,
                    title: 'Are You Sure to Delete?',
                    subTitle: "You can't undo this operation",
                    onConfirm: () => {  deleteProxyData(data.id) }
                  })} style={{cursor: 'pointer'}}>
                    <FontAwesomeIcon icon={faTrashAlt} size="1x" />
                </Box>
                </Grid>
            </Grid>
        </Box>)
        row.push(obj)
    })
    setRows(row)
    }
    else if (result.type === 'PROXY_LIST_ERROR') {
        // if (typeof (result.response) === 'string')
        //     setEmpty(result.response)
        // else
        //     setEmpty(result.response.data.messageText.mesg)
    }
  }

  useEffect(() => {
    fetchMyAPI()
  }, [])

  const createNewProxy = () => {
    sessionStorage.removeItem('proxyId')
    history.push('/new-proxies')
  }

  return (
    <Box sx={{ maxWidth:'100vw',  height:'calc(100vh - 160px)', maxHeight:'80%', color: 'secondary.main', backgroundImage:`url(${BackgroundImage})`, padding:'20px 20px' }}>
      <Box display={'flex'} justifyContent={'flex-end'} flexDirection={'row'}>
        <Grid container item xs={12} sm={12} md={12} lg={12} alignItems="center" justifyContent="flex-end" direction="row" sx={{}}>
          <Box sx={{marginBottom:5}}>
              <CssGradientButton type="submit" onClick={createNewProxy}>New Proxies</CssGradientButton>
          </Box>
        </Grid>
      </Box>
      <Box sx={{ paddingTop:5, paddingLeft:10, paddingRight:10, overflow: 'hidden' }}>
    
        <TableComponent columns={proxiesolumns} rows={rows} loader={getAllProxyReducer?.loading} />
      </Box>
      <Notifications notify={notify} setNotify={setNotify } />
      <ConfirmDialog confirmDialog={confirmDialog} setConfirmDialog={setConfirmDialog } />
    </Box>
  )
}

export default ProxiesScreen
