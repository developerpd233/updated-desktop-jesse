import { Box } from '@mui/material';
import BackgroundImage from '../../../assets/bg.png'
import BillingInfoComponent from '../../../tabsComponent/BillingInfo'
import TabsComponent from '../../../components/Tabs'

const NewTaskScreen = () => {

  const tabs = [
    {
        name: 'Billing Info',
        value: '1'
    },
    // {
    //     name: 'Sizing',
    //     value: '2'
    // },
    // {
    //     name: 'Additional Data',
    //     value: '3'
    // }
]

  const tabsPanel = [
    {
      component: <BillingInfoComponent id={sessionStorage.getItem('taskId')} />,
      value: '1'
    },
    // {
    //   component: 'tab2',
    //   value: '2'
    // },
    // {
    //   component: 'tab3',
    //   value: '3'
    // }
  ]

  console.log("new task", sessionStorage.getItem('taskId'))

  return (
    <Box sx={{ maxWidth:'100vw',  height:'100%', maxHeight:'80%', color: 'secondary.main', backgroundImage:`url(${BackgroundImage})`, padding:'20px 20px' }}>
    {/* <Box display={'flex'} justifyContent={'flex-start'} flexDirection={'column'} sx={{ maxWidth:'100vw',  height:'calc(100vh - 128px)', color: 'secondary.main', backgroundImage:`url(${BackgroundImage})`, padding:'20px 20px' }}> */}
      <Box sx={{ paddingTop:5, paddingLeft:5, paddingRight:5,  background: 'rgba(235, 237, 239, 0.2)', borderRadius:5}}>
        <TabsComponent tabs={tabs} tabsPanel={tabsPanel}  />
      </Box>
    </Box>
  )
}

export default NewTaskScreen
