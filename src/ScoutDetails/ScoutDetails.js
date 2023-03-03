import React, { useEffect, useContext } from "react";

import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {
    Grid,
    Rating
  } from "@mui/material";

import Auth from '../utils/auth';

import userImage from "../img/user.png";
import ScoutCard from '../DisplayScouts/ScoutCard'

import { styled } from '@mui/material/styles';

import Paper from '@mui/material/Paper';
import { getAuth } from "firebase/auth";



const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    padding: theme.spacing(1),
    textAlign: 'center',

    color: theme.palette.text.secondary,
  }));

function ScoutDetails() {
    const authContext = useContext(Auth);
    const auth = getAuth();
    useEffect(() => {
        console.log(auth, auth.currentUser);
    }, []);

    return (
        
        <Card sx={{margin: "50px", height: "730px"}}>

            
            <Grid container spacing={1} display="flex">
                
                <Grid item xs={4}>
                {/* <ScoutCard key={user.name} user={user} userImage={userImage}></ScoutCard> */}
                <Card sx={{ maxWidth: "445px", width:"28vw", marginBottom: "50px", marginLeft: "10px", margin:"50px"}}>
                    <CardMedia
                        sx={{ height: "350px"  }}
                        image= {userImage}
                        style={{
                            width: '20vw',
                            height: '20vw',
                            borderRadius: 200 / 2,
                            marginLeft: "60px"
                          }}
                     />
                    <CardContent>
                    
 
                    
                    <Stack spacing={4} marginLeft="80px">
                    <Rating name="half-rating-read" defaultValue={3.5} precision={0.5} readOnly />
                    
                    </Stack>

                    <Typography gutterBottom variant="h5" component="div"marginLeft="80px">
                            Lionel Messi 
                        </Typography>
                    </CardContent>

                
                    
                </Card>
                </Grid>
                
                <Grid item xs={6} padding="40px" margin={"70px"}>
                <Item>Review 1</Item>
                <Grid container spacing={1} display="flex" padding="30px"></Grid>
                
                <Grid item xs={12}>
                <Item>Review 2</Item>
                </Grid>

                <Grid container spacing={1} display="flex" padding="30px"></Grid>
                <Grid item xs={12}>
                <Item>Review 3</Item>
                </Grid>
                </Grid>

               

            </Grid>

                

                <Stack spacing={35} direction="row" marginLeft={"100px"} width={"1300px"} height={"50px"}>
                    <Button variant="contained">33 Tours Cpmpleted</Button>
                    <Button variant="contained">Chat with Me</Button>
                    <Button variant="contained">See Schedule</Button>
                </Stack>

               
                
        
        </Card>
        
    );   
        
    
     
  }
  
  
export default ScoutDetails;

