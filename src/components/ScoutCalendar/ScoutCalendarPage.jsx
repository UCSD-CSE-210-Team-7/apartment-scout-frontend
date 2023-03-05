import React, { useState } from "react";
import { useCalendlyEventListener, InlineWidget } from "react-calendly";
import ScoutCard from "../../DisplayScouts/ScoutCard";
import { useQuery, gql } from "@apollo/client";
import { Grid } from "@mui/material";
import userImage from "../../img/user.png";
import "../../styles/calendar-styles.scss";

const QUERY_USER_DETAILS = gql`
  query UserDetails($email: String!) {
    userDetails(email: $email) {
      name
    }
  }
`;

const ScoutCalendarPage = () => {
  const [user, setUser] = useState(null);
  const { loading, error, refetch } = useQuery(QUERY_USER_DETAILS, {
    skip: false, // initially skip query execution
    onCompleted: (result) => {
      setUser(result.userDetails);
    },
    variables: { email: "abokade@ucsd.edu" },
  });
  useCalendlyEventListener({
    onEventScheduled: (e) => console.log(e.data.payload),
  });

  return (
    <div className="App">
      {user && (
        <Grid
          container
          direction="row"
          alignItems="center"
          className="card-calendar-container"
          justifyContent="space-between"
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
                  key={user.name}
                  user={user}
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
          <Grid item>
            <Grid
              container
              direction="column"
              alignItems="center"
              className="calendar-widget"
            >
              <Grid item>
                <h1>Available times</h1>
              </Grid>
              <Grid item className="calendly-widget">
                <InlineWidget url="https://calendly.com/abokade/30min" />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      )}
    </div>
  );
};

export default ScoutCalendarPage;
