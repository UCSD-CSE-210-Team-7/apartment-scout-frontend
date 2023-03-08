import React, { useState } from "react";
import "../styles/profile-styles.scss";
import userImg from "../img/user.png";
import { useQuery, useMutation, gql } from "@apollo/client";

const QUERY_USER_DETAILS = gql`
  query Me {
    me {
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

const UPDATE_USER_MUTATION = gql`
  mutation UpdateUser(
    $email: String!
    $name: String
    $is_scout: Boolean
    $regions: [Int]
    $calendly_link: String
  ) {
    updateUser(
      email: $email
      name: $name
      is_scout: $is_scout
      regions: $regions
      calendly_link: $calendly_link
    ) {
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

function Badge({ name, state = "false", color = "green" }) {
  return (
    <div
      style={{
        padding: "0.4em 0em",
        width: "10em",
        background: state ? color : "grey",
        border: "none",
        margin: "2em 0 0",
        color: "white",
        fontSize: "2em",
        textAlign: "center",
      }}
    >
      {name}
    </div>
  );
}

function Zipcodes({ zipcodes, onChange, onDelete, onAdd }) {
  return (
    <div style={{ padding: "1em", display: "flex", flexDirection: "column" }}>
      <p style={{ margin: 0 }}>regions</p>
      {zipcodes.map((elem, idx) => (
        <div style={{ padding: "0.5em" }}>
          <input
            type="number"
            value={elem}
            onChange={(e) => onChange(idx, parseInt(e.target.value))}
            style={{
              width: "fit-content",
              textAlign: "center",
              border: 0,
              borderBottom: "1px solid black",
            }}
          />
          <button
            onClick={() => onDelete(idx)}
            style={{
              color: "white",
              background: "red",
              borderRadius: "0.5em",
              margin: "0em 0.5em",
              padding: "0em 0.5em",
            }}
          >
            X
          </button>
        </div>
      ))}
      <div style={{ padding: "0.5em" }}>
        <input
          type="number"
          placeholder="add new region"
          value={""}
          onChange={(e) => onAdd(parseInt(e.target.value))}
          style={{
            width: "fit-content",
            textAlign: "center",
            border: 0,
            borderBottom: "1px solid black",
          }}
        />
      </div>
    </div>
  );
}

function Field({ name, value, placeholder, handleChange, disabled, style }) {
  return (
    <div style={{ padding: "1em" }}>
      <p style={{ margin: 0 }}>{name}</p>
      <input
        type="text"
        readOnly={disabled}
        disabled={disabled}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        style={{ ...style }}
      />
    </div>
  );
}

const Profile = () => {
  const fileInput = React.createRef();

  const [user, setUser] = useState({
    email: "",
    name: "",
    created_on: "",
    last_login: "",
    is_scout: "",
    calendly_link: "",
    tours: [],
    regions: [],
    image: userImg,
  });

  const { loading: userLoading } = useQuery(QUERY_USER_DETAILS, {
    onCompleted: (data) => {
      setUser({
        ...data.me,
        image: userImg,
      });
    },
  });

  const [updateUserMutation, {loading: updateLoading}] = useMutation(UPDATE_USER_MUTATION, { onCompleted: () => alert('user updated!')});

  const handleNameChange = (e) => {
    setUser({ ...user, name: e.target.value });
  };

  /*
  const handleImageUpload = (e) => {
    setUser({ ...user, image: e.target.files[0] });
  };
  */

  if(userLoading)
    return <h1>Loading...</h1>

  return (
    <div
      style={{
        display: "flex",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          padding: "0 6em",
          alignItems: "center",
        }}
      >
        <h1
          style={{
            fontSize: "3rem",
            margin: "1em 0em",
            padding: "1em 3em",
            color: "#023E8A",
            background: "#ADE8F4",
          }}
        >
          My Profile
        </h1>
        <img
          src={user.image}
          alt="user"
          style={{
            margin: "2em 0",
            height: "20em",
            width: "20em",
          }}
        />
        <label>
          <input
            type="file"
            style={{
              display: "none",
            }}
            ref={fileInput}
          />
          <h1
            style={{
              color: "white",
              cursor: "pointer",
            }}
          >
            Edit profile photo
          </h1>
        </label>
        <Badge name="Scout" state={user.is_scout} color="green" />
      </div>

      <div
        style={{
          border: "1px solid black",
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          padding: "2em",
          background: "white",
          fontSize: "2em",
        }}
      >
        <h1>Personal Info</h1>
        <Field name="name" value={user.name} handleChange={handleNameChange} />
        <Field disabled name="email" value={user.email} />
        <Field
          name="Calendly link"
          placeholder="Paste Calendly link here"
          value={user.calendly_link}
          handleChange={(e) =>
            setUser({ ...user, calendly_link: e.target.value })
          }
          style={{ width: "100%" }}
        />
        <Zipcodes
          zipcodes={user.regions}
          onAdd={(val) => {
            setUser({
              ...user,
              regions: [...user.regions, val],
            });
          }}
          onDelete={(i) => {
            setUser({
              ...user,
              regions: [
                ...user.regions.slice(0, i),
                ...user.regions.slice(i + 1),
              ],
            });
          }}
          onChange={(i, val) => {
            setUser({
              ...user,
              regions: [
                ...user.regions.slice(0, i),
                val,
                ...user.regions.slice(i + 1),
              ],
            });
          }}
        />
        <button
          style={{
            alignSelf: "center",
            padding: "0.5em 1em",
            background: "#023E8A",
            color: "white",
            borderRadius: "1em",
          }}
          onClick={() => {
            updateUserMutation({
              variables: user,
            });
          }} 
          disabled={updateLoading}
        >
          {updateLoading ? "Saving..." : "Save"}
        </button>
      </div>
    </div>
  );
};

export default Profile;
