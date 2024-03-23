
//files uploading code//

import React, { useState,useEffect } from "react";
import axios from "axios";
import * as FileSaver from 'file-saver';

export default function SingleFile() {
  const [profileImg, setProfileImg] = useState(null);
  

  const onFileChange = (e) => {
     console.log(e.target.files[0])
    setProfileImg(e.target.files[0]);
  };
  const onSubmit = async(e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('image', profileImg);
 
      try {
        const response = await axios.post("http://172.17.151.141:3002/tableExtraction", formData);
  
        FileSaver.saveAs(new Blob([response.data], { type: 'text/csv' }), 'my_download_file.csv');
      } catch (error) {
        console.error("Error during download:", error);
      }
  };


  //files uploading code//

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
//       <form onSubmit={onSubmit} className="dropzone dz-clickable "   
//         >
//           <img src={fileType} alt="#"/>
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



//files uploading code//

// import React, { useState} from "react";
// import axios from "axios";
// import * as FileSaver from 'file-saver';

// export default function App() {
//   const [profileImg, setProfileImg] = useState(null);
//   const [isFileUploaded, setIsFileUploaded] = useState(null);
//   const[download,setDownload]=useState('');


//   const onFileChange = (e) => {
//      console.log(e.target.files[0])
//     setProfileImg(e.target.files[0]);
//   };
//   const onSubmit = async(e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     formData.append('image', profileImg);
//     // const response=await axios.post("http://172.17.151.141:3002/allImgTabExt", formData )
//     //   console.log("qqwqwq",response.data);
//     //   setDownload(response.data)
//       try {
//         const response = await axios.post("http://172.17.151.141:3002/allImgTabExt", formData,{
//           responseType: 'blob' // Ensure response is treated as a Blob
//         });
  
//         // FileSaver.saveAs(
//         //   new Blob([response.data], { type: 'application/zip' }), 
//         //   'my_download_file.zip'
//         // );
//         const blob = new Blob([response.data], { type: 'application/zip' });
//         const url = window.URL.createObjectURL(blob);
//       const link = document.createElement('a');
//       link.href = url;
//       link.setAttribute('download', 'my_download_file.zip');
//       link.click();
        
      
//       } catch (error) {
//         console.error("Error during download:", error);
//       }
//   };






//   return (
//     <>
//       <form onSubmit={onSubmit}>
//         <div >
//           <input type="file"  onChange={onFileChange}  accept=".zip"/>
//         </div>
//         <button  type="submit">
//           Download
//         </button>
//       </form>       
//     </>
//   )
// }
  



  return (
    <>
     
      <form onSubmit={onSubmit}>
        <div >
          <input type="file"  onChange={onFileChange}  accept="image/*"/>
        </div>
        <button  type="submit">
          Download
        </button>
      </form>
 
    </>
  );
}



// import React, { useState, useRef } from 'react';
// import FileImage from "../src/components/Api/file-type.png";
// import "./App.css"

// function App() {
//   const [selectedFiles, setSelectedFiles] = useState([]);
//   const fileInputRef = useRef(null);

//   const handleDragOver = (event) => {
//     event.preventDefault();
//     // Add visual feedback for dragover (e.g., change background color)
//   };

//   const handleDrop = (event) => {
//     event.preventDefault();
//     // Remove visual feedback
//     const files = event.dataTransfer.files;
//     // Only accept images
//     const filteredFiles = files.filter((file) => file.type.startsWith('image/'));
//     setSelectedFiles(filteredFiles);
//   };

//   const handleFileChange = (event) => {
//     const files = event.target.files;
//     setSelectedFiles(files);
//   };

//   const handleUpload = async() => {
//     const formData = new FormData();
//         formData.append("image", selectedFiles);
//    console.log("user upload file",formData)

//   };
//   const handleDropZoneClick = () => {
//     document.getElementById("file-input").click();
//   };

//   return (
//     <div>
//     <div className="dropzone"  onClick={handleDropZoneClick} onDragOver={handleDragOver} onDrop={handleDrop} >
//       <label  >
//         <img src={FileImage} alt="Upload" />
//         <p>Drag and drop images here or click to select</p>
//       </label>
//       <input
//         type="file"
//         id="file-input"
//         ref={fileInputRef}
//         hidden
//         multiple
//         accept="image/*"
//         onChange={handleFileChange}
//       />
//       {/* {selectedFiles.length > 0 && (
//         <ul className="preview-list">
//           {selectedFiles.map((file) => (
//             <li key={file.name}>
//               <img src={URL.createObjectURL(file)} alt={file.name} />
//             </li>
//           ))}
//         </ul>
//       )} */}
     
//       {/* {selectedFiles && selectedFiles.map((file) => (
//             <li key={file.name}>
              
//             </li>
//           ))} */}
//     </div>
//     <button onClick={handleUpload} disabled={selectedFiles.length === 0}>
//         Upload Images
//       </button>
//     </div>
//   );
// }

// export default App;