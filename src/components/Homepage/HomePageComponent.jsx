import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Button } from "@mui/material";
import "../../styles/home-styles.scss";
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  //boxShadow: 'none',
  // '.MuiOutlinedInput-notchedOutline': { border: 0 },
}));

/*
   TODO 1: Use user information to fetch ALL tours and display according to the activeButton
   TODO 2: When user clicks view for one tour
           a) pass tour_id to the url
           b) pass activeButton whether his role is requester or scout to the url,
              because it distinguishes the "write a review" in next page
*/

function HomePageComponent({ tableColumns, tableData }) {

  const [activeButton, setActiveButton] = useState('requester');
  const handleButtonClick = (buttonType) => {
    setActiveButton(buttonType);
  }
  const navigate = useNavigate()
  const tour_id = "1" 
  const navigateToDetails = () =>
    navigate({
      pathname: '/tourdetails/' + tour_id
    });

  return (
    <div style={{ flexGrow: 1 }}>
      <div className="userTypeContainer">
        <button className={`userTypeButton1 ${activeButton === 'requester' ? 'active' : 'inactive'}`} onClick={() => handleButtonClick('requester')}>Tours as a requester</button>
        <button className={`userTypeButton2 ${activeButton === 'scout' ? 'active' : 'inactive'}`} onClick={() => handleButtonClick('scout')}>Tours as a scout</button>
      </div>
      <div className="inprogress-header">
        <h1 className="inprogress-text">In Progress Tours </h1>
      </div>
      {Array.from({ length: 2 }).map((_, idx) => (
        <Box
          key={idx}
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
            {tableColumns.map((_, idx) => (
              <Grid item xs={2} key={idx}>
                <Item
                  sx={{
                    marginLeft: "10px",
                    marginBottom: "5px",
                    fontSize: "17px",
                    fontWeight: "bold",
                  }}
                >
                  {" "}
                  {tableColumns[idx]}
                </Item>
                <Item sx={{ marginLeft: "10px" }}>{tableData[idx]}</Item>
              </Grid>
            ))}
            <Grid
              item
              xs={4}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <Button variant="contained" onClick={navigateToDetails}>View Tour</Button>
            </Grid>
          </Grid>
        </Box>
      ))}

      <div className="past-header">
        <h1 className="past-text">Past Tours </h1>
      </div>

      {Array.from({ length: 2 }).map((_, idx) => (
        <Box
          key={idx}
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
            {tableColumns.map((_, idx) => (
              <Grid item xs={2} key={idx}>
                <Item
                  sx={{
                    marginLeft: "10px",
                    marginBottom: "5px",
                    fontSize: "17px",
                    fontWeight: "bold",
                  }}
                >
                  {" "}
                  {tableColumns[idx]}
                </Item>
                <Item sx={{ marginLeft: "10px" }}>{tableData[idx]}</Item>
              </Grid>
            ))}
            <Grid
              item
              xs={4}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <Button variant="contained" color="success" onClick={navigateToDetails}>
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
