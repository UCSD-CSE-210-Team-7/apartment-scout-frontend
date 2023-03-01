import React from 'react';
import { useNavigate } from 'react-router-dom'
import { getAuth, signInWithPopup } from "firebase/auth";

import { GoogleSignOn } from './firebase'
import Cookies from 'universal-cookie'

const Auth = React.createContext();
export default Auth;

const cookies = new Cookies()

export const AuthProvider = (props) => {

    const sessionCookie = cookies.get('sessionCookie')

    const [credential, setCredential] = React.useState(null)
    const navigate = useNavigate();

    async function login(){
        try {
            const auth = getAuth()
            const token = await auth.currentUser.getIdToken()
            if (token) 
                return setCredential(token)
        } catch (error){
            console.log(error)
        }
    }

    async function logout(){
        setCredential(null);
        cookies.remove('sessionCookie')
        navigate('/welcome')
    }

    async function handleSignOn(){
        try {
            const auth = getAuth()
            const result = await signInWithPopup(auth, GoogleSignOn)
            const token = await auth.currentUser.getIdToken()
            if (token) 
                return setCredential(token)
        } catch (error){
            console.log(error)
        }
    }

    async function handleSignOut() {
        setCredential(null);
        cookies.remove('sessionCookie')
        navigate('/welcome')
    }


    /*
    React.useEffect(() => {
        if (sessionCookie) {
            console.log('session cookie', sessionCookie, 'found')
        } else {
            console.log('session cookie', sessionCookie, 'was null')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [credential])
    */

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
