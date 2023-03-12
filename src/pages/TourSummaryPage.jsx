// import all the dependencies
import React from "react";
import { useParams } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";
import styles from "../styles/toursummary.module.css";
import apt1 from "../img/apt1.jpeg";
import apt2 from "../img/apt2.jpeg";
import apt3 from "../img/apt3.jpeg";
import Loading from '../components/Loading';

// GraphQL query to retrieve the tour summary (review) based on the tourid
export const QUERY_TOUR_DETAILS = gql`
  query TourDetails($tour_id: Int) {
    tour(tour_id: $tour_id) {
      tour_summary
    }
  }
`;

/**
 * The TourSummaryPage display the summary of the tour which is submitted by the scout
 * The scout submits a review/opinion on the apartment that they toured along with the pictures of the apartment
 * @returns {JSX.Element} The JSX element for the Tour Summary Page Component
 */

function TourSummaryPage() {

   // retrieve the tour_id from the url
  const tour_id = parseInt(useParams().tour_id);     
  
  // store the data in some variables
  const { data, loading } = useQuery(QUERY_TOUR_DETAILS, {      
    variables: { tour_id },
  });

  if (!data || loading) {
    return <Loading/>
  }

  // console.log(data, loading);

  return (
    <>
      <h1 className={styles.title}> Review </h1>
      <div className={styles.container}>
        <p>
          {data.tour.tour_summary}
        </p>
      </div>

      <h1 className={styles.title}> Pictures of the Tour</h1>
      <div className={styles.imagestyling}>
        <img className={styles.image} src={apt1} alt="Apartment View 1" />

        <img className={styles.image} src={apt2} alt="Apartment View 2" />

        <img className={styles.image} src={apt3} alt="Apartment View 3" />
      </div>
    </>
  );
}

export default TourSummaryPage;
