import Header from "../Header/Header";
import { Stack,Typography } from "@mui/material";

export default function NotFound(){
    return(
        <Stack  >
            <Header/>
            <center style={{marginTop:"20rem"}}>
            <Typography variant="h3" >NotFound</Typography>
            <Typography paragraphed>There is no content</Typography>
            </center>
            
        </Stack>
    )
}