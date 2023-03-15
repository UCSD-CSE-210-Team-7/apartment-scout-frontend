// Import required components and assets
import Loading from "../components/Loading";
import ScoutCard from "../components/ScoutCard";
import userImage from "../img/user.png";
import Auth from "../utils/auth";
import { useMutation, useQuery, gql } from "@apollo/client";
import { Grid } from "@mui/material";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

// Define GraphQL queries for fetching user details
const QUERY_USER_DETAILS = gql`
  query UserDetails($email: String!) {
    userDetails(email: $email) {
      email
      name
      created_on
      last_login
      is_scout
      calendly_link
      tours {
        scouted_by {
          tours {
            tour_id
            tour_review_text
          }
        }
        tour_id
        tour_review_text
        tour_review_stars
      }
      regions
    }
  }
`;

// Define GraphQL mutation for creating conversation
const CREATE_CONVERSATION_MUTATION = gql`
  mutation CreateConversation($person_a: String!, $person_b: String!) {
    createConversation(person_a: $person_a, person_b: $person_b) {
      conversation_id
    }
  }
`;

// Styled component based on the 'Paper' component
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  padding: theme.spacing(1),
  textAlign: "center",

  color: theme.palette.text.secondary,
}));

/**
 * Scout details component displays the scout details (name, rating, reviews, tours completed)
 * and allows actions to chat with the scout and see the availability.
 * @returns {JSX.Element} The JSX element for the ScoutDetails component.
 */
function ScoutDetails() {
  const navigate = useNavigate();
  const auth = useContext(Auth);
  const { email } = useParams();
  // Fetch the scout details
  const { data } = useQuery(QUERY_USER_DETAILS, {
    variables: { email },
  });
  const selfEmail = auth?.user?.email;
  // Use mutation to create conversation
  const [createConversationMutation] = useMutation(
    CREATE_CONVERSATION_MUTATION
  );

  const user = data?.userDetails;

  if (!user) return <Loading />;

  // Event handler to create conversation record on click of chat button
  const handleChatButtonClick = async () => {
    const { data } = await createConversationMutation({
      variables: {
        person_a: selfEmail,
        person_b: email,
      },
    });
    navigate(`/chat/${data.createConversation.conversation_id}`);
  };

  // Event handler to navigate to scout availability page on click of See Schedule button
  const handleScheduleButtonClick = () => {
    navigate(`/scout/${email}`);
  };

  return (
    <div style={{background: '#aaaaaa', padding: '4em'}}>
      <div style={{display:'flex', marginBottom: '2em'}}>
        <Grid item xs={4}>
          <ScoutCard
            key={user.name}
            user={user}
            userImage={userImage}
          ></ScoutCard>
        </Grid>

        <div style={{display: 'flex', flexDirection: 'column'}}>
          {user.tours.filter(tour => tour?.tour_review_text?.length > 0).map((tour) => (
            <div style={{margin: '2em', padding: '3em', background: 'white'}}>
              <span>{tour.tour_review_text}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{flexDirection:"row", display: 'flex', justifyContent: 'space-evenly'}} >
        <Button sx={{ bgcolor: "#1976d2", color: "white!important" }} disabled>
          {user.tours ? user.tours.length : 0} tours completed
        </Button>
        <Button variant="contained" onClick={handleChatButtonClick}>
          Chat with Me
        </Button>
        <Button variant="contained" onClick={handleScheduleButtonClick}>
          See Schedule
        </Button>
      </div>
    </div>
  );
}

export default ScoutDetails;
