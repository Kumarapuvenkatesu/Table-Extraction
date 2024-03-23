// import React,{useState} from "react";
// import { TextField,Stack ,Box, Button} from "@mui/material";
// import Header from "../Header/Header";

// const Mobile=()=>{
//     const [Otp,SetOtp]=useState('')

//     const handleSubmit=(e)=>{
//         e.preventDefault();
//         console.log("mobile",Otp)
//     }
// return(
//     <>
//     <Header/>
//     <Stack>
//         <Box component="form" onSubmit={handleSubmit} sx={{display:"flex",flexDirection:"column",alignItems:"center"}}>
// <TextField
// margin="normal"
// width={"200px"}
// label="Mobile No."
// type="tel"
// value={Otp}
// onChange={(event)=>SetOtp(event.target.value)}
// />
// <Button type="submit" variant="contained">submit</Button>
//         </Box>
//     </Stack>
//     </>
// )
// }
// export default Mobile;

import React from 'react';
import { TextField, InputAdornment, Box, Button,  } from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import Header from '../Header/Header';
import axios from 'axios';


function MobileInput() {
  const [value, setValue] = React.useState('');

  const handleSubmit=async(e)=>{
            e.preventDefault();
           
            if(value.length===10){
              const response=await axios.post("http://localhost:3001/send-otp",{mobile:value})
                console.log("mobile", value)
            }
            else if(value.length>=11){
              
                console.log("mobile wrong")
            }
            else{
                console.log("mobile length low") 
            }
         }

  return (
    <>
    <Header/>
<Box mt={30} component="form" onSubmit={handleSubmit} sx={{display:"flex",flexDirection:"column",alignItems:"center"}}>
    <TextField
      label="Mobile Number"
      type="tel"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <PhoneIcon />
          </InputAdornment>
        ),
       
      }}
     
    />
    <Button type='submit' variant='contained'  sx={{width:"250px",mt:4}}> submit</Button>
    </Box>

   
        </>
  );
}

export default MobileInput;
