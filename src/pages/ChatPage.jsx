import React from "react";
import Sidebar from "../components/ChatInterface/Sidebar";
import Chat from "../components/ChatInterface/Chat";
import "../styles/chat-styles.scss";

const ChatPage = () => {
  return (
    <div className="home">
      <div className="container">
        <Sidebar />
        <Chat />
      </div>
    </div>
  );
};

export default ChatPage;
