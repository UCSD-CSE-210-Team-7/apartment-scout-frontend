// Import required components and assets
import Loading from "../components/Loading";
import ScoutCard from "../components/ScoutCard";
import userImage from "../img/user.png";
import "../styles/calendar-styles.scss";
import { useMutation, useQuery, gql } from "@apollo/client";
import { Grid, TextField } from "@mui/material";
import React, { useState } from "react";
import { useCalendlyEventListener, InlineWidget } from "react-calendly";
import { useParams } from "react-router-dom";

// Define GraphQL queries for fetching user details
export const QUERY_USER_DETAILS = gql`
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

// Define GraphQL mutations for creating tour
export const CREATE_TOUR = gql`
  mutation CreateTour($scoutedBy: String!, $tourAddress: String!) {
    createTour(scouted_by: $scoutedBy, tour_address: $tourAddress) {
      tour_id
      tour_address
      date_requested
      status
    }
  }
`;

/**
 * Scout calendar component while displays the scout details (name, rating), calendar availability
 * and allows the user to create a tour by entering tour address and booking an appointment with
 * the scout.
 * @returns {JSX.Element} The JSX element for the ScoutCalendar component.
 */
const ScoutCalendarPage = () => {
  const { email } = useParams();
  const [tourAddress, setTourAddress] = useState("");
  // Fetch the scout details
  const { data, loading } = useQuery(QUERY_USER_DETAILS, {
    variables: { email },
  });
  const scout = data?.userDetails;
  // Use mutation to create tour
  const [createTourMutation] = useMutation(CREATE_TOUR);

  // Async function that runs when an event is scheduled in Calendly
  // Create a tour record when an appointment is booked successfully
  useCalendlyEventListener({
    onEventScheduled: async () =>
      createTourMutation({
        variables: {
          scoutedBy: email,
          tourAddress: tourAddress,
        },
      }),
  });

  if (!data || loading) return <Loading />;

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
