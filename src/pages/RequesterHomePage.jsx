import HomePageComponent from "../components/Homepage/HomePageComponent";
function RequesterHomePage() {
  const pageType = "requester";
  const tableColumns = ["Address", "Zipcode", "Scout Name", "Due"];
  const tableData = ["3868 Miramar St", "92092", "Yang Zhang", "Feb 25th"];
  return (
    <HomePageComponent
      pageType={pageType}
      tableColumns={tableColumns}
      tableData={tableData}
    />
  );
}

export default RequesterHomePage;
