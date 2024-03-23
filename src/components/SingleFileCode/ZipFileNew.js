import React, { useState} from "react";
import axios from "axios";
import * as FileSaver from 'file-saver';

export default function App() {
  const [profileImg, setProfileImg] = useState(null);
  const [isFileUploaded, setIsFileUploaded] = useState(null);
  const[download,setDownload]=useState('');


  const onFileChange = (e) => {
     console.log(e.target.files[0])
    setProfileImg(e.target.files[0]);
  };
  const onSubmit = async(e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('image', profileImg);
    // const response=await axios.post("http://172.17.151.141:3002/allImgTabExt", formData )
    //   console.log("qqwqwq",response.data);
    //   setDownload(response.data)
      try {
        const response = await axios.post("http://172.17.151.141:3002/allImgTabExt", formData,{
          responseType: 'blob' // Ensure response is treated as a Blob
        });
  
        // FileSaver.saveAs(
        //   new Blob([response.data], { type: 'application/zip' }), 
        //   'my_download_file.zip'
        // );
        const blob = new Blob([response.data], { type: 'application/zip' });
        const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'my_download_file.zip');
      link.click();
        
      
      } catch (error) {
        console.error("Error during download:", error);
      }
  };






  return (
    <>
      <form onSubmit={onSubmit}>
        <div >
          <input type="file"  onChange={onFileChange}  accept=".zip"/>
        </div>
        <button  type="submit">
          Download
        </button>
      </form>       
    </>
  )
}