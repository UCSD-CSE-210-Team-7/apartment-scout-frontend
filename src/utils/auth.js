import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth, signOut } from "./firebase";

import Cookies from "universal-cookie";

const cookies = new Cookies();
const Auth = React.createContext();
export default Auth;

export const AuthProvider = ({children, initialCredential, initialUser}) => {
  const [credential, setCredential] = React.useState(initialCredential)
  const [user, setUser] = React.useState(initialUser);
  const navigate = useNavigate();

  useEffect(() => { 
    auth.onAuthStateChanged(u => {
      setCredential(u?.accessToken);
      setUser(u)
    })
  }, [])

  useEffect(() => {
    if(!credential){
      cookies.remove("sessionCookie");
      navigate("/");
    }
  }, [credential, navigate])

  async function login() {
  }

  async function logout() {
    await signOut(auth)
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

  return <Auth.Provider value={exportObj}>{children}</Auth.Provider>;
};
