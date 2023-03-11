import "../styles/submit-review.scss";
import { useState } from "react"
import { useParams } from 'react-router-dom';
import { gql, useMutation } from '@apollo/client';

const CREATE_REVIEW_MUTATION = gql`
mutation CreateReview($review_text: String!,  $tour_id: Int!) {
  createReview(review_text: $review_text,  tour_id: $tour_id ) {
    tour_id
  }
}
`;
function ScoutSubmitReview() {
    const { tour_id } = useParams();
    const [reviewText, setReviewText] = useState('');
    const [createReviewMutation] = useMutation(CREATE_REVIEW_MUTATION);
    const handleReviewTextChange = (event) => {
        setReviewText(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try{
            const {data} = await createReviewMutation({
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
                <textarea className="text-box" rows="10" cols="50" placeholder="Start typing here..."
                    value={reviewText} onChange={handleReviewTextChange}>
                </textarea>
            </div>
            <div className="button-container">
                <button className="submit-button" onClick={handleSubmit}>Submit</button>
            </div>
        </div>
    )
}

export default ScoutSubmitReview