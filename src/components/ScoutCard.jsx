import React from "react";
import { Grid, Typography, Rating, Icon } from "@mui/material";
import "../styles/scout-card-styles.scss";

function ScoutCard(props) {
  const user = props.user;
  return (
    <div
      style={{
        background: "#D9D9D9",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "1em 2em",
        width: "30em",
        margin: "1em 0em",
        borderRadius: "1em",
        boxShadow: "0.5em 0.5em 2em -1em black",
      }}
    >
      <div
        style={{
          width: "90%",
          textAlign: "center",
          padding: "1em",
          background: "#FFFFFF",
          borderRadius: "1em",
          boxShadow: "0.5em 0.5em 2em -1em black",
          margin: "1em 0",
        }}
      >
        <img src={props.userImage} alt="userImage" className="user-avatar" />
      </div>
      <div
        style={{
          width: "90%",
          textAlign: "center",
          padding: "0.5em",
          background: "#FFFFFF",
          borderRadius: "1em",
          // boxShadow: '0.5em 0.5em 2em -1em black',
          margin: "1em 0",
          background: "#023E8AB7",
        }}
      >
        <Rating
          name="user-rating"
          value={
            user.tours
              .map((i) => i.tour_review_stars)
              .reduce((a, b) => a + b, 0) / user.tours.length
          }
          precision={0.1}
          readOnly
          style={{
            fontSize: "3em",
            display: "flex",
            justifyContent: "center",
          }}
          emptyIcon={
            <Icon
              style={{ color: "#D4D4D4", opacity: 0.55 }}
              fontSize="inherit"
            >
              star
            </Icon>
          }
        />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          flexGrow: 1,
        }}
      >
        <h1
          style={{
            fontSize: "1.8em",
          }}
        >
          {user.name}
        </h1>
      </div>
    </div>
  );
}

export default ScoutCard;
