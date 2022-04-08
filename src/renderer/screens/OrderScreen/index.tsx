import { Box, Grid } from '@mui/material';
import BackgroundImage from '../../assets/bg.png'
import { CssGradientButton } from '../../components/Button'
import { useHistory } from "react-router-dom"
import TableComponent from '../../components/Table'
import { orderColumns } from '../../constant/Columns'
import {OrderData} from '../../constant/Interface'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from "react-redux"
import {orderList} from '../../redux/actions/order-action'
import {useState, useEffect} from 'react'
import { RootState } from 'renderer/redux/reducers';
import Loader from "react-loader-spinner"

const OrderScreen = () => {
    let history = useHistory()
    const [rows, setRows] = useState<OrderData[]>([])

    const dispatch = useDispatch()

    const {getAllOrderReducer} = useSelector((state: RootState) => {
        return state
    })

  async function fetchMyAPI() {
    let result: any = await dispatch(orderList())
    if (result.type === 'ORDER_LIST_SUCCESS') {
      const row: any = [];
      let obj: any = {}
      result.response.data.data?.map((data: any, index: number) => {
        obj = createData(index++,
          <img src={data.order_image !== null ? data.order_image : 'https://previews.123rf.com/images/pixdesign123/pixdesign1231204/pixdesign123120400193/13577444-happy-chef-with-best-luck.jpg'} alt="" style={{ width: 50, height: 50, borderRadius: 5 }} />
          , data.product_name, data.product_description, data.product_price, data.product_qty,
        <Box display="flex" flexDirection="row" justifyContent="space-around">
            <Grid container>
                <Grid item xs={12} md={6}>
                    <Box><FontAwesomeIcon icon={faEdit} size="1x" /></Box>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Box><FontAwesomeIcon icon={faTrashAlt} size="1x" /></Box>
                </Grid>
            </Grid>
        </Box>)
        row.push(obj)
    })
    setRows(row)
    }
    else if (result.type === 'ORDER_LIST_ERROR') {
        // if (typeof (result.response) === 'string')
        //     setEmpty(result.response)
        // else
        //     setEmpty(result.response.data.messageText.mesg)
    }
  }

  useEffect(() => {
    fetchMyAPI()
  }, [])

  const createData = (id: number, image: any, name: string, description: string, price: number, quantity: number, action: any): OrderData => {
      return { id, image, name, description, price, quantity, action };
  }

  const createNewTask = () => {
    history.push('/new-task')
  }

  return (
    <Box sx={{ maxWidth:'100vw',  height:'calc(100vh - 128px)', maxHeight:'100%', color: 'secondary.main', backgroundImage:`url(${BackgroundImage})`, padding:'20px 20px' }}>
      {/* <Box display={'flex'} justifyContent={'flex-end'} flexDirection={'row'}>
        <Grid container item xs={12} sm={12} md={12} lg={12} alignItems="center" justifyContent="flex-end" direction="row" sx={{}}>
          <Box sx={{marginRight:2}}>
            <CssGradientButton type="submit">Export</CssGradientButton>
          </Box>
          <Box sx={{marginRight:2}}>
            <CssGradientButton type="submit">Import</CssGradientButton>
          </Box>
          <Box>
            <CssGradientButton type="submit" onClick={createNewTask}>New Task</CssGradientButton>
          </Box>
        </Grid>
      </Box> */}
      <TableComponent columns={orderColumns} rows={rows} loader={getAllOrderReducer?.loading} />
      {/* {!getAllOrderReducer.loading ?
        <Box sx={{ paddingTop:5, paddingLeft:2, paddingRight:10, borderRadius:10}}>
          <TableComponent columns={orderColumns} rows={rows} loader={getAllOrderReducer?.loading} />
        </Box>
          :
        <Box sx={{ paddingTop:5, paddingLeft:2, paddingRight:10, display:'flex', justifyContent:'center', alignItems:'center', width:'100%', height:'80vh'}}>
          <Loader type="Bars" color="#DA792D" height={80} width={80}  />
        </Box>
      } */}
    </Box>
  )
}

export default OrderScreen
