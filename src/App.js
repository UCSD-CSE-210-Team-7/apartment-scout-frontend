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
import TourHomePage from "./pages/TourHomePage";
import ScoutSubmitReview from "./pages/ScoutSubmitReview";
import RequesterSubmitReview from "./pages/RequesterSubmitReview";

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
              <Route path="/chat/:conversation_id" element={<ChatPage />} />
              <Route path="/browse/:email" element={<ScoutDetails />} />
              <Route path="/scout/:email" element={<ScoutCalendarPage />} />

              <Route path="/tourhome" element={<TourHomePage />} />
              <Route
                path="/tourdetails/:role/:tour_id"
                element={<TourDetailsPage />}
              />
              <Route
                path="/toursummary/:tour_id"
                element={<TourSummaryPage />}
              />
              <Route
                path="/scoutSubmitReview/:tour_id"
                element={<ScoutSubmitReview />}
              />
              <Route
                path="/requesterSubmitReview/:tour_id"
                element={<RequesterSubmitReview />}
              />
            </Routes>
          </ApolloProvider>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
