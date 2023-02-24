import './App.css';
import ChatPage from './pages/ChatPage';
import DisplayScouts from './DisplayScouts/DisplayScouts';
import WelcomePage from './WelcomeInterface/WelcomePage';
import SignUpPage from './WelcomeInterface/SignUpPage';
import PickRolePage from './WelcomeInterface/PickRolePage';
import Profile from './pages/Profile';

function App() {
  return (
    <div className="App">
      {/* <Profile /> */}
    {/* <WelcomePage /> */}
      
        {/* <ChatPage/>       */}
        <DisplayScouts />
        {/* <PickRolePage /> */}
        {/* <SignUpPage /> */}
    </div>
  );
}

export default App;
