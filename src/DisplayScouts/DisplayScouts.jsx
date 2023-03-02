import React, { useState, useEffect, useContext } from "react";
import { Grid, Button, TextField } from "@mui/material";
import scoutData from "./scouts.json";
import userImage from "./user.jpg";
import "../styles/display-scout-styles.scss";
import ScoutCard from "./ScoutCard";
import { useQuery, gql } from "@apollo/client";

const QUERY_USER_BY_REGIONS = gql`
  query UsersByRegion($zipcode: Int) {
    usersByRegion(zipcode: $zipcode) {
      users {
        name
      }
    }
  }
`;

function DisplayScouts() {
  const [users, setUsers] = useState([]);

  const [zipcode, setZipcode] = useState("");

  const { loading, error, refetch } = useQuery(QUERY_USER_BY_REGIONS, {
    skip: true, // initially skip query execution
    onCompleted: (result) => {
      setUsers(result.usersByRegion.users);
    },
    variables: { zipcode: zipcode },
  });

  useEffect(() => {}, []);

  const handleZipcodeChange = (event) => {
    setZipcode(Number(event.target.value));
  };

  const HandleZipCodeSearch = () => {
    // Fire the usersByRegion API
    refetch({ variables: { zipcode: zipcode } }); // pass the value as a variable to the query
  };

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
            value={zipcode}
            onChange={handleZipcodeChange}
          />
          <Button
            variant="contained"
            className="search-button"
            color="primary"
            onClick={HandleZipCodeSearch}
          >
            Go
          </Button>
        </div>
      </div>
      {loading && <h1>Loading...</h1>}
      {error && <h1>Error :(</h1>}
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
