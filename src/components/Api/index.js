

import axios from "axios";
import Cookies from 'js-cookie';

const APIUrl = "http://localhost:3001";

const Api="http://172.17.151.141:3002"

export const userlogin = async (email, password) => {
  const loginUrl = APIUrl + "/login";
 // const loginUrl=Api+"/login"
  try {
    const response = await axios.post(loginUrl, { email, password });
    console.log("responce",response)
    return response.data;

  } catch (error) {
    console.log(error);
  }
};

export const AddUser=async( email, password, name )=>{
    const signupUrl=APIUrl+"/signup";
    try{
const response=await axios.post(signupUrl,{ email, password, name });
console.log("2222",response)
    }catch(error){
        console.log(error);
        throw error;
    }
}

export const contactdetails=async(name,email,message) =>{
  const contactUrl=APIUrl+"/contact";
  try {
    const response=await axios.post(contactUrl,{name,email,message});
    console.log("contactDetails",response)
    
  } catch (error) {
    console.log(error);
    throw error;
  }
}
