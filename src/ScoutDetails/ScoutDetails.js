import React, { useEffect, useContext } from "react";
import { useParams } from 'react-router-dom'; 
import { useQuery, gql } from '@apollo/client';

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


const QUERY_USER_DETAILS = gql`
  query UserDetails($email: String!) {
    userDetails(email: $email) {
        email
        name
        created_on
        last_login
        is_scout
        calendly_link
        tours {
            tour_id
            tour_review_text
            tour_review_stars
        }
        regions
    }
  }
`;


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    padding: theme.spacing(1),
    textAlign: 'center',

    color: theme.palette.text.secondary,
  }));

function ScoutDetails() {
    const { email } = useParams();
    const { data, loading, error } = useQuery(QUERY_USER_DETAILS, { variables: { email } })

    const user = data?.userDetails
    console.log(user)

    if(!user)
        return <h1>Loading...</h1>

    return (
        <Card sx={{margin: "50px", height: "730px"}}>

            
            <Grid container spacing={1} display="flex" direction="row">
                
                <Grid item xs={4}>
                    <ScoutCard key={user.name} user={user} userImage={userImage}></ScoutCard>
                </Grid>

                {user.tours.map(i => 
                    (
                        <Grid item xs={6}>
                            <Item>Review 2</Item>
                        </Grid>
                    )
                )
                }
                
               

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

