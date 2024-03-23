import React,{ createContext,useContext } from "react";

export const ThemeContext = createContext({theme:false,toggleTheme:()=>{}}); 

export const useThemeContext = () => useContext(ThemeContext)



// import React, {  useState,useEffect } from "react";
// import axios from "axios";
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import OtpInput from 'react-otp-input';
// import Cookies from "js-cookie";
// import { Link, useNavigate } from "react-router-dom";
// import Header from "../Header/Header";
// import {Heading} from "./StyledComponent"
// export default function Login() {

//   const [email,setEmail]=useState('');
//   const [password,setPassword]=useState('');
//   const[verifyOtp,setVerifyOtp]=useState(false)
//   const [otp, setOtp] = useState('');
//   const[minute,setMinute]=useState(1);
//   const[seconds,setSeconds]=useState(30);

//   const navigate=useNavigate();


//   const renderUsernameField = () => {
//     return (
//       <>
//         <input
//           type="email"
//           id="username"
//           value={email}
//           placeholder="Username"
//           onChange={(e)=>setEmail(e.target.value)}
//         />
//       </>
//     );
//   };

//   const renderPasswordField = () => {
//     return (
//       <>

//         <input
//           type="password"
//           id="password1"
//           value={password}
//           placeholder="Password"
//           onChange={(e)=>setPassword(e.target.value)}
//         />
//       </>
//     );
//   };


//   useEffect(() => {
//     if(verifyOtp){
//       const interval = setInterval(() => {
//         if (seconds > 0) {
//           setSeconds(seconds - 1);
//         }

//         if (seconds === 0) {
//           if (minute === 0) {
//             clearInterval(interval);
//           } else {
//             setSeconds(59);
//             setMinute(minute - 1);
//           }
//         }
//       }, 1000);

//       return () => {
//         clearInterval(interval);
//       };
//     }

//   }, [verifyOtp,seconds]);



//   const onSubmit=async(e)=>{

//     e.preventDefault();
//    const response=await axios.post("http://localhost:3001/login", { email, password });
//    console.log("47login",response.data.verificationToken);
//    if(response.data.verificationToken!==undefined){
//     const expiresIn90Seconds = new Date(Date.now() + 90 * 1000);
//     Cookies.set("token",response.data.token1,{expires:1})
//     Cookies.set("otp",response.data.verificationToken,{expires:expiresIn90Seconds });

//       setVerifyOtp(true);

//    }else if(response.data.verificationToken===undefined){
//     // setVerifyOtp(false);
//     toast.error(response.data);
//    }
//   }

//   useEffect(() => {
//     const jwtToken = Cookies.get('token');
//      if (jwtToken !== undefined) {
//        window.location.href = '/';
//      }
//    }, []);


//   const handleVerify=()=>{
//     if(Cookies.get("otp")===otp){
//       toast.success("verified token");
//     navigate('/');
//     }else if (Cookies.get("otp")===undefined){
//       toast.error("Token will expired");
//     }else{
//       toast.error("Your Enter Wrong OTP");
//     }
//   }




//  return(
// <>
//   <Header/>
//            {verifyOtp ? 
//            <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
//             <OtpInput value={otp} 
//         onChange={setOtp}  
//         renderInput={(props) => <input {...props} />} 
//         renderSeparator={<span style={{marginRight:"4px"}}></span>}
//        hasErrored/>
//        <button onClick={handleVerify}>verify Otp</button><br/>
//        <span>{`0${minute}:${seconds}`} seconds remaining</span><br/>
//        <span>Trouble Issue goto <span onClick={(e)=>setVerifyOtp(false)} style={{color:"blue",cursor:"pointer"}}>login</span></span>
//        <ToastContainer position="top-center"/>
//        </div>
//        : 
//        <form onSubmit={onSubmit} style={{textAlign:"center"}} >
//              <Heading>Login</Heading>
//              <div>{renderUsernameField()}</div>
//             <div>{renderPasswordField()}</div>
//             <div >
//               <span>newuser <Link to="/signup">Signup</Link></span>
//              </div>
//             <div className="input-container">
//                <button type="submit" className="login-button">
//                  LOGIN
//                </button> 
//              </div>
//              <div className="forgot-show"><ToastContainer position="top-center"/></div>

//            </form> }


//             </>
// )
// }