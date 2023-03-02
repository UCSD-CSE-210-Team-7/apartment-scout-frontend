import React, { useState } from "react";
import { Grid, Button, TextField } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import userImg from "../img/user.jpg";
import "../styles/profile-styles.scss";

const Profile = () => {
  const [editMode, setEditMode] = useState(false);

  function handleEditButtonClick() {
    setEditMode(!editMode);
  }
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [image, setImage] = useState(null);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleImageUpload = (event) => {
    setImage(event.target.files[0]);
  };

  const handlePhoneChange = (event) => {
    // Hash it and then save
    setPhone(event.target.value);
  };

  return (
    <div className="profile-container">
      <Grid container spacing={2} align="center" justifyContent="center">
        <Grid item xs={12}>
          <Grid container direction="column">
            <Grid item>
              <img src={userImg} alt="user" className="img-thumbnail" />
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                className="upload-photo-button"
                startIcon={<CloudUploadIcon />}
                onChange={handleImageUpload}
              >
                Upload Photo
              </Button>{" "}
            </Grid>
          </Grid>
        </Grid>
        <Grid item marginTop={5} className="personal-details-container">
          <h1>Personal Information</h1>
          <Button
            variant="contained"
            className="edit-info-button"
            color="primary"
            disabled={editMode}
            onClick={handleEditButtonClick}
          >
            Edit
          </Button>{" "}
          <Grid item>
            <TextField
              label="Name"
              variant="outlined"
              placeholder="Enter your name"
              value={name}
              disabled={!editMode}
              onChange={handleNameChange}
              sx={{ width: "35%" }}
            />
          </Grid>
          <Grid item>
            <TextField
              label="Email"
              type="email"
              variant="outlined"
              value={email}
              disabled={!editMode}
              onChange={handleEmailChange}
              sx={{ width: "35%" }}
            />
          </Grid>
          <Grid item>
            <TextField
              label="Phone"
              type="tel"
              variant="outlined"
              value={phone}
              disabled={!editMode}
              onChange={handlePhoneChange}
              sx={{ width: "35%" }}
            />
          </Grid>
          <Button
            variant="contained"
            className="save-info-button"
            color="primary"
            disabled={!editMode}
            onClick={handleEditButtonClick}
          >
            Save
          </Button>{" "}
        </Grid>
      </Grid>
    </div>
  );
};

export default Profile;
