import "../styles/submit-review.scss";
import { useState } from "react"

function ScoutSubmitReview() {
    const [reviewText, setReviewText] = useState('');

    const handleReviewTextChange = (event) => {
        setReviewText(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // TODO: submit review text to the backend
        console.log(`Review Text: ${reviewText}`);
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