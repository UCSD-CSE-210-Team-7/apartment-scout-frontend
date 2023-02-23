import React from "react";
import Sidebar from "../components/Sidebar";
import Chat from "../components/Chat";
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
