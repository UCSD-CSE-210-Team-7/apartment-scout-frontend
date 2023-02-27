import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";

import ChatPage from './pages/ChatPage';
import DisplayScouts from './DisplayScouts/DisplayScouts';
import WelcomePage from './WelcomeInterface/WelcomePage';
import SignUpPage from './WelcomeInterface/SignUpPage';
import PickRolePage from './WelcomeInterface/PickRolePage';
import Profile from './pages/Profile';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
            <Route path="/profile" exact element={<Profile/>} />
            <Route path="/welcome" exact element={<WelcomePage/>} />
            <Route path="/chat" exact element={<ChatPage/>} />
            <Route path="/displayscouts" exact element={<DisplayScouts/>} />
            <Route path="/pickrole" exact element={<PickRolePage/>} />
            <Route path="/signup" exact element={<SignUpPage/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
