import "../styles/submit-review.scss";
function RequesterSubmitReview() {
    return (
        <div>
            <div className="header">
                <div className="text">Review your scout </div>
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

export default RequesterSubmitReview