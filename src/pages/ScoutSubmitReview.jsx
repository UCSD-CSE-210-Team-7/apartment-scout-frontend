import "../styles/submit-review.scss";

function ScoutSubmitReview() {
    return (
        <div>
            <div className="header">
                <h1 className="text">Review your tour </h1>
            </div>
            <div>
                <textarea className="text-box" rows="10" cols="50" placeholder="Start typing here...">
                </textarea>
            </div>
            <div className="button-container">
                <button className="submit-button">Submit</button>
            </div>
        </div>
    )
}

export default ScoutSubmitReview