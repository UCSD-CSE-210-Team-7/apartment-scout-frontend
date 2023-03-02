import React, { useState, useEffect } from "react";
import { Grid, Button, TextField } from "@mui/material";
import scoutData from "./scouts.json";
import userImage from "./user.jpg";
import "../styles/display-scout-styles.scss";
import ScoutCard from "./ScoutCard";

function DisplayScouts() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch data from an API or database
    setUsers(scoutData);
  }, []);

  return (
    <div className="scouts-container">
      <div className="search-bar-header">
        <h1 className="search-label">Find a Scout</h1>
        <div className="search-input">
          <TextField
            label="Zipcode"
            placeholder="Enter zip code"
            className="zipcode-search-bar"
            sx={{ width: "25%" }}
          />
          <Button variant="contained" className="search-button" color="primary">
            Go
          </Button>
        </div>
      </div>
      <div className="scouts-grid-wrapper">
        <Grid
          container
          columnSpacing={6}
          rowSpacing={5}
          className="scouts-grid"
        >
          {users.map((user) => (
            <Grid item key={user.id} xs={12} sm={6} md={4} lg={3}>
              <ScoutCard user={user} userImage={userImage}></ScoutCard>
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
}

export default DisplayScouts;
