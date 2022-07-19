import React, { useState, useEffect } from 'react'
import { Box, List, ListItem, ListItemText, Menu, MenuItem, AppBar, Toolbar, Typography, IconButton } from '@mui/material'
import Logo from '../../assets/logo.png'
import { withStyles } from '@mui/styles'
import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close'
import RemoveIcon from '@mui/icons-material/Remove'
import NotificationsIcon from '@mui/icons-material/Notifications'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'
import { useHistory, Link } from "react-router-dom"

const ListItems = withStyles({
  root: {
    marginLeft: 20,
    '&:last-child': {
      marginLeft: 20
    },
    paddingTop: 20,
    paddingBottom: 20,
    borderBottom: '2px solid transparent',
    "&$selected": {
      borderBottom: '2px solid #C67B4D',
      color: "#C67B4D",
      position: 'relative',
      '&::after': {
        margin: '0px auto',
        content: '""',
        display: 'block',
        position: 'absolute',
        bottom: 0,
        right: 0,
        left: 0,
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
      borderBottom: '2px solid #C67B4D',
      '&::after': {
        margin: '0px auto',
        content: '""',
        display: 'block',
        position: 'absolute',
        bottom: 0,
        right: 0,
        left: 0,
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
  // {

  //   id: 1,
  //   name: 'Dashboard',
  //   link: 'startUpScreen'
  // },
  {

    id: 2,
    name: 'Task',
    link: 'task'
  },
  {
    id: 3,
    name: 'Profiles',
    link: 'profile'
  },
  {
    id: 4,
    name: 'Proxies',
    link: 'proxies'
  },
  {
    id: 5,
    name: 'Orders',
    link: 'orders'
  },
  {
    id: 6,
    name: 'Raffal',
    link: 'raffel'
  }
];

const settings = [
  {
    id: 2,
    name: '',
    icon: <NotificationsIcon />,
    link: ''
  },
  {
    id: 3,
    icon: <AccountCircleOutlinedIcon />,
    link: 'settingsss'
  },

  {
    id: 4,
    name: '',
    icon: <RemoveIcon />,
    link: ''
  },
  {
    id: 5,
    name: '',
    icon: <CloseIcon />,
    link: ''
  }
]

const HeaderComponent = () => {
  let history = useHistory()
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null)
  const [selectedIndex, setSelectedIndex] = useState('')
  const [openOption, setOpenOption] = useState({ id: 0, active: false })

  const handleSelectedItem = (index: number, link: any) => {
    console.log(index, 'index')
    setSelectedIndex(link)
  }

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  }

  function handleSubMenu(sid: number) {
    switch (sid) {
      case 3:
        setOpenOption({ id: 1, active: !openOption.active });
        break;
      case 2:
        setOpenOption({ id: 2, active: !openOption.active });
        break;
      default:
        setOpenOption({ id: 0, active: !openOption.active })
        break;
    }
  }

  useEffect(() => {
    let url = window.location.href.split('#/')
    if (url[1].includes('-')) {
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
    <AppBar position="static" style={{ maxHeight: 80, height: 80, borderBottom: '2px solid gray' }}>
      <Toolbar disableGutters>
        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' }, alignItems: 'center', justifyContent: 'space-between' }}>
          <img src={Logo} alt="Logo" width={50} height={50} style={{ marginLeft: 10 }} />
          <IconButton size="large" aria-label="account of current user" aria-controls="menu-appbar" aria-haspopup="true" onClick={handleOpenNavMenu} color="inherit"><MenuIcon /></IconButton>
          <Menu id="menu-appbar"  anchorEl={anchorElNav} anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }} keepMounted transformOrigin={{ vertical: 'top', horizontal: 'left' }} open={Boolean(anchorElNav)} onClose={handleCloseNavMenu} sx={{ display: { xs: 'block', md: 'none' } }} >
            {/* {pages.map((page) => (
              <MenuItem key={page.id} onClick={handleCloseNavMenu}>
                <Typography textAlign="center">{page.name}</Typography>
              </MenuItem>
            ))} */}
            {pages.map((page) => (
              <MenuItem style={{backgroundColor:"#2e2e2e"}} key={page.id} selected={selectedIndex === page.link} onClick={() => {
                handleSelectedItem(page.id, page.link)
                history.push(`/${page.link}`)
              }}>
                {/* <Typography textAlign="center">{page.name}</Typography> */}
                <ListItemText className={selectedIndex === page.link ? 'active' : ''} style={{color:"white"}}>
                  {page.name}
                </ListItemText>
              </MenuItem>
              //  <MenuItem key={page.id} selected={selectedIndex === page.link} onClick={() => {
              //   handleSelectedItem(page.id, page.link)
              //   history.push(`/${page.link}`)
              // }} disablePadding={false}>
              //   {/* <ListItemText className={selectedIndex === page.link ? 'active' : ''}>
              //     {page.name}
              //   </ListItemText> */}
              // </MenuItem>
              // <MenuItem key={page.id} selected={selectedIndex === page.link} onClick={() => {
              //   handleSelectedItem(page.id, page.link)
              //   history.push(`/${page.link}`)
              // }} disablePadding={false}>
              //   <ListItemText className={selectedIndex === page.link ? 'active' : ''}>
              //     {page.name}
              //   </ListItemText>
              // </MenuItem>
            ))}
          </Menu>
        </Box>

        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
          <img src={Logo} alt="Logo" width={30} height={30} style={{ marginLeft: 10 }} />
          <List style={{ display: 'flex', flexDirection: 'row', cursor: 'pointer' }}>
            {pages.map((page) => (
              <ListItems key={page.id} selected={selectedIndex === page.link} onClick={() => {
                handleSelectedItem(page.id, page.link)
                history.push(`/${page.link}`)
              }} disablePadding={false}>
                <ListItemText className={selectedIndex === page.link ? 'active' : ''}>
                  {page.name}
                </ListItemText>
              </ListItems>
            ))}
          </List>
        </Box>

        <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' } }} style={{ background: 'linear-gradient(to right, #DA792D, #AC609E)', borderBottomLeftRadius: 40, height: 80 }}>
          <List style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            {settings.map((page) => (

              <ListItem key={page.id} onClick={() => handleSubMenu(page.id)}>
                <ListItemText style={{ cursor: 'pointer' }}>{page.icon}</ListItemText>
                {page.name !== '' ? <Link style={{ color: 'white', textDecoration: 'none' }} to={`/${page.link}`}><ListItemText >{page.name}</ListItemText></Link> : null}

              </ListItem>
            ))}

          </List>

        </Box>
        {openOption.id == 1 && openOption.active == true ?
          <Box sx={{ padding: "13px 3px 13px 3px", position: "absolute", width: "100px !important", height: "50px !important", backgroundColor: "#d4753c !important", top: "105% !important", right: "9% !important", display: "flex !important", justifyContent: "center !important", alignItems: "center !important", color: "#fff !important", zIndex: 1, textTransform: "capitalize" }}>
            <Box display={'flex'} flexDirection={'column'} justifyContent={'center'}><Link style={{ cursor: 'pointer !important', color: "#fff", textDecoration: "revert", fontSize: "20px", padding: "0 0 8px 0", fontWeight: 800, }} to="/settings">profile</Link>
              <Link style={{ cursor: 'pointer !important', color: "#fff", textDecoration: "revert", fontSize: "20px", padding: "0 0 8px 0", fontWeight: 800, }} to="">Logout</Link></Box></Box> : null}
        {openOption.id == 2 && openOption.active == true ?
          <Box sx={{ padding: "13px 3px 13px 3px", position: "absolute", width: "100px !important", height: "50px !important", backgroundColor: "#d4753c !important", top: "105% !important", right: "9% !important", display: "flex !important", justifyContent: "center !important", alignItems: "center !important", color: "#fff !important", zIndex: 1, textTransform: "capitalize" }}><Box display={'flex'} flexDirection={'column'} justifyContent={'center'}><Link style={{ cursor: 'pointer !important', color: "#fff", textDecoration: "revert", fontSize: "20px", padding: "0 0 8px 0", fontWeight: 800, }} >Notification</Link>
          </Box>
          </Box> : null}
      </Toolbar>
    </AppBar>
  )
}

export default HeaderComponent