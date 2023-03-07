import React from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";

import Cookies from "universal-cookie";

const cookies = new Cookies();
const Auth = React.createContext();
export default Auth;

export const AuthProvider = (props) => {
  const [credential, setCredential] = React.useState(null);
  const navigate = useNavigate();

  getAuth().onAuthStateChanged((user) => {
    console.log('setting credential state with', user)
    if (credential === null && user !== null) setCredential(user.accessToken);
  });

  async function login() {
  }

  async function logout() {
    await signOut(getAuth())
    setCredential(null);
    cookies.remove("sessionCookie");
    navigate("/");
  }

  const exportObj = {
    credential,
    setCredential,
    login,
    logout,
    URL,
  };

  return <Auth.Provider value={exportObj}>{props.children}</Auth.Provider>;
};
