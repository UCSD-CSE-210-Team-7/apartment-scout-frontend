import React from "react";
import { useNavigate } from "react-router-dom";
import { auth, signOut } from "./firebase";

import Cookies from "universal-cookie";

const cookies = new Cookies();
const Auth = React.createContext();
export default Auth;

export const AuthProvider = (props) => {
  const [credential, setCredential] = React.useState(null);
  const [user, setUser] = React.useState(null);
  const navigate = useNavigate();

  auth.onAuthStateChanged(u => {
    if (credential === null && u !== null) {
      setCredential(u.accessToken);
      setUser(u)
    }
  });

  async function login() {
  }

  async function logout() {
    await signOut(auth)
    setCredential(null);
    cookies.remove("sessionCookie");
    navigate("/");
  }

  const exportObj = {
    credential,
    // setCredential,
    user,
    // setUser,
    login,
    logout,
    URL,
  };

  return <Auth.Provider value={exportObj}>{props.children}</Auth.Provider>;
};
