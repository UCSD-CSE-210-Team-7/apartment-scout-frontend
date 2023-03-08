import { useNavigate } from "react-router-dom";
import { getAuth, signInWithPopup } from "firebase/auth";
import { GoogleSignOn } from "../utils//firebase";

import { useMutation, gql } from '@apollo/client';

const MUTATION_CREATE_USER = gql`
  mutation CreateUser($name: String!) {
    createUser(name: $name){
      name
      email
    }
  }
`;

function WelcomePage() {
  const navigate = useNavigate();

  const [ createUserMutation ] = useMutation(MUTATION_CREATE_USER);

  const handleLogin = async () => {
    const auth = await getAuth();
    const result = await signInWithPopup(auth, GoogleSignOn);
    console.log(result)

    createUserMutation({
      variables: {
        name: result.user.displayName
      }, 
      context: {
        headers: {
          authorization: result.user.accessToken
        }
      }
    }).then(r => {
      console.log('user created', r)
      navigate('/profile')
    }).catch(err => {
      console.log('user already exists', err)
      navigate('/home')
    })
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
