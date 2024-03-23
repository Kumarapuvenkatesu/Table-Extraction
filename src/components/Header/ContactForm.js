import React,{useState,useEffect} from "react"
import {  IconButton, Button,Stack,Dialog,DialogTitle,DialogActions, Divider,Box,TextField,TextareaAutosize } from '@mui/material';
import { Close } from "@mui/icons-material";

export default function ContactForm({open,onClose}){
    return(
        <Dialog open={open}
        // onClick={()=>handleClosed()}
        // TransitionComponent={Transition}
       //style={{height:"200px",width:"80%"}}
        aria-describedby="alert-dialog-slide-description"
      >
        <Stack direction={'row'} width={"550px"} justifyContent={"space-between"}>
        <DialogTitle>{"Contact"}</DialogTitle>
        <IconButton onClick={onClose}>
              <Close />
            </IconButton></Stack>
            <Divider/>

          
        
        <Box component="form" sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: "center"
              }}>
<TextField type='text' label="name" margin='normal' sx={{width:"400px"}}/>
<TextField type='text' label="email" margin='normal' sx={{width:"400px"}}/>
<TextField
            multiline
            rows={2}
            column={8}
            margin="normal"
            required
            sx={{width:"400px"}}
            placeholder="Description here"
          />
          {/* <TextareaAutosize
   style={{height:"66px",width:"400px"}}
        label="Message"
        minRows={4}
        placeholder="Write your message here..."
       
      /> */}
{/* <Button variant='contained'>Submit</Button> */}

<DialogActions>
          <Button onClick={onClose} variant="outlined">Cancel</Button>
          <Button variant="contained">Submit</Button>
        </DialogActions>
        </Box>
      </Dialog>
    )
}