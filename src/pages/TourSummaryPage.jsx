import React from "react";
import { useParams } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";
import styles from "../styles/toursummary.module.css";
import apt1 from "../img/apt1.jpeg";
import apt2 from "../img/apt2.jpeg";
import apt3 from "../img/apt3.jpeg";

const QUERY_TOUR_DETAILS = gql`
  query TourDetails($tour_id: Int) {
    tour(tour_id: $tour_id) {
      tour_summary
    }
  }
`;

function TourSummaryPage() {
  const tour_id = parseInt(useParams().tour_id);
  const { data, loading } = useQuery(QUERY_TOUR_DETAILS, {
    variables: { tour_id },
  });

  if (!data || loading) {
    return <h1>Loading</h1>;
  }

  console.log(data, loading);

  return (
    <>
      <h1 className={styles.title}> Review </h1>
      <div className={styles.container}>
        <p>
          {data.tour.summary}
        </p>
      </div>

      <h1 className={styles.title}> Pictures of the Tour</h1>
      <div className={styles.imagestyling}>
        <img className={styles.image} src={apt1} alt="Apartment Image 1" />

        <img className={styles.image} src={apt2} alt="Apartment Image 2" />

        <img className={styles.image} src={apt3} alt="Apartment Image 3" />
      </div>
    </>
  );
}

export default TourSummaryPage;
