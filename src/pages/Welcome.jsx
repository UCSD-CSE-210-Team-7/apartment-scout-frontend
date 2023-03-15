// Import required dependencies
import React, { useContext } from "react";
import Auth from "../utils/auth";
import { useNavigate } from "react-router-dom";
import { useMutation, gql } from "@apollo/client";

// Define GraphQL queries for creating user details like name and email.
export const MUTATION_CREATE_USER = gql`
  mutation CreateUser($name: String!) {
    createUser(name: $name) {
      name
      email
    }
  }
`;

/**
 * The WelcomePage component creates user details (name, email)
 * and provides authentication for the users to sign in via their google accounts
 * when they click on the sign in button and once successful takes them to the home page where they
 * enter the zipcode for which they want to request the tour.
 */
function WelcomePage() {
  const navigate = useNavigate();
  const auth = useContext(Auth);

  // Use mutation to create user.
  const [createUserMutation] = useMutation(MUTATION_CREATE_USER);

  const handleLogin = async () => {
    const result = await auth.login();

    try {
      await createUserMutation({
        variables: {
          name: result.user.displayName,
        },
        context: {
          headers: {
            authorization: result.user.accessToken,
          },
        },
      });
      navigate("/profile");
    } catch (err) {
      navigate("/home");
    }
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
