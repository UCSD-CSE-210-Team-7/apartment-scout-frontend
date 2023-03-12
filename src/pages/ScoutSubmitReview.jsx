// Import required dependencies
import "../styles/submit-review.scss";
import { useState } from "react"
import { useParams } from 'react-router-dom';
import { gql, useMutation } from '@apollo/client';

// Define GraphQL queries for creating and saving reviews.
const CREATE_REVIEW_FOR_HOUSE_MUTATION = gql`
mutation CreateReviewForHouse($review_text: String!,  $tour_id: Int!) {
  createReviewForHouse(review_text: $review_text,  tour_id: $tour_id ) {
    tour_id
  }
}
`;

/**
 * ScoutSubmitReview component displays the review that scouts submit after the tour is done.
 * and allows actions to chat with the scout and see the availability.
 * @returns {JSX.Element} The JSX element for the ScoutSubmitReview component.
 */
function ScoutSubmitReview() {
    const { tour_id } = useParams();
    const [reviewText, setReviewText] = useState('');
    const [createReviewForHouseMutation] = useMutation(CREATE_REVIEW_FOR_HOUSE_MUTATION);
    const handleReviewTextChange = (event) => {
        setReviewText(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try{
            const {data} = await createReviewForHouseMutation({
                variables:{
                    review_text: reviewText,
                    tour_id: parseInt(tour_id),
                },
            });
            window.alert("Review submitted successfully!");
        } catch (error){
            console.log("Error: ", error)
        }
    };


    return (
        <div>
            <div className="header">
                <h1 className="text-title">Review your tour </h1>
            </div>
            <div>
                {/* The text box is provided to write the detailed review of the apartment reviewed. */}
                <textarea className="text-box" rows="10" cols="50" placeholder="Start typing here..."
                    value={reviewText} onChange={handleReviewTextChange}>
                </textarea>
            </div>

            {/* Event handler to submit the review on click of the submit button */}
            
            <div className="button-container"> 
                
                <button className="submit-button" onClick={handleSubmit}>Submit</button>
            </div>
        </div>
    )
}

export default ScoutSubmitReview