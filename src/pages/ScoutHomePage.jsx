import HomePageComponent from "../components/Homepage/HomePageComponent"
function ScoutHomePage() {
    const pageType = "scout"
    const tableColumns = ["Name", "Zipcode", "Request On", "Due"]
    const tableData = ["John Doe", "92092", "Feb 4th", "Feb 9th"]
    return (
        < HomePageComponent pageType={pageType} tableColumns={tableColumns} tableData={tableData} />
    )
}

export default ScoutHomePage