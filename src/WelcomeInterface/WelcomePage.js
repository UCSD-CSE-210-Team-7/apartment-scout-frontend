import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, Row, Col } from "react-bootstrap";
import "./style.css";
import { getAuth, signInWithPopup } from "firebase/auth";
import { GoogleSignOn } from "../utils//firebase";

import Auth from "../utils/auth";
import aptScoutLogo from "../img/aptscout_logo.png";

function WelcomePage() {
  const authContext = useContext(Auth);
  const navigate = useNavigate();

  const handleLogin = async () => {
    const auth = await getAuth();
    const result = await signInWithPopup(auth, GoogleSignOn);

    // await authContext.login();
    navigate("/home");
  };

  return (
    <div
      style={{
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          fontSize: "8em",
        }}
      >
        <span style={{ color: "#ADE8F4" }}>apt</span>
        <span style={{ color: "#FFFFFF" }}>scout</span>
      </div>
      <button
        onClick={handleLogin}
        style={{
          background: "#ADE8F4",
          color: "#023E8A",
          fontSize: "2.5em",
          border: "0",
          borderRadius: "2.5rem",
          padding: "1rem",
        }}
      >
        sign in
      </button>
    </div>
  );
}

export default WelcomePage;
