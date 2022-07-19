import React from 'react'
import { Tab, Box } from '@mui/material'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import { TabsInterface } from '../../constant/Interface'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles({
  indicator: {
    background: "#C67B4D"
  },
  tabs: {
    "& button": {
      // padding: 5,
      color:'#fff'
    },
    "& button[aria-selected='true']": {
      position: "relative",
      color:'#fff',
      '&::after': {
        margin:'0px auto',
        content: '""',
        display: 'block',
        position:'absolute',
        bottom:0,
        right:0,
        left:0,
        borderBottom: 'solid 8px #C67B4D',
        borderLeft: 'solid 8px transparent',
        borderRight: 'solid 8px transparent',
        width: 0,
        height: 0,
      },
      "& > *": { zIndex: 0 },
      "& > .MuiTab-wrapper": {
        background: "#fff",
        height: "100%"
      }
    }
  },
  tabsPanel: {
    color:'#fff'
  },
  label: {
    fontSize:14,
    fontFamily:'roboto',
    textTransform:'capitalize'
  }
})


const TabsComponent:React.FC<TabsInterface> = ({ tabs, tabsPanel }) => {
    const classes = useStyles()
    const [value, setValue] = React.useState('1')

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue)
    }

    return(
        <Box sx={{ width: '100%', typography: 'body1', padding:'0px 0px', borderRadius:4 }}>
            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider', padding:'0px 0px' }}>
                    <TabList onChange={handleChange} aria-label="lab API tabs example" className={classes.tabs} classes={{ indicator: classes.indicator }}>
                        {tabs.map((tab:any, index:number) => {
                            return(
                                <Tab label={tab.name} value={tab.value} className={classes.label} key={index} />
                            )
                        })}
                    </TabList>
                </Box>
                {tabsPanel.map((tab:any, index:number) => {
                    return(
                        <TabPanel value={tab.value} className={classes.tabsPanel} key={index}>{tab.component}</TabPanel>
                    )
                })}
            </TabContext>
        </Box>
    )
}

export default TabsComponent
