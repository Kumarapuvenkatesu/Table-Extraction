
// import React, { useState,useEffect } from "react";
// import axios from "axios";
// import Header from "../Header/Header";
// import fileimage from  "../Api/file-type.png"
// import { Stack, Box, Button, Typography, TextField} from "@mui/material";
// export default function SingleFile() {
//   const [profileImg, setProfileImg] = useState(null);
//   const[userImages,setUserImages]=useState('')

//   const onFileChange = (e) => {
//      console.log(e.target.files[0])
//     setProfileImg(e.target.files[0]);
//   };
//   const onSubmit = async(e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     formData.append('image', profileImg);

//       try {
//          const response=await axios.post ("http://localhost:3001/upload",formData);
        
//         console.log("123456",response)
       
//       } catch (error) {
//         console.error("Error during download:", error);
//       }
//   };

// useEffect(()=>{
// const fetchData=async()=>{
// const response=await axios.get("http://localhost:3001/get-image");
// console.log("getimages",response.data.image_details);
// setUserImages(response.data.image_details)
// }
// fetchData()
// },[])


//   // const handleFileUpload = () => {
//   //   document.getElementById("fileInput").click();
//   // }

//   // const handleDragFiles = (event) => {
//   //        event.preventDefault();
//   //        const files = event.dataTransfer.files;
//   //        console.log("drag files", files)
//   //       //  setProfileImg(files)
//   //        if (files) {
//   //                for (let i = 0; i < files.length; i++) {
//   //                 const file = files[i];
//   //                 console.log("files",file)
//   //                 setProfileImg(file);
//   //                }
//   //               }
//   // }

//   // const handleDragOver = (event) => {
//   //        event.preventDefault();
//   //      };



//   return (
//     <>
//     <Header/>
//      <div  >
//       <form onSubmit={onSubmit}   
//         style={{marginLeft:"50em",marginTop:"10em"}}>

//         <div >
//           <input type="file"  onChange={onFileChange}  accept="image/*,.zip" id="fileInput"  />
//         </div>
//         <button  type="submit" >
//           Download
//         </button>
//       </form>



//  </div>
//     </>
//   );
// }




import React, { useState,useEffect } from "react";
import axios from "axios";
import * as FileSaver from 'file-saver';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import fileimage from "../assets/file-type.png";
import Header from "../Header/Header";
import Cookies from "js-cookie";
import { Stack, Box, Button, Typography, TextField} from "@mui/material";


export default function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [filePreviews, setFilePreviews] = useState([]);

  useEffect(() => {
    const jwtToken = Cookies.get("token");
    if (jwtToken === undefined) {
      window.location.href = "/login"
    }
  }, [undefined])

  const onFileChange = (e) => {

    const files = e.target.files;
    console.log("files", files)
    if (files) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (
          (file.type === "application/x-zip-compressed" ||
            file.type === "application/vnd.openxmlformats-officedocument.presentationml.presentation" ||
            /image\/(jpeg|png)/.test(file.type))
            // file.type === "image/jpeg" || file.type === "image/png")
            &&
          (file.size <= 1024 * 1024)
        ) {
          setSelectedFile(file); 
          toast.success("File uploaded");
          displayImagePreviews(file)
        } else {
          toast.warning(
            "Please Upload (PNG or ZIP or PPTX) files up to 1MB each",
          );
        }
      }
    }

  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (selectedFile) {
      switch (selectedFile.type) {
        case "image/png"||"image/jpg":
          try {
            const formData = new FormData();
            formData.append("image", selectedFile);

            const response = await fetch("http://172.17.151.141:3002/tableExtraction", {
              method: "POST",
              body: formData,
            });

          //  console.log("1212", response)

            if (!response.ok) {
              throw new Error("Server error");
            }

            const blob = await response.blob();
            FileSaver.saveAs(blob, "my_download_file.csv");

            toast.success("Files uploaded and data extracted successfully");
            setSelectedFile(null)
          } catch (error) {
            toast.error("An error occurred. Please try again.");
          }
          break;

        case "application/x-zip-compressed":
          try {
            const formData = new FormData();
            formData.append("image", selectedFile);

            const response = await axios.post("http://172.17.151.141:3002/allImgTabExt", formData, {
              responseType: 'blob'
            });

            const blob = new Blob([response.data], { type: 'application/zip' });
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'my_download_file.zip');

            link.click();
            toast.success("Files uploaded and data extracted successfully");
            setSelectedFile(null)

          } catch (error) {
            console.error("Error during download:", error);
          }
          break;

        case "application/vnd.openxmlformats-officedocument.presentationml.presentation":
          try {
            const formData = new FormData();
            formData.append("image", selectedFile);

            const response = await axios.post("http://172.17.151.141:3002/pptFileExtraction", formData, {
              responseType: 'blob'
            });

            const blob = new Blob([response.data], { type: 'application/zip' });
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'my_powerpoint_file.zip');

            link.click();
            toast.success("Files uploaded and data extracted successfully");
            setSelectedFile(null)
          } catch (error) {
            console.error("Error during download:", error);
          }
          break;

        default:
          toast.error("Not Accepted this type of files");
      }
    }

  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDragFiles = (event) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    console.log("drag files", files)
    if (files) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (
          (file.type === "application/x-zip-compressed" ||
            file.type === "application/vnd.openxmlformats-officedocument.presentationml.presentation" ||
            // file.type === "image/png"||"image/jpg") 
            /image\/(jpeg|png)/.test(file.type))
            &&
          (file.size <= 1024 * 1024)
        ) {
          setSelectedFile(file);
          toast.success("File uploaded");
          displayImagePreviews(file)
        } else {
          toast.warning(
            "Please drop (PNG or ZIP or PPTX) files up to 1MB each",
          );
        }
      }
    }
  };

  const handleFileUpload = () => {
    document.getElementById("fileInput").click();
  }


  const displayImagePreviews = (file) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      setFilePreviews(event.target.result);
    };
    reader.readAsDataURL(file);
  };



  

  return (
    <Stack>
      <Header />

      <ToastContainer  position="bottom-right"/>

      <Box component="form" onSubmit={onSubmit}>
        <Stack className="fileupload-row">
          <Stack className="container">
            <Typography variant="h2">Extract tabular data from images</Typography>
            <Stack className="dropzone"
              onClick={handleFileUpload}
              onDrop={handleDragFiles}
              onDragOver={handleDragOver}>
              <TextField
                id="fileInput"
                type="file"
                onChange={onFileChange}
                accept="image/*,.zip, .pptx"
                style={{ display: "none" }}
                multiple
              />
              <Stack display={"flex"} alignItems={"center"}>
                <Typography variant="h5">Drop images that have tables, or select ZIP/PPTX files.</Typography>
                <img src={fileimage} alt="logo" width={"400px"} />
                <Typography variant="body1" className="sub-title">
                  Select multiple  PNG, ZIP, or PPTX files, up to 1 MB each
                </Typography>
              </Stack>
              
            </Stack>
            
            {
              selectedFile ?
                <Stack spacing={2} sx={{ display: "flex", alignItems: "center", mt: "6em" }}>
                  {selectedFile.type.startsWith("image/") ? <img src={filePreviews} alt={'Preview'} width={"600px"} /> : null}
                  <Typography variant="p"><b>File Name : </b>{selectedFile?.name}</Typography>
                  <Typography variant="p"><b>File Size : </b>{(selectedFile.size / 1024).toFixed(2)} {""} KB</Typography>
                  <Button type="submit" variant="contained" sx={{ width: "300px" }} className="download-button" >{selectedFile.type === "image/png" ? "Convert to CSV" : "Download To Zip"}</Button>
                </Stack> : null
            }


          </Stack>
        </Stack>
      </Box>



    </Stack>
  );
}














