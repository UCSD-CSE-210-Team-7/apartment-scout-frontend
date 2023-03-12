// import the dependencies
import HomePageComponent from "../components/Homepage/HomePageComponent";


function TourHomePage() {
  const tableColumns = ["Name", "Address", "Request On", "Due"];
  return (
    <HomePageComponent
      tableColumns={tableColumns}
    />
  );
}

export default TourHomePage;
