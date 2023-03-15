// Import required dependencies
import React, { useState } from "react";
import { useLazyQuery, gql } from "@apollo/client";
import userImage from "../img/user.png";

// Import style files and images
import "../styles/display-scout-styles.scss";
import ScoutCard from "../components/ScoutCard";
import Loading from "../components/Loading";

// Define GraphQL queries for fetching user details region wise i.e., by using zipcodes entered.
export const QUERY_USER_BY_REGIONS = gql`
  query UsersByRegion($zipcode: Int) {
    usersByRegion(zipcode: $zipcode) {
      users {
        name
        email
        tours {
          tour_review_stars
        }
      }
    }
  }
`;

/**
 * The InputBar takes in the zipcode and then maps it to all the scout profiles
 * who have added the same zipcodes in their profiles. On clicking the Go button all the possible
 * scouts are displayed in order.
 */

function InputBar({ submit }) {
  const [zipcode, setZipcode] = useState("");
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "1em 6em 0",
      }}
    >
      <h1 style={{ fontSize: "3.5em", color: "#FFFFFF" }}>Find a Scout</h1>
      <div
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <input
          style={{
            fontSize: "2em",
            textAlign: "center",
            height: "2em",
            background: "#D9D9D9",
            border: "0",
            borderRadius: "2em",
            width: "8em",
          }}
          type="text"
          placeholder="(zipcode)"
          value={zipcode}
          onChange={(e) => setZipcode(e.target.value)}
        />
        <button
          style={{
            fontSize: "2em",
            textAlign: "center",
            height: "2em",
            background: "#ADE8F4",
            border: "0",
            borderRadius: "2em",
            padding: "0 1em",
            margin: "0 0 0 1em",
          }}
          // Event handler to navigate to DisplayScouts in the region on click of Go button
          onClick={() => submit(parseInt(zipcode))}
        >
          Go
        </button>
      </div>
    </div>
  );
}

/**
 * DisplayScouts component displays a list of all the scouts that are available in the zip code region entered by the user.
 * The scout's name, profile picture and the rating (number of start provided by the existing users).
 * The user can click on the name and it will direct them to the scoutDetails Page.
 *  @returns {JSX.Element} The JSX element for the DisplayScouts component.
 */

function DisplayScouts() {
  // Fetch the ScoutDetails by Regions
  const [getUsersByRegion, { data, loading }] = useLazyQuery(
    QUERY_USER_BY_REGIONS
  );

  let content;
  if (loading) content = <Loading />;
  else if (data?.usersByRegion?.users.length === 0)
    content = <h1>No scouts in this zipcode yet :(</h1>;
  else if (data?.usersByRegion?.users.length > 0)
    content = data.usersByRegion.users.map((user) => (
      <ScoutCard key={user.name} user={user} userImage={userImage} />
    ));
  else content = <h1> Enter a zipcode first! </h1>;

  return (
    <div>
      <InputBar
        submit={(zipcode) => getUsersByRegion({ variables: { zipcode } })}
      />
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          padding: "1em 6em",
        }}
      >
        {content}
      </div>
    </div>
  );
}

export default DisplayScouts;
