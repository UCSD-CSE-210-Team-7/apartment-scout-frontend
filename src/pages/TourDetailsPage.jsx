import React from "react";
import "../styles/tourdetailspage.scss";

function TourDetailsPage() {
	return (
    	
    	<>
    		<h1 className = "title"> Tour Details </h1>
	    	<div className = 'container'>
				<div className = 'line-row'>
					
					<div className = 'block-card'>
						<h4> Name </h4>
						<p> John Doe </p>
					</div>

					<div className = 'block-card'>
						<h4> Address </h4>
						<p> 9500 Gilman Drive </p>
					</div>	

				</div>

				<div className = 'line-row'>
					
					<div className = 'block-card'>
						<h4> Zipcode </h4>
						<p> 92092 </p>
					</div>

					<div className = 'block-card'>
						<h4> Payment </h4>
						<p> $50 </p>
					</div>	

				</div>

				<div className = 'last-row'>

					<div className = 'vertical-col'>
						<div className = 'vertical-card'>
							<h4> Requested on </h4>
							<p> 27 February, 2023 </p>
						</div>

						<div className = 'vertical-card'>
							<h4> Due on </h4>
							<p> 5 March, 2023 </p>
						</div>	
					</div>

					<div className = 'vertical-col-right'>
						<button className = 'actions-chat'> Chat </button>
						<button className = 'actions-complete'> Complete </button>
					</div>

				</div>


			</div>


		</>
    
    );
}


export default TourDetailsPage;