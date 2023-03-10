import React from "react";
import "../styles/toursummary.scss";
import apt1 from "../img/apt1.jpeg";
import apt2 from "../img/apt2.jpeg";
import apt3 from "../img/apt3.jpeg";

function TourSummaryPage() {
	return (
    	
    	<>
    		<h1 className = "title"> Review </h1>
	    	<div className = 'container'>
                <p> openigloo is a community of renters who are sharing their rental experience across the US Search for an address,
                    read review and anonymously share your own experiences. 
                </p>
			</div>

            <h1 className = "title"> Pictures of the Tour</h1>
            <div className = "imagestyling">
                <img src = {apt1}
                alt = "Apartment Image 1" />  

                <img src = {apt2}
                alt = "Apartment Image 2" />  

                <img src = {apt3}
                alt = "Apartment Image 3" /> 

            </div>

		</>
    
    );
}


export default TourSummaryPage;
