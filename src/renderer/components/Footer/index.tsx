import React, {useState, useEffect} from 'react'
import { Box, Container, List, ListItem, ListItemText,  Menu, MenuItem, AppBar, Toolbar, Typography, IconButton } from '@mui/material'
import DownloadIcon from '@mui/icons-material/Download';

const FooterComponent = () => {
    return (
        <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'} bgcolor={'black'} style={{paddingLeft:20, paddingRight:20, paddingTop:5,paddingBottom:5, opacity:0.8}}>
            <Box display={'flex'} justifyContent={'flex-start'} alignItems={'center'} width={'100%'}>
                <p style={{fontWeight:700, fontSize:12, fontFamily:'roboto', color:'#fff'}}>Entries 0 |&nbsp;</p>
                <p style={{fontWeight:700, fontSize:12, fontFamily:'roboto', color:'#fff'}}>Checkout 0 |&nbsp;</p>
                <p style={{fontWeight:700, fontSize:12, fontFamily:'roboto', color:'#fff'}}>Non Winning Entries 0 |&nbsp;</p>
                <p style={{fontWeight:700, fontSize:12, fontFamily:'roboto', color:'#fff'}}>Cookies 0 | &nbsp;</p>
                <p style={{fontWeight:700, fontSize:12, fontFamily:'roboto', color:'#fff'}}>Sleeping Tasks 0</p>
            </Box>
            <Box  display={'flex'} justifyContent={'flex-end'} alignItems={'center'} width={'100%'}>
                <p style={{fontWeight:700, fontSize:12, fontFamily:'roboto', color:'#fff'}}>Vendetta |&nbsp;</p>
                <p style={{fontWeight:700, fontSize:12, fontFamily:'roboto', color:'#fff'}}>Copyright@2022 V1.1 |&nbsp;</p>
                <DownloadIcon fontSize={'small'}color={'secondary'}/>
            </Box>
        </Box>
    )
}

export default FooterComponent
