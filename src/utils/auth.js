import React from 'react';
import { useNavigate } from 'react-router-dom'
import { getAuth } from "firebase/auth";

import Cookies from 'universal-cookie'

const cookies = new Cookies()
const Auth = React.createContext();
export default Auth;

export const AuthProvider = (props) => {

    const [credential, setCredential] = React.useState(null)
    const navigate = useNavigate();

    getAuth().onAuthStateChanged(user => {
        if(credential === null)
            setCredential(user.accessToken)
    })

    async function login(){
        return
    }

    async function logout(){
        alert('logging out')
        setCredential(null);
        cookies.remove('sessionCookie')
        navigate('/')
    }

    const exportObj = {
        credential, setCredential,
        login, logout,
        URL
    }

    return (
        <Auth.Provider value={exportObj}>
            {props.children}
        </Auth.Provider>
    )
}
