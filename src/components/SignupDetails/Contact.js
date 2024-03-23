// import React,{useState} from "react";
// import { contactdetails } from "../Api";


// export default function App(){
//   const [name,setName]=useState('');
//   const [email,setEmail]=useState("");
//   const[message,setMessage]=useState("");





//   const handleSubmit=async(e)=>{
//     e.preventDefault();
//   try {
//     const response=await contactdetails(name,email,message)
//     setName("")
//     setEmail("")
//   } catch (error) {
//     console.log(error)
//   }
//   }


  
//   return(
// <div>
// <form onSubmit={handleSubmit}>
// <h1>Contact Us</h1>
// <input type="text" value={name} onChange={(e)=>setName(e.target.value)} placeholder="name"/><br/><br/>
// <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="email"/><br/><br/>
// <textarea type="textarea" value={message} onChange={(e)=>setMessage(e.target.value)}  rows={4}  cols={20} placeholder="Enter Your feedback"/><br/>
// <button type="submit">save</button>
// </form>
// </div>
//   )
// }


//contact details//

// import React,{useState} from "react";
// import axios from  "axios";

// export default function App(){
//   const [name,setName]=useState('');
//   const [email,setEmail]=useState("");
//   const[message,setMessage]=useState("");

//   const handleSubmit=async(e)=>{
//     e.preventDefault();
//     const response=await axios.post("http://localhost:3001/contact",{name,email,message});
//     console.log("contactdetails",response.data)
//   }


  
//   return(

// <>
// <form onSubmit={handleSubmit}>
// <input type="text" value={name} onChange={(e)=>setName(e.target.value)}/><br/><br/>
// <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)}/><br/><br/>
// <textarea type="textarea" value={message} onChange={(e)=>setMessage(e.target.value)}  rows={4}  cols={20} placeholder="enter data"/><br/>
// <button type="submit">save</button>
// </form>
// </>

//   )
// }


import React, { useState,useEffect } from "react";
import { TextField, Button, FormControl, FormLabel,  Box, Stack } from "@mui/material";
import { contactdetails } from "../Api";
import axios from "axios";
import Header from "../Header/Header";
import HomeIcon from '@mui/icons-material/Home';
import { Link } from "react-router-dom";
import Cookies from "js-cookie";


export default function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const [userData,setUserData]=useState('')

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await contactdetails(name, email, message);
      console.log("contact",response)
      window.location.href="/contact"
      setName("");
      setEmail("");
      setMessage(""); 
  
    } catch (error) {
      console.error(error);
      
    }
  };

  useEffect(()=>{
    const fetchData=async()=>{
      const response=await axios.get("http://localhost:3001/contactDetails");
      console.log("getimages",response.data)
      setUserData(response.data)

      }
      fetchData()
  },[])

  useEffect(() => {
    const jwtToken = Cookies.get("token");
    if (jwtToken === undefined) {
      window.location.href = "/login"
    }
  }, [undefined])

  return (
    <>
    <Header/>
   
    <Stack direction={"row"} justifyContent={"space-around"} mt={12}>
    <Box margin={2}>
      <Stack> <Link to="/"><HomeIcon />Home</Link></Stack>
    <video autoPlay loop src="https://straive-images.s3.us-east-2.amazonaws.com/Globe_Final_d09a4d339e.mp4" width={600} ></video></Box> 

      <Box component={"form"} onSubmit={handleSubmit} style={{display:"flex",flexDirection:"column",alignItems:"center",marginTop:"7em"}} >
      <h1>Contact Us</h1>
        <FormControl sx={{width:"300px"}}>
          <FormLabel>Name</FormLabel>
          <TextField type="text" value={name} onChange={(e) => setName(e.target.value)} margin="normal" required />
        </FormControl>
        <FormControl  sx={{width:"300px"}}>
          <FormLabel>Email</FormLabel>
          <TextField value={email} onChange={(e) => setEmail(e.target.value)} margin="normal" type="email" required />
        </FormControl>
        <FormControl >
          <FormLabel>Message</FormLabel>
          <TextField
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            multiline
            rows={4}
            column={8}
            margin="normal"
            required
            sx={{width:"300px"}}
          />
          
        </FormControl>
        <Button type="submit" variant="contained"  sx={{width:"300px"}} >
          Submit
        </Button>
      </Box>
      </Stack>

      <Stack component={"div"}>
      {/* {userData &&
userData.map((eachData)=>(
  <div style={{marginTop:"20px",marginLeft:"50em"}}>
  <div style={{display:"flex",alignItems:"center"}}>
  <p style={{background:"#1a58c9",borderRadius:"50%",padding:"4px",margin:"5px",paddingRight:"8px",paddingLeft:"8px"}}>{eachData.name[0]}</p>
  <p >{eachData.email}</p>  
  </div>

  <div>
    <p style={{marginLeft:"3pc"}}>{eachData.message}</p>
  </div>

  </div>
))
      } */}


      
      </Stack>
    
    </>
  );
}
