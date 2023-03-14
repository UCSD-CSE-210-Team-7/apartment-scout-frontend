// Import required dependencies, components and assets.
import React from "react";
import { Link } from "react-router-dom";
import { Rating, Icon } from "@mui/material";
import "../styles/scout-card-styles.scss";
import Loading from './Loading';

/**
 * ScoutCard component displays the name, email, tour ratings and display image of the scouts.
 * @returns {JSX.Element} The JSX element for the HomePageComponent.
 */


function ScoutCard({user, userImage}) {
  if(!user)
    return <Loading/>

  return (
    <Link to={`/browse/${user.email}`}>
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
          <img src={userImage} alt="userImage" className="user-avatar" />
        </div>
        <div
          style={{
            width: "90%",
            textAlign: "center",
            padding: "0.5em",
            // background: "#FFFFFF",
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
    </Link>
  );
}

export default ScoutCard;
