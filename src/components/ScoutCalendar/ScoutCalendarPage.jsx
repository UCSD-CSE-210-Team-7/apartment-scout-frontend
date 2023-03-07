import React, { useState } from "react";
import { useCalendlyEventListener, InlineWidget } from "react-calendly";
import ScoutCard from "../../DisplayScouts/ScoutCard";
import { useMutation, useQuery, gql } from "@apollo/client";
import { Grid, TextField } from "@mui/material";
import { useParams } from "react-router-dom";
import userImage from "../../img/user.png";
import "../../styles/calendar-styles.scss";

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

const CREATE_TOUR = gql`
  mutation CreateTour($scoutedBy: String!, $tourAddress: String!) {
    createTour(scouted_by: $scoutedBy, tour_address: $tourAddress) {
      tour_id
      tour_address
      date_requested
      status
    }
  }
`;

const ScoutCalendarPage = () => {
  const { email } = useParams();
  const [tourAddress, setTourAddress] = useState("");
  const { data, loading, error, refetch } = useQuery(QUERY_USER_DETAILS, {
    variables: { email },
  });
  const scout = data?.userDetails;

  const [createTourMutation] = useMutation(CREATE_TOUR);

  useCalendlyEventListener({
    onEventScheduled: async (e) => {
      await createTourMutation({
        variables: {
          scoutedBy: scout.email,
          tourAddress: tourAddress,
        },
      });
    },
  });

  return (
    <div className="App">
      {scout && (
        <Grid container direction="column" className="card-calendar-container">
          <h1 style={{ textAlign: "center" }}>New Tour Booking</h1>
          <br />
          <Grid
            container
            direction="row"
            alignItems="center"
            justifyContent="space-evenly"
          >
            <Grid item>
              <Grid
                container
                direction="column"
                alignItems="center"
                className="scout-card-grid-container"
              >
                <Grid item className="scout-grid-item">
                  <ScoutCard
                    key={scout.name}
                    user={scout}
                    userImage={userImage}
                  ></ScoutCard>
                </Grid>
                <Grid item>
                  <button className="chat-button" type="button">
                    Chat with Me
                  </button>
                </Grid>
              </Grid>
            </Grid>
            {scout.calendly_link ? (
              <Grid item>
                <Grid
                  container
                  direction="column"
                  alignItems="center"
                  className="calendar-widget"
                >
                  <Grid item>
                    <h1>Enter Tour Address</h1>
                  </Grid>
                  <Grid item>
                    <TextField
                      id="outlined-basic"
                      required
                      label="Tour Address"
                      variant="outlined"
                      value={tourAddress}
                      onChange={(e) => setTourAddress(e.target.value)}
                    />
                  </Grid>
                  <Grid item>
                    <h1>Available times</h1>
                  </Grid>
                  <Grid item className="calendly-widget">
                    <InlineWidget
                      styles={{ height: "900px" }}
                      url={scout.calendly_link}
                    />
                  </Grid>
                </Grid>
              </Grid>
            ) : (
              <h1>
                We're sorry, but this user does not <br /> support automated
                tour booking. Try chat!
              </h1>
            )}
          </Grid>
        </Grid>
      )}
    </div>
  );
};

export default ScoutCalendarPage;
