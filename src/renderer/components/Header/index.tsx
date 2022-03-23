import React, { useState, useEffect } from 'react'
import { Box, List, ListItem, ListItemText,  Menu, MenuItem, AppBar, Toolbar, Typography, IconButton } from '@mui/material'
import Logo from '../../assets/logo.png'
import { withStyles } from '@mui/styles'
import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close'
import RemoveIcon from '@mui/icons-material/Remove'
import SettingsIcon from '@mui/icons-material/Settings'
import NotificationsIcon from '@mui/icons-material/Notifications'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'
import { useHistory, Redirect, Link } from "react-router-dom"

const ListItems = withStyles({
  root: {
    marginLeft:20,
    '&:last-child': {
      marginLeft:20
    },
    paddingTop:20,
    paddingBottom:20,
    borderBottom:'2px solid transparent',
    "&$selected": {
      borderBottom:'2px solid #C67B4D',
      color: "#C67B4D",
      position:'relative',
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
      "& .MuiListItemIcon-root": {
        color: "white"
      }
    },
    "&$selected:hover": {
      color: "#C67B4D",
      "& .MuiListItemIcon-root": {
        color: "white"
      }
    },
    "&:hover": {
      color: "#C67B4D",
      borderBottom:'2px solid #C67B4D',
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
      "& .MuiListItemIcon-root": {
        color: "white"
      }
    },
  },
  selected: {}
})(ListItem)

const pages = [
  {
    id:1,
    name:'Task',
    link:'task'
  },
  {
    id:2,
    name:'Profiles',
    link:'profile'
  },
  {
    id:3,
    name:'Proxies',
    link:'proxies'
  },
  {
    id:4,
    name:'Orders',
    link:'orders'
  },
  {
    id:5,
    name:'Raffles',
    link:'raffles'
  }
];

const settings =  [
  {
    id:1,
    name:'',
    icon:<SettingsIcon />,
    link:''
  },
  {
    id:2,
    name:'',
    icon:<NotificationsIcon />,
    link:''
  },
  {
    id:3,
    name:'Jesse',
    icon:<AccountCircleOutlinedIcon />,
    link:'settings'
  },
  {
    id:4,
    name:'Logout',
    icon:'',
    link:''
  },
  {
    id:5,
    name:'',
    icon:<RemoveIcon />,
    link:''
  },
  {
    id:6,
    name:'',
    icon:<CloseIcon />,
    link:''
  }
]

const HeaderComponent = () => {

  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null)
  const [selectedIndex, setSelectedIndex] = useState('')

  let history = useHistory()

  const handleSelectedItem = (index: number, link:any) => {
    setSelectedIndex(link)
  }

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  }

  useEffect(() => {
    let url = window.location.href.split('#/')
    if(url[1].includes('-')) {
      let uri = url[1].split('-')
      if (uri[1].includes('/')) {
        let breakUri = uri[1].split('/')
        setSelectedIndex(breakUri[0])
      }
      else {
        setSelectedIndex(uri[1])
      }
    }
    else {
      setSelectedIndex(url[1])
    }
  }, [selectedIndex])

  return (
    <AppBar position="static" style={{maxHeight:80, height:80, borderBottom:'2px solid gray'}}>
      <Toolbar disableGutters>
      <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' },  alignItems:'center', justifyContent:'space-between' }}>
        <img src={Logo} alt="Logo" width={50} height={50} style={{marginLeft:10}} />
        <IconButton  size="large" aria-label="account of current user" aria-controls="menu-appbar" aria-haspopup="true" onClick={handleOpenNavMenu} color="inherit"><MenuIcon /></IconButton>
        <Menu id="menu-appbar" anchorEl={anchorElNav} anchorOrigin={{  vertical: 'bottom',  horizontal: 'left' }} keepMounted transformOrigin={{ vertical: 'top', horizontal: 'left'}} open={Boolean(anchorElNav)} onClose={handleCloseNavMenu} sx={{display: { xs: 'block', md: 'none' }}}>
            {pages.map((page) => (
              <MenuItem key={page.id} onClick={handleCloseNavMenu}>
                <Typography textAlign="center">{page.name}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>

        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' },  alignItems:'center' }}>
          <img src={Logo} alt="Logo" width={30} height={30} style={{marginLeft:10}} />
          <List style={{display:'flex', flexDirection:'row', cursor:'pointer'}}>
            {pages.map((page) => (
              //
                <ListItems key={page.id}  selected={selectedIndex === page.link} onClick={() => {
                  handleSelectedItem(page.id, page.link)
                  history.push(`/${page.link}`)
                  }} disablePadding={false}>
                      {/* <Link to={page.link} style={{color:'#fff', textDecoration:'none'}} className={selectedIndex === page.link ? 'active' : ''} > */}
                        <ListItemText className={selectedIndex === page.link ? 'active' : ''}>
                          {page.name}
                        </ListItemText>
                      {/* </Link> */}
                </ListItems>
            ))}
          </List>
        </Box>

        <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' }}}  style={{background: 'linear-gradient(to right, #DA792D, #AC609E)', borderBottomLeftRadius:40, height:80}}>
          <List style={{display:'flex', flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
            {settings.map((page) => (
              <ListItem key={page.id}>
                <ListItemText  style={{cursor:'pointer'}}>{page.icon}</ListItemText>
                {page.name !== '' ? <Link style={{color:'white',textDecoration:'none'}} to={`/${page.link}`}><ListItemText >{page.name}</ListItemText></Link>:null}
              </ListItem>
            ))}
          </List>
        </Box>
        </Toolbar>
    </AppBar>
  )
}

export default HeaderComponent
