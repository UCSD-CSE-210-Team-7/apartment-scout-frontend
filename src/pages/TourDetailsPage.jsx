import React from "react";
import "../styles/tourdetailspage.scss";
import { useParams } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";
import { useNavigate } from "react-router-dom";


const QUERY_TOUR_DETAILS = gql`
  query TourDetails($tour_id: Int) {
    tour(tour_id: $tour_id) {
      tour_id
      tour_address
      requested_by {
        name
      }
      scouted_by {
        name
      }
      date_requested
      date_completed
      status
      tour_summary
      tour_review_text
      tour_review_stars
    }
  }
`;


function TourDetailsPage() {
  const tour_id = parseInt(useParams().tour_id);
  const { data, loading } = useQuery(QUERY_TOUR_DETAILS, {
    variables: { tour_id },
  });

  const navigate = useNavigate();

  const navigateToTourSummary = () =>
    navigate({
      pathname: '/toursummary/'+ tour_id
    });

  const navigateToChat = () => {
    //navigate to /home
    navigate('/chat');
};

const navigateToReview = () => {
  //navigate to /home
  navigate('/requesterSubmitReview');
};

  if (!data || loading) {
    return <h1>Loading</h1>;
  }

  return (
    <>
      <h1 className="title"> Tour Details </h1>
      <div className="container">
        <div className="line-row">
          <div className="block-card">
            <h4>Requested By</h4>
            <p>{data.tour.requested_by.name}</p>
          </div>

          <div className="block-card">
            <h4>Scouted By</h4>
            <p>{data.tour.scouted_by.name}</p>
          </div>
        </div>

        <div className="line-row">
          <div className="block-card">
            <h4> Address </h4>
            <p>{data.tour.tour_address}</p>
          </div>

          <div className="block-card">
            <h4> Payment </h4>
            <p> $50 </p>
          </div>
        </div>

        <div className="last-row">
          <div className="vertical-col">
            <div className="vertical-card">
              <h4> Requested on </h4>
              <p>
                {new Date(data.tour.date_requested).toLocaleString("en-US", {
                  year: undefined,
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>

            <div className="vertical-card">
              <h4> Completed on </h4>
              <p>
                {data.tour.date_completed
                  ? new Date(data.tour.date_completed).toLocaleString("en-US", {
                      year: undefined,
                      month: "long",
                      day: "numeric",
                    })
                  : "Not completed"}
              </p>
            </div>
          </div>

          <div className="vertical-col-right">
            
            <button className="actions-chat"
            onClick={navigateToChat}>
            Chat </button>
            
            <button className="actions-chat" 
            onClick={navigateToReview}>
            Submit a Review </button>

            <button className="actions-complete" 
            onClick={navigateToTourSummary}> 
            View Summary </button>
          
          </div>
        </div>
      </div>
    </>
  );
}

export default TourDetailsPage;
