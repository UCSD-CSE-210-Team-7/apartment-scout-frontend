import React, { useState } from "react";
import userImage from "../img/user.png";
import "../styles/display-scout-styles.scss";
import ScoutCard from "../components/ScoutCard";
import { useLazyQuery, gql } from "@apollo/client";

const QUERY_USER_BY_REGIONS = gql`
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
          onClick={() => submit(parseInt(zipcode))}
        >
          Go
        </button>
      </div>
    </div>
  );
}

function DisplayScouts() {
  const [getUsersByRegion, { data }] = useLazyQuery(QUERY_USER_BY_REGIONS);

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
        {data &&
          data.usersByRegion &&
          data.usersByRegion.users &&
          data.usersByRegion.users.map((user) => (
            <ScoutCard
              key={user.name}
              user={user}
              userImage={userImage}
            ></ScoutCard>
          ))}
      </div>
    </div>
  );
  // >>>>>>> redesign pages
}

export default DisplayScouts;
