
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as React from 'react';
import { Button, Typography, Box, TextField, Stack } from '@mui/material';
import Container from '@mui/material/Container';
import "./Login.css";
import Header from '../Header/Header';
import Cookies from 'js-cookie';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import OtpInput from 'react-otp-input';
import { userlogin } from '../Api';
import axios from 'axios';






export default function SignIn() {

  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen((prevState) => !prevState);
  };
  const navigate = useNavigate();
  const [userId, setUserId] = useState([])
  const [otp, setOtp] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [verifyOtp, setVerifyOtp] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await userlogin(email, password)
      console.log("response loginpage",response)
    
      if(response.status){
        console.log("its true")
          localStorage.setItem("LoginDetails",JSON.stringify(response));
     Cookies.set("token",response.token1,{expires:1})
    if (response.role) {
                navigate("/fileupload1")
      console.log("user shows")
        }
      }
      else{
        toast.error(response)
      
       }
    //   


    //   else if (response.role ==="user"){
    //     navigate("/fileupload1")
    //   }
    //  

    } catch (error) {
      toast.error(error)
    }
  };


  useEffect(() => {
    const jwtToken = Cookies.get('token');
    if (jwtToken !== undefined) {
      window.location.href = '/fileupload1';
    }
  }, []);


  // const handleVerify = async (e) => {
  //   e.preventDefault()
  //   //   console.log("otp",otp)
  //   // const response=await axios.post("http://localhost:3001/verify-otp",{email,otp})
  //   // console.log(response)
  //   if (Cookies.get("otp") === otp) {
  //     toast.success("verified token");
  //     navigate('/fileupload');
  //   } else if (Cookies.get("otp") === undefined) {
  //     toast.error("Token will expired");
  //   } else {
  //     toast.error("Your Enter Wrong OTP");
  //   }
  // }




  return (
    <>
      <Header />

      {/* {verifyOtp ?
        <Stack width={"10%"} height={"100%"} margin={"auto"} mt={10}>
          <ToastContainer position="top-right" />
          <Box component="form" onSubmit={handleVerify}>

            <OtpInput value={otp}
              onChange={setOtp}
              inputStyle={{ width: '3rem', height: '3rem' }}
              renderInput={(props) => <input {...props} />}
              renderSeparator={<span style={{ marginRight: "4px" }}></span>}
              hasErrored />
            <Button type='submit' variant='contained' sx={{ mt: 3, mb: 2, }}>verify Otp</Button>
            <span>{`0${minute}:${seconds}`} seconds remaining</span><br/>
  <span>Trouble Issue goto <span onClick={(e)=>setVerifyOtp(false)} style={{color:"blue",cursor:"pointer"}}>login</span></span> 
          </Box>
        </Stack>
        :

        < >

          <ToastContainer />
          <Container component="main" maxWidth="xs">

            <Box
              sx={{
                marginTop: 16,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: "center"
              }}
            >



              <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                <Typography variant="h4" textAlign={'center'}>
                  Login
                </Typography>
                <TextField
                  margin="normal"
                  fullWidth
                  label="Email Address"
                  autoComplete="off"
                  type={"email"}
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
                <TextField
                  margin="normal"
                  fullWidth
                  label="password"
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
                <Link variant="span" to={"/forget"}>
                  Forgot password?
                </Link>
                <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2, }} className='button' >
                  Login
                </Button>

                <Link to={"/signup"} variant="span" >
                  You Don't have an account? Sign Up
                </Link>

              </Box>
            </Box>

          </Container>

        </>
      } */}
    

<ToastContainer />
<Container component="main" maxWidth="xs">

  <Box
    sx={{
      marginTop: 16,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: "center"
    }}
  >



    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
      <Typography variant="h4" textAlign={'center'}>
        Login
      </Typography>
      <TextField
        margin="normal"
        fullWidth
        label="Email Address"
        autoComplete="off"
        type={"email"}
        required
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />
      <TextField
        margin="normal"
        fullWidth
        label="password"
        type="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />
      <Link variant="span" to={"/forget"}>
        Forgot password?
      </Link>
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2, }} className='button' >
        Login
      </Button>

      {/* <Link to={"/signup"} variant="span" >
        You Don't have an account? Sign Up
      </Link> */}

    </Box>
  </Box>

</Container>

</>



    
  );
}