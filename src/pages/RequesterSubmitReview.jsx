// Import required dependencies
import "../styles/submit-review.scss";
import { Rating } from "@mui/material"
import StarIcon from '@mui/icons-material/Star';
import {useState} from "react"
import { useParams } from 'react-router-dom';
import { gql, useMutation } from '@apollo/client';

// Define GraphQL queries for submitting scout reviews.
const CREATE_REVIEW_FOR_SCOUT_MUTATION = gql`
mutation CreateReviewForScout($review_text: String!, $rating: Int!,  $tour_id: Int!) {
  createReviewForScout(review_text: $review_text, rating: $rating,  tour_id: $tour_id ) {
    tour_id
  }
}
`
function CustomEmptyStarIcon(props) {
    return <StarIcon style={{ color: 'white' }} {...props} />;
  }

/**
 * RequesterSubmitReview component displays the review that requesters submit after the tour is done.
 * The requester reviews the scout and writes detailed comments about they felt about the scout's 
 * services. The requester can also submit a rating from 1-5 stars about the experience they had with 
 * the scouts and how helpful did they find the process to be.
 * @returns {JSX.Element} The JSX element for the RequesterSubmitReview component.
 */

function RequesterSubmitReview() {
    const [rating, setRating] = useState(0);
    const [reviewText, setReviewText] = useState('');
    const { tour_id } = useParams();
    
    // Backend integration to store all the reviews submitted on the click of the submit button to be 
    // stored in the graphql db.  

    const [createReviewForScoutMutation] = useMutation(CREATE_REVIEW_FOR_SCOUT_MUTATION);
    const handleRatingChange = (event, newValue) => {
        setRating(newValue);
    };

    const handleReviewTextChange = (event) => {
        setReviewText(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try{
            const {data} = await createReviewForScoutMutation({
                variables:{
                    review_text: reviewText,
                    rating: rating,
                    tour_id: parseInt(tour_id),
                },
            });
            window.alert("Review submitted successfully!");
        } catch (error){
            console.log("Error: ", error)
        }
    };

    // Rating Componenet:
    // The requester rates the scout from 1-5 stars
    return (
        <div>
            <div className="header">
                <div className="text-title">Review your scout </div>
                <div className="rating-input">
                    <label htmlFor="rating-input-field" className="text-rating"> Rating (5 for very good, 1 for very bad): </label>
                    <Rating
                        id="rating-input-field"
                        name="rating"
                        value={rating}
                        onChange={handleRatingChange}
                        size="large"
                        precision={1}
                        max={5}
                        min={1}
                        emptyIcon={<CustomEmptyStarIcon />}
                    />
                </div>
            </div>
            <div>
                {/* The text box where the requester writes the review for the scout. */}
                <textarea className="text-box" rows="10" cols="50" placeholder="Start typing here..."
                    value={reviewText} onChange={handleReviewTextChange}>
                </textarea>

            {/* Event handler to submit the review of the scout who provided the tour on click of the submit button */}
            </div>
            <div className="button-container">
                <button className="submit-button" onClick={handleSubmit}>Submit</button>
            </div>
        </div>
    )
}

export default RequesterSubmitReview