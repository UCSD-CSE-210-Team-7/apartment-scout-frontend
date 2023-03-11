import "../styles/submit-review.scss";
import { Rating } from "@mui/material"
import StarIcon from '@mui/icons-material/Star';
import {useState} from "react"

function CustomEmptyStarIcon(props) {
    return <StarIcon style={{ color: 'white' }} {...props} />;
  }

function RequesterSubmitReview() {
    const [rating, setRating] = useState(0);
    const [reviewText, setReviewText] = useState('');
    const handleRatingChange = (event, newValue) => {
        setRating(newValue);
    };

    const handleReviewTextChange = (event) => {
        setReviewText(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // TODO: submit rating and review text to the backend
        console.log(`Rating: ${rating}, Review Text: ${reviewText}`);
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