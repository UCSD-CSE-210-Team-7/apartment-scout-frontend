import styles from "./App.module.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { AuthProvider } from "./utils/auth";
import { ApolloProvider } from "./utils/apollo";

import ChatPage from "./pages/ChatPage";
import DisplayScouts from "./DisplayScouts/DisplayScouts";
import WelcomePage from "./WelcomeInterface/WelcomePage";
import SignUpPage from "./WelcomeInterface/SignUpPage";
import PickRolePage from "./WelcomeInterface/PickRolePage";
import Profile from "./pages/Profile";
import ScoutDetails from "./ScoutDetails/ScoutDetails";
import ScoutCalendarPage from "./components/ScoutCalendar/ScoutCalendarPage";

import NavBar from "./components/NavBar";
import ScoutHomePage from "./pages/ScoutHomePage";
import RequesterHomePage from "./pages/RequesterHomePage";

function App() {
  console.log(styles)
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
              <Route path="/chat/:email" element={<ChatPage />} />
              <Route path="/pickrole" element={<PickRolePage />} />
              <Route path="/signup" element={<SignUpPage />} />
              <Route path="/scouthome" element={<ScoutHomePage />} />
              <Route path="/requesterhome" element={<RequesterHomePage />} />
              <Route path="/browse/:email" element={<ScoutDetails />} />
              <Route path="/scout/:email" element={<ScoutCalendarPage />} />
            </Routes>
          </ApolloProvider>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
