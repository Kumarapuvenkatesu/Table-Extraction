import {useState,useEffect} from "react";
import axios from "axios";
import Header from "../Header/Header";
const URL="http://localhost:3001/projects"

function Home(){
    const [projects,setProjects]=useState('');


    return(
<>
<Header/>
<h1>Projects</h1>
{/* { projects &&
    projects.map((eachData, id)=>{
        return <div key={eachData.id}>
            <p>{eachData.title}</p>
        </div>
    })
} */}
</>
    )
}
export default Home;