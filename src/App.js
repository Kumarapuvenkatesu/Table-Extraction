
// import React, { useState,useEffect } from "react";
// import axios from "axios";
// import * as FileSaver from 'file-saver';
// import "./App.css";
// import fileType from "../src/components/Api/file-type.png"

// export default function SingleFile() {
//   const [profileImg, setProfileImg] = useState(null);
  

//   const onFileChange = (e) => {
//      console.log(e.target.files[0])
//     setProfileImg(e.target.files[0]);
//   };
//   const onSubmit = async(e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     formData.append('image', profileImg);
 
//       try {
//         const response=await axios.post ("http://localhost:3001/upload",formData);
//         console.log("123456",response)
//         // const response = await axios.post("http://172.17.151.141:3002/tableExtraction", formData);
  
//         // FileSaver.saveAs(new Blob([response.data], { type: 'text/csv' }), 'my_download_file.csv');
//       } catch (error) {
//         console.error("Error during download:", error);
//       }
//   };

// useEffect(()=>{
// const fetchData=async()=>{
// const response=await axios.get("http://localhost:3001/get-image");
// console.log("getimages",response)
// }
// fetchData()
// },[])


//   return (
//     <>
//      <div >
//       <form onSubmit={onSubmit}   
//         style={{marginLeft:"50em",marginTop:"10em"}}>
         
//         <div >
//           <input type="file"  onChange={onFileChange}  accept="image/*" id="fileInput"  />
//         </div>
//         <button  type="submit" >
//           Download
//         </button>
//       </form>
//  </div>
//     </>
//   );
// }















import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Signup from './components/Signup/Signup';
import Login from './components/Login/Login';
import SignupDetails from './components/SignupDetails/SignupDetails';
import NotFound from './components/NotFound/NotFound';
import Contact from "./components/SignupDetails/Contact";
import Mobile from './components/Mobile/Mobile';
import  FileUpload  from './components/FileUpload/FileUpload';
import Forget from  './components/Forget/Forget';
import FileUpload1 from './components/FileUpload/FileUpload1';

export default function App(){
  return(
    <BrowserRouter>

    <Routes>
      <Route path="/mobile" element={<Mobile/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/' element={<SignupDetails/>}/>
      <Route path='/contact' element={<Contact/>}/>
      <Route path='/fileupload' element={<FileUpload/>}/>
      <Route path='/fileupload1' element={<FileUpload1/>}/>
      <Route path="/forget" element={<Forget/>}/>
      <Route path='*' element={<NotFound/>}/>
    </Routes>
    </BrowserRouter>
  )
}
