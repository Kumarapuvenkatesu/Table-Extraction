import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import Contact from "./Contact";
import Header from "../Header/Header";
import {InputAdornment, InputLabel, FormControlLabel, Radio, RadioGroup, IconButton, TablePagination, Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Container, Button, Drawer, Stack, Typography, Box, TextField, Dialog, DialogTitle, DialogActions, Slide } from "@mui/material";
import { Close } from "@mui/icons-material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import {Link} from "react-router-dom";


function SignupDetails() {
  const [user, setUser] = useState('')
  const [rowsPerPage, setRowsPerPage] = useState(3);
  const [page, setPage] = useState(0);

  const [open, setOpen] = useState(false);
  const [opened, setOpened] = useState(false);
  const [userId, setUserId] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [userStatus,setUserStatus]=useState('')

  const URL = 'http://localhost:3001/usersdetails';


  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(URL);
     // console.log("userdetails", response)
      setUser(response.data);


    };
    fetchData();
  }, []);



  useEffect(() => {
    const jwtToken = Cookies.get("token");
    if (jwtToken === undefined) {
      window.location.href = "/login"
    }
  }, [undefined])


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  }
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  }

  const editupdate = async (data) => {
    setOpen(true);
    const { _id, name, email, status} = data;
    setUserId(_id);
    setName(name);
    setEmail(email);
    setUserStatus(status)
  }

  const closeDrawer = () => {
    setOpen(false)
    setOpened(false)
  }

  const deletedData = (id) => {
    setUserId(id)
    setOpened(true);
  }

  const eraseData=async()=>{
try {
  const response=await axios.delete(`http://localhost:3001/delete/${userId}`);
  console.log("deletedata",response)
  window.location.href="/";
  
} catch (error) {
  console.log(error)
}
  }

  const handleUpdateData=async(e)=>{
    e.preventDefault();
    try {
      const response=await axios.put(`http://localhost:3001/updateData/${userId}`,{name,email, status:userStatus});
      console.log("updateData",response);
      window.location.href="/";
    } catch (error) {
      console.log(error)
    }

  }

  const [searchTerm,setSearchTerm]=useState('')
  const [filteredProjects,setFilteredProjects]=useState('')

  useEffect(() => {
    if (searchTerm) {
      const filteredData =user.filter((project) =>
      project?.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProjects(filteredData);
    } else {
      setFilteredProjects(user );
    }
  }, [searchTerm, user ]);


  return (
    <>
      <Header />
      <Container >
       
        <Stack direction={'row'} alignItems={"center"} justifyContent={"space-between"} mt={16}><h1>Signup USer Details</h1>
        <Link to="/contact"> contact </Link>
        <Link to='/fileupload'>tableExtraction</Link>
        <TextField placeholder="Search" type="search" value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)}  InputProps={{ startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),}}/></Stack>
        <Paper elevation={1}   >
          <TableContainer width={10} >
            {filteredProjects && (
              <Table >
                <TableHead >
                  <TableRow bgColor="green"  >
                    <TableCell>name</TableCell>
                    <TableCell >email</TableCell>
                    {/* <TableCell>Password</TableCell> */}
                    <TableCell>Role</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody >
                  {filteredProjects.map((data) => (
                    <TableRow key={data._id} hover>
                      <TableCell>{data?.name}</TableCell>
                      <TableCell >{data.email}</TableCell>
                      {/* <TableCell>{data.password}</TableCell> */}
                      <TableCell>{data.role}</TableCell>
                      <TableCell>{data.status}</TableCell>
                      <TableCell><Button onClick={() => editupdate(data)}><EditIcon />Edit</Button>|
                        <Button onClick={() => deletedData(data._id)}><DeleteIcon />Delete</Button></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[3, 5, 7, 10]}
            component="div"
            count={user.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Container>

      {/* <Contact /> */}

      {/* edit code */}
      <Drawer anchor={"right"} open={open} >
        <Stack px={4} width={"400px"} height={"100%"}>
          <Stack direction={"row"} py={3} justifyContent={"space-between"} alignItems={"center"}>
            <Typography variant={"h3"}>Edit</Typography>
            <IconButton onClick={closeDrawer}>
              <Close />
            </IconButton>
          </Stack>
          <Box component="form" onSubmit={handleUpdateData}>
            <TextField
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
            />
            <TextField
              type="email"
              fullWidth
              value={email}
              // onChange={(e) => setEmail(e.target.value)} 
              />
               <Stack direction={"row"} alignItems={"center"} spacing={2}>
                    <InputLabel>User Status</InputLabel>
                    <RadioGroup row  onChange={(e)=>setUserStatus(e.target.value)} value={userStatus} >
                      <FormControlLabel value="Active" control={<Radio />} label="Active" />
                      <FormControlLabel value="InActive" control={<Radio />} label="InActive" />
                    </RadioGroup>
                  </Stack>
              
            <Stack direction={"row"} py={4} justifyContent={"space-between"} alignItems={"center"}>
              <Button onClick={closeDrawer} variant="outlined" color="info" >Cancel</Button>
              <Button variant="contained"  type="submit">
                ok
              </Button>
            </Stack>
          </Box>
        </Stack>
      </Drawer>



      {/* Delete data code  */}


      <Dialog open={opened}  >
<Container>
        <Stack width="400px">
          <Stack direction={"row"} justifyContent={"space-between"}>
            <DialogTitle>Delete User</DialogTitle>
            <IconButton onClick={closeDrawer}>
              <Close />
            </IconButton>
          </Stack>
         Are you sure you want to delete this user?
          <DialogActions>
            <Button onClick={closeDrawer} variant="outlined" color="info">Cancel</Button>
            <Button variant="contained" onClick={eraseData}>
              ok
            </Button>
          </DialogActions>
        </Stack>
        </Container>
      </Dialog>
    </>
  )
}

export default SignupDetails;