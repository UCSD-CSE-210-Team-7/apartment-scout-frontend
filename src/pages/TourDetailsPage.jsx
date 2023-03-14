// Import all dependencies
import React from "react";
import "../styles/tourdetailspage.scss";
import { useParams } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import Loading from '../components/Loading';

// A GraphQL query to retrieve all tour details based on the tour_id which is passed in the url
export const QUERY_TOUR_DETAILS = gql`
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


/**
 * The TourDetailsPage component displays the details of a specific tour selected by the user.
 * It displays the scout and requester of the tour, the address of the apartment, the cost of the tour,
 * the date the tour was requested on and the date the tour was completed on.
 * This page also has three buttons which allows the user to submit a review of the tour if he is in "scout"
 * role defined by the button in the previous page, or submit a review of the scout if he is in "requester"
 * role, view the tour summary, and chat with respective user (requester/scout)
 * @returns {JSX.Element} The JSX element for the Tour Details Page Component
 */

function TourDetailsPage() {
  // retrieve the tourid from the url
  const tour_id = parseInt(useParams().tour_id);   
  
  // retrieve the role from the url - requester or scout
  const role = useParams().role    

  const { data, loading } = useQuery(QUERY_TOUR_DETAILS, {
    variables: { tour_id },
  });

  // define a variable to create hyperlinks to different pages
  const navigate = useNavigate();       

  /**
   * Next three functions are for the three different buttons defined on the page. 
   * Each function defines which page to go to when a button is clicked.
  */ 
  const navigateToTourSummary = () =>
    navigate({
      pathname: '/toursummary/'+ tour_id
    });

  const navigateToChat = () => {
    navigate('/chat');
  };

  /**  
   * This function checks what is the role of the user (requester or scout) 
   * And accordingly redirects to the appropriate "submit a review" page.
  */
  const navigateToReview = () => {
    if (role === "requester") {
      navigate('/requesterSubmitReview/' + tour_id);
    } else if (role === "scout") {
      navigate('/scoutSubmitReview/' + tour_id);
    }
  };

  if (!data || loading ) {
    return <Loading/>
  }

  // The following code is for all the elements and how they are styled on the page
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
            
            {/* The next three buttons redirect to different pages */}
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
