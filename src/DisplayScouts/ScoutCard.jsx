import React from "react";
import { Grid, Typography, Rating } from "@mui/material";
import "../styles/scout-card-styles.scss";

function ScoutCard(props) {
  const user = props.user;
  return (
    <div>
      <Grid
        container
        spacing={1}
        direction="column"
        alignItems="center"
        justifyContent="center"
        className="scout-card"
      >
        <Grid item xs>
          <img src={props.userImage} alt="userImage" className="user-avatar" />
        </Grid>
        <Grid item xs className="ratings">
          <Rating
            name="user-rating"
            value={user.rating}
            precision={0.1}
            readOnly
          />
        </Grid>
        <Grid item xs>
          <Typography
            variant="body1"
            color="textSecondary"
            component="p"
            sx={{ fontWeight: "bold" }}
          >
            {user.name}
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
}

export default ScoutCard;
