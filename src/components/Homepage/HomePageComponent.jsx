// Import required dependencies, componenets and assets.
import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Button } from "@mui/material";
import "../../styles/home-styles.scss";
import { useNavigate } from "react-router-dom";
import { useState, useContext } from 'react';
import Auth from "../../utils/auth";
import { gql, useQuery } from "@apollo/client";


// CSS for the HomepageComponent.
// Styled component based on the 'Paper' component
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  //boxShadow: 'none',
  // '.MuiOutlinedInput-notchedOutline': { border: 0 },
}));

// Define GraphQL queries for fetching tour details like tour_id, address, dates, requester, etc.
const QUERY_TOURS = gql`
query Tours($role: String!, $user: String!, $status: String!) {
  getTours(role: $role, user: $user, status: $status) {
    tour_id
    tour_address
    date_requested
    date_completed
    requested_by{
      name
    }
    scouted_by{
      name
    }
  }
}
`;

/**
 * HomePageComponent component displays the tour details in the tour home page. For each tour of the user,
 * it is fetching the name of his partner, the address, the requested date and the due date both from
 * the requester and scout perspective, since a user is default to be a requester, but he can also be
 * a scout. In each tour, there is a "view" button for user to click and see further details implemented
 * by "TourDetailsPage"
 * @returns {JSX.Element} The JSX element for the HomePageComponent.
 */
function HomePageComponent({ tableColumns}) {
  const auth = useContext(Auth);
  const selfEmail = auth?.user?.email;

  const { data: scoutPlannedTours} = useQuery(QUERY_TOURS, {
    variables: {
      role: "scout",
      user: selfEmail,
      status: "PLANNED"
    },
  })

  // scout planned tours component 
  const scoutPlannedTable = scoutPlannedTours?.getTours?.map(tour => [
    tour.requested_by.name,
    tour.tour_address,
    tour.date_requested? new Date(tour.date_requested).toLocaleDateString(): "N/A",
    tour.date_completed? new Date(tour.date_completed).toLocaleDateString(): "N/A",
  ]) ?? []

  const { data: scoutCompletedTours } = useQuery(QUERY_TOURS, {
    variables: {
      role: "scout",
      user: selfEmail,
      status: "COMPLETE"
    },
  });

  const scoutCompletedTable = scoutCompletedTours?.getTours?.map(tour => [
    tour.requested_by.name,
    tour.tour_address,
    tour.date_requested? new Date(tour.date_requested).toLocaleDateString(): "N/A",
    tour.date_completed? new Date(tour.date_completed).toLocaleDateString(): "N/A",
  ]) ?? []


  const { data: requesterPlannedTours } = useQuery(QUERY_TOURS, {
    variables: {
      role: "requester",
      user: selfEmail,
      status: "PLANNED"
    },
  });

  // Requester planned tours component
  const requesterPlannedTable = requesterPlannedTours?.getTours?.map(tour => [
    tour.scouted_by.name,
    tour.tour_address,
    tour.date_requested? new Date(tour.date_requested).toLocaleDateString(): "N/A",
    tour.date_completed? new Date(tour.date_completed).toLocaleDateString(): "N/A",
  ]) ?? []

  const { data: requesterCompletedTours } = useQuery(QUERY_TOURS, {
    variables: {
      role: "requester",
      user: selfEmail,
      status: "COMPLETE"
    },
  });

  const requesterCompletedTable = requesterCompletedTours?.getTours?.map(tour => [
    tour.scouted_by.name,
    tour.tour_address,
    tour.date_requested? new Date(tour.date_requested).toLocaleDateString(): "N/A",
    tour.date_completed? new Date(tour.date_completed).toLocaleDateString(): "N/A",
  ]) ?? []



// Event handler to handle button clicks.
  const [activeButton, setActiveButton] = useState('requester');
  const handleButtonClick = (buttonType) => {
    setActiveButton(buttonType);
  }
  const navigate = useNavigate()
  const navigateToDetails = (tour_id) =>
    navigate({
      pathname: '/tourdetails/' + activeButton + "/" + tour_id
    });



    return (
      <div style={{ flexGrow: 1 }}>
        <div className="userTypeContainer">

        {/* Two buttons provided to facilitate two functionalities
        1] Tour as a requester, where the user is a requester and can view the scouts and previous tour
        along with reviews and images provided.
        2] Tour as a scout where te user is a scout and the user submits a review and images on the
        portal for requesters to check and chat with the requesters.
        */}
         
          <button className={`userTypeButton1 ${activeButton === 'requester' ? 'active' : 'inactive'}`} onClick={() => handleButtonClick('requester')}>Tours as a requester</button>
          <button className={`userTypeButton2 ${activeButton === 'scout' ? 'active' : 'inactive'}`} onClick={() => handleButtonClick('scout')}>Tours as a scout</button>
        </div>
        <div className="inprogress-header">
          <h1 className="inprogress-text">In Progress Tours </h1>
        </div>
        {/* user when actiavted in Scout mode */}
        {activeButton === "scout" && scoutPlannedTours?.getTours?.map((tour, idxTour) => (
          <Box
            key={tour.tour_id}
            sx={{
              margin: "0 auto",
              marginBottom: "30px",
              borderRadius: 5,
              bgcolor: "white",
              width: 900,
              height: 150,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Grid container spacing={2}>
              {tableColumns.map((_, idxCol) => (
                <Grid item xs={2} key={idxCol}>
                  <Item
                    sx={{
                      marginLeft: "10px",
                      marginBottom: "5px",
                      fontSize: "17px",
                      fontWeight: "bold",
                    }}
                  >
                    {" "}
                    {tableColumns[idxCol]}
                  </Item>
                  <Item sx={{ marginLeft: "10px" }}>{scoutPlannedTable[idxTour][idxCol]}</Item>
                </Grid>
              ))}
              <Grid
                item
                xs={4}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <Button variant="contained" onClick={() => navigateToDetails(tour.tour_id)}>View Tour</Button>
              </Grid>
            </Grid>
          </Box>
        ))} 

        {/* user when activated in Requester Mode. */}
        {activeButton === "requester" && requesterPlannedTours?.getTours?.map((tour, idxTour) => (
          <Box
            key={tour.tour_id}
            sx={{
              margin: "0 auto",
              marginBottom: "30px",
              borderRadius: 5,
              bgcolor: "white",
              width: 900,
              height: 150,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Grid container spacing={2}>
              {tableColumns.map((_, idxCol) => (
                <Grid item xs={2} key={idxCol}>
                  <Item
                    sx={{
                      marginLeft: "10px",
                      marginBottom: "5px",
                      fontSize: "17px",
                      fontWeight: "bold",
                    }}
                  >
                    {" "}
                    {tableColumns[idxCol]}
                  </Item>
                  <Item sx={{ marginLeft: "10px" }}>{requesterPlannedTable[idxTour][idxCol]}</Item>
                </Grid>
              ))}
              <Grid
                item
                xs={4}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                {/* Event handler to view TourDetailspage where the requester can View
                the review and images posted by the scout on click of View Tour button */}

                <Button variant="contained" onClick={() => navigateToDetails(tour.tour_id)}>View Tour</Button>
              </Grid>
            </Grid>
          </Box>
        ))} 
  
        <div className="past-header">
          <h1 className="past-text">Past Tours </h1>
        </div>
        {/* Scout Completed/Past tours component */}
        {activeButton === "scout" && scoutCompletedTours?.getTours?.map((tour, idxTour) => (
          <Box
            key={tour.tour_id}
            sx={{
              margin: "0 auto",
              marginBottom: "30px",
              borderRadius: 5,
              bgcolor: "white",
              width: 900,
              height: 150,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Grid container spacing={2}>
              {tableColumns.map((_, idxCol) => (
                <Grid item xs={2} key={idxCol}>
                  <Item
                    sx={{
                      marginLeft: "10px",
                      marginBottom: "5px",
                      fontSize: "17px",
                      fontWeight: "bold",
                    }}
                  >
                    {" "}
                    {tableColumns[idxCol]}
                  </Item>
                  <Item sx={{ marginLeft: "10px" }}>{scoutCompletedTable[idxTour][idxCol]}</Item>
                </Grid>
              ))}
              <Grid
                item
                xs={4}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                {/* Event handler to view TourDetailspage where the requester can View
                the review and images posted by the scout on click of View Tour button */}
                <Button variant="contained" color="success" onClick={() => navigateToDetails(tour.tour_id)}>
                  View Tour
                </Button>
              </Grid>
            </Grid>
          </Box>
        ))}
         {/* Requester Completed/Past tours component */}
        {activeButton === "requester" && requesterCompletedTours?.getTours?.map((tour, idxTour) => (
          <Box
            key={tour.tour_id}
            sx={{
              margin: "0 auto",
              marginBottom: "30px",
              borderRadius: 5,
              bgcolor: "white",
              width: 900,
              height: 150,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Grid container spacing={2}>
              {tableColumns.map((_, idxCol) => (
                <Grid item xs={2} key={idxCol}>
                  <Item
                    sx={{
                      marginLeft: "10px",
                      marginBottom: "5px",
                      fontSize: "17px",
                      fontWeight: "bold",
                    }}
                  >
                    {" "}
                    {tableColumns[idxCol]}
                  </Item>
                  <Item sx={{ marginLeft: "10px" }}>{requesterCompletedTable[idxTour][idxCol]}</Item>
                </Grid>
              ))}
              <Grid
                item
                xs={4}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                {/* Event handler to view TourDetailspage where the requester can View
                the review and images posted by the scout on click of View Tour button */}

                <Button variant="contained" color="success" onClick={() => navigateToDetails(tour.tour_id)}>
                  View Tour
                </Button>
              </Grid>
            </Grid>
          </Box>
        ))}
      </div>
    );


}

export default HomePageComponent;
