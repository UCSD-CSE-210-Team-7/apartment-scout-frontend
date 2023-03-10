import styles from "./App.module.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { AuthProvider } from "./utils/auth";
import { ApolloProvider } from "./utils/apollo";

import ChatPage from "./pages/ChatPage";
import DisplayScouts from "./pages/DisplayScouts";
import WelcomePage from "./pages/Welcome";
import Profile from "./pages/Profile";
import ScoutDetails from "./pages/ScoutDetails";
import ScoutCalendarPage from "./pages/ScoutCalendar";

import NavBar from "./components/NavBar";
import ScoutHomePage from "./pages/ScoutHomePage";
import ScoutSubmitReview from "./pages/ScoutSubmitReview";
import RequesterSubmitReview from "./pages/RequesterSubmitReview";
import RequesterHomePage from "./pages/RequesterHomePage";

import TourDetailsPage from "./pages/TourDetailsPage";
import TourSummaryPage from "./pages/TourSummaryPage";



function App() {
  return (
    <div className={styles.app}>
      <BrowserRouter>
        <AuthProvider>
          <ApolloProvider>
            <NavBar />
            <Routes>
              <Route path="/" element={<WelcomePage />} />
              <Route path="/home" element={<DisplayScouts />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/chat" element={<ChatPage />} />
              <Route path="/scouthome" element={<ScoutHomePage />} />
              <Route path="/scoutSubmitReview" element={<ScoutSubmitReview />} />
              <Route path="/requesterhome" element={<RequesterHomePage />} />
              <Route path="/requesterSubmitReview" element={<RequesterSubmitReview />} />
              <Route path="/browse/:email" element={<ScoutDetails />} />
              <Route path="/scout/:email" element={<ScoutCalendarPage />} />
              <Route path="/tourdetails/:tour_id" element={<TourDetailsPage />} />
              <Route path="/toursummary" element={<TourSummaryPage />} />
            </Routes>
          </ApolloProvider>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
