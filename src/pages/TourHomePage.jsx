// import the dependencies
import HomePageComponent from "../components/Homepage/HomePageComponent";


function TourHomePage() {
  const tableColumns = ["Name", "Zipcode", "Request On", "Due"];
  const tableData = ["John Doe", "92092", "Feb 4th", "Feb 9th"];
  return (
    <HomePageComponent
      tableColumns={tableColumns}
      tableData={tableData}
    />
  );
}

export default TourHomePage;
