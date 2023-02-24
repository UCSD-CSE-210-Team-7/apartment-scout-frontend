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
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [image, setImage] = useState(null);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    // Hash it and then save
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    // Hash it and then save
    setConfirmPassword(event.target.value);
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
      <Grid container spacing={2} align="center">
        <Grid item xs={12}>
          <Grid container direction="column">
            <Grid item>
              <img src={userImg} className="img-thumbnail" />
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                className="upload-photo-button"
                startIcon={<CloudUploadIcon />}
                onChange={handleImageUpload}
              >
                Upload
              </Button>{" "}
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} marginTop={5}>
          <h3>Personal Information</h3>
          <Button
            variant="contained"
            className="upload-photo-button"
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
              sx={{ width: "25%" }}
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
              sx={{ width: "25%" }}
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
              sx={{ width: "25%" }}
            />
          </Grid>
          <Grid item>
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              value={password}
              disabled={!editMode}
              onChange={handlePasswordChange}
              sx={{ width: "25%" }}
            />
          </Grid>
          <Grid item>
            <TextField
              label="Re-enter Password"
              type="password"
              variant="outlined"
              value={confirmPassword}
              disabled={!editMode}
              onChange={handleConfirmPasswordChange}
              sx={{ width: "25%" }}
            />
          </Grid>
          <Button
            variant="contained"
            className="upload-photo-button"
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
