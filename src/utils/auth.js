import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth, signOut, signInWithPopup } from "./firebase";

import Cookies from "universal-cookie";

const cookies = new Cookies();
const Auth = React.createContext();
export default Auth;

export const AuthProvider = ({ children, initialCredential, initialUser }) => {
  const [credential, setCredential] = React.useState(initialCredential);
  const [user, setUser] = React.useState(initialUser);
  const navigate = useNavigate();

  useEffect(() => {
    return auth.onAuthStateChanged((u) => {
      setCredential(u?.accessToken);
      setUser(u);
      if (!u?.accessToken) {
        cookies.remove("sessionCookie");
        navigate("/");
      }
    });
  }, [navigate]);

  async function login() {
    return signInWithPopup();
  }

  async function logout() {
    await signOut();
  }

  const exportObj = {
    credential,
    user,
    login,
    logout,
    URL,
  };

  return <Auth.Provider value={exportObj}>{children}</Auth.Provider>;
};
