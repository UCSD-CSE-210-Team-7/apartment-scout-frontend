import "../styles/submit-review.scss";
import { Rating } from "@mui/material"
import StarIcon from '@mui/icons-material/Star';
import {useState} from "react"
import { useParams } from 'react-router-dom';
import { gql, useMutation } from '@apollo/client';

const CREATE_REVIEW_FOR_SCOUT_MUTATION = gql`
mutation CreateReviewForScout($review_text: String!, $rating: Int!  $tour_id: Int!) {
  createReviewForScout(review_text: $review_text, rating: $rating,  tour_id: $tour_id ) {
    tour_id
  }
}
`
function CustomEmptyStarIcon(props) {
    return <StarIcon style={{ color: 'white' }} {...props} />;
  }

function RequesterSubmitReview() {
    const [rating, setRating] = useState(0);
    const [reviewText, setReviewText] = useState('');
    const { tour_id } = useParams();
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

export default RequesterSubmitReview