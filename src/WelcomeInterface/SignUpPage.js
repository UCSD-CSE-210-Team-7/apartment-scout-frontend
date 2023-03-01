import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Alert,
  Form,
  Spinner,
} from "react-bootstrap";
// import { auth } from "../firebase";
import { Grid, TextField } from "@mui/material";
import "../styles/signup-styles.scss";

function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = () => {
    // todo
  };

  return (
    <div className="overlay">
      <Grid container spacing={2} align="center" justifyContent="center">
        <Grid item marginTop={5} className="signup-details-container">
          <h1 className="signup-header">Sign Up</h1>
          <Grid item>
            <TextField
              label="First Name"
              placeholder="Enter your first name"
              fullWidth
              sx={{ background: "#D9D9D9", width: "36vw" }}
              required
            />
          </Grid>
          <Grid item>
            <TextField
              label="Last Name"
              variant="outlined"
              placeholder="Enter your last name"
              fullWidth
              sx={{ background: "#D9D9D9", width: "36vw" }}
              required
            />
          </Grid>
          <Grid item>
            <TextField
              label="Email"
              type="email"
              placeholder="Enter your email"
              variant="outlined"
              value={email}
              fullWidth
              sx={{ background: "#D9D9D9", width: "36vw" }}
              required
            />
          </Grid>
          <Grid item>
            <TextField
              label="Phone"
              type="tel"
              variant="outlined"
              fullWidth
              sx={{ background: "#D9D9D9", width: "36vw" }}
            />
          </Grid>
          <Grid item>
            <TextField
              label="Which zip codes would you like to provide services for?"
              type="text"
              variant="outlined"
              size="normal"
              fullWidth
              sx={{ background: "#D9D9D9", width: "36vw" }}
            />
          </Grid>
          <Button className="signup-submit-button" onClick={handleSubmit}>
            Submit
          </Button>{" "}
        </Grid>
      </Grid>
    </div>
  );
}

export default SignUpPage;
