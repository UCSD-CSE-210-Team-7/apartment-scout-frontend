import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { AuthProvider } from './utils/auth';
import { ApolloProvider } from './utils/apollo';

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
                <AuthProvider>
                    <ApolloProvider>
                        <Routes>
                            <Route path="/" element={<WelcomePage/>} />
                            <Route path="/home" element={<DisplayScouts/>} />
                            <Route path="/profile" element={<Profile/>} />
                            <Route path="/chat" element={<ChatPage/>} />
                            <Route path="/pickrole" element={<PickRolePage/>} />
                            <Route path="/signup" element={<SignUpPage/>} />
                        </Routes>
                    </ApolloProvider>
                </AuthProvider>
            </BrowserRouter>
        </div>
    );
}

export default App;
