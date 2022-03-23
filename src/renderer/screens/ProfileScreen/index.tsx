import { Box, Grid } from '@mui/material';
import BackgroundImage from '../../assets/bg.png'
import { CssGradientButton } from '../../components/Button'
import { useHistory } from "react-router-dom"
import TableComponent from '../../components/Table'
import { profileColumns } from '../../constant/Columns'
import { ProfileTableData } from '../../constant/Interface'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons'
import { profileList, deleteProfile } from '../../redux/actions/profile-action'
import { useDispatch, useSelector } from "react-redux"
import { RootState } from 'renderer/redux/reducers'
import { useState, useEffect } from 'react'
import Notifications from '../../components/Notifications'
import ConfirmDialog from '../../components/ConfirmDialogbox'
import Loader from "react-loader-spinner"

const ProfileScreen = () => {
  const [rows, setRows] = useState<ProfileTableData[]>([])
  const [notify, setNotify] = useState({isOpen: false, message:'', type:''})
  const [confirmDialog, setConfirmDialog] = useState({isOpen: false, title: '', subTitle: '', onConfirm: () => {}})

  let history = useHistory()

  const dispatch = useDispatch()
  const {getAllProfileReducer} = useSelector((state: RootState) => {
    return state
  })

  function maskify(cc: string) {
    // cc = numberFormat(cc)
    return cc.replace(/.(?=.{4})/g, "x");
    // return cc.replace(/(.{4})/g, "$1-");
  }

// const numberFormat = (cc: string) => {
//   return cc.replace(/(.{4})/g, "$1-");
// }

  const updateRecord = (id: any) => {
    sessionStorage.setItem('profileId', id)
    history.push(`/new-profile/${id}`)
  }

  const deleteRecord = async(id: any) => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false
    })
    let result: any = await dispatch(deleteProfile(id))
    if (result.type === 'PROFILE_DELETE_SUCCESS') {
      setNotify({
        isOpen: true,
        message: 'Deleted Successfully',
        type: 'error'
      })
      fetchMyAPI()
    }
    else if (result.type === 'PROFILE_DELETE_ERROR') {
      console.log('fail')
    }

  }

  const fetchMyAPI = async()  => {
    let result: any = await dispatch(profileList())
    if (result.type === 'PROFILE_LIST_SUCCESS') {
      const row: any = [];
      let obj: any = {}
      result.response.data.data?.map((data: any, index: number) => {
        obj = createData(index++, data.name + ' ' + data.lastname, data.email,  data.card_no && data.card_no ? maskify(data.card_no) : 'N/A', data.expire,
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
                  onConfirm: () => {  deleteRecord(data.id) }
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
    else if (result.type === 'PROFILE_LIST_ERROR') {
      // if (typeof (result.response) === 'string')
      //     setEmpty(result.response)
      // else
      //     setEmpty(result.response.data.messageText.mesg)
    }
  }

  useEffect(() => {
    fetchMyAPI()
  }, [])

  const createData = (id: number, name: string, email: string,  creditCard: string, expire:any, action: any): ProfileTableData => {
    return { id, name, email,  creditCard, expire, action };
  }

  const createNewUser = () => {
    sessionStorage.removeItem('profileId')
    history.push('/new-profile')
  }

  return (
    <Box display={'flex'} justifyContent={'flex-start'} flexDirection={'column'} sx={{ maxWidth:'100vw',  height:'calc(100vh - 128px)', color: 'secondary.main', backgroundImage:`url(${BackgroundImage})`, padding:'20px 20px' }}>
      <Box display={'flex'} justifyContent={'flex-end'} flexDirection={'row'}>
        <Grid container item xs={12} sm={12} md={12} lg={12} alignItems="center" justifyContent="flex-end" direction="row" sx={{}}>
          <Box sx={{marginBottom:5}}>
            <CssGradientButton type="submit" onClick={createNewUser}>New User</CssGradientButton>
          </Box>
        </Grid>
      </Box>
      {/* <TableComponent columns={profileColumns} rows={rows} /> */}
      <TableComponent columns={profileColumns} rows={rows} loader={getAllProfileReducer?.loading} />

      {/* {!getAllProfileReducer.loading ?
          <TableComponent columns={profileColumns} rows={rows} />
        :
        <Box sx={{  display:'flex', justifyContent:'center', alignItems:'center', width:'100%', height:'80vh'}}>
          <Loader type="Bars" color="#DA792D" height={80} width={80}  />
        </Box>
      } */}
      <Notifications notify={notify} setNotify={setNotify } />
      <ConfirmDialog confirmDialog={confirmDialog} setConfirmDialog={setConfirmDialog } />
    </Box>
  )
}

export default ProfileScreen
