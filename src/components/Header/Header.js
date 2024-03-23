
import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Button, Typography,Menu,MenuItem, ImageList, ImageListItem,Stack,Dialog,DialogTitle,DialogActions,Box, TextField } from '@mui/material';
import { AccountCircleOutlined,DarkMode,Email,LightMode,Phone} from '@mui/icons-material';
import Cookies from 'js-cookie';
import {useThemeContext} from "../ThemeContext/ThemeContext";
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import ContactForm from './ContactForm';




const Header = () => {

  
  const data=useThemeContext()
  const jwtToken = Cookies.get("token");
  const [anchorEl, setAnchorEl] = useState(null); 
  const open=anchorEl!==null;

  const handleMenu = (event) => { 
    setAnchorEl(event.currentTarget);
  };

  const handleClose=()=>{
    setAnchorEl(null)
  }

  const removeToken=()=>{
    Cookies.remove("token");
    window.location.href="/login";
  }
 
  // const ShowsData=()=>{

  // }
  const [details,setDetails]=useState(false)

  const editupdate=()=>{
setDetails(true)
  }

  const handleClosed=()=>{
    setDetails(false)
  }
 

  const role = (JSON.parse(localStorage.getItem("LoginDetails"))?.name);

  return (
    <AppBar position="fixed" mb={5} spacing={2} color='info' sx={{zIndex:'999'}}>
      <Toolbar >
        <ImageList sx={{width:300,ml:8  }} >
          <ImageListItem >
            <img src="https://straive-images.s3.us-east-2.amazonaws.com/Straive_Logo_h100_cf5c06401d.png"  alt="logo" />
        
          </ImageListItem>
        </ImageList>
    
      <Typography sx={{flexGrow:1}}>  
      { jwtToken===undefined  ? null:<div ><Button onClick={() => editupdate()} >Contact</Button></div>} 
      </Typography>

        {
          jwtToken===undefined  ? 
          
          <Stack direction="row" spacing={4} mr={5} >
            <Stack>
                    <Button  onClick={data.toggleTheme}>
                    {
                      data.theme ? <DarkMode color='warning'/>:<LightMode color='warning'/>
                    }
                    </Button>
                  </Stack>
                   <Stack  component="a" spacing={1} href="mailto:contact@straive.com" direction={"row"} justifyContent={"center"} alignItems={"center"}>
                    <Email color="warning" /><Typography color={"#fff"}>contact@straive.com</Typography>
                  </Stack>
                  <Stack component="a"  spacing={1} href="tel:+1522999888" direction={"row"} justifyContent={"center"} alignItems={"center"} >
                    <Phone color="warning" /><Typography color={"#fff"}>+1 522 999 888</Typography>
                  </Stack>
                
                  
          </Stack>
          :
          <Stack >
          <IconButton size="large" onClick={handleMenu} color="inherit">   
          <AccountCircleOutlined />
          <Button style={{color:"rgb(239 221 5)"}}>Welcome,{role }</Button>
        </IconButton>  
  <Menu anchorEl={anchorEl} open={open} onClose={handleClose} >
    <MenuItem color='primary' onClick={data.toggleTheme}>
      Theme
      <Button>
        {
        data.theme ?
         <LightMode color="success"/>:<DarkMode color='info'/>
        }
    
      </Button>
    </MenuItem>
    <MenuItem  onClick={removeToken}>
     <LogoutIcon/> <Button >Sign Out</Button> 
    </MenuItem>
 
  </Menu>
          </Stack>
        }
          <Stack className='mobile' >
                    <MenuIcon/>
                  </Stack>

    
              <ContactForm open={details}  onClose={handleClosed}/>
     
        
      </Toolbar>
    </AppBar>
  );
};

export default Header;


/*import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';

export default function MenuPopupState() {
  return (
    <PopupState variant="popover" popupId="demo-popup-menu">
      {(popupState) => (
        <React.Fragment>
          <Button variant="contained" {...bindTrigger(popupState)}>
            Dashboard
          </Button>
          <Menu {...bindMenu(popupState)}>
            <MenuItem onClick={popupState.close}>Profile</MenuItem>
            <MenuItem onClick={popupState.close}>My account</MenuItem>
            <MenuItem onClick={popupState.close}>Logout</MenuItem>
          </Menu>
        </React.Fragment>
      )}
    </PopupState>
  );
}*/
