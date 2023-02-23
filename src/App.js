import './App.css';
import ChatInterface from './ChatInterface/ChatInterface';
import DisplayScouts from './DisplayScouts/DisplayScouts';
import WelcomePage from './WelcomeInterface/WelcomePage';
import SignUpPage from './WelcomeInterface/SignUpPage';
import PickRolePage from './WelcomeInterface/PickRolePage';
function App() {
  return (
    <div className="App">
    <WelcomePage />
      
      {/* 
        <ChatInterface/> 
        <DisplayScouts />
        <PickRolePage />
        <SignUpPage />*/}
    </div>
  );
}

export default App;
