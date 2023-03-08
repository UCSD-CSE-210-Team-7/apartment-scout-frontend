import React, { useState } from "react";
import Sidebar from "../components/ChatInterface/Sidebar";
import Chat from "../components/ChatInterface/Chat";
import "../styles/chat-styles.scss";
import { getAuth } from "firebase/auth";

const ChatPage = () => {
  const [user, setUser] = useState(null);
  getAuth().onAuthStateChanged(setUser);

  const [selectedConversation, setSelectedConversation] = useState(null);

  const onSelectConversation = (conversation) => {
    setSelectedConversation(conversation);
  };

  return (
    <div
      style={{
        display: "flex",
        flexGrow: 1,
        maxHeight: "90vh",
      }}
    >
      <Sidebar user={user} onSelectConversation={onSelectConversation} />
      <Chat conversation={selectedConversation} user={user} />
    </div>
  );
};

export default ChatPage;
