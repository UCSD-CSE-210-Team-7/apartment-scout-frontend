function RequesterSubmitReview() {
    return (
        <div>
            <div className="header">
                <h1 className="text">Review your scout </h1>
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